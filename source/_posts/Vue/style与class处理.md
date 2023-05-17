---
title: tyle与class处理
categories: Linux
tags: Linux
icon: note
---
# style与class处理

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

## classs类名

### 对象语法

```js
<div v-bind:class="{ active: isTrue }"></div>
//通过判断isTrue的布尔值来决定渲染是否有active这个类名
```

绑定数据对象不必再内联定义模板里，可以写在data数据对象里

```js
<div :class="classObject"></div>
//渲染类名为active
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

也可以用computed计算属性来得出

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 数组语法

```js
<div :class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
渲染为
<div class="active text-danger"></div>
```

数组中通过条件渲染类名使用三元表达式

```js
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

数组语法可以嵌套对象语法

```js
<div :class="[{ active: isActive }, errorClass]"></div>
```

## 内联样式

### 对象语法

内联样式的对象语法十分直观(写入时需注意把-符号写为驼峰)

```js
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
//渲染为红色字体大小为30px
data: {
  activeColor: 'red',
  fontSize: 30
}
```

推荐直接绑定到一个对象里，这样会让模板更加清晰，更加直观

```js
<div :style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

### 数组语法

内联样式的数组语法可以将多个对象形式的style引入到一个元素里应用