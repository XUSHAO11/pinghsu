---
title: Vue 2.x和Vue 3.x 数据劫持的实现
categories: Linux
tags: Linux
icon: note
---

**数据劫持是Vue数据响应式的核心和基础，通过添加代理来给属性的变化添加额外的操作的方**

#### 1、Vue 2.x数据劫持的方法

> ```scss
>   Obejct.defineProperty(obj,prop,descriptor)
> 复制代码
> ```

```
obj
```

要定义属性的对象。

```
prop
```

要定义或修改的属性的名称或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。

```
descriptor
```

要定义或修改的属性描述符。

这个方法可以精确修改对象的属性，decriptor有四个参数，分别是

- configurable：数据是否可删除，可配置，
- enumerable：属性是否可枚举，
- get:一个给属性提供 getter 的方法，如果没有 getter 则为 undefined，
- set:一个给属性提供 setter 的方法，如果没有 setter 则为 undefined object.defineProperty()通过getter/setter属性对数据进行监听，getter监听访问数据，setter监听修改数据，

```var
var value;
Object.defineProperty(o, 'a', {
    get() {
        console.log('获取值')
        return value
    },
    set(v) {
        console.log('设置值')
        value = qqq
    }
})
o.a = 'sss' 
// 设置值
console.log(o.a)
// 获取值
复制代码
```

##### 1.2 缺陷

- **只有getter/setter属性无法监听属性的修改删除**,在Vue 2.x赋值对象时，需要对对象进行初始化，否则需要使用$Set()进行设置，
- 无法监听组数的数据变化，数组的长度发生变化的时候无法监听
- 无法拦截对象属性的多层嵌套,vue 2.x表现，watch对多层对象的监听中，失效

#### 2、Vue 3.x 数据劫持的方式

为了解决上面的缺陷，es6引入了proxy的概念，通过建立一个新的实例对象，才操作原有对象，并且提供13种监听操作，

```scss
Reflect.apply(target,thisArg,args)
Reflect.construct(target,args)
Reflect.get(target,name,receiver)
Reflect.set(target,name,value,receiver)
Reflect.defineProperty(target,name,desc)
Reflect.deleteProperty(target,name)
Reflect.has(target,name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

复制代码
let obj = new Proxy(arr, {
    get: function (target, key, receiver) {
        // console.log("获取数组元素" + key);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, receiver) {
        console.log('设置数组');
        return Reflect.set(target, key, receiver);
    }
})
// 1. 改变已存在索引的数据
obj[2] = 3
// result: 设置数组
// 2. push,unshift添加数据
obj.push(4)
// result: 设置数组 * 2 (索引和length属性都会触发setter)
// // 3. 直接通过索引添加数组
obj[5] = 5
// result: 设置数组 * 2
// // 4. 删除数组元素
obj.splice(1, 1)
复制代码
```

显然Proxy完美的解决了数组的监听检测问题，针对数组添加数据，删除数据的不同方法，代理都能很好的拦截处理。另外Proxy也很好的解决了深层次嵌套对象的问题，具体读者可以自行举例分析。