---
order: 2
title: V2からのアップグレード
---

# V2からのアップグレード

Alpine V2からV3への移行は、多くの場合コードを変更せずに行えます。以下は破壊的変更と非推奨APIの一覧です。

> Laravel LivewireとAlpineを組み合わせる場合、Alpine V3にはLivewire v2.5.1以上が必要です。

<a name="breaking-changes"></a>
## 破壊的変更

* [`$el`は常に現在の要素](#el-no-longer-root)
* [`init()`を自動評価](#auto-init)
* [import後に`Alpine.start()`が必要](#need-to-call-alpine-start)
* [`x-show.transition`は`x-transition`](#removed-show-dot-transition)
* [`x-if`は`x-transition`をサポートしない](#x-if-no-transitions)
* [`x-data`のスコープがカスケード](#x-data-scope)
* [`x-init`はcallback returnを受け付けない](#x-init-no-callback)
* [イベントハンドラーの`false`は`preventDefault`しない](#no-false-return-from-event-handlers)
* [`x-spread`は`x-bind`](#x-spread-now-x-bind)
* [`x-ref`はbindingをサポートしない](#x-ref-no-more-dynamic)
* [グローバルライフサイクルイベントを使う](#use-global-events-now)
* [IE11はサポートされない](#no-ie-11)

<a name="el-no-longer-root"></a>
### `$el`は常に現在の要素

`$el`は式が実行された要素を表します。コンポーネントのルートへアクセスするには`$root`を使います。

```html
<!-- V2 --> <div x-data><button @click="console.log($el)"></button></div>
<!-- V3 --> <div x-data><button @click="console.log($root)"></button></div>
```

[→ `$el`について詳しく読む](/magics/el)　[→ `$root`について詳しく読む](/magics/root)

<a name="auto-init"></a>
### データオブジェクトの`init()`を自動評価

V3では`x-data`オブジェクトの`init()`メソッドを自動的に呼び出します。

```html
<!-- V2 --> <div x-data="foo()" x-init="init()"></div>
<!-- V3 --> <div x-data="foo()"></div>
```

[→ init関数について詳しく読む](/globals/alpine-data#init-functions)

<a name="need-to-call-alpine-start"></a>
### import後にAlpine.start()を呼ぶ

NPMからV2をimportしていた場合、V3では`Alpine.start()`を手動で呼びます。

```js
import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()
```

[→ Alpine V3の初期化](/essentials/installation#as-a-module)

<a name="removed-show-dot-transition"></a>
### `x-show.transition`は`x-transition`

```html
<!-- V2 --> <div x-show.transition="open"></div>
<!-- V3 --> <div x-show="open" x-transition></div>
```

[→ x-transitionについて詳しく読む](/directives/transition)

<a name="x-if-no-transitions"></a>
### `x-if`は`x-transition`をサポートしない

transitionを使う要素は`x-show`で管理してください。

```html
<!-- V2 --> <template x-if.transition="open"><div>...</div></template>
<!-- V3 --> <div x-show="open" x-transition>...</div>
```

[→ x-ifについて詳しく読む](/directives/if)

<a name="x-data-scope"></a>
### `x-data`のカスケードスコープ

`x-data`のスコープは、ネストした`x-data`で上書きされない限り、すべての子で利用できます。

<a name="x-init-no-callback"></a>
### `x-init`はcallback returnを受け付けない

初期化後に実行するには`$nextTick()`を使います。

```html
<!-- V2 --> <div x-data x-init="() => { ... }">...</div>
<!-- V3 --> <div x-data x-init="$nextTick(() => { ... })">...</div>
```

[→ `$nextTick`について詳しく読む](/magics/nextTick)

<a name="no-false-return-from-event-handlers"></a>
### イベントハンドラーからのfalseはpreventDefaultしない

V3では`false`をreturnしてもイベントは抑止されません。必要なら`e.preventDefault()`を明示的に呼びます。

[→ x-onについて詳しく読む](/directives/on)

<a name="x-spread-now-x-bind"></a>
### `x-spread`は`x-bind`

ディレクティブをオブジェクトへ抽象化する動作は同じですが、APIは`x-spread`ではなく属性指定のない`x-bind`です。

```html
<!-- V2 --> <button x-spread="trigger">Toggle</button>
<!-- V3 --> <button x-bind="trigger">Toggle</button>
```

[→ x-bindについて詳しく読む](/directives/bind#bind-directives)

<a name="use-global-events-now"></a>
### deferLoadingAlpineの代わりにグローバルイベント

拡張コードは`alpine:init`イベント内で登録します。

<a name="x-ref-no-more-dynamic"></a>
### `x-ref`はbindingをサポートしない

`x-ref`の値を動的にbindingすることはできません。必要に応じて通常のデータプロパティや`$el`を利用してください。

<a name="no-ie-11"></a>
### IE11はサポートされない

Alpine V3はIE11をサポートしません。

<a name="deprecated-apis"></a>
## 非推奨API

<a name="away-replace-with-outside"></a>
### `.away`は`.outside`へ置き換える

```html
<!-- V2 --> <div @click.away="open = false"></div>
<!-- V3 --> <div @click.outside="open = false"></div>
```

<a name="alpine-data-instead-of-global-functions"></a>
### グローバル関数よりAlpine.data()を使う

グローバル関数を`x-data`へ渡す代わりに、`Alpine.data()`で再利用可能なデータプロバイダーを登録します。

```html
<div x-data="dropdown">...</div>
```
