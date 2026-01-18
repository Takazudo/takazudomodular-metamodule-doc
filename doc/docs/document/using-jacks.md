---
title: ジャックとケーブルの使い方
sidebar_position: 3
originalTitle: Using Jacks and Cables
originalUrl: https://metamodule.info/docs/using_metamodule_jacks.html
---

# ジャックとケーブルの使い方

## 概要

このドキュメントでは、MetaModuleでのケーブルパッチングについて説明します。MetaModuleは2種類のケーブルタイプで動作します：仮想モジュール間の内部ケーブルとパネルジャックマッピングです。「現在のMetaModuleバージョンでは、モノフォニックケーブルのみがサポートされています。」

## ケーブルのパッチ方法

### モジュール間のパッチ

プロセスは3つのステップで構成されます：

1. **ケーブルを開始** - ジャックをクリックして「New Cable」を選択（入力または出力から可能）

![ケーブル開始](./images/new-cable-start.png)

2. **ナビゲートして接続** - 対象モジュールを見つけ、目的のジャックを選択

![ケーブル接続先](./images/new-cable-dest.png)

3. **完了** - 接続が確立されます

![ケーブル完了](./images/new-cable-done.png)

注意：物理パネル入力は仮想モジュールへの出力として機能するため、複数の出力を単一の入力ジャックに接続することはできません。

### パネルジャックへのパッチ

仮想モジュールジャックを物理パネルジャックに接続するには：

- ジャックをクリックして「New Panel Cable」を選択

![パネルケーブル](./images/new-panel-cable.png)

- ドロップダウンメニューから利用可能なパネルジャックを選択

![パネルケーブルポップアップ](./images/new-panel-cable-popup.png)

- 接続（パネル出力は既存のケーブルを切断、入力はスタック可能）

### クイックアサイン方法

ジャックを表示しながらロータリーエンコーダーを押して回すと、利用可能なパネルジャック割り当てを素早く切り替えられます。

![DLDジャック](./images/dld-jack.png)

![DLDジャック割り当て済み](./images/dld-jack-assigned.png)

押しながらBackをタップすると割り当てが削除されます。

### カスタムジャック名

ジャックをクリックし、「Connected To:」ボックスのパネルジャックマッピングを選択することでエイリアスを作成できます。

![ジャックエイリアス編集](./images/jack-alias-edit.png)

エイリアスはパッチと共に保存され、Jacksページに表示されます。

![ジャックボタン](./images/jacks-button.png)

![ジャックエイリアスリスト](./images/jack-alias-list.png)

### すべてのマッピングを表示

ノブセットページからJacksボタンをクリックすると、完全なジャック割り当てにアクセスできます。

### ケーブルの切断

ジャックをクリックして「Disconnect」を選択すると、すべてのケーブルが削除されます。

![ケーブル切断](./images/disconnect-cable.png)

スタック接続の場合、出力はすべてのケーブルを削除しますが、入力はそのジャックへのスタックケーブルのみを削除します。

### ケーブルパスをたどる

ジャックの「Connected To:」エントリをクリックすると、接続されたモジュールのジャックに移動でき、パッチ全体のトレースが可能になります。

![接続ジャック](./images/connecting-jack.png)

![接続ジャック終端](./images/connecting-jack-end.png)
