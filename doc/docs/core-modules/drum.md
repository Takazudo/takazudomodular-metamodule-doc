---
title: Drum
sidebar_label: Drum
displayed_sidebar: coreModulesSidebar
---

# Drum

![Drum](./images/Drum.png)

Drumは、シンプルな2オペレーターFMオシレーターコアとノイズソースに基づいたドラムモジュールです。

## コントロール

- **Pitch：** キャリアとモジュレーターのベースピッチ、10hz〜1000hz
- **Pitch Env：** キャリアのピッチを制御するディケイエンベロープ
- **Pitch Amt：** ディケイエンベロープがキャリアのピッチを変調する量
- **Ratio：** キャリアオシレーターの周波数に対する変調オシレーターの周波数
- **FM Env：** 周波数変調量を制御するエンベロープの持続時間
- **FM Amt：** サウンドに存在するFMの全体量（FMエンベロープの振幅）
- **Tone Env：** ドラムのFM部分のディケイタイム
- **Noise Env：** ドラムのノイズ部分のディケイタイム
- **Noise Blend：** FMとノイズ部分の間をフェードするクロスフェーダー

## ジャック

- **Trigger In：** すべてのディケイエンベロープ用トリガー入力
- **V/Oct CV In：** キャリアとモジュレーター用1v/octピッチ入力
- **P Env CV In：** ピッチエンベロープ用CV入力、-5v/+5v
- **P Amt CV In：** ピッチエンベロープデプス用CV入力、-5v/+5v
- **Ratio CV In：** モジュレーターのピッチ比用CV入力、-5v/+5v
- **FM Env CV In：** FMディケイエンベロープ用CV入力、-5v/+5v
- **FM Amt CV In：** FM量用CV入力、-5v/+5v
- **T Env CV In：** トーンエンベロープ用CV入力、-5v/+5v
- **N Env CV In：** ノイズエンベロープ用CV入力、-5v/+5v
- **N Blend CV In：** ノイズブレンド用CV入力、-5v/+5v
- **Inv Out：** トーンエンベロープの反転バージョン用CV出力
- **Out：** ドラムオーディオ出力
