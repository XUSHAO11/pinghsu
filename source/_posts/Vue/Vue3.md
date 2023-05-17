---
title: Vue3
categories: Linux
tags: Linux
icon: note
---
# Vue3

## 组合式APi(新的生命周期)

新增生命周期setup

setup是所有Composition API（组合API） 表演的舞台 

组件中所用到的：数据、方法等等，均要配置在setup中。

setup可以代替created周期前后

在Composition Api里所有的钩子函数都要引入后再使用

## 响应式

v2中响应式出现的问题

新增属性、删除属性, 界面不会更新。

直接通过下标修改数组, 界面不会自动更新。

v3响应式

通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

通过Reflect（反射）:  对源对象的属性进行操作。

### ref函数

作用: 定义一个响应式的数据

语法: ```const xxx = ref(initValue)```

创建一个包含响应式数据的引用对象（reference对象，简称ref对象）。

JS中操作数据： ```xxx.value```

模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```

>备注：
>
>接收的数据可以是：基本类型、也可以是对象类型。
>
>基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
>
>对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

### reactive函数

作用: 定义一个对象类型的响应式数据（基本类型不要用它，要用```ref```函数）

语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）

reactive定义的响应式数据是“深层次的”。

内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 依赖注入provide && inject

作用：实现祖与后代组件间通信

套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

```js
//上层组件
import { provide } from 'vue'
provide('h', 'hello!')

//下层组件注入
import { inject } from 'vue'
const h = inject('h')
```

## 计算属性&&监视属性

### 计算属性

与Vue2.x中computed配置功能一致

```js
 <script setup> 
   import {computed} from 'vue'
  	  //计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
</script>
```

### watch函数

与Vue2.x中watch配置功能一致

>注意:
>
>监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
>
>监视reactive定义的响应式数据中某个属性时：deep配置有效。

```js
let sum = ref(0);
    let msg = ref('你好');
    let person = reactive({
      name: '张三',
      age: 18,
      job:{
        j1:{
          salary: 20
        }
      }
    })    



情况一: 监视ref所定义的响应式数据
    watch(sum, (nv, ov) => {
      console.log('sum的值发生变化了');
      console.log(`newValue:${nv}, oldValue:${ov}`);
    }, {
      //监视的配置
      immediate: true //一上来就更新
    });

情况二:监视ref所定义的多个响应式数据
    watch([sum, msg], (nv, ov) => {
      //此时nv和ov都是被监视属性值的数组
      // console.log(Array.isArray(ov)); //true
      console.log('sum的值或者msg的值发生变化了');
      console.log(`newValue:${nv}, oldValue:${ov}`);
    },{
      immediate: true
    });

情况三:监视reactive所定义的一个响应式数据
    坑:1.此处无法获取正确的ov(oldValue)
       2.强制开启了深度监视
    watch(person, (nv, ov) => {
      console.log('person变化了');
      console.log(nv, ov);
    }, {
      deep: false //此处的deep配置是无效的
    });

情况四：监视reactive所定义的响应式中的某一个属性
    watch(() => person.age, (nv, ov) => {
      console.log('person的age变了', nv, ov);
    })

情况五:监视reactive所定义的响应式中的某些属性:并不只是一个
    watch([() => person.age, () => person.name], (nv, ov) => {
      //此时nv和ov都是数组
      console.log('person的age或name发生改变了',nv, ov);
    });

特殊情况  情况五:监视reactive所定义的响应式中的某些属性:并不只是一个
    watch([() => person.age, () => person.name], (nv, ov) => {
      //此时nv和ov都是数组
      console.log('person的age或name发生改变了',nv, ov);
    });
    watch(() => person.job, (nv, ov) => {
      //这里依然无法拿到正确的ov，因为依然监视的是对象
      console.log('person的job信息发生改变了',nv, ov);
    }, {
      //这里必须要加deep:true注意
      deep: true //此处因为监视的是reactive所定义的响应式对象的一个属性(这个属性的值它依然是一个对象)，所以deep配置有效
    })
```

### watchEffect函数

watch的套路是：既要指明监视的属性，也要指明监视的回调。

watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

watchEffect有点像computed：

但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。

而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

```js
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

## hook函数

类似于vue2中的mixin混入，由于vue3采用函数式api所以有了hook函数

```js
//得到鼠标点的api
import { reactive, onMounted, onBeforeUnmount } from "vue";
export default function usePoint(){
    //响应式数据
    let point = reactive({
        x: 0,
        y: 0
    });
    //方法
    const savePoint = event => {
        point.x = event.pageX;
        point.y = event.pageY;
    };
    //生命周期
    onMounted(() => {
        window.addEventListener('click', savePoint)
    });
    onBeforeUnmount(() => {
        //在卸载之前取消事件的监听
        window.removeEventListener('click', savePoint);
    });
    return point;
}
import usePoint from "../hooks/usePoint";
//复用自定义hooks
const point = usePoint();
```

## toRef

toRef

作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。

语法：```const name = toRef(person,'name')```

应用:  要将响应式对象中的某个属性单独提供给外部使用时。

```js
 let person = reactive({
      name: '张三',
 });
const name = person.name //输出字符串，并不是响应式的数据
const name2 = toRef(person,name);//变为引用类型，数据是双向绑定式
```

## shallowReactive 与 shallowRef(浅响应)

上述两个和reactive以及ref生成响应式数据是一样的，唯一不同的是，使用这两个方法生成响应式数据只有第一层是响应式的。

```js
import {shallowReactive, shallowRef} from 'vue';
 let person = shallowReactive({
      name: "张三",
      job: {
          salary: 20,
      },
    });
//job里的数据不是响应式
```

## readonly 与 shallowReadonly(只读)

readonly: 让一个响应式数据变为只读的（深只读）。

shallowReadonly：让一个响应式数据变为只读的（浅只读）。

应用场景: 不希望数据(尤其是这个数据是来自与其他组件时)被修改时。

```js
  let person = reactive({
    name: '张三',
    age: 18,
    job:{
      j1:{
        salary: 20
      }
    }
  });

person = readonly(person); //此时person里面的属性值都不允许修改
person = shallowReadonly(person); //第一层不能改(name,age), 但j1和salary仍然可以改动
```

## toRaw 与 markRaw

### toRaw

作用：将一个由```reactive```生成的响应式对象转为普通对象(还原为最原始没有被代理过的对象)

使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

```js
  let person = reactive({
    name: '张三',
    age: 18,
    job:{
      j1:{
        salary: 20
      }
    }
  });
let p = toRaw(person)//此时p为一个普通的数据对象,p改变数据就不会引起页面更新了

//但是toRaw只处理由reactive生成的数据
let sum = ref(0);
const sum  = toRaw(sum);
console.log(sum); //undefined 
```

### markRaw

作用：标记一个对象，使其永远不会再成为响应式对象。

应用场景:

有些值不应被设置为响应式的，例如复杂的第三方类库等。

当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```js
  let person = reactive({
    name: '张三',
    age: 18,
    job:{
      j1:{
        salary: 20
      }
    }
  });
//在响应式的对象身上添加任何属性都是响应式的，经过markRaw一包装就变成最原始的数据就不会再做响应(只会初始渲染驱动一次)
 person.car = markRaw({
    name: 'benz',
    price: 40
 });
```

## customRef

作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

实现防抖效果：

```js
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
<script setup>
  import {ref,customRef} from 'vue'
  function myRef(value,delay){
  		let timer
      //两个参数track告诉vue追踪
  		return customRef((track,trigger)=>{
  			return{
  				get(){
  					track() //告诉Vue这个value值是需要被“追踪”的
  					return value
  				},
  				set(newValue){
  					clearTimeout(timer)
  					timer = setTimeout(()=>{
  						value = newValue
  						trigger() //告诉Vue去更新界面
  					},delay)
  				}
  			}
  		})
   }
  	let keyword = myRef('hello',500) //使用程序员自定义的ref
 }
</script>
```

## 响应式数据的判断

isRef: 检查一个值是否为一个 ```ref``` 对象

isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理

isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理

isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理  

```js
let sum = ref(0);
let car = reactive({
  name: '宝马',
  price: 40
});
let car2 = readonly(car); ///readonly依然返回代理类型的对象只不过它不能再改而已

isRef(sum)
isReactive(car)
isReadonly(car2)
isProxy(car)
```

## Teleport标签

 什么是Teleport？—— `Teleport` 是一种能够将我们的组件html结构移动到指定位置的技术。

当我们组件嵌套很深的时候，如果有一些交互的dom动作，那么会破坏全局局部，为了避免这种情况发生vue发明了teleport标签

```js
<teleport to="body">
   
</teleport>
//被标签包裹的属性渲染时不会被嵌套结构影响直接渲染到to属性选中的标签的直属
//to属性可以写入选择器
```

