---
order: 2
title: State
---

# 状態

状態（Alpineが変更を監視するJavaScriptデータ）は、Alpineで行うすべてのことの中心です。`x-data`を使ってHTMLの一部にローカルデータを提供したり、`Alpine.store()`を使ってページ上のどこからでも使えるようグローバルに公開したりできます。

<a name="local-state-x-data"></a>
## ローカル状態

Alpineでは、マークアップの外へ出ることなく、1つの`x-data`属性でHTMLブロックの状態を宣言できます。

基本的な例は次のとおりです。

```html
<div x-data="{ open: false }">
    ...
</div>
```

これで、この要素上または内部にある他のAlpine構文から`open`へアクセスできます。予想どおり、何らかの理由で`open`が変化すると、それに依存するものすべてが自動的に反応します。

[→ `x-data`について詳しく読む](/directives/data)

<a name="nesting-data"></a>
### データをネストする

Alpineではデータをネストできます。たとえば、Alpineデータが付いた要素が2つ（片方がもう片方の内部に）ある場合、子要素の内部から親のデータへアクセスできます。

```html
<div x-data="{ open: false }">
    <div x-data="{ label: 'Content:' }">
        <span x-text="label"></span>
        <span x-show="open"></span>
    </div>
</div>
```

これはJavaScript自体のスコープに似ています（関数内のコードから、その関数の外で宣言された変数へアクセスできます）。

想像できるように、子に親のプロパティと同じ名前のデータプロパティがある場合は、子のプロパティが優先されます。

<a name="single-element-data"></a>
### 1つの要素のデータ

当たり前に思えるかもしれませんが、Alpineのデータは同じ要素内でも使えることに触れておく価値があります。たとえば、次のようにします。

```html
<button x-data="{ label: 'Click Here' }" x-text="label"></button>
```

<a name="data-less-alpine"></a>
### データなしのAlpine

Alpineの機能を使いたいものの、リアクティブなデータは必要ない場合があります。このような場合は、`x-data`に式を渡さないことを選べます。

```html
<button x-data @click="alert('I\'ve been clicked!')">Click Me</button>
```

<a name="re-usable-data"></a>
### 再利用可能なデータ

Alpineを使っていると、データのまとまりや、それに対応するテンプレートを再利用したくなることがあります。

RailsやLaravelのようなバックエンドフレームワークを使っている場合、AlpineはまずHTMLブロック全体をテンプレートpartialまたはincludeに切り出すことを推奨します。

それが適していない、またはバックエンドのテンプレート環境にいない場合、Alpineでは`Alpine.data(...)`を使ってコンポーネントのデータ部分をグローバルに登録し、再利用できます。

```js
Alpine.data('dropdown', () => ({
    open: false,

    toggle() {
        this.open = ! this.open
    }
}))
```

「dropdown」データを登録したので、マークアップ内の好きな場所で何度でも使えます。

```html
<div x-data="dropdown">
    <button @click="toggle">Expand</button>

    <span x-show="open">Content...</span>
</div>

<div x-data="dropdown">
    <button @click="toggle">Expand</button>

    <span x-show="open">Some Other Content...</span>
</div>
```

[→ `Alpine.data()`の使い方を詳しく読む](/globals/alpine-data)

<a name="global-state"></a>
## グローバル状態

ページ上のすべてのコンポーネントからデータを利用できるようにしたい場合は、Alpineの「グローバルストア」機能を使えます。

`Alpine.store(...)`でストアを登録し、magicの`$store()`メソッドで参照できます。

簡単な例を見てみましょう。まずストアをグローバルに登録します。

```js
Alpine.store('tabs', {
    current: 'first',

    items: ['first', 'second', 'third'],
})
```

これでページ上のどこからでも、そのデータへアクセスしたり変更したりできます。

```html
<div x-data>
    <template x-for="tab in $store.tabs.items">
        ...
    </template>
</div>

<div x-data>
    <button @click="$store.tabs.current = 'first'">First Tab</button>
    <button @click="$store.tabs.current = 'second'">Second Tab</button>
    <button @click="$store.tabs.current = 'third'">Third Tab</button>
</div>
```

[→ `Alpine.store()`について詳しく読む](/globals/alpine-store)
