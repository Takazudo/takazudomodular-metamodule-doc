---
title: ファームウェアのビルド
---

## ファームウェアのビルド

これには `arm-none-eabi-gcc` バージョン 12.2 以降が PATH にインストールされている必要があります。
これに関する重要な注意事項については、[セットアップガイド](./setup.md)を参照してください。

正しいブランチにいること、そしてサブモジュールをすでに更新していることを確認してください。

ビルドシステムを準備するには:（一度だけ実行する必要があります）

```
make configure
```

コンパイルするには、以下を実行します:

```
make all
```

`make configure` コマンドは、以下を実行するショートカットです:

```
# MacOS, Linux:
cmake --fresh --preset full -GNinja -DLOG_LEVEL=DEBUG

# MinGW:
cmake --fresh --preset full -G"Unix Makefiles" -DLOG_LEVEL=DEBUG
```

（MinGW の回避策は [issue #78](https://github.com/4ms/metamodule/issues/78) で文書化されています）

`make all` コマンドは、以下を実行するショートカットです:

```
cmake --build --preset full
```

UART 経由でコンソールに送信される量を制御するために、必要に応じて異なる LOG_LEVEL を設定できます。[ファームウェアのデバッグ](firmware-debugging.md)を参照してください。

### SD カードの使用

_オプション_: SD カードにファームウェアを書き込む予定がある場合、時間を節約するために SD カードデバイスのパスを指定できます。これを行わない場合、SD カード書き込みスクリプトを実行するたびにシステムがプロンプトを表示します。デバイスパスは SD カードデバイス全体（単一のパーティションだけでなく）へのパスである必要があります。

```
cmake --preset full -DSD_DISK_DEV=/dev/disk4

# または、環境変数を設定:
export SD_DISK_DEV=/dev/disk4
```

ファームウェアは `firmware/build/main.uimg` としてビルドされます。このバイナリファイルには M4 および A7 コアのイメージが含まれています。デバッグ用のシンボルは `firmware/build/mp1corea7/medium/main.elf` および `firmware/build/mp1corem4/medium/main_m4.elf` にあります。

### ツールチェーンの指定

_オプション_: gcc arm ツールチェーンの複数のバージョンがインストールされていて、このプロジェクト用に PATH を変更したくない場合は、TOOLCHAIN_BASE_DIR 変数を次のように設定できます:

```
# 便宜上、bashrc/zshrc に追加:
# 末尾のスラッシュに注意（必須）
export TOOLCHAIN_BASE_DIR=/path/to/arm-gnu-toolchain-12.x-relX/bin/
```
