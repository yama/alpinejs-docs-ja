---
order: 5
title: Lifecycle
---

# ライフサイクル

Alpineには、ライフサイクルのさまざまな部分にフックする方法がいくつかあります。最も便利なものを見て、使い方に慣れましょう。

<a name="element-initialization"></a>
## 要素の初期化

Alpineのもう1つの便利なライフサイクルフックが`x-init`ディレクティブです。

`x-init`はページ上の任意の要素に追加でき、Alpineがその要素の初期化を始めたときに、内部で指定したJavaScriptを実行します。

```html
<button x-init="console.log('Im initing')">
```

ディレクティブに加えて、Alpineはデータオブジェクトに保存された`init()`メソッドも自動的に呼び出します。たとえば、次のようにします。

```js
Alpine.data('dropdown', () => ({
    init() {
        // このデータを使う要素の初期化前に呼び出されます。
    }
}))
```

<a name="after-a-state-change"></a>
## 状態の変更後

Alpineでは、データ（状態）が変化したときにコードを実行できます。そのためのAPIとして、`$watch`と`x-effect`の2つがあります。

<a name="watch"></a>
### `$watch`

```html
<div x-data="{ open: false }" x-init="$watch('open', value => console.log(value))">
```

上の例のように、`$watch`ではドット記法のキーを使ってデータの変更にフックできます。そのデータが変化すると、Alpineが渡されたコールバックを呼び出し、新しい値と変更前の古い値を渡します。

[→ `$watch`について詳しく読む](/magics/watch)

<a name="x-effect"></a>
### `x-effect`

`x-effect`は内部で`$watch`と同じ仕組みを使いますが、使い方は大きく異なります。

監視するデータキーを指定する代わりに、`x-effect`は指定されたコードを実行し、その中で使われているAlpineデータを自動的に探します。そのデータのいずれかが変化すると、`x-effect`式が再実行されます。

`$watch`の例と同じコードを`x-effect`で書き直すと、次のようになります。

```html
<div x-data="{ open: false }" x-effect="console.log(open)">
```

この式はすぐに呼び出され、その後`open`が更新されるたびに再度呼び出されます。

この方法との主な動作上の違いは次の2つです。

1. 指定したコードはすぐに、そしてデータが変化したときにも実行されます（`$watch`は「lazy」で、最初のデータ変更まで実行されません）。
2. 以前の値を知ることはできません（`$watch`に渡すコールバックは新しい値と古い値の両方を受け取ります）。

[→ `x-effect`について詳しく読む](/directives/effect)

<a name="alpine-initialization"></a>
## Alpineの初期化

<a name="alpine-initializing"></a>
### `alpine:init`

Alpineが読み込まれた後、ページ上で自身を初期化する**前**にコードを実行することが必要になる場合があります。

このフックを使うと、Alpineがページ上で処理を始める前に、カスタムデータ、ディレクティブ、magicなどを登録できます。

Alpineがディスパッチする`alpine:init`というイベントをリッスンすることで、このライフサイクルのタイミングにフックできます。

```js
document.addEventListener('alpine:init', () => {
    Alpine.data(...)
})
```

<a name="alpine-initialized"></a>
### `alpine:initialized`

Alpineには、初期化が完了した**後**にコードを実行する`alpine:initialized`というフックもあります。

```js
document.addEventListener('alpine:initialized', () => {
    //
})
```
