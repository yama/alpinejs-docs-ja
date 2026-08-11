---
order: 6
title: text
---

# x-text

`x-text`は、指定した式の結果を要素のテキストコンテンツに設定します。

`x-text`を使ってユーザー名を表示する基本的な例を見てみましょう。

```html
<div x-data="{ username: 'calebporzio' }">
    Username: <strong x-text="username"></strong>
</div>
```

これで`<strong>`タグの内部テキストが`calebporzio`に設定されます。
