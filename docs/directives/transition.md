---
order: 10
title: transition
---

# x-transition

Alpineには堅牢なtransitionユーティリティが組み込まれています。いくつかの`x-transition`ディレクティブを使うだけで、要素の表示・非表示を滑らかに切り替えられます。

Alpineでtransitionを扱う主な方法は2つあります。

* [Transitionヘルパー](#the-transition-helper)
* [CSSクラスを適用する](#applying-css-classes)

<a name="the-transition-helper"></a>
## Transitionヘルパー

Alpineでtransitionを実現する最も簡単な方法は、`x-show`が付いた要素に`x-transition`を追加することです。たとえば、次のようにします。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle</button>

    <div x-show="open" x-transition>
        Hello 👋
    </div>
</div>
```

デフォルトでは、`x-transition`が表示される要素に心地よいfadeとscaleのtransitionを適用することがわかります。

`x-transition`に付けるmodifierで、これらのデフォルトを上書きできます。詳しく見ていきましょう。

<a name="customizing-duration"></a>
### durationをカスタマイズする

初期状態では、入るときのdurationは150ミリ秒、離れるときは75ミリ秒に設定されています。

`.duration` modifierで、transitionに指定したいdurationを設定できます。

```html
<div ... x-transition.duration.500ms>
```

上の`<div>`は、入るときも離れるときも500ミリ秒でtransitionします。

入るときと離れるときでdurationを個別に設定する場合は、次のようにします。

```html
<div ...
    x-transition:enter.duration.500ms
    x-transition:leave.duration.400ms
>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-transition`は使えません。[→ `x-data`について詳しく読む](/directives/data)

<a name="customizing-delay"></a>
### delayをカスタマイズする

次のように`.delay` modifierを使うと、transitionを遅らせられます。

```html
<div ... x-transition.delay.50ms>
```

上の例では、要素の表示時と非表示時のtransitionが50ミリ秒遅れます。

<a name="customizing-opacity"></a>
### opacityをカスタマイズする

デフォルトでは、Alpineの`x-transition`はscaleとopacityの両方のtransitionを適用して「fade」効果を実現します。

scaleなしでopacityだけを適用したい場合は、次のようにします。

```html
<div ... x-transition.opacity>
```

<a name="customizing-scale"></a>
### scaleをカスタマイズする

`.opacity` modifierと同様に、`x-transition`をscaleだけに設定し、opacityはtransitionしないようにできます。

```html
<div ... x-transition.scale>
```

`.scale` modifierでは、scaleの値とoriginの値も設定できます。

```html
<div ... x-transition.scale.80>
```

上のスニペットでは、要素を表示・非表示にするときに80%のscaleを適用します。

次のように、表示時と非表示時でこれらの値を個別に設定することもできます。

```html
<div ...
    x-transition:enter.scale.80
    x-transition:leave.scale.90
>
```

scale transitionのoriginをカスタマイズするには、`.origin` modifierを使います。

```html
<div ... x-transition.scale.origin.top>
```

これで、デフォルトの中央ではなく、要素の上端をoriginとしてscaleが適用されます。

想像がつくかもしれませんが、このカスタマイズで使える値は`top`、`bottom`、`left`、`right`です。

2つのorigin値を組み合わせることもできます。たとえば、originを「top right」にしたい場合は、modifierに`.origin.top.right`を指定します。

<a name="applying-css-classes"></a>
## CSSクラスを適用する

transitionの各段階で何が適用されるかを直接制御したい場合は、段階ごとにCSSクラスを適用できます。

> 次の例では、[TailwindCSS](https://tailwindcss.com/docs/transition-property)のユーティリティクラスを使います。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle</button>

    <div
        x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 scale-90"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-90"
    >Hello 👋</div>
</div>
```

| ディレクティブ | 説明 |
| --- | --- |
| `:enter` | enterフェーズ全体で適用されます。 |
| `:enter-start` | 要素が挿入される前に追加され、要素が挿入された1フレーム後に削除されます。 |
| `:enter-end` | 要素が挿入された1フレーム後（`enter-start`が削除されるのと同時）に追加され、transitionまたはanimationが終わると削除されます。 |
| `:leave` | leaveフェーズ全体で適用されます。 |
| `:leave-start` | leave transitionが開始された直後に追加され、1フレーム後に削除されます。 |
| `:leave-end` | leave transitionが開始された1フレーム後（`leave-start`が削除されるのと同時）に追加され、transitionまたはanimationが終わると削除されます。 |
