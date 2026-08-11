---
order: 1
title: Mask
description: ユーザーの入力に合わせてテキストフィールドを自動的に整形する
graph_image: https://alpinejs.dev/social_mask.jpg
---

# Maskプラグイン

AlpineのMaskプラグインを使うと、ユーザーの入力に合わせてテキスト入力フィールドを自動的に整形できます。

これは電話番号、クレジットカード、金額、口座番号、日付など、さまざまな入力に便利です。

<a name="installation"></a>
## インストール

このプラグインは、`<script>`タグから読み込むか、NPM経由でインストールして使えます。

### CDN経由

このプラグインのCDNビルドを`<script>`タグとして読み込めます。ただし、AlpineのコアJSファイルより**前**に読み込んでください。

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/mask@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM経由

バンドル内で使うMaskをNPMから次のようにインストールできます。

```shell
npm install @alpinejs/mask
```

次に、バンドルから初期化します。

```js
import Alpine from 'alpinejs'
import mask from '@alpinejs/mask'

Alpine.plugin(mask)

...
```

<a name="x-mask"></a>
## x-mask

このプラグインの主要なAPIは`x-mask`ディレクティブです。

まず、次の単純な日付フィールドの例を見てみましょう。

```html
<input x-mask="99/99/9999" placeholder="MM/DD/YYYY">
```

入力フィールドへ入力するテキストは、`x-mask`で指定した形式に従う必要があります。数字だけに制限されるだけでなく、ユーザーが先に入力しなくてもスラッシュ`/`が自動的に追加されます。

maskでは次のワイルドカード文字を使えます。

| ワイルドカード | 説明 |
| --- | --- |
| `*` | 任意の文字 |
| `a` | アルファベット文字（a-z、A-Z）のみ |
| `9` | 数字（0-9）のみ |

<a name="mask-functions"></a>
## 動的なMask

単純なmaskリテラル（`(999) 999-9999`など）では不十分な場合があります。その場合、`x-mask:dynamic`を使うと、ユーザー入力に基づいてその場でmaskを動的に生成できます。

たとえば、番号が「34」または「37」で始まるかどうか（Amexカードであり、形式が異なることを意味します）によってmaskを変更する必要があるクレジットカード入力は次のようになります。

```html
<input x-mask:dynamic="
    $input.startsWith('34') || $input.startsWith('37')
        ? '9999 999999 99999' : '9999 9999 9999 9999'
">
```

上の例では、ユーザーが入力するたびに、その値が`$input`として式へ渡されます。`$input`に基づいて、フィールドでは異なるmaskが使われます。

「34」で始まる番号と、始まらない番号を入力して試してみてください。

`x-mask:dynamic`は、式の結果として関数も受け取れます。その場合、関数へ最初のパラメーターとして`$input`が自動的に渡されます。たとえば次のようにします。

```html
<input x-mask:dynamic="creditCardMask">

<script>
function creditCardMask(input) {
    return input.startsWith('34') || input.startsWith('37')
        ? '9999 999999 99999'
        : '9999 9999 9999 9999'
}
</script>
```

<a name="money-inputs"></a>
## 金額入力

金額入力用の動的なmask式を自分で書くのはかなり複雑なため、Alpineは組み込みの式を提供し、`$money()`として利用できるようにしています。

完全に動作する金額入力maskは次のとおりです。

```html
<input x-mask:dynamic="$money($input)">
```

小数点とカンマを入れ替えたい場合（通貨によって必要になります）は、2番目のオプションパラメーターを使います。

```html
<input x-mask:dynamic="$money($input, ',')">
```

千の区切り文字を上書きするには、3番目のオプション引数を指定します。

```html
<input x-mask:dynamic="$money($input, '.', ' ')">
```

4番目のオプション引数として任意の桁数を指定すると、デフォルトの小数点以下2桁も上書きできます。

```html
<input x-mask:dynamic="$money($input, '.', ',', 4)">
```
