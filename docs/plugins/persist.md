---
order: 4
title: Persist
description: localStorageを使ってページ読み込み間でデータを簡単に保持する
graph_image: https://alpinejs.dev/social_persist.jpg
---

# Persistプラグイン

AlpineのPersistプラグインを使うと、ページを読み込んだ後もAlpineの状態を保持できます。

これは、検索フィルター、アクティブなタブなど、ページを更新したり離れて再び戻ったりしたときに設定がリセットされるとユーザーが困る機能を保持する場合に便利です。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うPersistをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/persist
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

Alpine.plugin(persist)

...
```

<a name="magic-persist"></a>
## $persist

このプラグインの主要なAPIは`$persist` magic methodです。

次のように`x-data`内の任意の値を`$persist`でラップすると、ページ読み込み間でその値を保持できます。

```html
<div x-data="{ count: $persist(0) }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

上の例では、`0`を`$persist()`でラップしているため、Alpineは`count`への変更を検知し、ページ読み込み間で保持します。

上の例で「count」を増やしてからページを更新し、「count」が状態を維持して`0`にリセットされないことを確認できます。

<a name="how-it-works"></a>
## どのように動作するか

値が`$persist`でラップされていると、初期化時にAlpineがその値用のwatcherを登録します。その値が何らかの理由で変更されるたびに、Alpineは新しい値を[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)に保存します。

ページが再読み込みされると、Alpineはプロパティ名をキーとしてlocalStorage内の値を確認します。値が見つかった場合、直ちにlocalStorageからプロパティの値を設定します。

ブラウザーの開発者ツールにあるlocalStorageビューアーを開くと、この動作を確認できます。

<a href="https://developer.chrome.com/docs/devtools/storage/localstorage/"><img src="https://alpinejs.dev/img/persist_devtools.png" alt="countが0に設定されたlocalStorageビューを表示するChrome DevTools"></a>

このページを訪れただけで、Alpineがすでに「count」の値をlocalStorageに設定していることがわかります。また、localStorageを使う他のツールとAlpineが競合しないよう名前空間を設定するため、プロパティ名「count」に`_x_`を付けていることもわかります。

次の例で「count」を変更し、AlpineがlocalStorageへ行った変更を確認してみましょう。

```html
<div x-data="{ count: $persist(0) }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

> `$persist`はプリミティブ値だけでなく、配列やオブジェクトにも対応しています。ただし、変数の型を変更した場合はlocalStorageを消去する必要があります。<br>
> 先ほどの例で、countを`$persist({ value: 0 })`に変更した場合、localStorageを消去するか、変数`count`の名前を変更する必要があります。

<a name="custom-key"></a>
## カスタムキーを設定する

デフォルトでは、Alpineは`$persist(...)`が代入されるプロパティのキー（上の例では「count」）を使います。

複数のAlpineコンポーネントがページ間、または同じページ上で、すべてプロパティキーとして「count」を使っている状況を考えてみましょう。

Alpineには、これらのコンポーネントを区別する方法がありません。

このような場合は、次のように`.as` modifierを使って、保持する値に独自のカスタムキーを設定できます。

```html
<div x-data="{ count: $persist(0).as('other-count') }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

これでAlpineは、上の「count」の値をキー「other-count」を使って保存・取得します。

Chrome DevToolsで確認すると次のようになります。

<img src="https://alpinejs.dev/img/persist_custom_key_devtools.png" alt="countが0に設定されたlocalStorageビューを表示するChrome DevTools">

<a name="custom-storage"></a>
## カスタムストレージを使う

デフォルトではデータはlocalStorageに保存され、有効期限はなく、ページを閉じても保持されます。

ユーザーがタブを閉じたらデータを消去したい場合を考えます。この場合は、次のように`.using` modifierを使ってsessionStorageにデータを保持できます。

```html
<div x-data="{ count: $persist(0).using(sessionStorage) }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

getItem関数とsetItem関数を公開する独自のストレージオブジェクトを定義することもできます。たとえば、session cookieをストレージとして使うこともできます。

```html
<script>
    window.cookieStorage = {
        getItem(key) {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].split("=");
                if (key == cookie[0].trim()) {
                    return decodeURIComponent(cookie[1]);
                }
            }
            return null;
        },
        setItem(key, value) {
            document.cookie = key+' = '+encodeURIComponent(value)
        }
    }
</script>

<div x-data="{ count: $persist(0).using(cookieStorage) }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

<a name="using-persist-with-alpine-data"></a>
## Alpine.dataで$persistを使う

`Alpine.data`で`$persist`を使いたい場合は、arrow functionではなく通常の関数を使う必要があります。これにより、Alpineはコンポーネントのスコープを最初に評価するとき、カスタム`this`コンテキストをバインドできます。

```js
Alpine.data('dropdown', function () {
    return {
        open: this.$persist(false)
    }
})
```

<a name="using-alpine-persist-global"></a>
## Alpine.$persistグローバルを使う

`Alpine.$persist`はグローバルに公開されているため、`x-data`コンテキストの外部でも使えます。`Alpine.store`など、他のソースからデータを保持する場合に便利です。

```js
Alpine.store('darkMode', {
    on: Alpine.$persist(true).as('darkMode_on')
});
```
