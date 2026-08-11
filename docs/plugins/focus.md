---
order: 5
title: Focus
description: ページ内のフォーカスを簡単に管理する
graph_image: https://alpinejs.dev/social_focus.jpg
---

> 注意: このプラグインは以前「Trap」と呼ばれていました。Trapの機能は追加機能とともにこのプラグインへ取り込まれています。破壊的変更なしにTrapをFocusへ置き換えられます。

# Focusプラグイン

AlpineのFocusプラグインを使うと、ページ上のフォーカスを管理できます。

> このプラグインはオープンソースツール[Tabbable](https://github.com/focus-trap/tabbable)を内部で多用しています。この問題に必要だった解決策を提供してくれたチームに感謝します。

<a name="installation"></a>
## インストール

このプラグインは`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

CDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うFocusをNPMからインストールします。

```shell
npm install @alpinejs/focus
```

次にバンドルから初期化します。

```js
import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'

Alpine.plugin(focus)

...
```

<a name="x-trap"></a>
## x-trap

Focusには、要素内にフォーカスを閉じ込める専用APIとして`x-trap`ディレクティブがあります。

`x-trap`はJavaScript式を受け取ります。その結果がtrueの間はフォーカスがその要素内に閉じ込められ、falseになると元の場所へ戻ります。

```html
<div x-data="{ open: false }">
    <button @click="open = true">ダイアログを開く</button>
    <span x-show="open" x-trap="open">
        <p>...</p>
        <input type="text" placeholder="入力例...">
        <input type="text" placeholder="別の入力例...">
        <button @click="open = false">ダイアログを閉じる</button>
    </span>
</div>
```

<a name="nesting"></a>
### ダイアログのネスト

ダイアログの中に別のダイアログをネストしたい場合もあります。`x-trap`なら簡単で、自動的に処理されます。

`x-trap`は新たに「閉じ込められた」要素を追跡し、最後にアクティブだったフォーカス要素を保存します。要素のトラップを解除すると、フォーカスは元の場所へ戻ります。

この仕組みは再帰的です。すでにトラップされた要素の中に何度でもフォーカスを閉じ込め、各要素を順番に解除できます。

```html
<div x-data="{ open: false }">
    <button @click="open = true">ダイアログを開く</button>
    <span x-show="open" x-trap="open">
        ...
        <div x-data="{ open: false }">
            <button @click="open = true">ネストしたダイアログを開く</button>
            <span x-show="open" x-trap="open">
                ...
                <button @click="open = false">ネストしたダイアログを閉じる</button>
            </span>
        </div>
        <button @click="open = false">ダイアログを閉じる</button>
    </span>
</div>
```

<a name="modifiers"></a>
### modifier

<a name="inert"></a>
#### .inert

ダイアログやモーダルを作るときは、フォーカスを閉じ込めている間、ページ上の他の要素をスクリーンリーダーから隠すことが推奨されます。

`x-trap`に`.inert`を追加すると、フォーカスを閉じ込めている間、ページ上の他の要素へ`aria-hidden="true"`属性が付与されます。トラップを無効にすると属性も削除されます。

```html
<body x-data="{ open: false }">
    <div x-trap.inert="open">...</div>
    <div>...</div>
</body>
```

<a name="noscroll"></a>
#### .noscroll

ダイアログが開いている間は、周囲のコンテンツのスクロールを無効にすることが推奨されます。`x-trap.noscroll`を追加すると、Alpineがスクロールバーを取り除き、ページのスクロールを防ぎます。

```html
<div x-data="{ open: false }">
    <button @click="open = true">ダイアログを開く</button>
    <div x-show="open" x-trap.noscroll="open">
        ダイアログの内容
        <button @click="open = false">閉じる</button>
    </div>
</div>
```

<a name="noreturn"></a>
#### .noreturn

入力へのフォーカスで開くドロップダウンなどでは、閉じると入力へフォーカスを戻すことで再び開いてしまうことがあります。`.noreturn`を使うと、`x-trap`がfalseになったときフォーカスを戻さないようにできます。

```html
<div x-data="{ open: false }" x-trap.noreturn="open">
    <input type="search" placeholder="何かを検索">
    <div x-show="open">
        検索結果
        <button @click="open = false">閉じる</button>
    </div>
</div>
```

<a name="noautofocus"></a>
#### .noautofocus

デフォルトでは、`x-trap`が要素内にフォーカスを閉じ込めると、その要素内で最初にフォーカス可能な要素へフォーカスします。`.noautofocus`を追加すると、トラップ開始時に自動でフォーカスしなくなります。

<a name="focus-magic"></a>
## $focus

このプラグインはページ内のフォーカスを管理する小さなユーティリティを多数提供します。これらは`$focus` magicとして公開されています。

| プロパティ | 説明 |
| --- | --- |
| `focus(el)` | 渡された要素へフォーカスする（`nextTick`などの問題を内部で処理） |
| `focusable(el)` | 要素がフォーカス可能か判定する |
| `focusables()` | 現在の要素内にあるすべてのフォーカス可能な要素を取得する |
| `focused()` | ページ上で現在フォーカスされている要素を取得する |
| `lastFocused()` | 最後にフォーカスされた要素を取得する |
| `within(el)` | `$focus` magicの対象要素を指定する（デフォルトは現在の要素） |
| `first()` | 最初のフォーカス可能な要素にフォーカスする |
| `last()` | 最後のフォーカス可能な要素にフォーカスする |
| `next()` | 次のフォーカス可能な要素にフォーカスする |
| `previous()` | 前のフォーカス可能な要素にフォーカスする |
| `noscroll()` | フォーカス対象要素へのスクロールを防ぐ |
| `wrap()` | `next`または`previous`取得時に末端から反対側へ回り込む |
| `getFirst()` | 最初のフォーカス可能な要素を取得する |
| `getLast()` | 最後のフォーカス可能な要素を取得する |
| `getNext()` | 次のフォーカス可能な要素を取得する |
| `getPrevious()` | 前のフォーカス可能な要素を取得する |

たとえば、矢印キーでボタン群のフォーカスを移動できます。

```html
<div @keydown.right="$focus.next()" @keydown.left="$focus.previous()">
    <button>最初</button>
    <button>2番目</button>
    <button>3番目</button>
</div>
```

最後のボタンで右矢印を押しても何も起きません。`.wrap()`を追加するとフォーカスを先頭へ回り込ませられます。

```html
<div @keydown.right="$focus.wrap().next()" @keydown.left="$focus.wrap().previous()">
    <button>最初</button>
    <button>2番目</button>
    <button>3番目</button>
</div>
```

ボタン群の最初・最後へ移動するボタンも作れます。

```html
<button @click="$focus.within($refs.buttons).first()">「最初」にフォーカス</button>
<button @click="$focus.within($refs.buttons).last()">「最後」にフォーカス</button>
<div x-ref="buttons" @keydown.right="$focus.wrap().next()" @keydown.left="$focus.wrap().previous()">
    <button>最初</button>
    <button>2番目</button>
    <button>3番目</button>
</div>
```

各ボタンで`.within()`を使っているのは、`$focus`の対象をボタンを囲む`div`へ変更するためです。
