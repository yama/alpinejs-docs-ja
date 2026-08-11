---
order: 7
title: modelable
---

# x-modelable

`x-modelable`を使うと、Alpineの任意のプロパティを`x-model`ディレクティブの対象として公開できます。

`x-modelable`を使って変数を公開し、`x-model`でバインドする簡単な例を見てみましょう。

```html
<div x-data="{ number: 5 }">
    <div x-data="{ count: 0 }" x-modelable="count" x-model="number">
        <button @click="count++">Increment</button>
    </div>

    Number: <span x-text="number"></span>
</div>
```

このように、外側のスコープのプロパティ「number」が内側のスコープのプロパティ「count」にバインドされます。

通常、この機能はLaravel Bladeのようなバックエンドのテンプレートフレームワークと組み合わせて使います。Alpineコンポーネントをバックエンドテンプレートの中に抽象化し、ネイティブの入力であるかのように`x-model`を通して状態を外部へ公開するのに便利です。
