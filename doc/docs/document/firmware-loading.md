---
title: ファームウェアの読み込み
---

## MetaModule へのファームウェアのロード

ファームウェアアプリケーションをロードする方法にはいくつかの選択肢があります。各方法は以下のセクションで説明します:

1. アプリ内アップデータ経由でロード

2. SWD/JTAG 経由で RAM にロード

3. DFU-USB 経由で NOR Flash にロード

4. SD カードからブート

### アプリ内アップデータ経由でロード

この方法は簡単で、頻繁でないアップデートに推奨される方法です。

自分でファームウェアをビルドした場合、.zip ファイルは `build/` ディレクトリにあります。

手順はこちら: [MetaModule Docs](https://metamodule.info/docs/getting_started.html#how-to-update-firmware)

### SWD/JTAG 経由で RAM にロード

これはアクティブなファームウェア開発に推奨される方法です。JTAG プログラマーが必要です。

モジュール上部の「SWD」とラベル付けされた 10 ピンコネクタに JTAG デバッガーを接続します。ヘッダーの名前にもかかわらず、プロトコルは実際には JTAG です。ただし、唯一の違いは NRST の代わりに tRST ピンがあることなので、SWD でも動作する可能性があります。

すでにアプリケーションを実行していてデバッグだけが必要な場合は、ロードせずに接続するだけで構いません。

新しいファームウェアをロードしてからデバッグする必要がある場合は、[gdb でのデバッグ](firmware-debugging.md)のガイドに従ってください。

#### Freeze ジャンパー

JLink プログラマーでファームウェアをロードする（デバッグなし）には、「Freeze ジャンパー」を取り付ける必要があります。

ブートローダーには 2 つのバージョンがあります。通常起動時に青いライトが点滅するのが見えれば、現在のブートローダーです。そうでなければ、以前のブートローダーです。

1a) 現在のブートローダー: ジャンパーは 2x4 デバッグヘッダーの左端 2 つのピンに取り付けます。
これは SWD/JTAG ヘッダーの隣にある、UART（RX/TX）の接続を含むヘッダーです。

```
     _      RX  TX
    |o|  o   o   o
    |o|  o   o   o
     -
```

1b) 初期ブートローダー（2024 年 11 月以前）: ジャンパーは `Control Expander` ヘッダーに取り付け、左上のピンとそのすぐ右のピンを橋渡しします。正しいヘッダーを使用していることを確認してください。Wifi ヘッダーの上、`y` と `z` ポットの近くにあります。ジャンパーは垂直ではなく水平に、ピンの一番上の行の一番左に取り付けます:

```
  Control
 Expander
          [o==o] o  o
           o  o  o  o
```

2024 年 11 月 1 日まで、意図的に新しいものをインストールしない限り、出荷されたすべてのユニットには古いブートローダーが搭載されていました。
ブートローダーの更新は、リリースタグが `firmware-v2.0.0-dev-2` 以降の、名前に「-bl-」を含むリリースファイルをロードすることで行います。

#### ファームウェアのロード

電源をオフにしてから再度オンにします（完全な電源サイクルが必要です）。

UART コンソールには次のように表示されます:

```
Freeze pin detected active: booting from DDR
Please load a multi-uimg binary into an address in DDR RAM.
Then write the address to the TAMP_BKP6 register at 0x5C00A118
System will hang until TAMP_BKP6 register is changed...
```

Jlink プログラマーを接続して以下を実行します:

```
make jprog
```

これには 8〜30 秒かかるはずです。ファームウェアは自動的に起動するはずです。

### USB DFU 経由で NOR Flash にロード

簡略化された手順はこちら: [MetaModule Docs: USB-DFU Bootloader](https://metamodule.info/docs/troubleshooting.html#usb-dfu-bootloader)

#### より詳細な手順

NOR Flash へのロードは、ファームウェアをオンボード FLASH チップに書き込むので、コンピューターを接続せずに通常通りブートできます。1〜2 分かかるため、これはファームウェアを頻繁でなくフラッシュする良い方法です。例えば、最新の安定版ファームウェアをフラッシュする場合などです。アクティブなファームウェア開発を行っている場合は遅いため推奨されません（その場合は SWD/JTAG を使用してください）。

まず、Freeze ジャンパーが取り付けられていないことを確認してください。

ロータリーエンコーダーボタンを押しながらモジュールの電源をサイクルします。これにより、NOR Flash から代替ファームウェア（USB-DFU ブートローダー）が強制的にロードされます。SWD/JTAG セクションで言及されているジャンパーが取り付けられていないことを確認してください。
UART コンソールを使用している場合、コンソールに次のように表示されます:

```
USB DFU Loader Starting...
QSPI is initialized.
Connect a USB cable to the computer.
Run `dfu-util --list` in a terminal and you should see this device.
```

USB-DFU ブートローダーモードでは、ボタンが緑色に点滅します。

コンピューターからモジュールに USB ケーブルを接続します。

[このような](https://devanlai.github.io/webdfu/dfu-util/) Web ベースのローダーを使用できます。Connect をクリックし、「STM Device in DFU Mode」を選択します。次に「Choose File」をクリックして、`build/main.uimg` でビルドした uimg ファイルを選択します。次に「Download」をクリックします。`DFU GETSTATUS failed: ControlTransferIn failed: NetworkError: Failed to execute 'controlTransferIn' on 'USBDevice': A transfer error has occurred.` というエラーが表示される場合があります。これは正常であり、エラーではありません。安全に無視できます。

または、コマンドラインを使用します（[dfu-util](https://dfu-util.sourceforge.net/) がインストールされている必要があります）:

```
make flash-dfu
```

このコマンドは main.uimg ファイルをデフォルトアドレス（0x70080000）にロードします。
`dfu-util -a 0 -s 0x70080000 -D build/main.uimg` を呼び出します。

これには 60〜120 秒かかります。
完了したら、USB ケーブルを抜き、電源をサイクルすると、新しいコードが起動します。

### SD カードからブート

専用の SD カードが必要です。すべての内容が消去されます。16GB カードが一般的で問題なく動作しますが、より小さいまたは大きいものでも動作するはずです。

まず、カードをフォーマット、パーティション分割し、ブートローダーをインストールする必要があります。これは新しい SD カードを使用するときに一度だけ行う必要があります。

```
make format-sd
```

これにより、デバイスパス（例: /dev/disk4）を尋ねられます。正しいものを入力してください。スクリプトが `mkfs` または `diskutil eraseDisk` を実行するためです。

これを実行した後、ボリュームが変更されたため、SD カードを取り出して再挿入する必要があります。

次に以下を実行します:

```
make flash-bootloader-sd
```

これにより、ブートローダー（mp1-boot）がビルドされ、`dd` を使用して SD カードの最初の 2 つのパーティションにロードされます。
再びドライブ名を尋ねられます。

これでブート可能な SD カードができました。新しい SD カードを入手しない限り、上記の手順を繰り返す必要はありません。

アプリケーションをフラッシュするには、以下を実行します:

```
make flash-app-sd
```

これにより、アプリケーションが通常通りビルドされ、`dd` を使用して 4 番目のパーティションにコピーされます。

カードを取り出して MetaModule に挿入します。

MetaModule に SD カードを使用してブートするよう指示するには、BOOT DIP スイッチを変更する必要があります。
これらは PCB の背面、ロータリーエンコーダー近くの画面の下にあります。
「BOOT0_2」とラベル付けされています。2 つのスイッチがあります。PCB に印刷された図を見てください。
SD でブートするには、両方のスイッチを左に押します。
Flash（内部 Flash チップ）からのブートに戻したい場合は、下のスイッチを右に切り替えます。
