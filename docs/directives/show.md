---
order: 3
title: show
---

# x-show

`x-show`は、Alpineで最も便利かつ強力なディレクティブの1つです。DOM要素を表示・非表示にする表現力の高い方法を提供します。

`x-show`を使った単純なドロップダウンコンポーネントの例を見てみましょう。

```html
<div x-data="{ open: false }">
    <button x-on:click="open = ! open">Toggle Dropdown</button>

    <div x-show="open">
        Dropdown Contents...
    </div>
</div>
```

「Toggle Dropdown」ボタンをクリックすると、それに応じてドロップダウンが表示・非表示になります。

> ページ読み込み時の`x-show`の「デフォルト」状態が`false`の場合、ページの「ちらつき」を避けるために`x-cloak`を使うとよいでしょう。これは、Alpineの初期化と非表示処理が完了する前にブラウザーがコンテンツを描画すると発生する現象です。`x-cloak`については[ドキュメント](/directives/cloak)で詳しく説明しています。

<a name="with-transitions"></a>
## transitionを使う

`x-show`の動作に滑らかなtransitionを適用したい場合は、`x-transition`と組み合わせて使えます。このディレクティブについては[こちら](/directives/transition)で詳しく説明していますが、ここでは上と同じコンポーネントにtransitionを適用した簡単な例を示します。

```html
<div x-data="{ open: false }">
    <button x-on:click="open = ! open">Toggle Dropdown</button>

    <div x-show="open" x-transition>
        Dropdown Contents...
    </div>
</div>
```

<a name="using-the-important-modifier"></a>
## important modifierを使う

要素を実際に非表示にするため、少し強制力が必要な場合があります。CSSセレクターが`!important`フラグ付きで`display`プロパティを指定している場合、Alpineが設定するインラインスタイルより優先されます。

この場合、`.important` modifierを使うと、インラインスタイルを`display: none !important`に設定できます。

```html
<div x-data="{ open: false }">
    <button x-on:click="open = ! open">Toggle Dropdown</button>

    <div x-show.important="open">
        Dropdown Contents...
    </div>
</div>
```
