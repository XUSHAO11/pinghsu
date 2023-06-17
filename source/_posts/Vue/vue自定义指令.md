---
title: 自定义指令的定义语法
categories: Vue
tags: 自定义指令的定义语法
icon: note
---
Vue 允许我们在应用中创建自定义指令。自定义指令可以在渲染时机运行特定的代码,当数据变化时,指令重新渲染对应的元素及其子元素。
## 自定义指令的定义语法
```js
directives: {
  'directive-name': {
    bind: function() {},
    inserted: function() {},
    update: function() {},
    componentUpdated: function() {},
    unbind: function() {}
  }
}
```
- bind:只调用一次,指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。 
- inserted:被绑定元素插入父节点时调用。  
- update:所在组件的 VNode 更新时调用。 
- componentUpdated:指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- unbind:只调用一次,指令与元素解绑时调用。  
## 自定义指令的用法示例
1. v-focus 自动获取焦点
```js
directives: {
  'focus': {
    inserted: function(el) {
      el.focus()
    }
  }
}
```
使用:
```html
<input v-focus>
```
2. v-clipboard 实现复制到粘贴板 
```js
directives: {
  'clipboard': {
    bind: function(el) {
      el.$value = el.textContent
      el.addEventListener('click', () => {
        const clipboard = new ClipboardJS(el, {
          text() { return el.$value } 
        })
        clipboard.on('success', () => { 
          alert('复制成功!')
        })
      })
    }
  }  
}
```
使用:
```html
<span v-clipboard>复制我</span>
```
3. v-swiper 自定义swiper滑块指令
```html
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div v-for="item in 4" class="swiper-slide">{{ item }}</div>
  </div>
</div>
```
```js
directives: {
  'swiper': {
    bind(el) {
      let mySwiper = new Swiper(el, {
        // swiper配置  
      })
    }
  }
}, 
```
使用:
```html
<div class="swiper-container" v-swiper>...</div> 
```
自定义指令可以实现一些复杂的DOM操作,如:滑块/轮播图、拖拽、自动聚焦、懒加载等,具有很高的扩展价值。如果有疑问可以提出来交流。