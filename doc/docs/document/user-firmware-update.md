---
title: ユーザーによるファームウェアアップデート
---

## MetaModule ユーザーガイド:

### ファームウェアのアップグレード方法:

1. [MetaModule Github releases](https://github.com/4ms/metamodule/releases) から最新のファームウェアリリースをダウンロードします。必要なのは `metamodule-firmware-vX.X.X-firmware-assets.zip` ファイルだけです。

2. このファイルを解凍します。`metamodule-firmware` というフォルダが作成されます。

3a) `metamodule-firmware` フォルダ全体（フォルダ*と*その内容）を SD カードまたは USB ドライブにコピーします。

4. SD カードまたは USB ドライブを MetaModule に挿入します。

5. Main Menu > Settings > Update に移動します。

6. `metamodule-firmware/metamodule.json` ファイルが検出され、「Update Firmware」ボタンが表示されます。このボタンをクリックします。更新を実行してよいか確認するポップアップが表示されます。OK をクリックします。

7. 更新が完了するまで待ち、完了するまで電源を切らないでください。失敗した場合は、再試行する前に再起動することをお勧めします。

### USB-DFU アップデート方法:

1. [MetaModule Github releases](https://github.com/4ms/metamodule/releases) から最新のファームウェアリリースをダウンロードします。ファイルを解凍します。必要なのは `metamodule-firmware` フォルダ内の `main.uimg` ファイルだけです。

2. コンピューターからモジュールに USB ケーブルを接続します。

3. ロータリーエンコーダーを押しながらモジュールの電源をサイクルします。

4. ボタンが緑色に点滅します。これは USB-DFU ブートローダーモードになっていることを示しています。

5. [この Web ベースの DFU ローダー](https://devanlai.github.io/webdfu/dfu-util/)を開きます。

6. Connect をクリックし、「STM Device in DFU Mode」を選択します。

7. 次に「Choose File」をクリックして、ダウンロードした main.uimg ファイルを選択します。

8. 「Download」をクリックします。

9. 数分待ちます...しばらくかかります。次のエラーメッセージが表示されます:

`DFU GETSTATUS failed: ControlTransferIn failed: NetworkError: Failed to execute 'controlTransferIn' on 'USBDevice': A transfer error has occurred.`

これは正常であり、問題ではありません。安全に無視できます。

10. Web ページが完了したと表示されたら、USB ケーブルを抜いてモジュールの電源をサイクルします。
