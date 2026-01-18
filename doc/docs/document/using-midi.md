---
title: MIDIの使い方
sidebar_position: 4
originalTitle: Using MIDI
originalUrl: https://metamodule.info/docs/using_metamodule_midi.html
---

# MIDIの使い方

## 概要

このドキュメントでは、パラメータマッピング、入出力ジャッキング、フィードバック機能を含むMetaModuleのMIDI機能について説明します。

## パラメータへのMIDIマップ

MIDI CCまたはNote Gateのオン/オフイベントを、ノブ、スイッチ、ボタンなどのパラメータにマッピングできます。

**クイックMIDIマップショートカット：**

- モジュールアクションメニューからMIDI Assignモードを有効化

![MIDI Assign有効化](./images/enable-midi-assign.png)

- 目的のパラメータにスクロール

![Djembe Sharpノブ](./images/djembe-sharp-knob.png)

- 「ロータリーを押し続けながらMIDI CCまたはNoteを送信」
- マッピングが即座に適用されます

![MIDI CC17にマッピング済み](./images/djembe-sharp-knob-mapped-cc17.png)

ロータリーを押しながらBackボタンをタップすると削除されます。

**マッピングの動作：**

パラメータ値はMIDI受信時に即座に更新され、Knob Catchupモードとは独立しています。

![モジュールビュー MIDIマッピングペイン](./images/module-view-mapping-pane-midi.png)

![モジュールビュー MIDIマップ](./images/module-view-midi-map.png)

各マッピングはすべてのチャンネルまたは特定のチャンネルに応答できます。

![MIDIマップチャンネル](./images/midi-map-channel.png)

MIN/MAXスライダーで範囲を定義します。CC値0はMINに、127はMAXにマッピングされます。

**MIDI Note Gateトグルモード：**

- _トグル有効：_ 各Note OnでMIN/MAX値を切り替え

![MIDIマップ トグルオン](./images/midi-map-toggle-on.png)

- _トグル無効：_ Note OnでMAXを設定、Note OffでMINを設定

![MIDIマップ トグルオフ](./images/midi-map-toggle-off.png)

## MIDI入力ジャック

2つのパッチ方法があります：直接MIDIマッピングまたはMIDI-CVモジュール。

**直接マッピングオプション：**

![新規MIDIマップ](./images/enosc-midi-map.png)

![MIDIマップ信号選択](./images/midi-map-top.png)

- Noteイベント（Pitch、Gate、Velocity、Aftertouch、Retrigger）
- コンティニュアスコントロール（CC、0V-10Vスケーリング）
- ピッチホイール

![ピッチホイールマッピング](./images/midi-map-pw.png)

- 特定のNoteでのGate
- クロック（生の24PPQNまたは分周）
- トランスポート（Start、Stop、Continue）

**代替方法：**

従来のパッチングにはRackCore MIDIToCVInterfaceモジュールを使用します。

![RackCore MIDI-CVモジュール](./images/rackcore-midi-cv-module.png)

![RackCore MIDI-CVジャック](./images/rackcore-midi-cv-jack.png)

## 出力をMIDIにパッチ

「MetaModuleにはRackCoreブランドのCV-MIDIモジュールがあります」MIDI出力用です。

![RackCore CV-MIDIモジュール](./images/rackcore-cv-midi-module.png)

![RackCore CV-MIDIジャック](./images/rackcore-cv-midi-jacks.png)

注意：MetaModuleはMIDIホストとしてのみ機能し、デバイスとしては機能しません。

## すべてのMIDIマッピングを表示

ノブセットページ（ノブアイコン）→ MIDIボタンからアクセスすると、ジャックマッピングとパラメータマッピングの両方が表示されます。

![MIDIボタン](./images/midi-button.png)

![MIDIマップリスト](./images/midi-maps-list.png)

## MIDIフィードバック

コントローラーとMetaModule間の双方向同期を有効にします。有効にすると、パラメータが変更されたときにCC、ピッチホイール、Noteメッセージがコントローラーに送り返されます。「パッチの再生を一時停止して再開するだけで」すべての値を再送信できます。

![MIDIフィードバック設定](./images/midi-feedback.png)

**デフォルト状態：** ファームウェアv2.0.9以降で有効。Settings > Prefs > MIDIで設定します。
