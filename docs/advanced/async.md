---
order: 4
title: Async
---

# Async

Alpineは、標準の関数に対応しているほとんどの場所で、非同期関数をサポートできるように作られています。

たとえば、`x-text`ディレクティブの入力として使う`getLabel()`という単純な関数があるとします。

```js
function getLabel() {
    return 'Hello World!'
}
```
```html
<span x-text="getLabel()"></span>
```

`getLabel`は同期的なので、すべて期待どおりに動作します。

ここで、`getLabel`がラベルを取得するためにネットワークリクエストを行い、瞬時には値を返せない（非同期）とします。`getLabel`をasync関数にすると、JavaScriptの`await`構文を使ってAlpineから呼び出せます。

```js
async function getLabel() {
    let response = await fetch('/api/label')

    return await response.text()
}
```
```html
<span x-text="await getLabel()"></span>
```

また、末尾の括弧なしでAlpineのメソッドを呼び出したい場合は、括弧を省略できます。Alpineが指定された関数が非同期であることを検出し、それに応じて処理します。たとえば次のようにします。

```html
<span x-text="getLabel"></span>
```
