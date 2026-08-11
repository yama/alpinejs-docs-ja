---
order: 4
title: watch
---

# $watch

`$watch` magic methodを使うと、コンポーネントのプロパティを「監視」できます。たとえば次のようにします。

```html
<div x-data="{ open: false }" x-init="$watch('open', value => console.log(value)">
    <button @click="open = ! open">Toggle Open</button>
</div>
```

上の例では、ボタンを押して`open`が変更されると、指定したコールバックが実行され、新しい値が`console.log`に出力されます。

「ドット」記法を使うと、深くネストされたプロパティを監視できます。

```html
<div x-data="{ foo: { bar: 'baz' }}" x-init="$watch('foo.bar', value => console.log(value))">
    <button @click="foo.bar = 'bob'">Toggle Open</button>
</div>
```

`<button>`を押すと`foo.bar`が`"bob"`に設定され、`"bob"`が出力されます。

<a name="getting-the-old-value"></a>
### 「以前の」値を取得する

`$watch`は監視中のプロパティの以前の値を追跡します。コールバックの任意の2番目の引数を使うと、次のように取得できます。

```html
<div x-data="{ open: false }" x-init="$watch('open', (value, oldValue) => console.log(value, oldValue))">
    <button @click="open = ! open">Toggle Open</button>
</div>
```

<a name="deep-watching"></a>
### 深く監視する

`$watch`は自動的にあらゆる階層の変更を監視します。ただし、変更が検出されたとき、watcherが返すのは変更されたサブプロパティの値ではなく、監視対象プロパティの値であることに注意してください。

```html
<div x-data="{ foo: { bar: 'baz' }}" x-init="$watch('foo', (value, oldValue) => console.log(value, oldValue))">
    <button @click="foo.bar = 'bob'">Update</button>
</div>
```

`<button>`を押すと`foo.bar`が`"bob"`に設定され、`"{bar: 'bob'} {bar: 'baz'}"`（新しい値と以前の値）が出力されます。

> ⚠️ `$watch`コールバックの副作用として「監視中」のオブジェクトのプロパティを変更すると、無限ループが発生し、最終的にエラーになります。

```html
<!-- 🚫 無限ループ -->
<div x-data="{ foo: { bar: 'baz', bob: 'lob' }}" x-init="$watch('foo', value => foo.bob = foo.bar)">
    <button @click="foo.bar = 'bob'">Update</button>
</div>
```
