---
order: 7
title: model
---

# x-model

`x-model`を使うと、入力要素の値をAlpineのデータにバインドできます。

以下は、`x-model`を使ってテキストフィールドの値をAlpineのデータにバインドする簡単な例です。

```html
<div x-data="{ message: '' }">
    <input type="text" x-model="message">

    <span x-text="message"></span>
</div>
```

テキストフィールドに入力すると、`message`が`<span>`要素に反映されます。

`x-model`は双方向バインディングです。つまり、データを「設定」するだけでなく「取得」もします。データが変更されると、要素にもその変更が反映されます。

先ほどと同じ例に、`message`プロパティの値を変更するボタンを追加してみましょう。

```html
<div x-data="{ message: '' }">
    <input type="text" x-model="message">

    <button x-on:click="message = 'changed'">Change Message</button>
</div>
```

この場合、`<button>`をクリックすると、入力要素の値がすぐに「changed」に更新されます。

`x-model`は次の入力要素で使用できます。

* `<input type="text">`
* `<textarea>`
* `<input type="checkbox">`
* `<input type="radio">`
* `<select>`
* `<input type="range">`

<a name="text-inputs"></a>
## テキスト入力

```html
<input type="text" x-model="message">

<span x-text="message"></span>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-model`は使用できません。[→ `x-data`について詳しく読む](https://alpinejs.dev/directives/data)

<a name="textarea-inputs"></a>
## テキストエリア入力

```html
<textarea x-model="message"></textarea>

<span x-text="message"></span>
```

<a name="checkbox-inputs"></a>
## チェックボックス入力

<a name="single-checkbox-with-boolean"></a>
### booleanを使った単一のチェックボックス

```html
<input type="checkbox" id="checkbox" x-model="show">

<label for="checkbox" x-text="show"></label>
```

<a name="multiple-checkboxes-bound-to-array"></a>
### 配列にバインドした複数のチェックボックス

```html
<input type="checkbox" value="red" x-model="colors">
<input type="checkbox" value="orange" x-model="colors">
<input type="checkbox" value="yellow" x-model="colors">

Colors: <span x-text="colors"></span>
```

<a name="radio-inputs"></a>
## ラジオボタン入力

```html
<input type="radio" value="yes" x-model="answer">
<input type="radio" value="no" x-model="answer">

Answer: <span x-text="answer"></span>
```

<a name="select-inputs"></a>
## セレクト入力

<a name="single-select"></a>
### 単一選択

```html
<select x-model="color">
    <option>Red</option>
    <option>Orange</option>
    <option>Yellow</option>
</select>

Color: <span x-text="color"></span>
```

<a name="single-select-with-placeholder"></a>
### placeholder付きの単一選択

```html
<select x-model="color">
    <option value="" disabled>Select A Color</option>
    <option>Red</option>
    <option>Orange</option>
    <option>Yellow</option>
</select>

Color: <span x-text="color"></span>
```

<a name="multiple-select"></a>
### 複数選択

```html
<select x-model="color" multiple>
    <option>Red</option>
    <option>Orange</option>
    <option>Yellow</option>
</select>

Colors: <span x-text="color"></span>
```

<a name="dynamically-populated-select-options"></a>
### 動的に生成するセレクトのoption

```html
<select x-model="color">
    <template x-for="color in ['Red', 'Orange', 'Yellow']">
        <option x-text="color"></option>
    </template>
</select>

Color: <span x-text="color"></span>
```

<a name="range-inputs"></a>
## 範囲入力

```html
<input type="range" x-model="range" min="0" max="1" step="0.1">

<span x-text="range"></span>
```

<a name="modifiers"></a>
## Modifier

<a name="lazy"></a>
### `.lazy`

テキスト入力では、デフォルトで`x-model`はキーストロークごとにプロパティを更新します。`.lazy` modifierを追加すると、入力要素からフォーカスが外れたときにだけ`x-model`入力のプロパティを更新できます。

これはリアルタイムのフォームバリデーションなどで便利です。入力欄から「タブで移動」するまで入力バリデーションのエラーを表示したくない場合に使えます。

```html
<input type="text" x-model.lazy="username">
<span x-show="username.length > 20">The username is too long.</span>
```

<a name="change"></a>
### `.change`

`.change`は、入力要素のフォーカスが外れ、かつ値が変わったとき（ネイティブの`change`イベントが発生したとき）だけデータを同期します。機能的には`.lazy`と同じです。

```html
<input type="text" x-model.change="username">
```

<a name="blur"></a>
### `.blur`

`.blur`は、値が変わったかどうかにかかわらず、入力要素のフォーカスが外れたときにデータを同期します。

```html
<input type="text" x-model.blur="email">
```

<a name="enter"></a>
### `.enter`

`.enter`は、ユーザーがEnterキーを押したときにデータを同期します。ユーザーが明示的に送信したときだけアクションを実行したい検索フィールドなどで便利です。

```html
<input type="text" x-model.enter="search">
```

> 注意：`.enter`はデフォルトの動作を防ぎません。入力要素がフォーム内にある場合、フォームは通常どおり送信されます。

<a name="combining-event-modifiers"></a>
### Event modifierの組み合わせ

`.change`、`.blur`、`.enter` modifierは組み合わせて、複数のイベントで同期できます。ユーザーがデータを送信する方法に柔軟性を持たせたい場合に便利です。

```html
<!-- Sync on blur OR enter -->
<input type="text" x-model.blur.enter="search" placeholder="Press Enter or click away">

<!-- Sync on change, blur, OR enter -->
<input type="text" x-model.change.blur.enter="message">
```

<a name="number"></a>
### `.number`

デフォルトでは、`x-model`によってプロパティに保存されるデータは文字列です。`.number` modifierを追加すると、Alpineが値をJavaScriptの数値として保存するようになります。

```html
<input type="text" x-model.number="age">
<span x-text="typeof age"></span>
```

<a name="boolean"></a>
### `.boolean`

デフォルトでは、`x-model`によってプロパティに保存されるデータは文字列です。`.boolean` modifierを追加すると、Alpineが値をJavaScriptのbooleanとして保存するようになります。整数（1/0）と文字列（true/false）のどちらも有効なboolean値です。

```html
<select x-model.boolean="isActive">
    <option value="true">Yes</option>
    <option value="false">No</option>
</select>
<span x-text="typeof isActive"></span>
```

<a name="debounce"></a>
### `.debounce`

`x-model`に`.debounce`を追加すると、バインドされた入力の更新を簡単にdebounceできます。

検索プロパティが変わるたびにサーバーから新しいデータを取得するような、リアルタイム検索の入力欄などで便利です。

```html
<input type="text" x-model.debounce="search">
```

デフォルトのdebounce時間は250ミリ秒です。次のように時間modifierを追加すれば、簡単にカスタマイズできます。

```html
<input type="text" x-model.debounce.500ms="search">
```

<a name="throttle"></a>
### `.throttle`

`.debounce`と同様に、`x-model`によるプロパティの更新を指定した間隔に制限できます。

```html
<input type="text" x-model.throttle="search">
```

デフォルトのthrottle間隔は250ミリ秒です。次のように時間modifierを追加すれば、簡単にカスタマイズできます。

```html
<input type="text" x-model.throttle.500ms="search">
```

<a name="fill"></a>
### `.fill`

デフォルトでは、入力要素にvalue属性がある場合、Alpineはそれを無視し、`x-model`でバインドされたプロパティの値を入力要素に設定します。

ただし、バインドされたプロパティが空の場合は、`.fill` modifierを追加することで、入力要素のvalue属性を使ってプロパティを設定できます。

```html
<div x-data="{ message: null }">
  <input type="text" x-model.fill="message" value="This is the default message.">
</div>
```

<a name="programmatic access"></a>
## プログラムからのアクセス

Alpineは、`x-model`でバインドされたプロパティを取得・設定するための内部ユーティリティを公開しています。これは、デフォルトの`x-model`の動作を上書きしたい複雑なAlpineユーティリティや、入力要素以外の要素で`x-model`を使えるようにしたい場合に便利です。

`x-model`でバインドされた要素の`_x_model`というプロパティから、これらのユーティリティにアクセスできます。`_x_model`には、バインドされたプロパティを取得・設定する2つのメソッドがあります。

* `el._x_model.get()`（バインドされたプロパティの値を返す）
* `el._x_model.set()`（値をバインドされたプロパティに設定する）

```html
<div x-data="{ username: 'calebporzio' }">
    <div x-ref="div" x-model="username"></div>

    <button @click="$refs.div._x_model.set('phantomatrix')">
        Change username to: 'phantomatrix'
    </button>

    <span x-text="$refs.div._x_model.get()"></span>
</div>
```
