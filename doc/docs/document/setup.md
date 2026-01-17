---
title: 開発環境のセットアップ
---

## 開発環境のセットアップ

### 全プラットフォーム共通:

- C++23 を部分的にサポートする C++ ツールチェーンが必要です（`gcc-12` 以降、または `clang` 16 以降）。
- ファームウェアをビルドするには、gcc arm ツールチェーン バージョン 12.2 以降が必要です。
  - ダウンロード先: https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads
    - ホストコンピュータ用のパッケージで、末尾が `arm-none-eabi` のものを取得してください
  - または xpack バージョンでも可: https://github.com/xpack-dev-tools/arm-none-eabi-gcc-xpack/releases/tag/v12.2.1-1.2
  - `arm-none-eabi-gcc` が PATH に通っていることを確認してください（これは `arm-non-eabi` ディストリビューション内の「bin」フォルダです）。
  - MacOS の場合、初回実行時に OS のセキュリティシステムが実行ファイルにフラグを立てることがあります。「make clean」を実行してから「make」を実行し、「許可」をクリックするという操作を、セキュリティのポップアップが出なくなるまで繰り返してください（6〜10 回程度のポップアップが出る可能性があります）。これはインストール後の初回のみ発生します。
  - **Windows ユーザーへの重要な注意**: `arm-none-eabi` がインストールされる PATH にはスペースを含めては*いけません*。デフォルトでは、`arm-none-eabi` インストーラー（末尾が「.exe」のダウンロード）を実行すると、スペースを含む「C:\Program Files (x86)\\...」にインストールされます。末尾が「.zip」のファイルをダウンロードする方がはるかに簡単で、バイナリを好きな場所に配置できます。例えば、「C:\arm-none-eabi」などに解凍できます。

### 必要なもの:

- ファームウェア:
  - cmake v3.24 以降
  - ninja（MinGW では不要、または cmake を別のジェネレータで設定する場合は不要）
  - gcc/g++ 12、または clang 16 以降（ユニットテスト用）
  - arm-none-eabi-gcc ツールチェーン 12.2 以降
    - バージョン 12.2、12.3、14.1 は広範囲にテストされています。
    - SDK を使用してプラグインをコンパイルする場合、arm-none-eabi-gcc ツールチェーンのバージョン **12.3 を使用する必要があります**。そのため、同じマシンでプラグインとファームウェアの両方をコンパイルする場合、両方に 12.3 を使用するのが最も簡単です。
  - xxd
  - python3
  - オプション: flatbuffers サブモジュールのバージョンに応じた flatc

- シミュレーター:
  - cmake v3.24 以降
  - ninja（cmake を別のジェネレータで設定する場合は不要）
  - gcc/g++ 12、または clang 16 以降
  - SDL2.x

### MacOS

比較的新しい macOS バージョンが必要ですが、どのくらい古いバージョンまで動作するかは不明です。
Monterey（12.5）と Ventura（13.4 および 13.5）はテスト済みで、動作することが確認されています。

- [brew](https://brew.sh) をインストールし、「Next Steps」の指示に従って Homebrew を PATH に追加してください。

- ファームウェアのビルドには以下が必要です（cmake を呼び出す際に別の -G オプションを使用する場合、ninja は不要です）:
  - `brew install cmake ninja`

- シミュレーターのビルドには、追加で sdl が必要です:
  - `brew install sdl2`

### Linux

Ubuntu の場合（22.04 でテスト済み）:

- `sudo apt-get install cmake g++-12 jq ninja-build pkg-config`
- Ubuntu 22.04 には cmake 3.22 が付属していますが、これは十分に新しくありません。v3.24 以降を [Kitware](https://github.com/Kitware/CMake/releases) からインストールしてください。
  - リリースファイルをダウンロードして展開した後、`bin/` ディレクトリを `PATH` に追加してください
- gcc-12 と g++-12 をデフォルトに設定してください。例: Ubuntu 22.04 の場合:
  - `sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-12 120`
  - `sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-12 120`
- シミュレーター GUI を使用するには、sdl2 もインストールする必要があります:
  - `sudo apt-get install libsdl2-dev`

### Windows

開始するには、VCV Rack の開発環境ガイド（[こちら](https://vcvrack.com/manual/Building#Windows)）に従ってください。これにより、MSYS2/MinGW 開発環境と、MetaModule 開発に必要なほとんどのパッケージをセットアップできます。簡単に言うと、[MSYS](http://www.msys2.org/) をインストールし、MinGW 64-bit シェルを開いて以下を実行します:

```
pacman -Syu git wget make tar unzip zip mingw-w64-x86_64-gcc mingw-w64-x86_64-gdb mingw-w64-x86_64-cmake autoconf automake libtool mingw-w64-x86_64-jq python zstd mingw-w64-x86_64-pkgconf
```

追加でインストールする必要があるパッケージは、ninja（ビルドシステム）と SDL2（シミュレーター用にのみ必要）だけです。VCV の手順と同様に、MinGW 64-bit シェルを開いて以下を入力します:

```
pacman -Syu mingw-w64-x86_64-ninja mingw-w64-x86_64-SDL2

```

ファームウェアをビルドするには、このドキュメントの冒頭に記載されている `arm-none-eabi` パッケージがインストールされていることを確認してください。これを MinGW の PATH に追加する必要があります。MinGW を使用したことがない場合、これは最も簡単ではありません。すべてのターミナルプロンプトを閉じ、C:\msys64\home\\(USERNAME)\\.bashrc をお好みのテキストエディタで開きます。ARM の .exe インストーラーを使用した場合、以下の行を追加する必要があります（このドキュメントが書かれた以降に `arm-none-eabi` のバージョン番号が変わっている場合は、これを変更する必要があるかもしれません）:

```
export PATH=$PATH:"/c/Program Files (x86)/Arm GNU Toolchain arm-none-eabi/12.3 rel1/bin"
```

ARM から zip ファイルをダウンロードした場合、上記のパスを解凍したフォルダの場所に変更し、末尾に `bin/` を付けてください。例えば、MinGW のホームディレクトリに解凍した場合、以下を使用します:

```
export PATH=$PATH:/home/USERNAME/arm-gnu-toolchain-12.3.rel1-mingw-w64-i686-arm-none-eabi/bin
```

これをテストするには、新しい MinGW 64-bit シェルを開いて以下を入力します:

```
arm-none-eabi-gcc --version
```

バージョン番号といくつかの著作権情報が表示されるはずです。表示されない場合、arm-none-eabi パッケージがインストールされている場所を確認し、PATH 設定を調整してください。

_ヒント_: MetaModule 用に何かをビルドする際は、必ず MinGW 64-Bit シェルを起動してください！Windows Terminal がインストールされている場合、プロファイルを設定して、Terminal タブとして MinGW 64-Bit シェルを簡単に起動できるようにする価値があります。Windows Terminal がインストールされている場合、設定メニューを開いてプロファイルを作成できます。コマンドラインオプションについては、MSYS2/MINGW64 をデフォルトの場所にインストールした場合、必要なコマンドは以下の通りです:

```
C:/msys64/msys2_shell.cmd -defterm -here -no-start -mingw64
```

このタブを通常の `cmd` や `Windows Powershell` タブと区別するために、アイコンオプションを設定することをお勧めします。デフォルトのパスでは、このパスは以下の通りです:

```
C:/msys64/mingw64.ico
```

_ヒント_: MetaModule コードの多くの要素は C++23 を必要とするため、以前に VCV 環境（または MSYS2 環境）をセットアップしたことがある場合、`gcc` を `gcc-12` 以上に更新する必要があるかもしれません。使用しているバージョンを確認するには、MinGW 64-Bit シェルを開く必要があります。以下のコマンドを入力します:

```
gcc -v
```

多数の診断情報が表示されますが、最後の行に実行している `gcc` のバージョンが表示されます。バージョン 12.0 未満を実行している場合、`gcc` を更新する必要があります。パッケージマネージャー経由で `gcc` を更新するには、MinGW プロンプトで以下を入力します:

```
pacman -Syu mingw-w64-x86_64-gcc
```
