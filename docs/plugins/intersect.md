---
order: 2
title: Intersect
description: 要素がビューポートに入ったときに簡単に反応できるIntersection ObserverのAlpine用便利なラッパー
graph_image: https://alpinejs.dev/social_intersect.jpg
---

# Intersectプラグイン

AlpineのIntersectプラグインは、[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)の便利なラッパーで、要素がビューポートに入ったときに簡単に反応できます。

これは、画像やその他のコンテンツの遅延読み込み、アニメーションのトリガー、無限スクロール、コンテンツの「閲覧」ログ記録などに便利です。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うIntersectをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/intersect
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

Alpine.plugin(intersect)

...
```

<a name="x-intersect"></a>
## x-intersect

このプラグインの主要なAPIは`x-intersect`です。Alpineコンポーネント内の任意の要素に`x-intersect`を追加できます。そのコンポーネントがビューポートに入る（スクロールして表示される）と、指定した式が実行されます。

たとえば次のコードでは、要素がビューポートにスクロールされるまで`shown`は`false`のままです。その時点で式が実行され、`shown`が`true`になります。

```html
<div x-data="{ shown: false }" x-intersect="shown = true">
    <div x-show="shown" x-transition>
        I'm in the viewport!
    </div>
</div>
```

<a name="x-intersect-enter"></a>
### x-intersect:enter

`:enter` suffixは`x-intersect`のaliasで、同じように動作します。

```html
<div x-intersect:enter="shown = true">...</div>
```

`:leave` suffixも使う場合、明確さのためにこれを使うことができます。

<a name="x-intersect-leave"></a>
### x-intersect:leave

`:leave`を追加すると、要素がビューポートから出たときに式が実行されます。

```html
<div x-intersect:leave="shown = true">...</div>
```

> デフォルトでは、これは*要素全体*がビューポートにないことを意味します。要素の*一部*だけがビューポートにないときに式を実行するには、`x-intersect:leave.full`を使います。

[→ 基盤となる`IntersectionObserver` APIについて詳しく読む](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

<a name="modifiers"></a>
## modifier

<a name="once"></a>
### .once

要素がビューポートに初めて入ったときだけ式を評価し、その後は評価しないと便利な場合があります。たとえば「enter」アニメーションをトリガーする場合です。この場合は`x-intersect`に`.once` modifierを追加します。

```html
<div x-intersect.once="shown = true">...</div>
```

<a name="half"></a>
### .half

intersection thresholdが`0.5`を超えると式を1回評価します。

要素の少なくとも一部を表示することが重要な場合に便利です。

```html
<div x-intersect.half="shown = true"></div> // 要素の`0.5`がビューポート内に入ったとき
```

<a name="full"></a>
### .full

intersection thresholdが`0.99`を超えると式を評価します。

要素全体を表示することが重要な場合に便利です。

```html
<div x-intersect.full="shown = true"></div> // 要素の`0.99`がビューポート内に入ったとき
```

<a name="threshold"></a>
### .threshold

基盤となる`IntersectionObserver`の`threshold`プロパティを制御できます。

この値は「0〜100」の範囲にする必要があります。「0」は要素の一部でもビューポートに入ると「intersection」をトリガーすることを意味します（デフォルトの動作）。「100」は要素全体がビューポートに入らない限り「intersection」をトリガーしないことを意味します。

その間の値は、この両極端の割合です。

たとえば、要素の半分がページに入った後にintersectionをトリガーしたい場合は、`.threshold.50`を使います。

```html
<div x-intersect.threshold.50="shown = true"></div> // 要素の50%がビューポート内に入ったとき
```

要素の5%がビューポートに入ったときだけトリガーしたい場合は`.threshold.05`を使います。

<a name="margin"></a>
### .margin

基盤となる`IntersectionObserver`の`rootMargin`プロパティを制御できます。これにより、ビューポート境界のサイズを実質的に調整します。正の値はビューポートの外側へ境界を広げ、負の値は内側へ縮めます。値はCSSのmarginと同じように機能します。1つの値は全辺、2つの値は上下・左右、4つの値は上・右・下・左に適用されます。`px`と`%`の値を使うか、単位のない数値でピクセル値を指定できます。

```html
<div x-intersect.margin.200px="loaded = true"></div> // 要素がビューポートから200px以内に入ったら読み込む
```

```html
<div x-intersect:leave.margin.10%.25px.25.25px="loaded = false"></div> // 要素がビューポート上端から10%以内、または他の3辺から25px以内に入ったら読み込みを解除
```

```html
<div x-intersect.margin.-100px="visible = true"></div> // 要素がビューポート内に100px以上入ったら表示済みにする
```

<a name="parent"></a>
### .parent

デフォルトでは、`x-intersect`はブラウザーのビューポートを基準に要素を監視します。`.parent` modifierは、基盤となる`IntersectionObserver`の`root`を要素の親に設定します。これにより、式はページ全体ではなく、親要素内で要素が表示されているかどうかに基づいて評価されます。

要素がスクロール可能なコンテナ内にある場合や、ビューポートではなく親要素を基準にした表示状態を扱いたい場合に便利です。

```html
<div x-intersect.parent="shown = true"></div> // 要素が親の中でスクロールして表示されたら表示済みにする
```
