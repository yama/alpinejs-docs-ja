---
order: 3
title: Resize
description: 要素のサイズ変更に簡単に反応できるResize Observer APIのAlpine用便利なラッパー
graph_image: https://alpinejs.dev/social_resize.jpg
---

# Resizeプラグイン

AlpineのResizeプラグインは、[Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)の便利なラッパーで、要素のサイズが変わったときに簡単に反応できます。

これは、サイズに基づくカスタムアニメーション、賢いsticky配置、要素のサイズに基づく条件付き属性追加などに便利です。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/resize@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うResizeをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/resize
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import resize from '@alpinejs/resize'

Alpine.plugin(resize)

...
```

<a name="x-resize"></a>
## x-resize

このプラグインの主要なAPIは`x-resize`です。Alpineコンポーネント内の任意の要素に`x-resize`を追加できます。その要素のサイズが何らかの理由で変更されると、指定した式が`$width`と`$height`という2つのmagic propertyとともに実行されます。

たとえば、要素のサイズが変わるたびに幅と高さを表示する簡単な例は次のとおりです。

```html
<div
    x-data="{ width: 0, height: 0 }"
    x-resize="width = $width; height = $height"
>
    <p x-text="'Width: ' + width + 'px'"></p>
    <p x-text="'Height: ' + height + 'px'"></p>
</div>
```

<a name="modifiers"></a>
## modifier

<a name="document"></a>
### .document

特定の要素ではなく、ドキュメント全体のサイズを監視すると便利なことがあります。その場合は、`x-resize`に`.document` modifierを追加します。

```html
<div x-resize.document="...">
```
