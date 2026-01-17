---
title: ファームウェアのデバッグ
---

# デバッグ

PCB 上のピンとパッドの位置については、この画像を参照してください:
![PCB header locations](./images/pcb-headers.png)

## JTAG デバッガーの接続

1. モジュール上部の「SWD」とラベル付けされた 10 ピンコネクタに JTAG デバッガーを接続します。ヘッダーの名前にもかかわらず、プロトコルは実際には JTAG です。ただし、唯一の違いは NRST の代わりに tRST ピンがあることなので、SWD でも動作する可能性があります。

2) 2x4 デバッグヘッダーの左端 2 つのピンに「Freeze ジャンパー」を取り付けます。
   これは SWD/JTAG ヘッダーの隣にある、UART（RX/TX）の接続を含むヘッダーです。

```
     _      RX  TX
    |o|  o   o   o
    |o|  o   o   o
     -
```

古いブートローダーを搭載したユニットをお持ちの場合は、[ファームウェアのロード](./firmware-loading.md)を参照してください。または、名前に `-bl-` を含む最近のファームウェア zip ファイル（v2.0.0 以降）でアプリ内インストーラーを使用してブートローダーを更新してください。

3. 電源をオフにしてから再度オンにします（完全な電源サイクルが必要です）。

コンソールには次のように表示されます:

```
Freeze pin detected active: booting from DDR
Please load a multi-uimg binary into an address in DDR RAM.
Then write the address to the TAMP_BKP6 register at 0x5C00A118
System will hang until TAMP_BKP6 register is changed...
```

この時点で、gdb、Segger Ozone、VSCode、または TRACE32 でデバッグすることを選択できます。
以下の関連セクションにスキップしてください:

## GDB

まず、gdb サーバーを起動する必要があります。openocd（v0.12.0）または Segger JLinkGDBServer（v7.92）が動作することが確認されています。

openocd の場合、別のターミナルウィンドウで以下を実行して openocd を起動します:

```
make start-openocd
```

JLinkGDBServer の場合、別のターミナルウィンドウで以下を実行して gdb サーバーを起動します:

```
make start-jlinkgdb
```

このコマンドは、Jlink GDB 実行ファイルが `JLinkGDBServer` であることを想定しています。お使いのシステムでそうでない場合は、以下のコマンドを調整して代わりに使用してください。また、USB ポートと速度設定を調整する必要があるかもしれません。

```
JLinkGDBServer -select USB=0 -device STM32MP15xx_A7 -endian little -if JTAG -speed 25000 -noir -noLocalhostOnly -nologtofile -port 3333
```

または、JLinkGDBServer GUI プログラムを起動できます。インターフェースには JTAG を選択し、ポートを手動で 3333 に設定します（デフォルトでは 2331 です）。注意: 3333 以外のポートを使用したい場合は、gdbscript の最初の行を変更できます（次のステップを参照）。

gdb サーバーが別のターミナルウィンドウで実行されたら、arm-none-eabi-gdb を使用してデバッグを開始します。

```
make debug
```

これにより arm-none-eabi-gdb が起動し、`multi.gdbinit` スクリプトが実行されます。スクリプトは非常に短いので、何かが動作しない場合は内容を確認してください。スクリプトが行うのは、ポート 3333 の gdb サーバーに接続し、A7 elf ファイルからシンボルを gdb にロードすることだけです（MetaModule にはロードしません）。次に、multi-uimg ファイル（`build/main.uimg`）を任意のアドレス 0xC0000000 にロードします。最後に、指定されたレジスタ（TAMP_BKP6R レジスタ）に 0xC0000000 を書き込むことで、ブートローダーに multi-uimg ファイルの解析を開始するよう通知します。

ロードには、デバッガーハードウェア（ST-LINK または JLink）とバイナリサイズ（つまり、フルバイナリをコンパイルしたか、`make limit LIMITFILE` で制限したか）によってしばらく時間がかかる場合があります。

## Ozone

コマンドライン gdb を使用する代わりに、Segger の Ozone GUI プログラムも使用できます。
Ozone 3.28d が動作することが確認されています。

Ozone を開き、プロジェクトファイル `flashing/metamodule.jdebug` をロードします。

Freeze ジャンパーを取り付けた状態で電源を入れ直した後、緑色の「Power」アイコンをクリックするか、Debug > Start Debug Session メニューから「Download & Reset Program」を選択します。
プロジェクトファイル経由でリセット動作がオーバーライドされているため、これは実際にはプログラムをリセットしないことに注意してください。

## TRACE32

Lauterbach TRACE32 もデバッグに使用できます。

Freeze ジャンパーを取り付けた状態で電源を入れ直した後、`flashing/mm-a7-t32.cmm` スクリプトを実行してファームウェアとシンボルをロードします。

両方の A7 コアにアクセスできます（メインコアには `Core 0` コマンドを使用、セカンダリ A7 コアに切り替えるには `Core 1` を使用）。M4 コアをデバッグするには、`flashing/switch-to-m4.cmm` スクリプトを使用できます。

## VSCode の使用

VSCode は OpenOCD または JLinkGDBServer を使用してデバッグに使用できます。

`launch.json` ファイルの例が `flashing/vscode-example/` ディレクトリにあります。
このファイルを `.vscode` ディレクトリに配置するか、既存の `launch.json` ファイルに内容をマージしてください。おそらくこの設定ファイルをカスタマイズしたいと思うでしょうが、そのままでも動作するはずです。

Freeze ジャンパーを取り付けた状態で再起動した後、デバッグセッションを開始すると、ファームウェアがロードされてから main でブレークします。

Cortex-Debug プラグインが必要です。サンプル設定は Jlink 用ですが、Cortex-Debug は openocd でも動作します。詳細については [Cortex-Debug wiki](https://github.com/Marus/cortex-debug/wiki) を参照してください。

## GPIO ピンデバッグ（ピンフリッピング）

ファームウェアのタイミングへの影響を最小限に抑えながら、ファームウェアから状態を示すためにいくつかの GPIO ピンをトグルできます。通常、オシロスコープまたはロジックプローブを使用してピンを読み取ります。

PCB にはこれ専用の 4 つのヘッダーピンがあります。「Debug Pin 0」から「Debug Pin 3」の位置については、このドキュメントの上部の写真を参照してください。
次のように使用できます:

```
#include "debug.hh"   // firmware/src/medium/ にあります

Debug::Pin0::high();
Debug::Pin0::low();
Debug::Pin1::set(true); //::high() と同じ
Debug::Pin1::set(false); //::low() と同じ
```

プラグインから、または C ファイル（C++ ではなく）からデバッグピンをトグルする必要がある場合は、`debug_raw.h` ヘッダーを次のように使用できます:

```
#include "debug_raw.h"     // これへの完全な相対パスを指定する必要があるかもしれません

DebugPin0High();
DebugPin0Low();
```

## コンソール出力（printf デバッグ）

USB-UART ケーブルをデバッグヘッダーの TX ピン（SWD ヘッダーの隣）に接続することで、コンソール出力を表示できます。TX ピンにはラベルが付いています（右上のピン）。下の 4 つのピンはすべて GND です。設定は 115200、8N1 です。上の画像を参照してください。

デバッグ出力には `pr_dbg()`、`pr_warn()`、`pr_err()`、`pr_trace()` を使用します。これらには `pr_dbg.hh` ヘッダーが必要です。

見たいものと同等以下のコンソールログレベルを設定してください。レベルは次の通りです:

- NONE（コンソール出力なし）
- ERROR（pr_err のみ）
- WARN（pr_warn 以上）
- INFO（pr_info 以上）
- DEBUG（pr_dbg 以上）
- TRACE（pr_trace 以上）
- DUMP（pr_dump 以上）

`make configure` を実行してビルドを設定した場合、ログレベルは DEBUG に設定されます。ログレベルを設定するには、cmake で次のように設定します:

```
cmake --fresh --preset full -G Ninja -DLOG_LEVEL=TRACE
```

各レベルの規則は次の通りです:

- Error: プログラムの失敗につながる可能性のある予期しない状態
- Warnings: 注意に値するがプログラムの失敗にはつながらない状態
- Info: 警告やエラーではない重要または有用な情報
- Debug: デバッグに使用される一時的なメッセージ
- Trace: 実行の詳細なログ
- Dump: 大量の冗長なデータ

Debug（pr_dbg）は、デバッグ時のみに使用すると特に便利です。そうすれば、機能がマージの準備ができたときに、pr_dbg を検索してすべてのインスタンスを削除する（または選択的により適切なレベルに置き換える）ことが簡単です。
このテクニックにより、機能を継続的に追加する際のコンソールの乱雑さを軽減できます。

## 注意事項

### スタートアップ

注意: Cortex-M シリーズ MCU のフラッシュに慣れている場合、いくつかの違いに気づくでしょう。1 つは、Flash が外部チップにあることです。もう 1 つの違いは、メイン RAM（DDR RAM）はソフトウェアが初期化するまで利用できないことです。オンボード NOR Flash チップにはブートローダーがインストールされています（[MP1-Boot](https://github.com/4ms/mp1-boot)、これは FSBL または「第一段階ブートローダー」です）。ブートローダーは電源投入時に BOOTROM によってロードされます。MP1-Boot は DDR RAM ペリフェラルの初期化を担当します。明らかに、これはファームウェアを DDR RAM にロードする前に行う必要があります。そのため、Cortex-M チップとは異なり、デバイスをプログラミングする前にブートローダーを実行する必要があります。ただし、アプリケーションが実行を開始するときに最初に行うことの 1 つは、MMU を有効にし、書き込み不可能なものを含むさまざまなメモリ領域を設定することです。したがって、ファームウェアを RAM にロードできる唯一の時間は、ブートローダーが RAM を初期化した後、アプリケーションが開始する前です。これを処理するために、MP1-Boot には「Freeze ピン」オプションがあります。このピンが LOW（ジャンパーが取り付けられている）として検出されると、MP1-Boot は RAM を初期化した後に実行を停止（フリーズ）します。TAMP_BKP6R レジスタに何かが書き込まれたことを検出するまで停止したままになります。その時点で、このレジスタに書き込まれたアドレスから multi-uimg ファイルをロードしようとします。multi-uimg にエントリポイントが含まれている場合、ロード後にそのポイントから実行を開始します。

### Multi-uimg フォーマット

multi-uimg フォーマットは、ファームウェアバイナリに使用されるものです。これは、互いに連結された一連の uimg ファイルです。各 uimg セクションは 64 バイトのヘッダー（U-Boot の uimg フォーマットと同じヘッダー）であり、その直後にバイナリデータが続きます。ヘッダーには、イメージのサイズ、ロードすべき場所、およびオプションで実行を開始する場所が記載されています。
multi-uimg ファイルは、M4 および A7 の .elf ファイルから `flashing/elf_to_uimg.py` および `flashing/uimg_header.py` スクリプトで生成されます。

### マルチコアデバッグ

デバッガーは複数のコアの処理に苦労します。デバッグ時に 1 つのコアを停止すると（例えば変数を調べるため）、別のコアがタイムアウトし、続行してもアプリケーションが正常に実行されない可能性があります。
