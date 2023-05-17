---
title: Vue表单
categories: Linux
tags: Linux
icon: note
---
# Vue表单

v-model模板语法在之前讲过，但是我们现在要讲一下模板语法的原理及实现

`v-model` 指令在表单 `<input>`(输入框)、`<textarea>` (文本域)及 `<select>`(单多选框) 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

## 文本处理

单行文本处理

```js
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

多行文本处理(文本域)

```js
<span>Multiline message is:</span>
<p>{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效，应用 `v-model` 来代替。

```js
<!-- 错误 -->
<textarea>{{ text }}</textarea>

<!-- 正确 -->
<textarea v-model="text"></textarea>
```

## 选框

单个选框

此时cheked变量值为布尔值，选中时为true，反之则为false

```js
<input v-model="checked" />
<label>{{ checked }}</label>
```

多个选框

当多个选框时，那么这些值则可以为一个数组，数组的内容为标签内容的value值

```js
<input type="checkbox" value="Jack" v-model="checkedNames">
<label>Jack</label>

<input type="checkbox" value="John" v-model="checkedNames">
<label>John</label>

<input type="checkbox" value="Mike" v-model="checkedNames">
<label>Mike</label>

  data() {
    return {
      checkedNames: []
    }
  }
//上述三个选框绑定的是checkedNames数组，当选中时数组会自动增加选中的选框的value值，同理，当数组原有值符合选框的value值时，也会自动勾选(可以通过事件方式push数组来选中)
```

## 按钮

picked为一个变量，当选择时，变量则获取到被选中的标签的value值(单选按钮不能单独存在，如果单独存在，那么则选中后不可被取消)

```js
<div>Picked: {{ picked }}</div>

<input type="radio" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" value="Two" v-model="picked" />
<label for="two">Two</label>
```

## 下拉框(选择器)

### 单值

需要注意的是 下来框的v-model是绑定在select上的，而且在Vue里，option属性上如果没有绑定value值时，则以option里的值为准，如果设置Value值时，则以Value值为准

>如果 `v-model` 表达式的初始值不匹配任何一个选择项，`<select>` 元素会渲染成一个“未选择”的状态。在 iOS 上，这将导致用户无法选择第一项，因为 iOS 在这种情况下不会触发一个 change 事件。因此，我们建议提供一个空值的禁用选项，如上面的例子所示。

```js
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

### 多值

当多值时需要绑定一个数组作为v-model值，选中的值会被反馈push到数组里

```js
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

## 修饰符

#### .lazy

默认情况下，`v-model` 会在每次 `input` 事件后更新数据。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

意思就是，双向数据绑定会延迟，只有当输入完成，也就是输入框失去焦点时才会更新数据

```js
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

#### .number

number修饰符可以把用户输入的数据转换为数值型，本质是字符串的`parseFloat()`方法，当无法被转换为数值型时则返回原值

`.number` 修饰符会在输入框有 `type="number"` 时自动启用。

```js
<input v-model.number="age" />
```

#### .trim

如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim` 修饰符

```js
<input v-model.trim="msg" />
```

