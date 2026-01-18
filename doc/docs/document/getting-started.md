---
title: はじめに
sidebar_position: 1
originalTitle: Getting Started
originalUrl: https://metamodule.info/docs/getting_started.html
---

# はじめに

## パネルを知る

MetaModuleの物理的なレイアウトとコントロールについては、フェースプレート概要図を参照してください。

![フェースプレート概要](./images/faceplate-overview.svg)

| 英語                            | 日本語                                   |
| ------------------------------- | ---------------------------------------- |
| Knobs A B C D E F u v w x y z   | ノブ A B C D E F u v w x y z             |
| Map to virtual module controls. | 仮想モジュールのコントロールにマッピング |
| Gate Ins                        | ゲート入力                               |
| Audio/CV Ins 1–6                | オーディオ/CV入力 1–6                    |
| Audio/CV Outs 1–8               | オーディオ/CV出力 1–8                    |
| Back Button                     | バックボタン                             |
| Color shows Knob Set            | 色でノブセットを表示                     |
| microSD Card                    | microSDカード                            |
| Load patches and plugins        | パッチとプラグインを読み込み             |
| USB-C                           | USB-C                                    |
| Rotary                          | ロータリーエンコーダー                   |

## 電源ケーブルの接続

**電源ケーブルをMetaModuleに接続します。赤いストライプを下にしてください。** もう一方の端をEurorack電源に接続します。

![電源ヘッダー接続](./images/power-header.jpg)

## パッチの再生方法

3つのステップで行います：

1. メインメニューで `Load Patch` をクリック

![メインメニュー - Load Patch](./images/main-menu-load.png)

2. パッチセレクターからパッチを選択

![パッチセレクター](./images/patch-sel.png)

3. 再生アイコンをクリックして開始

![パッチビュー](./images/patch-view-karplus.png)

## 新しいパッチの作成方法

ステップバイステップガイド：

1. メインメニューから新しいパッチを作成

![メインメニュー - New Patch](./images/main-menu-new.png)

2. モジュールを追加（例：Ensemble Oscillator）

![モジュールリスト - EnOsc](./images/module-list-enosc.png)

3. モジュールをクリックして操作

![パッチビュー - EnOsc](./images/patchview-enosc.png)

4. アクションメニューからAuto-Mapを選択

![アクションアイコン](./images/enosc-action-icon.png)

![Auto-Mapメニュー](./images/auto-map-menu.png)

Auto-Mapは**物理的なノブとジャックをEnOscの仮想ノブ、スイッチ、ジャックにマッピング**します。

![EnOsc マッピング済み](./images/enosc-mapped.png)

5. `+` ボタンで追加のモジュールを追加

## ファームウェアのアップデート方法

1. メインメニューのSettingsにアクセス

![メインメニュー - Settings](./images/main-menu-settings.png)

2. Updateをクリック

![Settings - Update](./images/settings-update.png)

3. ファームウェアをUSBまたはSDカードにダウンロード

![macOS ファームウェアディスク](./images/macos-firmware-disk.png)

4. ドライブを挿入してUpdate Firmwareボタンをクリック

![ファームウェアアップデートボタン](./images/firmware-update-button.png)

**重要：ファームウェアとプラグインを同時にアップグレードする場合は、必ずファームウェアを先にアップグレードしてください。** 新しいプラグインは更新されたファームウェアを必要とする場合があります。
