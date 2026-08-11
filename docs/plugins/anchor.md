---
order: 7
title: Anchor
description: ページ上の別の要素に要素の位置を固定する
graph_image: https://alpinejs.dev/social_anchor.jpg
---

# Anchorプラグイン

AlpineのAnchorプラグインを使うと、ページ上の別の要素に対する要素の位置を簡単に固定できます。

この機能は、Alpineでドロップダウンメニュー、ポップオーバー、ダイアログ、ツールチップを作成するときに便利です。

このプラグインで使われている「アンカー」機能は、[Floating UI](https://floating-ui.com/)プロジェクトによって提供されています。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/anchor@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うAnchorをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/anchor
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import anchor from '@alpinejs/anchor'

Alpine.plugin(anchor)

...
```

<a name="x-anchor"></a>
## x-anchor

このプラグインを使うための主要なAPIは`x-anchor`ディレクティブです。

このプラグインを使うには、任意の要素に`x-anchor`ディレクティブを追加し、位置を固定したい要素への参照を渡します（ページ上のボタンであることがよくあります）。

デフォルトでは、`x-anchor`は要素のCSSに`position: absolute`と適切な`top`および`left`の値を設定します。アンカーされた要素が通常は参照先の要素の下に表示されるものの、ページ上に十分なスペースがない場合は、上に表示されるようスタイルが調整されます。

たとえば、切り替え用ボタンに固定された単純なドロップダウンは次のようになります。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor="$refs.button">
        Dropdown content
    </div>
</div>
```

<a name="positioning"></a>
## 位置指定

`x-anchor`では、次のmodifierを使ってアンカーされた要素の位置をカスタマイズできます。

* Bottom: `.bottom`、`.bottom-start`、`.bottom-end`
* Top: `.top`、`.top-start`、`.top-end`
* Left: `.left`、`.left-start`、`.left-end`
* Right: `.right`、`.right-start`、`.right-end`

`.bottom-start`を使って、参照先の要素の下かつ右側にドロップダウンを配置する例は次のとおりです。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor.bottom-start="$refs.button">
        Dropdown content
    </div>
</div>
```

<a name="fixed-positioning"></a>
### 固定位置

デフォルトでは、`x-anchor`はアンカーされた要素に`position: absolute`を適用します。ほとんどの場合はこれで問題ありませんが、参照先の要素が`overflow: hidden`、`overflow: clip`、`overflow: auto`のコンテナ内にある場合は機能しません。アンカーされた要素も一緒に切り取られるためです。

`.fixed` modifierを追加すると、代わりにFloating UIへ固定位置指定戦略を使うよう指示できます。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor.fixed="$refs.button">
        Dropdown content
    </div>
</div>
```

> **注意:** 祖先要素に`transform`、`filter`、`perspective`、`backdrop-filter`、`will-change`、`contain`のいずれかがあると、`position: fixed`の子孫要素に新しい包含ブロックが作成されます（[CSS仕様](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed_positioning)による）。その場合、`.fixed`はその祖先要素を基準にした`position: absolute`のように動作し、祖先要素の`overflow: hidden`から抜け出せません。`.fixed`が何もしていないように見える場合は、transformされた祖先要素を確認してください。

<a name="offset"></a>
## オフセット

`.offset.[px value]` modifierを使うと、アンカーされた要素にオフセットを追加できます。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor.offset.10="$refs.button">
        Dropdown content
    </div>
</div>
```

<a name="prevent-flipping"></a>
## 位置の反転を防ぐ

デフォルトでは、参照先の要素の下に表示する十分なスペースがない場合、`x-anchor`はアンカーされた要素の位置を反転します。

`.noflip` modifierを追加すると、この動作を防げます。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor.noflip="$refs.button">
        Dropdown content
    </div>
</div>
```

<a name="manual-styling"></a>
## 手動でスタイルを設定する

デフォルトでは、`x-anchor`は内部で要素に位置指定用のスタイルを適用します。スタイルを完全に制御したい場合は、`.no-style` modifierを渡し、`$anchor` magicを使って別のAlpine式から値へアクセスできます。

`x-anchor`の内部スタイルを無効にし、代わりに`x-bind:style`を使って自分でスタイルを適用する例は次のとおりです。

```html
<div x-data="{ open: false }">
    <button x-ref="button" @click="open = ! open">Toggle</button>

    <div
        x-show="open"
        x-anchor.no-style="$refs.button"
        x-bind:style="{ position: 'absolute', top: $anchor.y+'px', left: $anchor.x+'px' }"
    >
        Dropdown content
    </div>
</div>
```

> **`.no-style`と`.fixed`の組み合わせ:** Alpineの内部スタイルを無効にし、固定位置指定も使いたい場合は、`position: 'fixed'`を自分で設定する必要があります。`$anchor.x`と`$anchor.y`は、現在有効な戦略の座標空間で返されます。absoluteの座標はオフセット親要素を基準にし、fixedの座標はビューポートを基準にするため、誤った`position`を適用すると要素が正しく配置されません。
>
> ```html
> <div
>     x-show="open"
>     x-anchor.no-style.fixed="$refs.button"
>     x-bind:style="{ position: 'fixed', top: $anchor.y+'px', left: $anchor.x+'px' }"
> >
>     Dropdown content
> </div>
> ```

<a name="from-id"></a>
## IDにアンカーする

ここまでの例では、Alpineのrefを使って他の要素にアンカーしてきました。

`x-anchor`は任意のDOM要素への参照を受け取れるため、`document.getElementById()`のようなユーティリティを使い、`id`属性で要素にアンカーできます。

```html
<div x-data="{ open: false }">
    <button id="trigger" @click="open = ! open">Toggle</button>

    <div x-show="open" x-anchor="document.getElementById('trigger')">
        Dropdown content
    </div>
</div>
```
