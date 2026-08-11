---
order: 3
title: 拡張
---

# 拡張

Alpineのコードベースは非常に開かれており、さまざまな方法で拡張できます。Alpine自身のすべてのディレクティブとmagicは、これらと同じAPIを使っています。理論上は、これらを使ってAlpineの機能全体を自分で再構築できます。

<a name="lifecycle-concerns"></a>
## ライフサイクルに関する注意

これらのAPIはAlpineによるページ初期化に影響するため、Alpineがダウンロードされ利用可能になった**後**、ページを初期化する**前**に登録する必要があります。バンドルへimportする場合と`<script>`タグで直接読み込む場合で方法が異なります。

<a name="via-script-tag"></a>
### scriptタグ経由

`script`タグでAlpineを読み込む場合は、`alpine:init`イベントリスナー内で拡張コードを登録します。

```html
<html>
    <script src="/js/alpine.js" defer></script>
    <div x-data x-foo></div>
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.directive('foo', ...)
        })
    </script>
</html>
```

外部ファイルへ切り出す場合は、その`<script>`タグをAlpineより**前**に置きます。

<a name="via-npm"></a>
### NPMモジュール経由

バンドルへimportした場合は、`Alpine`グローバルオブジェクトをimportしてから`Alpine.start()`で初期化するまでの間に拡張を登録します。

```js
import Alpine from 'alpinejs'
Alpine.directive('foo', ...)
window.Alpine = Alpine
window.Alpine.start()
```

<a name="custom-directives"></a>
## カスタムディレクティブ

`Alpine.directive()` APIで独自のディレクティブを登録できます。

<a name="method-signature"></a>
### メソッドシグネチャ

```js
Alpine.directive('[name]', (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {})
```

| 引数 | 説明 |
| --- | --- |
| `name` | ディレクティブ名。`foo`なら`x-foo`として使う |
| `el` | ディレクティブが追加されたDOM要素 |
| `value` | コロン以降の値。`x-foo:bar`の`'bar'`など |
| `modifiers` | ドット区切りの追加指定の配列。`x-foo.baz.lob`なら`['baz', 'lob']` |
| `expression` | ディレクティブの属性値。`x-foo="law"`なら`law` |
| `Alpine` | Alpineのグローバルオブジェクト |
| `effect` | このディレクティブがDOMから削除されたとき自動的にクリーンアップされるリアクティブなeffectを作る関数 |
| `cleanup` | ディレクティブ削除時に実行する独自のコールバックを登録する関数 |

<a name="simple-example"></a>
### 簡単な例

`x-uppercase`というディレクティブを作ります。

```js
Alpine.directive('uppercase', el => {
    el.textContent = el.textContent.toUpperCase()
})
```

```html
<div x-data><span x-uppercase>Hello World!</span></div>
```

<a name="evaluating-expressions"></a>
### 式の評価

カスタムディレクティブでは、ユーザーが指定したJavaScript式を評価したいことがあります。Alpineは`evaluate()` APIで、現在の`x-data`スコープを使って式を評価できます。

```html
<div x-data="{ message: 'Hello World!' }"><div x-log="message"></div></div>
```

```js
Alpine.directive('log', (el, { expression }, { evaluate }) => {
    console.log(evaluate(expression))
})
```

<a name="introducing-reactivity"></a>
### リアクティビティの導入

式を評価し、値が変わったときもログへ出すには`evaluateLater()`と`effect()`を使います。

```js
Alpine.directive('log', (el, { expression }, { evaluateLater, effect }) => {
    let getThingToLog = evaluateLater(expression)
    effect(() => {
        getThingToLog(thingToLog => console.log(thingToLog))
    })
})
```

`evaluateLater()`は文字列の式を後で実行できるJavaScript関数へ変換します。複数回評価する場合は、文字列を毎回解釈する`evaluate()`より推奨されます。`effect()`はコールバックを即時実行し、使用した依存関係（この例では`message`）を追跡します。依存関係が変わるたびに再実行されるため、これがリアクティビティです。

`Alpine.effect()`ではなく引数で渡された`effect`を使うのは、ディレクティブがDOMから削除されたとき自動でクリーンアップされるためです。

[→ Alpineのリアクティビティについて詳しく読む](/advanced/reactivity)

`evaluateLater()`は結果を直ちに返さず、受け取り用コールバックを要求します。これにより`await getMessage()`のような非同期式にも対応できます。

[→ Alpineの非同期処理について詳しく読む](/advanced/async)

<a name="cleaning-up"></a>
### クリーンアップ

カスタムディレクティブでイベントリスナーを登録した場合、要素が削除されたらリスナーも削除したいはずです。`cleanup`へコールバックを渡します。

```js
Alpine.directive('...', (el, {}, { cleanup }) => {
    let handler = () => {}
    window.addEventListener('click', handler)
    cleanup(() => window.removeEventListener('click', handler))
})
```

<a name="custom-order"></a>
### カスタム順序

新しいディレクティブは、通常、標準ディレクティブの大部分（`x-teleport`を除く）の後に実行されます。特定のディレクティブより前に実行するには、`Alpine.directive()`へ`.before()`をチェーンします。

```js
Alpine.directive('foo', (el) => {
    Alpine.addScopeToNode(el, { foo: 'bar' })
}).before('bind')
```

ディレクティブ名には`x-`接頭辞を付けません。

<a name="custom-magics"></a>
## カスタムmagic

`Alpine.magic()`で`$`接頭辞を持つプロパティやメソッドを登録できます。

<a name="magic-properties"></a>
### Magicプロパティ

```js
Alpine.magic('now', () => new Date())
```

`$now`としてすべてのAlpineコードから利用できます。要素へアクセスする必要がある場合は`(el, { Alpine })`を受け取ります。

<a name="magic-functions"></a>
### Magic関数

```js
Alpine.magic('clipboard', el => value => {
    navigator.clipboard.writeText(value)
})
```

この例は`$clipboard('コピーする内容')`として利用できます。

<a name="writing-and-sharing-plugins"></a>
## プラグインの作成と共有

拡張を他のアプリケーションでも使う場合は、プラグイン関数として公開します。プラグイン関数には`Alpine`オブジェクトが渡されるので、その中でディレクティブやmagicを登録できます。

<a name="script-include"></a>
### scriptで読み込む

```js
document.addEventListener('alpine:init', () => {
    Alpine.plugin((Alpine) => {
        Alpine.directive('foo', ...)
        Alpine.magic('bar', ...)
    })
})
```

<a name="bundle-module"></a>
### バンドルモジュール

```js
export default function (Alpine) {
    Alpine.directive('foo', ...)
    Alpine.magic('bar', ...)
}
```

```js
import Alpine from 'alpinejs'
import plugin from './plugin'
Alpine.plugin(plugin)
window.Alpine = Alpine
Alpine.start()
```
