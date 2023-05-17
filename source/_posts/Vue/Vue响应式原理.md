---
title: Vue响应式原理
categories: Linux
tags: Linux
icon: note
---
# Vue响应式原理

## 数据绑定

###  Vue2使用的数据劫持

```js
   let number = 18;
   let person = {
       name: '张三',
       sex:'男'
   }
       
   Object.defineProperty(person,'age', {
   // enumerable: true, //此时代表这个属性是可以枚举的
   // writable: true, //代表可以重写该属性(控制属性是否被修改)
   // configurable:true, //控制属性是否可以被删除 默认为false
   get() {
      console.log('get')
   },
   //当修改person的age属性时set(setter)属性就会被调用，且会收到修改的具体值
   set(value) {
       console.log('set');
   }
});
```

### Vue3使用数据代理

```js
let obj = new Proxy(arr, {
    get(target, key, receiver) {
        // console.log("获取数组元素" + key);
        return Reflect.get(target, key, receiver);
    },
    set(target, key, receiver) {
        console.log('设置数组');
        return Reflect.set(target, key, receiver);
    }
})
```

## 数据代理

数据代理和数据绑定是两个东西，数据代理的本质是通过一个对象代理另一个对象中的属性操作，

Vue中的数据代理

>首先，我们在Vue的实例里可以直接访问并操作data里的数据，这就是数据代理的体现，可以感觉到，如果我们每次操作实例都这样写vm.data什么什么很麻烦，这里Vue就使用了数据代理，可以直接写vm.的格式来操作data里面的数据
>
>通过Object.defineProperty()把data对象中所有属性添加到vm上，为每一个添加到vm上的属性，都指定一个getter/setter。在getter/setter内部去操作（读/写）data中对应的属性。

## 手写Vue的使用(简化版)

```js
        data = {
            a: 1,
            b: 2
        }

        const obs = new Observer(data)
        
        let vm = {}
        vm.data = obs

        function Observer(data) {
            const keys = Object.keys(data)
            keys.forEach(key => {
                Object.defineProperty(this, key, {
                    get() {
                        return data[key]
                    },
                    set(value) {
                        data[key] = value;
                    }
                })
            })
        }
        console.log(vm);
```

## 后天数据数据代理set

众所周知vue的数据双向绑定不能检测到后续添加的数据，但是难免会有这种需求出现，为了响应用户需求，vue开发了set方法，setApi的用处就是使后天添加的数据仍然具有数据代理。

>注意：后天的方法不可以直接在实例也就是vm或者实例的根数据也就是data上使用，只允许在其子级上使用
>
>除了添加还可以进行修改

Vue.set( target, propertyName/index, value )

vm.$set(target，propertyName/index，value)

- 第一个target参数代表目标对象，也就是你需要往谁身上添加数据。
- 第二个参数代表如果目标对象是数组，那么第二个参数需要填写为，想要给添加数据配置的index。如果目标对象是对象，那么第二个参数需要填写为，想要给数据配置的键名
- 第三个参数在数组里代表数据本身，在对象里代表键名

```js
let vm= nwe Vue({
data(){
msg:{
name:'mm',
   }
  }
})
//这个时候如果往里面添加数据，那么是不会被vue检测到从而操作dom的，如果需要后天添加的数据具有双向数据绑定那么则需要使用这种语法
//Vue构造函数的静态方法
Vue.set(vm.data.msg,age,'18')
//Vue的实例方法
vm.$set(vm.data.msg,age,'18')
//因为data里的数据和vm里的数据一样，所以可以省略data
vm.$set(vm.msg,age,'18')
```

