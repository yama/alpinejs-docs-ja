---
order: 2
title: Reactivity
---

# リアクティビティ

Alpineは、データの一部を変更すると、そのデータに依存するすべてのものが自動的にその変更へ「反応」するという意味で「リアクティブ」です。

Alpineで行われるリアクティビティはすべて、Alpineのコアにある2つの重要なリアクティブ関数、`Alpine.reactive()`と`Alpine.effect()`によって実現しています。

> Alpineは内部でVueJSのリアクティビティエンジンを使い、これらの関数を提供しています。
> [→ @vue/reactivityについて詳しく読む](https://github.com/vuejs/vue-next/tree/master/packages/reactivity)

この2つの関数を理解すると、Alpine開発者として、さらには一般的なWeb開発者として大きな力を得られます。

<a name="alpine-reactive"></a>
## Alpine.reactive()

まず`Alpine.reactive()`を見てみましょう。この関数はJavaScriptオブジェクトをパラメーターとして受け取り、そのオブジェクトの「リアクティブ」なバージョンを返します。たとえば次のようにします。

```js
let data = { count: 1 }

let reactiveData = Alpine.reactive(data)
```

内部では、`Alpine.reactive`が`data`を受け取ると、カスタムJavaScript proxyでラップします。

proxyは、JavaScriptオブジェクトへの「get」や「set」の呼び出しをインターセプトできる、JavaScriptの特殊な種類のオブジェクトです。

[→ JavaScript proxyについて詳しく読む](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

一見すると、`reactiveData`は`data`とまったく同じように動作するはずです。たとえば次のようになります。

```js
console.log(data.count) // 1
console.log(reactiveData.count) // 1

reactiveData.count = 2

console.log(data.count) // 2
console.log(reactiveData.count) // 2
```

ここでわかるのは、`reactiveData`が`data`の薄いラッパーであるため、プロパティの取得や設定は、`data`を直接操作した場合とまったく同じように動作するということです。

ここでの主な違いは、`reactiveData`から値を変更または取得するたびに、Alpineがそれを把握し、そのデータに依存する他のロジックを実行できることです。

`Alpine.reactive`は話の半分にすぎません。もう半分が`Alpine.effect`です。詳しく見ていきましょう。

<a name="alpine-effect"></a><a name="alpine-effect"></a>
## Alpine.effect()

`Alpine.effect`は1つのコールバック関数を受け取ります。`Alpine.effect`が呼び出されると、指定された関数を実行しますが、同時にリアクティブなデータとのやり取りを積極的に探します。前述のリアクティブproxyからの取得や設定などのやり取りを検出すると、それを追跡し、今後リアクティブなデータが変更されたときにコールバックを再実行します。たとえば次のようにします。

```js
let data = Alpine.reactive({ count: 1 })

Alpine.effect(() => {
    console.log(data.count)
})
```

このコードを初めて実行すると、コンソールに`1`が出力されます。`data.count`が変更されるたびに、その値が再びコンソールへ出力されます。

これがAlpineの中核にあるすべてのリアクティビティを実現する仕組みです。

さらに理解を深めるため、Alpine構文をまったく使わず、`Alpine.reactive`と`Alpine.effect`だけを使った単純な「カウンター」コンポーネントの例を見てみましょう。

```html
<button>Increment</button>

Count: <span></span>
```
```js
let button = document.querySelector('button')
let span = document.querySelector('span')

let data = Alpine.reactive({ count: 1 })

Alpine.effect(() => {
    span.textContent = data.count
})

button.addEventListener('click', () => {
    data.count = data.count + 1
})
```

このように、任意のデータをリアクティブにでき、任意の機能を`Alpine.effect`でラップすることもできます。

この組み合わせにより、Web開発の非常に強力なプログラミングパラダイムが実現します。自由に、思い切り活用してください。
