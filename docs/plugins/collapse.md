---
order: 6
title: Collapse
description: 堅牢なアニメーションで要素を折りたたんだり展開したりする
graph_image: https://alpinejs.dev/social_collapse.jpg
---

# Collapseプラグイン

AlpineのCollapseプラグインを使うと、滑らかなアニメーションで要素を展開・折りたたみできます。

この動作と実装はAlpine標準のtransitionシステムとは異なるため、この機能は専用プラグインになっています。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うCollapseをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/collapse
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'

Alpine.plugin(collapse)

...
```

<a name="x-collapse"></a>
## x-collapse

このプラグインの主要なAPIは`x-collapse`ディレクティブです。

`x-collapse`は、すでに`x-show`ディレクティブが付いている要素にしか存在できません。`x-show`の要素に追加すると、`x-collapse`は高さプロパティをアニメーションさせ、表示状態の切り替えに合わせて要素を滑らかに「折りたたみ」または「展開」します。

たとえば次のようにします。

```html
<div x-data="{ expanded: false }">
    <button @click="expanded = ! expanded">Toggle Content</button>

    <p x-show="expanded" x-collapse>
        ...
    </p>
</div>
```

<a name="modifiers"></a>
## modifier

<a name="dot-duration"></a>
### .duration

`.duration` modifierを追加すると、collapse / expand transitionの長さをカスタマイズできます。

```html
<div x-data="{ expanded: false }">
    <button @click="expanded = ! expanded">Toggle Content</button>

    <p x-show="expanded" x-collapse.duration.1000ms>
        ...
    </p>
</div>
```

<a name="dot-min"></a>
### .min

デフォルトでは、`x-collapse`の「折りたたみ」状態は要素の高さを`0px`にし、`display: none;`も設定します。

要素を完全に非表示にするのではなく、切り取るだけにすると便利な場合があります。`.min` modifierを使うと、`x-collapse`の「折りたたみ」状態に最小の高さを設定できます。たとえば次のようにします。

```html
<div x-data="{ expanded: false }">
    <button @click="expanded = ! expanded">Toggle Content</button>

    <p x-show="expanded" x-collapse.min.50px>
        ...
    </p>
</div>
```
