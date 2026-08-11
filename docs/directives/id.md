---
order: 17
title: id
---

# x-id

`x-id`を使うと、`$id()`で生成する新しいIDのための「スコープ」を宣言できます。文字列の配列（ID名）を受け取り、その内部で生成される各`$id('...')`に、ページ上の他のIDと重複しないsuffixを追加します。

`x-id`は`$id(...)` magicと組み合わせて使うことを想定しています。

この機能について詳しくは、[`$id`のドキュメント](/magics/id)を参照してください。

このディレクティブの簡単な使用例を示します。

```html
<div x-id="['text-input']">
    <label :for="$id('text-input')">Username</label>
    <!-- for="text-input-1" -->

    <input type="text" :id="$id('text-input')">
    <!-- id="text-input-1" -->
</div>

<div x-id="['text-input']">
    <label :for="$id('text-input')">Username</label>
    <!-- for="text-input-2" -->

    <input type="text" :id="$id('text-input')">
    <!-- id="text-input-2" -->
</div>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-id`は使えません。[→ `x-data`について詳しく読む](/directives/data)
