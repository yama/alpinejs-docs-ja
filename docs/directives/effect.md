---
order: 11
title: effect
---

# x-effect

`x-effect`は、依存しているものの1つが変化したときに式を再評価する便利なディレクティブです。監視するプロパティを指定する必要がなく、式の中で使われているすべてのプロパティを監視するwatcherのようなものだと考えられます。

この定義がわかりにくくても問題ありません。例を通して説明したほうがわかりやすいでしょう。

```html
<div x-data="{ label: 'Hello' }" x-effect="console.log(label)">
    <button @click="label += ' World!'">Change Message</button>
</div>
```

このコンポーネントを読み込むと、`x-effect`式が実行され、`Hello`がコンソールに出力されます。

`x-effect`に含まれるプロパティ参照をAlpineは把握しているため、ボタンをクリックして`label`が変わると、effectが再度実行され、`Hello World!`がコンソールに出力されます。
