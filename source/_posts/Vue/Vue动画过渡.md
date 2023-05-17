---
title: Vue动画过渡
categories: Linux
tags: Linux
icon: note
---
# Vue动画过渡

在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

>作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。
>
>写法：准备好样式
>
>元素进入的样式：
>
>1. v-enter：进入的起点
>2. v-enter-active：进入过程中
>3. v-enter-to：进入的终点
>
>元素离开的样式：
>
>1. v-leave：离开的起点
>2. v-leave-active：离开过程中
>3. v-leave-to：离开的终点
>
>使用```<transition>```包裹要过度的元素，如果配置name属性那么则去找和name属性匹配的类名添加，如果定义时就是上面这个样子，那么则不需要name值。若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

## 动画

#### 自定义动画

```css
  .hello-enter-active{
    animation: anim linear 0.5s;
  }

  .hello-leave-active{
    animation: anim  linear 0.5s reverse;
  }
  @keyframes anim {
    from {
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
```

```js
//自定义动画直接使用name属性即可，定义时需要使用标准化语法
<transition name="hello" appear>
      <h1 v-show="isShow">你好啊!</h1>
</transition>
```

#### 第三方库动画

```js
npm i animate    //下载animaate库
import 'animate.css'     //引入
```

```js
<transition-group
name="animate__animated animate__bounce"
enter-active-class="animate__swing"
leave-active-class="animate__backOutUp">
   
<h1 v-show="isShow" key="1">你好!</h1>
</transition-group>
```

## 过渡

```js
<transition-group name="hello">
  <h1 v-show="isShow" key="1">你好!</h1>
  <h1 v-show="isShow" key="2">Shanghai</h1>
</transition-group>
```

```css
  .hello-enter,
  .hello-leave-to{
    transform: translateX(-100%);
  }
  /*进入的过程，离开的过程*/
  .hello-enter-active,
  .hello-leave-active{
    transition: linear .5s;
  }
  /*进入的终点,离开的起点*/
  .hello-enter-to,
  .hello-leave{
    transform: translateX(0);
  }
```

## 渲染API

#### appear

可以通过 `appear` attribute 设置节点在初始渲染的过渡

vue设置的动画在一开始显示时是没有的添加appear会使vue在第一次解析模板时就会把动画效果添加

```js
<transition appear>
  <!-- ... -->
</transition>
```

#### mode

同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了过渡模式

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

默认不设置时为out-in

```js
<transition name="fade" mode="in-out">
  <!-- ... the buttons ... -->
</transition>
```

#### tag

`<transition-group>`不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。

tag可以把真实呈现的元素换位其他元素

```js
<transition-group name="fade" tag='ul'>
  <!-- ... the buttons ... -->
</transition-group>
```

#### move-class

Vue中根据diff算法只有不同的元素的销毁和创建才会触发动画和过渡效果，但是在列表中有一个例外，就是move-class属性，可以使列表在换位置的过程中也有过渡效果

```js
  <transition-group move-class="moveclass" tag="ul">
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
```

```css
.moveclass {
            transition: all 1s;
        }
```

