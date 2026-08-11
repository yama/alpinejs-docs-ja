---
order: 1
title: data
---

# x-data

Alpineのすべては`x-data`ディレクティブから始まります。

`x-data`はHTMLの一部をAlpineコンポーネントとして定義し、そのコンポーネントが参照するリアクティブなデータを提供します。

次は、単純なドロップダウンコンポーネントの例です。

```alpine
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle Content</button>

    <div x-show="open">
        Content...
    </div>
</div>
```

この例にある他のディレクティブ（`@click`と`x-show`）については心配しなくて大丈夫です。これらについては後ほど説明します。ここでは`x-data`に集中しましょう。

<a name="scope"></a>
## スコープ

`x-data`ディレクティブで定義したプロパティは、子要素から利用できます。別のネストされた`x-data`コンポーネントの内部にある要素も対象です。

たとえば、次のようになります。

```alpine
<div x-data="{ foo: 'bar' }">
    <span x-text="foo"><!-- Will output: "bar" --></span>

    <div x-data="{ bar: 'baz' }">
        <span x-text="foo"><!-- Will output: "bar" --></span>

        <div x-data="{ foo: 'bob' }">
            <span x-text="foo"><!-- Will output: "bob" --></span>
        </div>
    </div>
</div>
```

<a name="methods"></a>
## メソッド

`x-data`は通常のJavaScriptオブジェクトとして評価されるため、状態に加えてメソッドやgetterも保存できます。

たとえば、「Toggle Content」の動作を`x-data`のメソッドへ取り出してみましょう。

```alpine
<div x-data="{ open: false, toggle() { this.open = ! this.open } }">
    <button @click="toggle()">Toggle Content</button>

    <div x-show="open">
        Content...
    </div>
</div>
```

`x-data`に`toggle() { this.open = ! this.open }`メソッドが追加されていることに注目してください。このメソッドは、コンポーネント内のどこからでも呼び出せるようになります。

また、オブジェクト自身の状態へアクセスするために`this.`を使っていることにも注目してください。これは、Alpineがこのデータオブジェクトを`this`コンテキストを持つ通常のJavaScriptオブジェクトとして評価するためです。

必要であれば、`toggle`メソッドを呼び出すときの括弧を完全に省略することもできます。たとえば、次のようになります。

```alpine
<!-- Before -->
<button @click="toggle()">...</button>

<!-- After -->
<button @click="toggle">...</button>
```

<a name="getters"></a>
## Getter

JavaScriptの[getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)は、メソッドの目的が他の状態に基づくデータを返すことだけである場合に便利です。

getterは「算出プロパティ」のようなものだと考えられます。ただし、Vueの算出プロパティのようにキャッシュされるわけではありません。

`open`へ直接アクセスする代わりに、`isOpen`というgetterを使うようコンポーネントを変更してみましょう。

```alpine
<div x-data="{
    open: false,
    get isOpen() { return this.open },
    toggle() { this.open = ! this.open },
}">
    <button @click="toggle()">Toggle Content</button>

    <div x-show="isOpen">
        Content...
    </div>
</div>
```

この例では、「Content」が`open`プロパティではなく`isOpen` getterに依存するようになっています。

この場合、具体的なメリットはありません。しかし、getterはコンポーネント内でより表現力のある構文を提供するのに役立つ場合があります。

<a name="data-less-components"></a>
## データを持たないコンポーネント

Alpineコンポーネントを作成したいものの、データが必要ないことがあります。

この場合は、空のオブジェクトを渡せます。

```alpine
<div x-data="{}">
```

ただし、見た目がよくなる場合は、属性値全体を省略することもできます。

```alpine
<div x-data>
```

<a name="single-element-components"></a>
## 単一要素のコンポーネント

次のように、Alpineコンポーネント内に要素が1つしかない場合があります。

```alpine
<div x-data="{ open: true }">
    <button @click="open = false" x-show="open">Hide Me</button>
</div>
```

この場合は、次のようにその単一要素へ直接`x-data`を指定できます。

```alpine
<button x-data="{ open: true }" @click="open = false" x-show="open">
    Hide Me
</button>
```

<a name="re-usable-data"></a>
## 再利用可能なデータ

`x-data`の内容を複製していたり、インライン構文が冗長だと感じたりする場合は、`Alpine.data`を使って専用のコンポーネントへ`x-data`オブジェクトを切り出せます。

簡単な例を見てみましょう。

```alpine
<div x-data="dropdown">
    <button @click="toggle">Toggle Content</button>

    <div x-show="open">
        Content...
    </div>
</div>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('dropdown', () => ({
            open: false,

            toggle() {
                this.open = ! this.open
            },
        }))
    })
</script>
```

[→ `Alpine.data(...)`について詳しく読む](https://alpinejs.dev/globals/alpine-data)
