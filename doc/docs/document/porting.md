---
title: 移植に関する情報
---

### 新しいモジュールを追加するための手順

プラグインの作成については、[Plugins.md](./plugins.md) を参照してください。

---

以下は、既存の VCV Rack プラグインから新しいビルトインブランドを追加し、メインファームウェアに静的にコンパイルするための手順です。これは一般的なことではなく、通常はプラグイン（上記参照）を使用します。

1. **モジュールコードを vcv_ports/ に git サブモジュールとして追加する**

```bash
git submodule add https://github.com/\<user\>/\<repo\> firmware/vcv_ports/\<Brand\>
```

2. **アートワーク PNG ファイルをコピーする**

```bash
mkdir -p firmware/assets/\<Brand\>/
```

すべてのアートワーク SVG ファイル（フェイスプレートとコンポーネント）を PNG ファイルに変換し、この新しいディレクトリに配置します。
フェイスプレート PNG ファイルの高さが 240px であること、コンポーネント PNG ファイルも同様にスケーリングされていることを確認してください。

元の VCV Rack プラグインと同じファイル名とディレクトリ構造を維持してください。
`.svg` の拡張子を `.png` に変更するだけです。
`\<Brand\>` ディレクトリは、VCV プラグインが使用する `res/` ディレクトリを置き換えます。

3. **ブランドの `CMakeLists.txt` ファイルを作成する**

   `firmware/vcv_ports/glue/\<Brand\>/CMakeLists.txt` という新しいファイルを作成します。
   このファイルは CMake にモジュールのビルド方法を伝えます。これはかなりシンプルな CMake ファイルで、\<Brand\>Library という名前の新しいターゲットを作成することだけが必要です。

   以下は例です:

```cmake

cmake_minimum_required(VERSION 3.22)

# プロジェクト名、バージョンなどを定義
project(MyBrandMetaModulePlugin
    VERSION     0.1
    DESCRIPTION "MyBrand Plugin for MetaModule"
    LANGUAGES   C CXX ASM
)

add_library(MyBrandLibrary STATIC)

target_sources(MyBrandLibrary
    PRIVATE
    # すべてのソースファイルをここに配置
)

# 必要なインクルードディレクトリをここに配置:
target_include_directories(MyBrandLibrary PRIVATE ${CMAKE_CURRENT_LIST_DIR}/../../MyBrand/src)

# 必要なコンパイルオプションをここに配置
target_compile_options(MyBrandLibrary PRIVATE -Wno-double-promotion)

# プロパティをここに設定（少なくとも c++20 が必要）
set_property(TARGET MyBrandLibrary PROPERTY CXX_STANDARD 23)

```

4. `firmware/vcv_ports/brands.cmake` にブランド名を追加する

```cmake
# ブランドのリスト
set(brands
  ...
  \<Brand\>
)
```

5. **internal_plugin_manager.hh にモジュールを追加する**

TODO

```c++
// glue/Brand/plugin.hh
#include "plugin/Plugin.hpp"

extern rack::plugin::Model *modelSomeModule;
extern rack::plugin::Model *modelSomeOtherModule;

```

```c++
// internal_plugin_manager.hh に追加:
#include "glue/Brand/plugin.hh"

// load_internal_plugins() の末尾に追加
    auto &MyBrand_plugin = internal_plugins.emplace_back("MyBrand");
    pluginInstance = &MyBrand_plugin;
    MyBrand_plugin.addModel(modelSomeModule);
    MyBrand_plugin.addModel(modelSomeOtherModule);

```

6. `make configure` を実行して、新しいブランドでビルドを更新します。

その後、通常通りビルドしてファームウェアを更新します。
