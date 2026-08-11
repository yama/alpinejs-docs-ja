---
order: 1
title: ここから始める
---

# ここから始める

コンピューター上のどこかに、`i-love-alpine.html` のような名前で空のHTMLファイルを作成します。

テキストエディターで、ファイルに次の内容を入力します。

```html
<html>
<head>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
    <h1 x-data="{ message: 'I ❤️ Alpine' }" x-text="message"></h1>
</body>
</html>
```

ファイルをWebブラウザーで開き、`I ❤️ Alpine` と表示されたら準備完了です。

これで試す準備ができたので、Alpineの基本を学ぶ土台として、3つの実践的な例を見ていきましょう。この練習が終わるころには、自分で構築を始めるために必要な知識が十分身についているはずです。さあ、始めましょう。

<a name="building-a-counter"></a>
## カウンターを作る

まず、Alpineの2つの中核機能である状態とイベントリスニングの基本を示すため、単純な「カウンター」コンポーネントから始めましょう。

`<body>`タグの中に次を挿入します。

```html
<div x-data="{ count: 0 }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

このHTMLにAlpineの機能を3つ加えるだけで、インタラクティブな「カウンター」コンポーネントを作成できました。

何が起きているのか、簡単に見ていきましょう。

<a name="declaring-data"></a>
### データを宣言する

```html
<div x-data="{ count: 0 }">
```

Alpineではすべてが`x-data`ディレクティブから始まります。`x-data`の中では、通常のJavaScriptで、Alpineが追跡するデータオブジェクトを宣言します。

このオブジェクト内のすべてのプロパティは、このHTML要素内の他のディレクティブから利用できるようになります。また、これらのプロパティのいずれかが変化すると、それに依存するものもすべて変化します。

> ほとんどのAlpineディレクティブを動作させるには、親要素に`x-data`が必要です。

[→ `x-data`について詳しく読む](/directives/data)

次に、`x-on`が上の`count`プロパティへアクセスし、変更する方法を見てみましょう。

<a name="listening-for-events"></a>
### イベントをリッスンする

```html
<button x-on:click="count++">Increment</button>
```

`x-on`は、要素上の任意のイベントをリッスンするために使えるディレクティブです。ここでは`click`イベントをリッスンしているので、`x-on:click`となります。

想像どおり、他のイベントもリッスンできます。たとえば、`mouseenter`イベントをリッスンするには`x-on:mouseenter`と記述します。

`click`イベントが発生すると、Alpineは関連付けられたJavaScript式、この場合は`count++`を呼び出します。`x-data`式で宣言したデータへ直接アクセスできることがわかります。

> `x-on:`の代わりに`@`が使われているのをよく見かけるでしょう。これは、好む人の多い、より短く親しみやすい構文です。これ以降、このドキュメントではおそらく`x-on:`の代わりに`@`を使います。

[→ `x-on`について詳しく読む](/directives/on)

<a name="reacting-to-changes"></a>
### 変更に反応する

```html
<span x-text="count"></span>
```

`x-text`は、JavaScript式の結果を要素のテキストコンテンツに設定するAlpineディレクティブです。

ここでは、この`span`タグの内容が`count`プロパティの値を常に反映するようAlpineに指示しています。

明確でないかもしれませんが、ほとんどのディレクティブと同様に、`x-text`は引数として通常のJavaScript式を受け取ります。たとえば、代わりに`x-text="count * 2"`と設定すれば、`span`のテキストコンテンツは常に`count`の値の2倍になります。

[→ `x-text`について詳しく読む](/directives/text)

<a name="building-a-dropdown"></a>
## ドロップダウンを作る

基本的な機能を見たところで、Alpineの重要なディレクティブの1つである`x-show`を使い、少し作為的な「ドロップダウン」コンポーネントを作りながら続けましょう。

`<body>`タグの中に次のコードを挿入します。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle</button>

    <div x-show="open" @click.outside="open = false">Contents...</div>
</div>
```

このコンポーネントを読み込むと、「Contents...」がデフォルトでは非表示になっていることがわかります。「Toggle」ボタンをクリックすると、ページ上で表示を切り替えられます。

前の例で`x-data`と`x-on`ディレクティブには慣れたはずなので、ここでは説明を省略します。

<a name="toggling-elements"></a>
### 要素を切り替える

```html
<div x-show="open">Contents...</div>
```

`x-show`は、JavaScript式、この場合は`open`の結果に基づいて、ページ上のHTMLブロックを表示・非表示にできる非常に強力なディレクティブです。

[→ `x-show`について詳しく読む](/directives/show)

<a name="listening-for-a-click-outside"></a>
### 外側のクリックをリッスンする

```html
<div ... @click.outside="open = false">Contents...</div>
```

`.outside` modifierは、要素の外側で発生したクリックをリッスンします。

Alpineに組み込まれた便利なヘルパーで、よくある要件を手作業で実装する面倒さと複雑さを解消します。

[→ `x-on`のmodifierについて詳しく読む](https://alpinejs.dev/directives/on#modifiers)

<a name="building-a-search-input"></a>
## 検索入力を作る

次は、より複雑なコンポーネントを作り、いくつかの別のディレクティブとパターンを紹介します。

`<body>`タグの中に次のコードを挿入します。

```html
<div
    x-data="{
        search: '',

        items: ['foo', 'bar', 'baz'],

        get filteredItems() {
            return this.items.filter(
                i => i.startsWith(this.search)
            )
        }
    }"
>
    <input x-model="search" placeholder="Search...">

    <ul>
        <template x-for="item in filteredItems" :key="item">
            <li x-text="item"></li>
        </template>
    </ul>
</div>
```

デフォルトではすべての「items」（foo、bar、baz）がページに表示されますが、テキスト入力に入力すると絞り込めます。入力するたびに、リストは検索内容を反映して変化します。

ここではかなり多くのことが起きているので、このスニペットを部分ごとに見ていきましょう。

<a name="multi-line-formatting"></a>
### 複数行の書式

まず指摘したいのは、`x-data`の内容が以前よりずっと増えていることです。書きやすく読みやすくするため、HTML内で複数行に分けています。これは完全に任意で、この問題をそもそも避ける方法については後で詳しく説明しますが、今はJavaScriptをすべてHTMLに直接記述します。

<a name="binding-to-inputs"></a>
### 入力にバインドする

```html
<input x-model="search" placeholder="Search...">
```

まだ見ていない新しいディレクティブ、`x-model`に気づくでしょう。

`x-model`は、入力要素の値をデータプロパティ、この場合は`x-data="{ search: '', ... }"`の「search」に「バインド」するために使います。

つまり、入力の値が変わるたびに、「search」の値もそれを反映して変わります。

`x-model`には、この単純な例よりはるかに多くの機能があります。

[→ `x-model`について詳しく読む](/directives/model)

<a name="computed-properties-using-getters"></a>
### getterを使った算出プロパティ

次に注目してほしいのは、`x-data`ディレクティブの`items`と`filteredItems`プロパティです。

```js
{
    ...
    items: ['foo', 'bar', 'baz'],

    get filteredItems() {
        return this.items.filter(
            i => i.startsWith(this.search)
        )
    }
}
```

`items`プロパティは説明不要でしょう。ここでは、`items`の値を3つの異なる項目（foo、bar、baz）からなるJavaScript配列に設定しています。

このスニペットの興味深い部分は、`filteredItems`プロパティです。

このプロパティの前に`get`という接頭辞があることで、`filteredItems`はこのオブジェクトの「getter」プロパティになっています。つまり、データオブジェクト内の通常のプロパティのように`filteredItems`へアクセスできますが、アクセスするとJavaScriptが内部で指定された関数を評価し、その結果を返します。

`get`を省略し、テンプレートから呼び出すメソッドにすることもまったく問題ありません。ただし、getterのより簡潔な構文を好む人もいます。

[→ JavaScriptのgetterについて詳しく読む](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/get)

では、`filteredItems` getterの中を見て、何が起きているのか確認しましょう。

```js
return this.items.filter(
    i => i.startsWith(this.search)
)
```

これはすべて通常のJavaScriptです。まず項目の配列（foo、bar、baz）を取得し、指定されたコールバック `i => i.startsWith(this.search)` を使ってフィルタリングしています。

このコールバックを`filter`に渡すことで、JavaScriptに対して、文字列`this.search`で始まる項目だけを返すよう指示しています。`this.search`は、`x-model`で見たように、常に入力値を反映します。

ここまで、プロパティを参照するために`this.`を使う必要がなかったことに気づくかもしれません。しかし、現在は`x-data`オブジェクトの内部で直接作業しているため、プロパティは単に`[property]`とするのではなく、`this.[property]`で参照する必要があります。

Alpineは「リアクティブ」なフレームワークです。そのため、`this.search`の値が変わると、`filteredItems`を使っているテンプレートの部分が自動的に更新されます。

<a name="looping-elements"></a>
### 要素をループする

コンポーネントのデータ部分を理解したところで、ページ上で`filteredItems`をループできるようにするテンプレートの仕組みを理解しましょう。

```html
<ul>
    <template x-for="item in filteredItems">
        <li x-text="item"></li>
    </template>
</ul>
```

まず注目すべきは`x-for`ディレクティブです。`x-for`式は`[item] in [items]`という形式を取り、`[items]`は任意のデータ配列、`[item]`はループの反復に割り当てられる変数名です。

また、`x-for`が`<li>`に直接ではなく、`<template>`要素に宣言されていることにも注目してください。これは`x-for`を使うための要件です。ブラウザーにおける`<template>`タグの既存の動作をAlpineが活用できます。

これで、`<template>`タグ内の要素は`filteredItems`内の各項目について繰り返され、ループ内で評価されるすべての式から反復変数（この場合は`item`）へ直接アクセスできるようになります。

[→ `x-for`について詳しく読む](/directives/for)

<a name="recap"></a>
## まとめ

ここまで読んだなら、Alpineの次のディレクティブに触れたことになります。

* x-data
* x-on
* x-text
* x-show
* x-model
* x-for

これは素晴らしいスタートです。しかし、理解を深めるべきディレクティブはまだたくさんあります。Alpineを身につける最善の方法は、このドキュメントを通して読むことです。すべての単語を細かく読む必要はありませんが、少なくともすべてのページに目を通せば、Alpineを使う際の能力は**大幅に**向上するでしょう。

楽しいコーディングを！
