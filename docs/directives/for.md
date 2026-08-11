---
order: 8
title: for
---

# x-for

Alpineの`x-for`ディレクティブを使うと、リストを反復処理してDOM要素を作成できます。配列に基づいて色のリストを作成する簡単な例を見てみましょう。

```html
<ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">
    <template x-for="color in colors">
        <li x-text="color"></li>
    </template>
</ul>
```

オブジェクトを`x-for`に渡すこともできます。

```html
<ul x-data="{ car: { make: 'Jeep', model: 'Grand Cherokee', color: 'Black' } }">
    <template x-for="(value, index) in car">
        <li>
            <span x-text="index"></span>: <span x-text="value"></span>
        </li>
    </template>
</ul>
```

`x-for`について、次の2つのルールに注意してください。

> `x-for`は`<template>`要素に宣言**しなければなりません**。
> その`<template>`要素には、ルート要素を1つだけ含め**なければなりません**。

<a name="keys"></a>
## key

項目を並べ替える場合、`x-for`の各反復に一意のkeyを指定することが重要です。動的なkeyがないと、Alpineは何が並べ替えられたのかを追跡しにくくなり、意図しない副作用が発生します。

```html
<ul x-data="{ colors: [
    { id: 1, label: 'Red' },
    { id: 2, label: 'Orange' },
    { id: 3, label: 'Yellow' },
] }">
    <template x-for="color in colors" :key="color.id">
        <li x-text="color.label"></li>
    </template>
</ul>
```

これで色が追加・削除・並べ替えされたり、「id」が変わったりした場合、Alpineは反復された`<li>`要素を適切に保持または破棄します。

<a name="accessing-indexes"></a>
## インデックスにアクセスする

反復内の各項目のインデックスへアクセスする必要がある場合は、次のように`([item], [index]) in [items]`構文を使えます。

```html
<ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">
    <template x-for="(color, index) in colors">
        <li>
            <span x-text="index + ': '"></span>
            <span x-text="color"></span>
        </li>
    </template>
</ul>
```

動的な`:key`式の中でもインデックスにアクセスできます。

```html
<template x-for="(color, index) in colors" :key="index">
```

<a name="iterating-over-a-range"></a>
## 範囲を反復する

配列を反復するのではなく、単に`n`回ループしたい場合、Alpineには短い構文があります。

```html
<ul>
    <template x-for="i in 10">
        <li x-text="i"></li>
    </template>
</ul>
```

この場合の`i`は、好きな名前にできます。

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-for`は使えません。[→ `x-data`について詳しく読む](/directives/data)

<a name="contents-of-a-template"></a>
## `<template>`の内容

上で説明したように、`<template>`タグにはルート要素を1つだけ含める必要があります。

たとえば、次のコードは動作しません。

```html
<template x-for="color in colors">
    <span>The next color is </span><span x-text="color">
</template>
```

しかし、次のコードは動作します。

```html
<template x-for="color in colors">
    <p>
        <span>The next color is </span><span x-text="color">
    </p>
</template>
```
