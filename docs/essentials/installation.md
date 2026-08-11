---
order: 1
title: インストール
---

# インストール

Alpineをプロジェクトに組み込む方法は2つあります：

* `<script>`タグから読み込む
* モジュールとしてインポートする

どちらも問題なく使えます。プロジェクトの要件と開発者の好みによって決まります。

<a name="from-a-script-tag"></a>
## scriptタグから読み込む

これはAlpineを始める最も簡単な方法です。次の`<script>`タグをHTMLページのheadに含めてください。

```html
<html>
    <head>
        ...

        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    </head>
    ...
</html>
```

> `<script>`タグの`defer`属性を忘れないでください。

指定したCDNリンクにある`@3.x.x`に注目してください。これはAlpineのバージョン3の最新バージョンを取得します。本番環境で安定性を確保するには、CDNリンクに最新バージョンを明示的に指定することをおすすめします。

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.16.0/dist/cdn.min.js"></script>
```

これで完了です！ページ内でAlpineを使えるようになりました。

ただし、Alpine.jsの属性を動作させるには、`x-data`を使ってコンポーネントを定義する必要があります。詳しくは<https://github.com/alpinejs/alpine/discussions/3805>を参照してください。

<a name="as-a-module"></a>
## モジュールとして使う

より堅牢な方法を好む場合は、NPMでAlpineをインストールし、バンドルにインポートできます。

次のコマンドを実行してインストールします。

```shell
npm install alpinejs
```

次のようにAlpineをバンドルにインポートして初期化します。

```js
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()
```

> `window.Alpine = Alpine`の部分は任意ですが、自由度と柔軟性のために便利です。たとえば、devtoolsでAlpineを試すときに役立ちます。

> Alpineをバンドルにインポートした場合は、`Alpine`グローバルオブジェクトをインポートしてから`Alpine.start()`を呼び出して初期化するまでの間に、拡張コードを登録する必要があります。

> `Alpine.start()`はページごとに一度だけ呼び出してください。複数回呼び出すと、Alpineの複数の「インスタンス」が同時に実行されます。


[→ Alpineの拡張について詳しく読む](/advanced/extending)
