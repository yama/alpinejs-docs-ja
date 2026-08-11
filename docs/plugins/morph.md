---
order: 8
title: Morph
description: 要素を指定したHTMLへモーフィングする
graph_image: https://alpinejs.dev/social_morph.jpg
---

# Morphプラグイン

AlpineのMorphプラグインは、要素内のブラウザーやAlpineの状態を保持したまま、ページ上の要素を指定したHTMLテンプレートへ「モーフィング」します。

サーバーリクエストでHTMLを更新しながら、ページ上のAlpineの状態を失わずに済むため便利です。このような仕組みは[Laravel Livewire](https://laravel-livewire.com/)や[Phoenix LiveView](https://dockyard.com/blog/2018/12/12/phoenix-liveview-interactive-real-time-apps-no-need-to-write-javascript)のようなフルスタックフレームワークの中核でもあります。

<a name="installation"></a>
## インストール

このプラグインは`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/morph@3.x.x/dist/cdn.min.js"></script>
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

```shell
npm install @alpinejs/morph
```

```js
import Alpine from 'alpinejs'
import morph from '@alpinejs/morph'

window.Alpine = Alpine
Alpine.plugin(morph)

...
```

<a name="alpine-morph"></a>
## Alpine.morph()

`Alpine.morph(el, newHtml)`は、渡されたHTMLをもとにDOMノードを命令的にモーフィングします。

| パラメーター | 説明 |
| --- | --- |
| `el` | ページ上のDOM要素 |
| `newHtml` | 要素のモーフィング先テンプレートとして使うHTML文字列 |
| `options`（任意） | 主に[ライフサイクルフック](#lifecycle-hooks)を注入するためのオプションオブジェクト |

実際のアプリケーションでは、この新しいHTMLはサーバーから返されることが多いでしょう。

```html
<div x-data="{ message: '変更してからボタンを押してください' }">
    <input type="text" x-model="message">
    <span x-text="message"></span>
</div>
<button>モーフィングを実行</button>
<script>
document.querySelector('button').addEventListener('click', () => {
    let el = document.querySelector('div')
    Alpine.morph(el, `
        <div x-data="{ message: '変更してからボタンを押してください' }">
            <h2>新しい要素が追加されました</h2>
            <input type="text" x-model="message">
            <span x-text="message"></span>
            <h2>それでもコンポーネントの状態は変わっていません。</h2>
        </div>
    `)
})
</script>
```

モーフィングは現在のDOMと新しいHTMLを比較し、新しい要素を追加しながら、既存コンポーネントの状態を保持します。

<a name="lifecycle-hooks"></a>
### ライフサイクルフック

Morphは、現在の要素と渡されたHTMLという2つのDOMツリーを比較します。両方のツリーを同時にたどり、ノードと子要素を比較し、差異があれば現在のDOMツリーを渡されたツリーに合わせて「パッチ」します。

デフォルトのアルゴリズムは高機能ですが、ライフサイクルへ介入して動作を観察・変更したい場合があります。

| パラメーター | 説明 |
| --- | --- |
| `el` | 実際にページ上にある、パッチ対象の現在のDOM要素 |
| `toEl` | パッチ後の`el`を表す一時的なテンプレート要素。ページ上には存在しません |
| `childrenOnly()` | 現在の要素を飛ばし、子要素だけをパッチする関数 |
| `skip()` | 現在の要素自身と子要素の比較・パッチを飛ばす関数 |

利用できるフックは`Alpine.morph(..., options)`の第3引数へ渡します。

| オプション | 説明 |
| --- | --- |
| `updating(el, toEl, childrenOnly, skip)` | `el`を`toEl`へパッチする前に呼び出す |
| `updated(el, toEl)` | `el`のパッチ後に呼び出す |
| `removing(el, skip)` | live DOMから要素を削除する前に呼び出す |
| `removed(el)` | 要素の削除後に呼び出す |
| `adding(el, skip)` | 新しい要素を追加する前に呼び出す |
| `added(el)` | live DOMツリーへの追加後に呼び出す |
| `key(el)` | 比較前にツリー内の要素を「キー付け」する再利用可能な関数 |
| `lookahead` | 削除される要素を後続要素へ移動すべきか先読みするboolean |

```js
Alpine.morph(el, newHtml, {
    updating(el, toEl, childrenOnly, skip) {},
    updated(el, toEl) {},
    removing(el, skip) {},
    removed(el) {},
    adding(el, skip) {},
    added(el) {},
    key(el) { return el.id },
    lookahead: true, // デフォルト: false
})
```

<a name="keys"></a>
### キー

DOM差分ユーティリティは元のDOMを新しいHTMLへ正確にモーフィングしようとしますが、要素を変更すべきか完全に置き換えるべきか判断できない場合があります。Morphのキーシステムを使うと、置き換えずに保持する要素を強制できます。

特にループ内の兄弟要素のリストで役立ちます。

キーを使うと両方のツリーで要素を対応付け、`<ul>`内で要素を移動できます。`key:`設定オプションでキーの判定方法を変更できます。

キーがない場合、Morphは次の変更を「各`li`の内容が変わった」と解釈します。

```html
<!-- ページ上のlive DOM -->
<ul>
    <li>Mark</li>
    <li>Tom</li>
    <li>Travis</li>
</ul>

<!-- モーフィング先 -->
<ul>
    <li>Travis</li>
    <li>Mark</li>
    <li>Tom</li>
</ul>
```

キーを付けると、元の要素を保持して順序だけを移動できます。

```html
<!-- ページ上のlive DOM -->
<ul>
    <li key="1">Mark</li>
    <li key="2">Tom</li>
    <li key="3">Travis</li>
</ul>

<!-- モーフィング先 -->
<ul>
    <li key="3">Travis</li>
    <li key="1">Mark</li>
    <li key="2">Tom</li>
</ul>
```

<a name="alpine-morph-between"></a>
## Alpine.morphBetween()

`Alpine.morphBetween(startMarker, endMarker, newHtml, options)`は、2つのマーカー要素の間にあるDOMノード範囲を、渡されたHTMLをもとにモーフィングします。単一のルートノードを用意せず、DOMの特定部分だけを更新したい場合に便利です。

| パラメーター | 説明 |
| --- | --- |
| `startMarker` | 範囲の開始を示すDOMノード（通常はコメントノード） |
| `endMarker` | 範囲の終了を示すDOMノード（通常はコメントノード） |
| `newHtml` | マーカー間の内容を置き換えるHTML文字列またはDOM要素 |
| `options` | `Alpine.morph()`と同じオプション |
