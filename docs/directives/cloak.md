---
order: 12
title: cloak
---

# x-cloak

テンプレートの一部にAlpineJSを使っていると、ページの読み込み後、Alpineの読み込み前に、初期化されていないテンプレートが一瞬見えることがあります。

`x-cloak`は、ページ上のAlpineの読み込みが完全に終わるまで、指定した要素を非表示にすることでこの問題に対処します。

ただし、`x-cloak`を動作させるには、ページに次のCSSを追加する必要があります。

```css
[x-cloak] { display: none !important; }
```

次の例では、`x-show`が明示的にtrueに設定されるまで`<span>`タグを非表示にし、Alpineの読み込み中に非表示要素が画面に一瞬表示されるのを防ぎます。

```html
<span x-cloak x-show="false">This will not 'blip' onto screen at any point</span>
```

`x-cloak`は`x-show`や`x-if`で非表示にする要素だけに使えるわけではありません。データを含む要素も、データが正しく設定されるまで非表示にできます。次の例では、Alpineが`message`プロパティをテキストコンテンツに設定するまで`<span>`タグを非表示にします。

```html
<span x-cloak x-text="message"></span>
```

Alpineがページ上で読み込まれると、要素からすべての`x-cloak`属性を削除します。これにより、CSSで適用されていた`display: none;`も取り除かれ、要素が表示されます。

## グローバル構文の代替

同じ動作を実現しつつ、グローバルスタイルを含めたくない場合は、次の便利ですが少し変わった方法を使えます。

```html
<template x-if="true">
    <span x-text="message"></span>
</template>
```

これは`x-if`の動作を利用するだけで、`x-cloak`と同じ目的を達成します。

`<template>`要素はブラウザーではデフォルトで「非表示」なので、Alpineが`x-if="true"`を描画して表示できるようになるまで`<span>`は見えません。

繰り返しになりますが、この方法がすべての人に適しているわけではありません。ただ、特殊なケースのために言及しておく価値はあります。
