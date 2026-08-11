---
order: 16
title: if
---

# x-if

`x-if`は`x-show`と同じようにページ上の要素を切り替えるために使いますが、CSSの`display`プロパティを`none`に変更するだけではなく、適用先の要素を完全に追加・削除します。

この動作の違いにより、`x-if`は要素へ直接適用せず、要素を囲む`<template>`タグに適用する必要があります。これにより、Alpineはページから削除した後も要素を記録しておけます。

```html
<template x-if="open">
    <div>Contents...</div>
</template>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-if`は使えません。[→ `x-data`について詳しく読む](/directives/data)

## 注意点

`x-show`とは異なり、`x-if`は`x-transition`による切り替えのtransitionに対応して**いません**。

`<template>`タグにはルート要素を1つだけ含めることができます。
