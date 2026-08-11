---
order: 9
title: Sort
description: マウスでドラッグして要素を簡単に並べ替える
graph_image: https://alpinejs.dev/social_sort.jpg
---

# Sortプラグイン

AlpineのSortプラグインを使うと、マウスでドラッグして要素を簡単に並べ替えられます。カンバンボード、ToDoリスト、並べ替え可能な表の列などに便利です。ドラッグ機能は[SortableJS](https://github.com/SortableJS/Sortable)が提供します。

<a name="installation"></a>
## インストール

### CDN経由

プラグインはAlpineのコアJSより**前**に読み込んでください。

```html
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/sort@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

```shell
npm install @alpinejs/sort
```

```js
import Alpine from 'alpinejs'
import sort from '@alpinejs/sort'
Alpine.plugin(sort)
...
```

<a name="basic-usage"></a>
## 基本的な使い方

`x-sort`を要素に追加すると、子要素のうち`x-sort:item`を持つものが並べ替え可能になります。

```html
<ul x-sort>
    <li x-sort:item>foo</li>
    <li x-sort:item>bar</li>
    <li x-sort:item>baz</li>
</ul>
```

<a name="sort-handlers"></a>
## Sortハンドラー

`x-sort`へハンドラー関数を渡し、各項目の`x-sort:item`にキーを指定すると、並べ替えの変更へ反応できます。次の例では、項目のキーと新しい位置をアラート表示します。

```html
<ul x-sort="alert($item + ' - ' + $position)">
    <li x-sort:item="1">foo</li>
    <li x-sort:item="2">bar</li>
    <li x-sort:item="3">baz</li>
</ul>
```

ハンドラーでは`$item`（移動した項目のキー）と`$position`（新しい位置）を利用できます。

<a name="sorting-groups"></a>
## グループの並べ替え

複数のリストを同じグループにすると、項目をリスト間で移動できます。`x-sort="group"`のように同じグループ名を指定してください。

```html
<div x-sort="kanban">
    <div x-sort:item="todo-1">対応待ち</div>
</div>
<div x-sort="kanban">
    <div x-sort:item="done-1">完了</div>
</div>
```

<a name="drag-handles"></a>
## ドラッグハンドル

項目全体ではなく特定の要素からだけドラッグを開始するには、`x-sort:handle`を使います。

```html
<ul x-sort>
    <li x-sort:item>
        <span x-sort:handle class="cursor-move">☷</span>
        項目
    </li>
</ul>
```

<a name="ignoring-elements"></a>
## 要素を無視する

項目内のボタンや入力からドラッグを開始したくない場合は、`x-sort:ignore`を追加します。要素は通常どおり動作しますが、ドラッグ操作からは除外されます。

```html
<ul x-sort>
    <li x-sort:item>
        項目
        <button x-sort:ignore>編集</button>
    </li>
</ul>
```

<a name="ghost-elements"></a>
## ゴースト要素

ドラッグ中は元の位置に空きが残ります。空きの代わりに元の要素のゴーストを表示するには`x-sort.ghost`を使います。

```html
<ul x-sort.ghost>
    <li x-sort:item>foo</li>
    <li x-sort:item>bar</li>
    <li x-sort:item>baz</li>
</ul>
```

<a name="ghost-styling"></a>
### ゴースト要素のスタイル

ドラッグ中のゴーストには`.sortable-ghost` CSSクラスが付与されます。

```html
<style>.sortable-ghost { opacity: .5 !important; }</style>
```

<a name="sorting-class"></a>
## bodyの並べ替えクラス

ドラッグ中は`body`に`.sortable-drag`クラスが付与されます。このクラスを使って、ドラッグ中だけページ全体のスタイルを変更できます。

<a name="css-hover-bug"></a>
## CSSのhoverに関する問題

ドラッグ中にCSSの`:hover`スタイルが意図せず適用されるブラウザーでは、`x-sort`に`.disable`を指定して必要なスタイルを無効化するか、ドラッグ中のクラスを使って調整してください。

<a name="custom-configuration"></a>
## カスタム設定

`x-sort`へ設定オブジェクトを渡すことで、SortableJSの設定をカスタマイズできます。たとえばアニメーション時間やドラッグ開始までの遅延を設定できます。

```html
<ul x-sort="{ animation: 150, delay: 100 }">
    <li x-sort:item>foo</li>
    <li x-sort:item>bar</li>
</ul>
```
