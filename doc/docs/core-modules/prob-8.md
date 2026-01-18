---
title: Prob 8
sidebar_label: Prob 8
displayed_sidebar: coreModulesSidebar
---

# Prob 8

![Prob 8](./images/Prob_8.png)

Prob 8は、ステップごとの確率を持つ8ステップゲートシーケンサーです。

## コントロール

- **ノブ1〜8：** 確率（ステップが発生する可能性）、0〜100%

## ジャック

- **Clock Gate In：** モジュールのメインクロック入力。ゲートまたはトリガーを受け入れます。
- **Reset Gate In：** リセット入力、Highの時にシーケンスをステップ0に設定
- **Inv Out：** ゲートシーケンス出力の反転バージョン
- **Out：** モジュールのゲートシーケンス出力。ゲートは0〜8vで、固定50%パルス幅。
