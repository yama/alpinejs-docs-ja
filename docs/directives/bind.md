---
order: 4
title: bind
---

# x-bind

`x-bind`を使うと、JavaScript式の結果に基づいて要素のHTML属性を設定できます。

たとえば、`x-bind`でinputのplaceholder値を設定するコンポーネントは次のようになります。

```html
<div x-data="{ placeholderText: 'Type here...' }">
    <input type="text" x-bind:placeholder="placeholderText">
</div>
```

<a name="shorthand-syntax"></a>
## 省略構文

`x-bind:`が冗長だと感じる場合は、省略形の`:`を使えます。上と同じinput要素を省略構文で書くと、次のようになります。

```html
<input type="text" :placeholder="placeholderText">
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-bind`は使えません。[→ `x-data`について詳しく読む](/directives/data)

<a name="binding-classes"></a>
## classをバインドする

`x-bind`は、Alpineの状態に基づいて要素へ特定のclassを設定する場合に最も役立ちます。

`x-show`の代わりに`hidden` classを使って要素を切り替える、単純なドロップダウンの例を見てみましょう。

```html
<div x-data="{ open: false }">
    <button x-on:click="open = ! open">Toggle Dropdown</button>

    <div :class="open ? '' : 'hidden'">
        Dropdown Contents...
    </div>
</div>
```

これで`open`が`false`のとき、ドロップダウンに`hidden` classが追加されます。

<a name="shorthand-conditionals"></a>
### 条件式の省略構文

このような場合、より簡潔な構文を好むなら、通常の条件式の代わりにJavaScriptの短絡評価を使えます。

```html
<div :class="show ? '' : 'hidden'">
<!-- Is equivalent to: -->
<div :class="show || 'hidden'">
```

逆の書き方もできます。`open`の代わりに反対の値を持つ`closed`変数を使うとします。

```html
<div :class="closed ? 'hidden' : ''">
<!-- Is equivalent to: -->
<div :class="closed && 'hidden'">
```

<a name="class-object-syntax"></a>
### classのオブジェクト構文

Alpineには、classの切り替えに使える別の構文もあります。classをキー、booleanを値とするJavaScriptオブジェクトを渡すと、Alpineがどのclassを適用し、どれを削除するか判断します。

```html
<div :class="{ 'hidden': ! show }">
```

この方法には、他の方法にはない利点があります。オブジェクト構文を使うと、要素の`class`属性に元から適用されているclassは保持**されません**。

たとえば、Alpineの読み込み前に要素へ`hidden` classを適用し、さらにAlpineでその存在を切り替えたい場合、その動作はオブジェクト構文でのみ実現できます。

```html
<div class="hidden" :class="{ 'hidden': ! show }">
```

混乱した場合に備えて、Alpineが`x-bind:class`を他の属性と異なる方法で処理する仕組みを詳しく見ていきましょう。

<a name="special-behavior"></a>
### 特別な動作

内部では、`x-bind:class`は他の属性とは異なる動作をします。

次のケースを考えてみましょう。

```html
<div class="opacity-50" :class="hide && 'hidden'">
```

`class`が他の属性と同じなら、`:class`のバインドが既存のclass属性を上書きし、`opacity-50`は`hidden`または`''`で上書きされます。

しかしAlpineは`class`のバインドを異なる方法で扱います。要素に既存のclassがあれば、それを保持するほど賢く動作します。

たとえば`hide`がtrueの場合、上の例は次のDOM要素になります。

```html
<div class="opacity-50 hidden">
```

`hide`がfalseの場合、DOM要素は次のようになります。

```html
<div class="opacity-50">
```

この動作はほとんどのユーザーにとって意識する必要がなく直感的ですが、詳しく知りたい開発者や特殊なケースのために明示しておく価値があります。

<a name="binding-styles"></a>
## styleをバインドする

JavaScriptオブジェクトでclassをバインドする特殊な構文と同様に、Alpineには`style`属性をバインドするオブジェクト構文もあります。

classのオブジェクトと同様、この構文は完全に任意です。メリットがある場合にのみ使ってください。

```html
<div :style="{ color: 'red', display: 'flex' }">

<!-- 次のように描画されます: -->
<div style="color: red; display: flex;" ...>
```

`x-bind:class`と同様、式を使ってインラインstyleを条件付きで設定できます。stylesオブジェクトを第2オペランドにすれば、ここでも短絡演算子を使えます。

```html
<div x-bind:style="true && { color: 'red' }">

<!-- 次のように描画されます: -->
<div style="color: red;">
```

この方法の利点の1つは、要素に既に設定されているstyleと混在させられることです。

```html
<div style="padding: 1rem;" :style="{ color: 'red', display: 'flex' }">

<!-- 次のように描画されます: -->
<div style="padding: 1rem; color: red; display: flex;" ...>
```

Alpineの多くの式と同じように、JavaScript式の結果を参照として使うこともできます。

```html
<div x-data="{ styles: { color: 'red', display: 'flex' }}">
    <div :style="styles">
</div>

<!-- 次のように描画されます: -->
<div ...>
    <div style="color: red; display: flex;" ...>
</div>
```

<a name="bind-directives"></a>
## Alpineディレクティブを直接バインドする

`x-bind`を使うと、複数のディレクティブと属性のオブジェクトを要素にバインドできます。

オブジェクトのキーには、Alpineで属性名として通常記述するものを指定できます。Alpineのディレクティブとmodifierだけでなく、通常のHTML属性も含まれます。オブジェクトの値は通常の文字列、または動的なAlpineディレクティブの場合はAlpineが評価するコールバックです。

```html
<div x-data="dropdown">
    <button x-bind="trigger">Open Dropdown</button>

    <span x-bind="dialogue">Dropdown Contents</span>
</div>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('dropdown', () => ({
            open: false,

            trigger: {
                ['x-ref']: 'trigger',
                ['@click']() {
                    this.open = true
                },
            },

            dialogue: {
                ['x-show']() {
                    return this.open
                },
                ['@click.outside']() {
                    this.open = false
                },
            },
        }))
    })
</script>
```

`x-bind`のこの使い方には、いくつか注意点があります。

> 「バインド」または「適用」するディレクティブが`x-for`の場合、コールバックから通常の式の文字列を返してください。たとえば、`['x-for']() { return 'item in items' }`のようにします。
