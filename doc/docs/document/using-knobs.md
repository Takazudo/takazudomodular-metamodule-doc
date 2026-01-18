---
title: ノブの使い方
sidebar_position: 2
originalTitle: Using Knobs
originalUrl: https://metamodule.info/docs/using_metamodule.html
---

# ノブの使い方

## ノブとジャックのマッピングを表示する方法

ボタンバーのノブアイコンをクリックすると、ノブマッピングが表示されます。

![ノブセットアイコン](./images/patch-view-knobset-icon.png)

パッチの再生中に物理ノブを回すと、画面上でリアルタイムのビジュアルフィードバックが表示されます。

![ノブセット表示](./images/knobset-karplus.png)

Jacksボタンをクリックすると、ジャックマッピング情報が表示されます。

![ジャックアイコン](./images/knobset-karplus-jackicon.png)

![ジャックマップ](./images/jackmap-karplus.png)

## ノブセット

「ノブセットは、ノブマッピングのグループです。各ノブセットは、12個の物理ノブを仮想モジュールコントロールにマッピングします。」システムはパッチごとに最大8つのノブセットをサポートしますが、一度にアクティブになるのは1つだけです。個々の物理ノブは、最大8つの仮想パラメータを同時に制御できます。

**ナビゲーション機能：**

- `>>` ボタンを使用してノブセット間を移動
- `Use` をクリックしてノブセットをアクティブ化

![ノブセット Use](./images/knobset-use.png)

- Backボタンを押しながらエンコーダーを回すと素早く切り替え可能
- Backボタンの色は現在のノブセット番号（1-8）を示します

## ノブセットの作成と管理

新しいノブセットは以下の方法で作成できます：

- VCV Rackパッチ作成時
- マッピング設定時の「(new knobset)」オプション
- モジュールアクションメニューのAuto-map機能

ノブセット名は、名前フィールドをクリックしてテキストを入力することで編集できます。

![ノブセット名](./images/knobset-name.png)

![ノブセット名編集](./images/edit-knobset-name.png)

## ノブ/MIDIマッピングの作成

**基本プロセス：**

1. モジュールを開いてコントロールをクリック

![Plaits Freqノブ](./images/plaits-freq-knob.png)

2. ノブセットを選択するか、「(new knobset)」を選択

![マッピングペイン](./images/plaits-mapping-pane.png)

3. 物理ノブを動かしてマッピングを確立

![マッピング追加](./images/plaits-mapping-add.png)

4. OKをクリックして確認

![マッピング完了](./images/plaits-mapping-done.png)

**クイックマップショートカット：** ロータリーエンコーダーを押し続けながらノブを動かすと、アクティブなノブセットに即座にマッピングされます。

![Djembe Pitchノブ](./images/djembe-pitch-knob.png)

![Djembe Pitchノブ マッピング済み](./images/djembe-pitch-knob-mapped.png)

**削除ショートカット：** ロータリーを押しながらBackボタンをタップするとマッピングが削除されます。

## マッピングの編集

ノブビューページから、以下の操作が可能です：

![ノブビュー](./images/knobview.png)

- MINとMAXの範囲値を調整

![ノブビュー MIN](./images/knobview-min.png)

- コントロール方向を反転（MAXをMINより小さく設定）
- マッピング用のカスタムエイリアスを作成

![ノブビュー 名前](./images/knobview-name.png)

## マルチマップ

マルチマップを使用すると、1つの物理ノブで複数の仮想パラメータを同時に制御できます。既にマッピングされている物理ノブを新しいパラメータにマッピングすると、自動的に作成されます。

![マルチマップ](./images/knobset-multimap.png)

**マルチマップの表示：**

ノブセットページでは、複数のマッピングを持つノブの下にスクロールバーが表示され、接続されているすべてのパラメータを水平スクロールで表示できます。

**容量：** 8ノブセット × 12ノブ × 1ノブあたり8マッピング = パッチあたり768の仮想ノブ接続が可能です。
