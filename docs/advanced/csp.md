---
order: 1
title: CSP
---

# CSP（Content-Security Policy）ビルド

`x-on:click="console.log()"`のようなHTML属性からJavaScript式を実行するため、Alpineは一部のアプリケーションがセキュリティ目的で適用している「unsafe-eval」[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)に違反するユーティリティを使う必要があります。

> 内部では、Alpineは実際には`eval()`自体を使っていません。低速で問題があるためです。代わりに、より優れたFunction宣言を使っていますが、それでも「unsafe-eval」には違反します。

Alpineには、「unsafe-eval」に違反せず、Alpineのインライン式構文のほとんどをサポートする代替ビルドがあります。

<a name="installation"></a>
## インストール

このビルドは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

標準のAlpineビルドと同じように、このビルドのCDNを`<script>`タグとして読み込めます。

```html
<!-- AlpineのCSP対応コア -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/csp@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

このビルドをNPMから次のようにインストールして、バンドル内で使うこともできます。

```shell
npm install @alpinejs/csp
```

次に、バンドルから初期化します。

```js
import Alpine from '@alpinejs/csp'

window.Alpine = Alpine

Alpine.start()
```

<a name="basic-example"></a>
## 基本的な例

AlpineのCSPビルドを使った、動作するカウンターコンポーネントは次のとおりです。ほとんどの式が通常のAlpineとまったく同じように動作することに注目してください。

```html
<html>
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'nonce-a23gbfz9e'">
        <script defer nonce="a23gbfz9e" src="https://cdn.jsdelivr.net/npm/@alpinejs/csp@3.x.x/dist/cdn.min.js"></script>
    </head>
    <body>
        <div x-data="{ count: 0, message: 'Hello' }">
            <button x-on:click="count++">Increment</button>
            <button x-on:click="count = 0">Reset</button>

            <span x-text="count"></span>
            <span x-text="message + ' World'"></span>
            <span x-show="count > 5">Count is greater than 5!</span>
        </div>
    </body>
</html>
```

<a name="whats-supported"></a>
## サポートされているもの

CSPビルドは、Alpineで使いたいと思うようなJavaScript式のほとんどをサポートしています。

### オブジェクトと配列のリテラル
```html
<!-- ✅ これらは動作します -->
<div x-data="{ user: { name: 'John', age: 30 }, items: [1, 2, 3] }">
    <span x-text="user.name"></span>
    <span x-text="items[0]"></span>
</div>
```

### 基本的な演算
```html
<!-- ✅ これらは動作します -->
<div x-data="{ count: 5, name: 'Alpine' }">
    <span x-text="count + 10"></span>
    <span x-text="count > 3"></span>
    <span x-text="count === 5 ? 'Yes' : 'No'"></span>
    <span x-text="'Hello ' + name"></span>
    <div x-show="!loading && count > 0"></div>
</div>
```

### 代入と更新
```html
<!-- ✅ これらは動作します -->
<div x-data="{ count: 0, user: { name: '' } }">
    <button x-on:click="count++">Increment</button>
    <button x-on:click="count = 0">Reset</button>
    <input x-model="user.name">
</div>
```

### メソッド呼び出し
```html
<!-- ✅ これらは動作します -->
<div x-data="{ items: ['a', 'b'] }">
    <button x-on:click="items.push('c')">Add Item</button>
</div>
```

<a name="whats-not-supported"></a>
## サポートされていないもの

一部の高度で、潜在的に危険なJavaScript機能はサポートされていません。

### 複雑な式
```html
<!-- ❌ これらは動作しません -->
<div x-data="{ user: { name: '' } }">
    <!-- プロパティへの代入 -->
    <button x-on:click="user.name = 'John'">Bad</button>

    <!-- Arrow function -->
    <button x-on:click="() => console.log('hi')">Bad</button>

    <!-- 分割代入 -->
    <div x-text="{ name } = user">Bad</div>

    <!-- Template literal -->
    <div x-text="`Hello ${name}`">Bad</div>

    <!-- Spread operator -->
    <div x-data="{ ...defaults }">Bad</div>
</div>
```

### グローバル変数と関数
```html
<!-- ❌ これらは動作しません -->
<div x-data>
    <button x-on:click="console.log('hi')"></button>
    <span x-text="document.title"></span>
    <span x-text="window.innerWidth"></span>
    <span x-text="Math.max(count, 100)"></span>
    <span x-text="parseInt('123') + count"></span>
    <span x-text="JSON.stringify({ value: count })"></span>
</div>
```

### HTMLの注入
```html
<!-- ❌ これらは動作しません -->
<div x-data="{ message: 'Hello <span>World</span>' }">
    <span x-html="message"></span>
    <span x-init="$el.insertAdjacentHTML('beforeend', message)"></span>
</div>
```

<a name="when-to-extract-logic"></a>
## ロジックを取り出すタイミング

CSPビルドは単純なインライン式をサポートしますが、整理しやすくするため、複雑なロジックは専用の関数や`Alpine.data()`コンポーネントへ取り出すとよいでしょう。

```html
<!-- これの代わりに -->
<div x-data="{ users: [] }" x-show="users.filter(u => u.active && u.role === 'admin').length > 0">
```

```html
<!-- 次のようにします -->
<div x-data="userManager" x-show="hasActiveAdmins">

<script nonce="...">
    Alpine.data('userManager', () => ({
        users: [],

        get hasActiveAdmins() {
            return this.users.filter(u => u.active && u.role === 'admin').length > 0
        }
    }))
</script>
```

この方法は、特に複雑なアプリケーションで、コードを読みやすく、テストしやすく、保守しやすくします。

<a name="csp-headers"></a>
## CSPヘッダー

AlpineのCSPビルドで動作するCSPヘッダーの例は次のとおりです。

```
Content-Security-Policy: default-src 'self'; script-src 'nonce-[random]' 'strict-dynamic';
```

重要なのは、nonceベースのスクリプトを実行できるようにしながら、`script-src`ディレクティブから`'unsafe-eval'`を削除することです。
