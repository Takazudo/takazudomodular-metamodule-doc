---
title: シミュレーターの外部プラグイン
---

## 外部プラグイン

シミュレーターは、ファームウェアと同じ方法でプラグインをロードできません。ただし、ハードウェアなしでプラグインをテストするために、プラグインをシミュレーターに「ビルトイン」としてビルドできるハックがあります。

### 必要条件

プラグインプロジェクトは、metamodule リポジトリの外の別のディレクトリに存在する必要があります。
プロジェクトには .mmplugin ファイルをビルドする CMakeLists.txt ファイルが含まれている必要があります。
例については [metamodule-plugins-examples](https://github.com/4ms/metamodule-plugins-examples) リポジトリを参照してください。
プラグイン内には `init()` 関数（または `init(rack::Plugin *)`）が必要です。

### ビルド

このハックを機能させるには、コードにいくつかの変更を加える必要があります:

1. プラグインで `init()` 関数を見つけ、`init_PluginSlug()` に変更します。
   PluginSlug はプラグインのブランドスラッグです（plugin.json ファイルでブランドスラッグを確認してください）。これは、同じ名前の `init()` 関数を複数持つことができないため必要です。

2. プラグインに `pluginInstance` というグローバル変数がある場合、`extern` にする必要があります。以下を見つけます:

```c++
   Plugin* pluginInstance;
```

そしてこれに変更します:

```c++
   extern Plugin* pluginInstance;
```

これは、pluginInstance というグローバル変数がすでに存在し、2 つ持つことができないため必要です。

3. プラグインの CMakeLists.txt ファイルで、上部に以下のようなものがあることを確認します:

```cmake
if(NOT "${METAMODULE_SDK_DIR}" STREQUAL "")
	message("METAMODULE_SDK_DIR set by CMake variable ${METAMODULE_SDK_DIR}")
elseif (DEFINED ENV{METAMODULE_SDK_DIR})
    set(METAMODULE_SDK_DIR "$ENV{METAMODULE_SDK_DIR}")
	message("METAMODULE_SDK_DIR set by environment variable ${METAMODULE_SDK_DIR}")
else()
    set(METAMODULE_SDK_DIR "${CMAKE_CURRENT_LIST_DIR}/../metamodule-plugin-sdk")
	message("METAMODULE_SDK_DIR set to default: ${METAMODULE_SDK_DIR}")
endif()

include(${METAMODULE_SDK_DIR}/plugin.cmake)
```

このブロックは METAMODULE_SDK_DIR という cmake 変数を探し、それを使用して SDK を見つけます。存在しない場合、同じ名前のシェル環境変数を探します。それも失敗した場合、親ディレクトリで SDK を探します。また、使用するディレクトリを出力します。これが必要な理由は、シミュレーターがプラグインをビルトインとしてビルドするために、プラグインに偽の SDK を使用するよう指示するためです。

次のようなエラーが発生した場合:

```
  add_library cannot create target "metamodule-rack-interface" because  another target with the same name already exists.
```

プラグインがシミュレーターの偽の SDK ではなく、通常の SDK でビルドしようとしています。上記の cmake コードブロックに何か問題があるか、METAMODULE_SDK_DIR が正しく設定されていません。

4. 最後に、simulator プロジェクトで `simulator/ext-plugins.cmake` ファイルを開き、上部に次の 2 行を追加します:

```cmake
list(APPEND ext_builtin_brand_paths "${CMAKE_CURRENT_LIST_DIR}/../../metamodule-plugin-examples/PluginDir")
list(APPEND ext_builtin_brand_libname "PluginLibraryName")
list(APPEND ext_builtin_brand_slug "plugin_brand_slug")  # ブランドスラッグがライブラリ名と異なる場合にのみこの行が必要です
```

最初の行（`ext_builtin_brand_paths`）は、プラグインをビルドする `CMakeLists.txt` ファイルを含むプラグインディレクトリへのパスです。
フルパスを指定できますが、変数 `${CMAKE_CURRENT_LIST_DIR}` を使用することを強くお勧めします。これは自動的に simulator ディレクトリのパスに設定されます。

2 行目（`ext_builtin_brand_libname`）は、CMakeLists.txt ファイルで作成される CMake ライブラリの名前です。
例えば、プラグイン CMake ファイルに次の行がある場合、`MyModulesLib` を使用します:

```cmake
add_library(MyModulesLib STATIC)
```

3 行目（`ext_builtin_brand_slug`）は、プラグインが使用するブランドスラッグです。これは plugin.json ファイルまたは plugin-mm.json ファイルにあるスラッグと一致する必要があります。スラッグが CMake ライブラリ名と同じ場合、この行を省略できます。

外部プラグインが複数ある場合、すべてのスラッグを指定するか、まったく指定しない必要があります。

5. これで、simulator ディレクトリ内（firmware ディレクトリではない！）からシミュレーターをビルドでき、プラグインがビルトインブランドとして表示されるはずです。

```bash
cd metamodule/simulator
make clean
make
make run
```

### 制限事項

これは少しハックなので、いくつかの制限があります:

- プラグインは POSIX ファイルシステム呼び出しを使用して assets/ ディレクトリ内のファイルにアクセスできません。
  プラグインは rack インターフェースまたはネイティブプラグイン ModuleInfo インターフェースによってロードされたウィジェット用の .ttf フォントと .png ファイルにアクセス*できます*。ただし、fopen()、fread() などへの呼び出しは assets/ ディレクトリ内のファイルを見つけられません。理由は、ハードウェアではアセットが FatFS RAM ディスクとしてロードされるためです。シミュレーターは FatFS RAM ディスクのマウントをシミュレートし、ホストコンピューターから直接ではなく、そこを介してファイルにアクセスします。（シミュレーターの目標の 1 つはハードウェアを忠実に模倣することなので、この方法は意図的です）。この回避策を作成するのはおそらくそれほど難しくないでしょう。

- 他のファイルシステム呼び出しが機能しない場合があります。すべてのエッジケースを調査したわけではありませんが、一般的にシミュレーターは MetaModule のファイルシステムをシミュレートしているため、ホストコンピューター上のファイルにアクセスしようとすると、他のものが壊れている可能性があります。

- グローバル変数 `pluginInstance` は、実行時（つまり、init() 関数の外）にプラグインのプラグインインスタンスに正しく設定されません。これは通常、実行時にロードされるはずのフォントや画像が見つからないという形で現れます。回避するには、一時的に `rack::asset::plugin(pluginInstance, "res/path/to/file.svg")` を `"MyPluginSlug/path/to/file.png"` のようなハードコードされたパスに変更します。`rack::asset::plugin` がパスをどのように変換するかを理解するには、`firmware/vcv_plugin/export/src/asset.cc` を参照してください。

シミュレーター上の外部プラグインでこれらの問題が発生している場合、実際のハードウェアでテストすることが、問題がこれらの制限によるものか実際のバグかを判断する最良の方法です。

- 変数名、関数名、マクロ（`#define`）が衝突する可能性があります。プラグインはシミュレーターコードとすべての通常のビルトインモジュール（Befaco、HetrickCV、4ms など）とともにビルドおよびリンクされるため、プラグインが使用する関数やグローバル変数名がすでに使用されている可能性があります。これによりコンパイラエラーが発生することを願いますが、最悪の場合、ランタイムクラッシュを引き起こす可能性があります（特にマクロの場合）。残念ながら、関数/変数の名前を変更する、名前空間を使用する、マクロを避ける以外に簡単な回避策はありません。問題のテキストを metamodule リポジトリで検索すると、これが発生しているかどうかがわかりますし、プラグインを通常通りビルドして同じエラーが発生するかどうかを確認することもできます。

他にも制限がある可能性があるため、何か見つけた場合は報告してください（メール、フォーラム、または github issue を開いて）。
