---
title: プラグイン
---

## プラグイン

プラグインは、MetaModule にモジュールを追加する動的にロードされるバイナリです。

プラグインの作成には [MetaModule Plugin SDK](https://github.com/4ms/metamodule-plugin-sdk) を使用します。

例については、[metamodule-plugin-examples](https://github.com/4ms/metamodule-plugin-examples) を参照してください。

### VCV Rack プラグイン

ほとんどのプラグインは、MetaModule 用に再コンパイルされた VCV Rack モジュールです。Plugin SDK の `metamodule-rack-interface` サブモジュールは、Rack SDK と同様の API を提供します。API 関数は、`metamodule-core-interface` のラッパーおよびアダプターとして実装されています。

TODO:
システムの説明:

- フェイスプレートの割り当て方法
- Rack コンポーネント
- ModuleWidget のウィジェットツリー -> 要素変換
- 画像の動作と制限事項

### ネイティブプラグイン

プラグインは VCV Rack ベースである必要はありません。例として、[metamodule-plugin-examples](https://github.com/4ms/metamodule-plugin-examples) の Airwindows を参照してください。

最低限、プラグインは init() 関数を定義する必要がありますが、それ以外に必要なものはありません。

- プラグインがロードされると、まずすべてのアセットが内部 RAM ドライブのサブディレクトリにコピーされます。

- 次に、`.so` ファイルが（ELF ファイルとして）パースされ、すべての動的リロケーションが実行されます。未解決のシンボルがある場合、報告されて中断します。

- 次に、グローバル静的コンストラクタが呼び出されます。

- 最後に、init() 関数が呼び出されます。

プラグインの役割は、プラグイン全体のデータ（存在する場合）を初期化し、そのモジュールを登録することです。これは通常 init() で行われますが、グローバルコンストラクタでも行えます。

典型的な VCV Rack プラグインでは、モジュールは init() 内で `p->addModel(modelName)` を呼び出すことで登録されます。より一般的なケースでは、`metamodule-core-interface` の `CoreModules/register_module.hh` で定義されている `register_module()` 関数を使用してモジュールを登録できます:

```c++
using CreateModuleFunc = std::function<std::unique_ptr<CoreProcessor>()>;

bool register_module(std::string_view brand_name,
					 std::string_view typeslug,
					 CreateModuleFunc funcCreate,
					 ModuleInfoView const &info,
					 std::string_view faceplate_filename);
```

`ModuleInfoView` はモジュールの要素（ノブ、ジャックなど）へのビューです。MetaModule コアインターフェースにはビューのみが渡されるため、実際のデータはプラグインの全期間にわたって静的に存在する必要があります。VCV プラグインはグローバル `Model` 変数を使用してこれを実現しますが、ヒープに配置してグローバルデストラクタで解放することもできます。

`funcCreate` は `CoreProcessor` モジュールへの unique_ptr を返すファクトリ関数です。
`CoreProcessor` クラスは、すべての MetaModule モジュールの基底となる仮想基底クラスです:

```c++
class CoreProcessor {
public:
	virtual void update() = 0;
	virtual void set_samplerate(float sr) = 0;
	virtual void set_param(int param_id, float val) = 0;
	virtual void set_input(int input_id, float val) = 0;
	virtual float get_output(int output_id) const = 0;
	virtual float get_led_brightness(int led_id) { return 0; }
	virtual void mark_all_inputs_unpatched() {}
	virtual void mark_input_unpatched(int input_id) {}
	virtual void mark_input_patched(int input_id) {}
	virtual void mark_all_outputs_unpatched() {}
	virtual void mark_output_unpatched(int output_id) {}
	virtual void mark_output_patched(int output_id) {}
	virtual void load_state(std::string_view state_data) {}
	virtual std::string save_state() { return ""; }
};
```

これらをまとめると、オーディオ信号にゲインを提供するシンプルなネイティブプラグイン（ゲインを表示する LED 付き）は次のようになります:

```c++
// simple_gain.hh

#include "CoreModules/CoreProcessor.hh"

enum { GainKnobID };
enum { InputJackID };
enum { OutputJackID };
enum { GainLightID };

class SimpleGain : public CoreProcessor {
public:
    void update() override;
    void set_param(int param_id, float val) override;
    void set_samplerate(float sr) override;
    void set_input(int input_id, float val) override;
    float get_output(int output_id) const override;
    float get_led_brightness(int led_id) const override;

private:
    float in = 0;
    float out = 0;
    float gain = 1.f;
};

```

```c++
// simple_gain.cc

#include "simple_gain.hh"

void SimpleGain::update() {
    out = in * gain;
}

void SimpleGain::set_param(int param_id, float val) {
    if (param_id == GainKnobID)
        gain = val;
}

void SimpleGain::set_samplerate(float sr) {
}

void SimpleGain::set_input(int input_id, float val) {
    if (input_id == InputJackID)
        in = val;
}

float SimpleGain::get_output(int output_id) const {
    if (output_id == OutputJackID)
        return out;
    else
        return 0;
}

float SimpleGain::get_led_brightness(int led_id) const {
    if (led_id == GainLightID)
        return gain;
    else
        return 0;
}

```

次に、モジュールの要素（ジャック、ノブ、ライト）を定義し、init() 関数で登録します:

```c++
// plugin.cc

#include "simple_gain.hh"
#include "CoreModules/elements/element_counter.hh"
#include "CoreModules/elements/elements.hh"
#include "CoreModules/register_module.hh"
#include "CoreModules/CoreProcessor.hh"

void init() {
    static std::array<MetaModule::Element, 4> elements;
    static std::array<ElementCount::Indices, 4> indices;

    MetaModule::Knob gain;
    gain.x_mm = 10;
    gain.y_mm = 20;
    gain.image = "Brandname/comps/knob.png";
    gain.short_name = "Gain";
    elements[0] = gain;
    indices[0] = {.param_idx = GainKnobID};

    MetaModule::JackInput injack;
    injack.x_mm = 10;
    injack.y_mm = 60;
    injack.image = "Brandname/comps/jack.png";
    injack.short_name = "Input";
    elements[1] = injack;
    indices[1] = {.input_idx = InputJackID};

    MetaModule::JackOutput outjack;
    outjack.x_mm = 10;
    outjack.y_mm = 80;
    outjack.image = "Brandname/comps/jack.png";
    outjack.short_name = "Output";
    elements[2] = outjack;
    indices[2] = {.output_idx = OutputJackID};

    MetaModule::MonoLight light;
    light.x_mm = 10;
    light.y_mm = 30;
    light.image = "Brandname/comps/led.png";
    light.short_name = "Gain LED";
    elements[3] = light;
    indices[3] = {.light_idx = GainLightID};

    MetaModule::ModuleInfoView info {
        .description = "A simple gain module",
        .width_hp = 10,
        .elements = elements,
        .indices = indices,
    };

    MetaModule::register_module("Brandname", "SimpleGain", [](){ return std::make_unique<SimpleGain>(); }, info, "Brandname/simple_gain.png");
}

```

もちろん、この方法で要素を一つずつ定義するのは、多くのモジュールがある場合にはスケールしませんが、どんな方法でも自由に使用できます。4ms モジュールでは、Python スクリプトを使用して SVG をパースし、要素の constexpr 配列を含む C++ ヘッダーファイルを生成しています。また、Airwindows モジュールのように実行時にテーブルを生成することもできます。

一つの「落とし穴」は、文字列が静的ストレージに裏打ちされていない場合、何らかの静的コンテナで文字列を提供する必要があることです。理由は、Element 型には string_view のみが含まれ、同様にモジュールレジストリにも string_view が含まれるためです。例として Airwindows の `module_creator.cc` を参照してください。

ビルドするには、同じディレクトリに以下の CMakeLists.txt を配置します:

```cmake
cmake_minimum_required(VERSION 3.22)
include(../metamodule-plugin-sdk/plugin.cmake)

project(SimpleModules
    VERSION 0.1
    DESCRIPTION "Example Native Plugin for MetaModule"
    LANGUAGES C CXX ASM
)

add_library(SimpleModules STATIC)
target_include_directories(SimpleModules PRIVATE . )

target_sources(SimpleModules PRIVATE
	simple_modules.cc
    plugin.cc
)

# Call this to link and create the plugin file
create_plugin(
    SOURCE_LIB      SimpleModules
    PLUGIN_NAME     SimpleModules
    SOURCE_ASSETS   ${CMAKE_CURRENT_LIST_DIR}/assets
    DESTINATION     ${CMAKE_CURRENT_LIST_DIR}/../metamodule-plugins/SimpleModules
)

```

最後に、`plugin.cc` で参照されている png ファイルを `assets/` というディレクトリに配置します。
