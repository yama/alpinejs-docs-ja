---
order: 2
prefix: $
title: refs
---

# $refs

`$refs`は、コンポーネント内で`x-ref`が付けられたDOM要素を取得するために使えるmagic propertyです。DOM要素を手動で操作する必要がある場合に便利です。`document.querySelector`より簡潔で、スコープが限定された代替手段としてよく使われます。

```html
<button @click="$refs.text.remove()">Remove Text</button>

<span x-ref="text">Hello 👋</span>
```

ボタンを押すと、`<span>`が削除されます。

<a name="limitations"></a>
### 制限事項

V2では、次のように`$refs`を要素へ動的にバインドできました。

```html
<template x-for="item in items" :key="item.id" >
    <div :x-ref="item.name">
    some content ...
    </div>
</template>
```

しかしV3では、`$refs`へアクセスできるのは静的に作成された要素だけです。したがって上の例で、`$refs`内の`item.name`の値が*Batteries*のようになると期待していた場合、実際には*Batteries*ではなくリテラル文字列`'item.name'`が含まれることに注意してください。
