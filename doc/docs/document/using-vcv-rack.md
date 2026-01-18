---
title: VCV Rackの使い方
sidebar_position: 6
originalTitle: MetaModule with VCV Rack
originalUrl: https://metamodule.info/docs/using_rack.html
---

# VCV Rackの使い方

## 概要

VCV Rackは「バーチャルEurorackスタジオ」として説明されており、Mac、Windows、またはLinuxで動作し、何千もの無料モジュールが利用可能です。マニュアルには「VCV RackはVCVが所有・管理しており、4ms Companyとは提携していません」と記載されています。

コンピュータのVCV Rackでパッチを作成し、MetaModuleハードウェアに転送できます。

## インストールプロセス

### 4msモジュールのインストール手順：

1. **VCV Rack Libraryで購読** - 4ms Companyページにアクセスし、「Subscribe」をクリックしてすべてのモジュールを追加し、更新通知を受け取る

![VCV Library ウェブページ](./images/vcv-library-webpage.png)

![VCV Library 購読](./images/vcv-library-subscribe.png)

2. **ログインと更新** - VCV RackのLibraryメニューでアカウントにログインしていることを確認
3. **VCV Rackを再起動** - アプリケーションを終了して再起動
4. **モジュールにアクセス** - ラックの空きスペースを右クリックして4msモジュールを表示

![VCV Rack モジュール](./images/vcv-rack-modules.png)

ベータテストや特別バージョン用に手動インストールも可能です。

## パッチ作成ワークフロー

### 主要ステップ：

1. **パッチを構築** - モジュールを追加し、パッチングして設定を構成

![VCV パッチ開始](./images/vcv-patch-start.png)

2. **MetaModule Hubを追加** - MetaModule Hubを検索してラックに追加

![VCV MetaModule Hub](./images/vcv-metamodule-hub.png)

3. **ノブマッピングを作成** - MetaModuleノブ周りの色付きリングをクリックし、対象の仮想ノブ/コントロールをクリック

![VCV マッピング作成](./images/vcv-make-mapping.png)

![VCV マッピング範囲](./images/vcv-mapping-range.png)

4. **ジャックマッピングを作成** - モジュール出力とMetaModuleジャック間でケーブルをドラッグ

![VCV 出力ジャックマッピング](./images/vcv-map-outjack.png)

5. **.ymlファイルとして保存** - パッチはMetaModuleが読み取れる独自の形式で保存

![VCV パッチ命名](./images/vcv-naming-patch.png)

6. **MetaModuleにロード** - ストレージデバイスを挿入し、Patch Selectorからロード

![VCV パッチ完成](./images/vcv-patch-done.png)

**注意：** 「VCV Rackパッチファイルは `.vcv` で終わり、MetaModuleでは読み取れません。」

## ノブセット

パッチごとに最大8つのノブセットを作成でき、12個のオンボードノブを使用してパッチ全体を制御できます。セットはMetaModule Hub上の黄色い円で選択でき、ハードウェア上に表示されるカスタム名を付けることができます。

![VCV ノブセット2](./images/vcv-knobset-2.png)

## ボタンマッピング

ボタンやスイッチもノブと同様にマッピングできます。

![VCV ボタンマッピング済み](./images/vcv-button-mapped.png)

![VCV ボタンドロップダウン](./images/vcv-button-dropdown.png)

## MIDIマッピング

### サポートされているMIDI信号：

- ポリフォニックノート、ゲート、ベロシティ、アフタータッチ（最大16チャンネル）
- ピッチホイール、モッドホイール、クロック、分周クロック、リトリガー、スタート、ストップ、コンティニュー

### 重要な要件：

VCV内蔵のMIDI-CV、SPLIT、MIDI-Gate、MIDI-CC-CV、MIDI-CCモジュールを使用してマッピングを作成します。「これらのモジュールはMetaModuleにパッチをロードしても表示されません。MetaModuleにMIDIをどのようにマッピングしたいかを伝えるためだけに使用されます。」

![VCV MIDI-CVモジュール](./images/vcv-midicv-module.png)

![VCV MIDI ポリ数](./images/vcv-midi-polynum.png)

![VCV MIDI Split 4](./images/vcv-midi-split-4.png)

![VCV MIDI マッピング済み 4](./images/vcv-midi-mapped-4.png)

![VCV MIDI 4 完了](./images/vcv-midi-4-done.png)

**MIDIノブマッピング：**

![VCV MIDI ノブマッピング](./images/vcv-midi-knob-map.png)

**MIDIゲートマッピング：**

![VCV MIDI ゲートマッピング](./images/vcv-midi-gate-map.png)

**その他のMIDIマッピング：**

![VCV MIDI その他のマッピング](./images/vcv-midi-other-map.png)

## マッピングの削除

マッピングを削除するには、マッピングを右クリックしてUnmapを選択します。

![VCV マッピング解除](./images/vcv-unmap.png)

## パッチのロード

MetaModuleにパッチをロードするには：

![VCV Bouncing Scalesをロード](./images/vcv-load-bouncingscales.png)

![VCV Bouncing Scalesを再生](./images/vcv-play-bouncingscales.png)

## 追加リソース

- [プラグイン互換性リスト](./plugins.md)
- [ダウンロード可能なサンプルパッチ](https://metamodule.info/dl/patches/)
- コミュニティスクリプト：4ms-MetaModule-Scripts（Python）互換モジュールを自動的に「Favorite」にタグ付け
