---
order: 9
prefix: $
title: id
---

# $id

`$id`は、要素のIDを生成し、同じページ上の同名の他のIDと競合しないようにするために使えるmagic propertyです。

このユーティリティは、ページ上に複数回現れる可能性があり、ID属性を使う再利用可能なコンポーネント（バックエンドのテンプレートで使うものを想定）を作成するときに非常に役立ちます。

inputコンポーネント、モーダル、listboxなどは、すべてこのユーティリティの恩恵を受けられます。

<a name="basic-usage"></a>
## 基本的な使い方

ページ上に2つのinput要素があり、それぞれに一意なIDを付けたい場合は、次のようにします。

```html
<input type="text" :id="$id('text-input')">
<!-- id="text-input-1" -->

<input type="text" :id="$id('text-input')">
<!-- id="text-input-2" -->
```

このように、`$id`は文字列を受け取り、ページ上で一意なsuffixを追加して返します。

<a name="groups-with-x-id"></a>
## x-idでグループ化する

ここで、同じ2つのinput要素に、それぞれ対応する`<label>`要素も付けたいとします。

この場合、同じIDを2回参照できる必要があるため問題が生じます。1つは`<label>`の`for`属性用、もう1つはinputの`id`用です。

次の方法なら実現でき、完全に有効です。

```html
<div x-data="{ id: $id('text-input') }">
    <label :for="id"> <!-- "text-input-1" -->
    <input type="text" :id="id"> <!-- "text-input-1" -->
</div>

<div x-data="{ id: $id('text-input') }">
    <label :for="id"> <!-- "text-input-2" -->
    <input type="text" :id="id"> <!-- "text-input-2" -->
</div>
```

この方法でも問題ありませんが、コンポーネントのスコープ内でIDに名前を付けて保存する必要があるため、扱いにくく感じるかもしれません。

同じことをより柔軟に実現するには、Alpineの`x-id`ディレクティブを使い、IDのグループに対する「IDスコープ」を宣言します。

```html
<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-1" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-1" -->
</div>

<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-2" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-2" -->
</div>
```

このように、`x-id`はID名の配列を受け取ります。このスコープ内で`$id()`を使うと、すべて同じIDを使います。これらを「IDグループ」と考えてください。

<a name="nesting"></a>
## ネスト

推測できると思いますが、次のように`x-id`グループを自由にネストできます。

```html
<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-1" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-1" -->

    <div x-id="['text-input']">
        <label :for="$id('text-input')"> <!-- "text-input-2" -->
        <input type="text" :id="$id('text-input')"> <!-- "text-input-2" -->
    </div>
</div>
```

<a name="keyed-ids"></a>
## キー付きID（ループ用）

ループ内でIDを識別するために、IDの末尾へ追加のsuffixを指定すると便利な場合があります。

そのために、`$id()`はオプションの2番目のパラメーターを受け取り、生成されるIDの末尾にsuffixとして追加します。

この必要性が生じる一般的な例は、`aria-activedescendant`属性を使ってlistbox内の「アクティブ」な要素を支援技術へ伝えるlistboxコンポーネントです。

```html
<ul
    x-id="['list-item']"
    :aria-activedescendant="$id('list-item', activeItem.id)"
>
    <template x-for="item in items" :key="item.id">
        <li :id="$id('list-item', item.id)">...</li>
    </template>
</ul>
```

これは不完全なlistboxの例ですが、グループ内の各IDをページ上で一意に保ちながら、ループ内でもキー付きにしてそのグループ内の個別のIDを参照する必要がある場面を示すには役立つはずです。
