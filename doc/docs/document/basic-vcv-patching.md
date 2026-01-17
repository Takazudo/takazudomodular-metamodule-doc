---
title: VCV Rack での基本的なパッチング
---

# VCV で MetaModule パッチを作成する

### モジュールをライブラリに追加する

始めるには、無料の 4msCompany MetaModule を VCV ライブラリに追加する必要があります。VCV ライブラリへのモジュール追加に慣れていない場合でも、簡単なプロセスです。

#### VCV ライブラリ経由（まだ利用不可）

1. [VCV ライブラリ](https://library.vcvrack.com/)にアクセスし、アカウントにサインインしていることを確認してください（右上隅）。
2. ライブラリの上部にはいくつかのフィルターがあります。「MetaModule」または「4ms」で検索できます。または、[4msCompany ブランドフィルター](https://library.vcvrack.com/?query=&brand=4msCompany&tag=&license=)を使用して 4ms のすべてのモジュールを一覧表示できます。
3. MetaModule 以外にも、パッチ作成用に他のサポートされているブランドのモジュールを追加することをお勧めします。現在、MetaModule は 4msCompany、Befaco、HetrickCV、Nonlinear Circuits のモジュールと、Audible Instruments の Macro Oscillator をサポートしています。（TODO: サポートされているモジュールのリストへのリンクを追加）
4. モジュールをアカウントに追加するには、VCV 環境で利用可能にしたい各モジュールの「+ Add」テキストをクリックするだけです。
5. モジュールをアカウントに追加した後、VCV Rack を開きます（現在開いている場合は再起動します）。VCV Rack 自体で VCV アカウントにサインインしていない場合は、上部のファイルバーの「Library」メニューをクリックしてサインインしてください。

![Audible Macro Oscillator](./images/AudibleMacro.png)

#### GitHub Releases 経由

1. [GitHub Releases ページ](https://github.com/4ms/metamodule/releases/)にアクセスします。
2. 最新の VCV（.vcvplugin）リリースを見つけ、お使いのマシンタイプに適したビルドをダウンロードします。
3. .vcvplugin ファイルを VCV Rack ユーザーフォルダに配置します。ユーザーフォルダを見つけるには、VCV Rack を開き、ヘルプメニューから「Open User Folder」を選択します。
4. VCV を開きます（すでに開いている場合は再起動します）。これにより .vcvplugin パッケージの内容が解凍されてインストールされます。モジュールがローカル VCV ライブラリに表示されるはずです。
   ![Releases](./images/GHReleases.png)

### 基本パッチの保存

4ms MetaModule は VCV 内のパッチ作成ハブとして機能します。VCV パッチに追加するには、VCV の空きスペースで右クリックしてモジュールライブラリを表示します。

![VCV Library](./images/Library.png)

ライブラリ上部のメニューバーは、大きなライブラリがある場合にモジュールリストを絞り込むのに役立ちます。例えば、Brand フィルターをクリックして 4msCompany モジュールのみを選択できます。

![4ms Library](./images/4msLibrary.png)

さらに、Windows では Control キーを押しながらクリック、Mac では Command キーを押しながらクリックすることで、モジュールをお気に入りに追加できます。お気に入りに追加されると、モジュールの周りに黄色い枠が表示されます。

![Favorites](./images/FavoritesLibrary.png)

最も基本的なパッチには、少なくとも 2 つのモジュールが必要です：4ms MetaModule と VCV Audio モジュール。Audio モジュールは、パッチ作成中にスピーカーに信号を送信するために使用されます。さらに、オーディオコールバック用のサンプルレートクロックソースを確立するため、VCV のほとんどのモジュールで必要です。2 つのモジュールをラックに追加すると、次のようになります：

![BasicPatch](./images/MetaModule.png)

すぐに戻れるように、このパッチを保存しておく価値があります。VCV の上部にある File->Save に移動し、「MetamoduleTemplate.vcv」などとして保存します。

### 最初のパッチ：MetaModule を Ensemble Oscillator に変える

さあ、音を出しましょう！楽しい最初のパッチとして、MetaModule を優れた 4ms Ensemble Oscillator に変えてみましょう。ライブラリを再度開き、4ms Ensemble Oscillator をパッチに追加します。

![Ensemble Oscillator](./images/Ensemble.png)

オシレーターの出力をハードウェア MetaModule の出力から出したいと思います。これを行うには、オシレーターの出力を MetaModule の出力 1 と 2 に接続します。コンピューターのスピーカーでオシレーターを聴くには、さらにオシレーターを Audio モジュールに接続します。これを行う前に、信号がかなり大きいので、スピーカーまたはヘッドフォンが快適なレベルに設定されていることを確認してください！

![Basic Connections](./images/EnsembleConnected.png)

オシレータードローンができたので、いくつかのコントロールをマッピングしましょう！コントロールをマッピングするには、コントロールにアタッチしたい MetaModule ノブの破線をクリックします。マッピングモードになると、ノブの周りに実線が表示されます。
破線を正確にクリックするのが難しい場合は、MetaModule のノブを Shift + クリックすることもできます。

![Mapping Mode](./images/MappingMode.png)

マッピングモードになったら、コントロールしたいノブをクリックするだけです。どのノブがマッピングされているかを知らせるために、ノブに色分けされた四角形が表示されます。例として、ノブ A を Ensemble Oscillator の Pitch ノブにマッピングします。

![Mapped](./images/Mapped.png)

間違えてノブのマッピングを解除したい場合は、ノブを右クリックして「Unmap」を選択します。

![Unmap](./images/Unmap.png)

デフォルトでは、MetaModule ノブはノブの全範囲を制御します。例えば、MetaModule ノブを 3 時の位置に回すと、対応するノブも 3 時の位置に設定されます。マッピングされたノブの範囲と方向を変更するには、MetaModule のノブを右クリックして Min/Max 範囲を表示します。

![Range](./images/Range.png)

ここで 2 つの重要な（そして楽しい！）注意点があります：

1. Max を Min より小さく設定すると、MetaModule ノブと比較してノブを逆方向に動かすことができます。
2. MetaModule ノブを複数のノブと範囲にマッピングできます。

![Multimap](./images/Multimap.png)

ノブマッピング以外にも、Ensemble Oscillator の CV コントロールを追加したいと思います。これは、ソフトウェア MetaModule の「Audio/CV Ins」セクションからケーブルをドラッグして、CV を送信したい Ensemble Oscillator のジャックに接続することで行えます。好みの接続をいくつか作成した後、MetaModule の Name と Description フィールドに入力します。

![Description](./images/Description.png)

### パッチの保存とエクスポート

これでパッチをハードウェア MetaModule に送信できます。パッチをエクスポートするには、ソフトウェア MetaModule のインターフェース右上にある大きな赤い SAVE ボタンをクリックします。現在のパッチを MetaModule 互換の .yml ファイルとして保存するダイアログが表示されます。覚えやすい場所にファイルを配置してください。

これで USB ドライブまたは microSD 経由でパッチをハードウェア MetaModule にアップロードできます（WiFi は後でエキスパンダーモジュールで対応予定です）。

.yml パッチファイルを microSD カードまたは USB ドライブにコピーします。カードまたはドライブは FAT32 または ExFAT でフォーマットされている必要があります。ドライブには複数のパーティションがあっても構いませんが、最初に見つかった FAT パーティションのみが使用されます。カードまたはドライブを MetaModule に挿入すると、すぐに Patch Selector ページに表示されます（Back ボタンを繰り返し押すと Patch Selector ページに戻れます）。パッチを選択してクリックするだけで開くことができます。Play ボタンをクリックして再生します。パッチを開いたり再生したりしたら、microSD カードまたは USB ドライブを自由に取り外すことができます。パッチファイルはメモリにロードされ、別のパッチを開いたり再生したりするまでそこに残ります。

## MIDI

MIDI イベント（ノートピッチ、ノートベロシティ、CC 値、ピッチベンドなど）をノブやジャックにマッピングできます。これは VCV Core MIDI モジュール（すべての VCV Rack インストールに含まれています）を使用して行います。

MetaModule では以下のモジュールがサポートされています：

- MIDI Map
- MIDI to CV
- MIDI CC to CV
- MIDI Gate to CV
- SPLIT（以下のポリフォニーセクションを参照）

MIDI を使用するには、これらのモジュールのいずれかをパッチに含め、通常通り（モノフォニックに）ケーブルを接続します。VCV Rack パッチを作成する場合と同様に、これらのモジュールの MIDI「learn」機能を使用して CC またはノート番号を設定します。

例えば、VCV Rack で Ensemble Oscillator OUT A を ENVVCA Audio In に接続するパッチを作成します。次に ENVVCA Audio Out を MetaModule の Out 1 ジャックにパッチします。ENVVCA の Cycle ボタンをオンにしたときに適度なテンポで「ノート」を再生するように ENVVCA のスライダーとスイッチを調整します。次に、Cycle をオフにして MIDI-CV モジュールをパッチに追加します。Voct 出力を Ensemble の Pitch 入力にパッチし、Gate 出力を ENVVCA の Trigger（または Follow）入力にパッチします。好きなノブを Ensemble と ENVVCA のコントロールにマッピングします。

MIDI-CV モジュールを右クリックして、ポリフォニーチャンネル設定でモノフォニックを選択します。

![MIDI Basic patch](./images/MIDI-monophonic.png)
![MIDI monophonic setting](./images/MIDI-poly-setting.png)

次に、パッチを MetaModule に転送し、USB-MIDI キーボードを USB-C ジャックに接続します。MIDI キーボードでノートを弾くと、パッチで再生されるはずです。

### MIDI to CV モジュール

このモジュールはさまざまなことを処理し、そのほとんどは VCV Rack と同じように MetaModule で機能します。

ポリフォニーが主な違いです（以下を参照）。ポリフォニック出力は：

- Voct
- Gate
- Vel（ベロシティ）
- Aft（アフタータッチ）
- Ret（リトリガー）

Polyphonic Mode 右クリックメニューオプションは効果がありませんが、Rotate に似たアルゴリズムが使用されます。ただし違いがあり、MetaModule のアルゴリズムは時間とともに改善される可能性があります。

MIDI Divided Clock（CLK/N）は同様に処理され、右クリックメニューオプションで分周数を選択できます。MetaModule は /1 から /96 までの任意の整数分周数をサポートしますが、現在 MIDI to CV モジュールが提供する以外の分周数を選択する GUI インターフェースはありません（Whole、Half、Quarter、8th、16th、32nd、12PPQN、24PPQN 以外を取得するには、パッチ yaml ファイルを手動で編集する必要があります）。

MIDI チャンネルは無視され、すべてのチャンネルのすべてのイベントがモジュールに転送されます。これは将来のバージョンで変更される可能性があります。

現在、スムースネスアルゴリズムは使用されていません。MIDI イベントはキューに入れられ、オーディオフレームあたり最大 1 つの MIDI イベントで仮想モジュールに転送されます（つまりサンプルレート 48kHz）。

SysEx メッセージは無視されます。

### ポリフォニー

現在、MIDI ノートイベントの最大 8 ボイスのポリフォニーがサポートされていますが、ポリフォニックケーブルは MetaModule ではサポートされて**いません**。そのため、ポリフォニック MIDI パッチを作成するには、各ポリフォニックケーブルをモノフォニックケーブルのセットに変換するために SPLIT モジュールを使用する必要があります。これらのモノフォニックケーブルは、複数の VCO/EG/VCA/ボイスモジュールに接続されます。

これを試すには、MIDI to CV モジュールを右クリックして、2 以上のポリフォニック数を選択します。MIDI to CV モジュールの Voct 出力ジャックを SPLIT モジュールにパッチし、個々の SPLIT 出力を複数の VCO V/oct 入力（または MIDI ノートで制御したい任意のモジュール）にパッチします。Gate、Vel、Aft（アフタータッチ）、Ret（リトリガー）出力についても同様に行います。

パッチ全体でポリフォニックケーブル（VCV Rack が描画する太いケーブル）は、MIDI to CV モジュールと SPLIT モジュール間のみであることに注意してください。他のすべてのケーブルはモノフォニックです。これが MetaModule がポリフォニックケーブルを認識する唯一の方法です。MIDI to CV モジュールのポリフォニック出力を VCO の V/oct 入力に直接パッチすると（たとえその VCO がポリフォニックであっても）、MetaModule はそれをモノフォニック信号として解釈します。将来のバージョンの MetaModule ファームウェアではポリフォニックケーブルをサポートする可能性がありますが、現在はモノフォニックケーブルのみがサポートされています（MIDI to CV モジュールから SPLIT モジュールに直接パッチされたポリフォニックケーブルの単一の例外を除く）。

以下は Duophonic MIDI を示すパッチ例です：

![MIDI Duophonic patch](./images/MIDI-duophonic.png)

### 注意事項と制限

ポリフォニックケーブルがサポートされていないこと以外にも、いくつかの制限があります：

- パッチには複数の MIDI モジュールを含めることができますが、各タイプは 1 つまでです。
  つまり、パッチには 1 つの MIDI to CV モジュールと 1 つの MIDI Map モジュールを含めることができますが、
  2 つの MIDI to CV モジュールを含めることはできません。特定のタイプの MIDI モジュールの
  インスタンスが複数ある場合、モジュールの 1 つはおそらく無視されますが、
  この動作に依存しないでください。

- ポリフォニー数は MIDI to CV モジュールの右クリックメニューオプションで設定されます。
  接続された SPLIT モジュールにパッチされたケーブルの数はポリフォニック数を
  設定し**ません**。これは VCV Rack の動作でもありますが、VCV Rack で MIDI を
  使用した経験がない場合は明らかではないかもしれません。この事実を利用して、
  N 番目ごとのノートのみがエンベロープを発火させるなどの非標準的な動作を作成できます。

- MIDI 出力はサポートされていません。CV to MIDI、Gate to MIDI、CV to MIDI CC
  モジュールは無視されます。

- 現在、すべての MIDI モジュールの右クリックメニューの設定は無視されます。
  ただし、MIDI to CV モジュールのポリフォニックチャンネルとクロック分周器設定は例外です。
  MetaModule MIDI に機能が追加されるにつれて、これは変更される可能性があります。
  同様に、MIDI モジュールのフロントパネルから行われた MIDI ドライバー、MIDI デバイス、
  MIDI チャンネルの選択も無視されます。

- MetaModule は USB デバイスに最大 500mA を供給できるため、デバイスが
  それ以上を必要とする場合は、別途電源を供給する必要があります。

- USB ポートを USB サムドライブと MIDI コントローラーで共有することは
  可能ですが、理想的ではありません。サムドライブを接続して新しいパッチをロードするには、
  MIDI デバイスを取り外す必要があります。その後、サムドライブを取り外して
  MIDI デバイスを再接続できます。これを頻繁に行う場合、セルフパワーの
  MIDI キーボードを使用すると大いに役立ちます。MIDI ハブのサポートは TODO 項目に
  ありますが、現時点ではハブを使用することはできません。
