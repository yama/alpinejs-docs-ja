---
order: 11
title: ref
---

# x-ref

`x-ref`は`$refs`と組み合わせることで、DOM要素へ直接簡単にアクセスできる便利なユーティリティです。`getElementById`や`querySelector`などのAPIの代わりとして特に役立ちます。

```html
<button @click="$refs.text.remove()">Remove Text</button>

<span x-ref="text">Hello 👋</span>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-ref`は使えません。[→ `x-data`について詳しく読む](/directives/data)
