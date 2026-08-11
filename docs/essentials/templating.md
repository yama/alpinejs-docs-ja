---
order: 3
title: Templating
---

# テンプレート

Alpineには、Webページ上のDOMを操作するための便利なディレクティブがいくつかあります。

ここでは基本的なテンプレート用ディレクティブをいくつか取り上げます。ただし、すべてを網羅した一覧についてはsidebarのディレクティブも確認してください。

<a name="text-content"></a>
## テキストコンテンツ

`x-text`ディレクティブを使うと、要素のテキストコンテンツを簡単に制御できます。

```html
<div x-data="{ title: 'Start Here' }">
    <h1 x-text="title"></h1>
</div>
```

これでAlpineは`<h1>`のテキストコンテンツを`title`の値（「Start Here」）に設定します。`title`が変わると、`<h1>`の内容も変わります。

Alpineのすべてのディレクティブと同じように、好きなJavaScript式を使えます。たとえば、次のようにします。

```html
<span x-text="1 + 2"></span>
```

これで`<span>`には「1」と「2」の合計が入ります。

[→ `x-text`について詳しく読む](/directives/text)

<a name="toggling-elements"></a>
## 要素を切り替える

Webページやアプリケーションでは、要素の切り替えがよく必要になります。ドロップダウン、モーダル、ダイアログ、「もっと見る」などがその例です。

Alpineには、ページ上の要素を切り替えるための`x-show`と`x-if`ディレクティブがあります。

<a name="x-show"></a>
### `x-show`

`x-show`を使った簡単な切り替えコンポーネントを見てみましょう。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Expand</button>

    <div x-show="open">
        Content...
    </div>
</div>
```

これで、内容を含む`<div>`全体が`open`の値に基づいて表示・非表示になります。

内部では、非表示にすべきときにAlpineが要素へCSSプロパティ`display: none;`を追加します。

[→ `x-show`について詳しく読む](/directives/show)

ほとんどの場合はこれで十分ですが、DOMから要素を完全に追加・削除したい場合もあります。そのためのディレクティブが`x-if`です。

<a name="x-if"></a>
### `x-if`

先ほどと同じ切り替えを、今回は`x-show`の代わりに`x-if`で行います。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Expand</button>

    <template x-if="open">
        <div>
            Content...
        </div>
    </template>
</div>
```

`x-if`は`<template>`タグに宣言しなければならないことに注目してください。これにより、Alpineはブラウザーにある`<template>`要素の動作を利用し、それをページへ追加・削除する対象の`<div>`のソースとして使えます。

`open`がtrueの場合、Alpineは`<div>`を`<template>`タグへ追加し、`open`がfalseになると削除します。

[→ `x-if`について詳しく読む](/directives/if)

<a name="toggling-with-transitions"></a>
## transitionで切り替える

`x-transition`ディレクティブを使うと、「表示」と「非表示」の状態を滑らかに切り替えられます。

> `x-transition`は`x-show`でのみ動作し、`x-if`では動作しません。

先ほどの単純な切り替え例にtransitionを適用すると、次のようになります。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Expands</button>

    <div x-show="open" x-transition>
        Content...
    </div>
</div>
```

transitionを扱うテンプレート部分を詳しく見てみましょう。

```html
<div x-show="open" x-transition>
```

`x-transition`だけで、切り替えに適切なデフォルトtransition（fadeとscale）が適用されます。

これらのtransitionをカスタマイズする方法は2つあります。

* Transitionヘルパー
* transitionのCSSクラス

それぞれの方法を見ていきましょう。

<a name="transition-helpers"></a>
### Transitionヘルパー

transitionのdurationを長くしたい場合、`.duration` modifierを使って手動で指定できます。

```html
<div x-show="open" x-transition.duration.500ms>
```

これでtransitionは500ミリ秒続きます。

表示時と非表示時で異なる値を指定したい場合は、`x-transition:enter`と`x-transition:leave`を使えます。

```html
<div
    x-show="open"
    x-transition:enter.duration.500ms
    x-transition:leave.duration.1000ms
>
```

この例では、表示時のdurationが500ミリ秒、非表示時のdurationが1000ミリ秒になります。

さらに、`.opacity`または`.scale`を指定して、そのプロパティだけをtransitionできます。たとえば、opacityだけをtransitionするには次のようにします。

```html
<div x-show="open" x-transition.opacity>
```

scaleだけをtransitionする場合は、次のようにします。

```html
<div x-show="open" x-transition.scale>
```

[→ Transitionヘルパーについて詳しく読む](/directives/transition#the-transition-helper)

<a name="transition-classes"></a>
### Transitionクラス

アプリケーションのtransitionをより細かく制御する必要がある場合は、transitionの各段階で特定のCSSクラスを適用できます。次の構文を使います（この例では[Tailwind CSS](https://tailwindcss.com/)を使います）。

```html
<div
    x-show="open"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90"
>...</div>
```

[→ Transitionクラスについて詳しく読む](/directives/transition#applying-css-classes)

<a name="binding-attributes"></a>
## 属性をバインドする

`x-bind`ディレクティブを使うと、Alpineで要素に`class`、`style`、`disabled`などのHTML属性を追加できます。

動的にバインドする`class`属性の例は次のとおりです。

```html
<button
    x-data="{ red: false }"
    x-bind:class="red ? 'bg-red' : ''"
    @click="red = ! red"
>
    Toggle Red
</button>
```

省略形として、`x-bind`を省略し、`:`構文を直接使うこともできます。

```html
<button ... :class="red ? 'bg-red' : ''">
```

Alpine内のデータに基づいてclassを切り替えることはよくあります。Alpineの`class`バインドのオブジェクト構文でclassを切り替える例を見てみましょう（この構文は`class`属性でのみ使えます）。

```html
<div x-data="{ open: true }">
    <span :class="{ 'hidden': ! open }">...</span>
</div>
```

これで`open`がfalseの場合は要素に`hidden` classが追加され、trueの場合は削除されます。

<a name="looping-elements"></a>
## 要素をループする

Alpineでは、`x-for`ディレクティブを使い、JavaScriptデータに基づいてテンプレートの一部を反復できます。簡単な例は次のとおりです。

```html
<div x-data="{ statuses: ['open', 'closed', 'archived'] }">
    <template x-for="status in statuses">
        <div x-text="status"></div>
    </template>
</div>
```

`x-if`と同様に、`x-for`は`<template>`タグに適用する必要があります。内部では、Alpineがループの各反復で`<template>`タグの内容を追加します。

新しい`status`変数が、反復されたテンプレートのスコープで利用できることがわかります。

[→ `x-for`について詳しく読む](/directives/for)

<a name="inner-html"></a>
## 内部HTML

`x-html`ディレクティブを使うと、要素のHTMLコンテンツを簡単に制御できます。

```html
<div x-data="{ title: '<h1>Start Here</h1>' }">
    <div x-html="title"></div>
</div>
```

これでAlpineは`<div>`のコンテンツを`<h1>Start Here</h1>`という要素に設定します。`title`が変わると、`<h1>`の内容も変わります。

> ⚠️ 信頼できるコンテンツにのみ使用し、ユーザーが提供したコンテンツには決して使用しないでください。⚠️
> 第三者のHTMLを動的に描画すると、簡単にXSS脆弱性につながります。

[→ `x-html`について詳しく読む](/directives/html)
