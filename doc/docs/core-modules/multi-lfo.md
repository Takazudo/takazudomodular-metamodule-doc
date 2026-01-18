---
title: Multi LFO
sidebar_label: Multi LFO
displayed_sidebar: coreModulesSidebar
---

# Multi LFO

![Multi LFO](./images/Multi_LFO.png)

Multi LFOは、4つの波形出力、可変パルス幅、可変位相を持つLFOです。

## コントロール

- **Rate：** LFOの速度（レンジスイッチに依存）。Slow: 0.0003Hz〜0.67Hz。Fast: 0.01Hz〜20Hz
- **Phase：** LFOの位相オフセット
- **PW：** パルス出力のパルス幅（オン時間対オフ時間）
- **Reset Gate In：** LFOをPhaseパラメーターで設定された位相にリセットするゲート入力

## ジャック

- **PW CV In：** PW用CV入力、-5v/+5v
- **Rate CV In：** レート用CV入力、-5v/+5v
- **Phase CV In：** 位相用CV入力、-5/+5v
- **Inv Saw Out：** 反転ノコギリ波出力
- **Pulse Out：** パルス波形出力
- **Saw Out：** ノコギリ波形出力
- **Sine Out：** サイン波形出力
