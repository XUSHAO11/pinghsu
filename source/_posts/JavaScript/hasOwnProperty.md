---
title: hasOwnProperty()
categories: JavaScript
tags: JavaScript
icon: note
---
# hasOwnProperty()

***hasOwnProperty(propertyName)***方法 是用来检测属性是否为对象的自有属性，如果是，返回true，否者false; 参数propertyName指要检测的属性名；
用法：object.hasOwnProperty(propertyName) // true/false

hasOwnProperty() 方法是 Object 的原型方法（也称实例方法），它定义在 Object.prototype 对象之上，所有 Object 的实例对象都会继承 hasOwnProperty() 方法。

hasOwnProperty() 只会检查对象的自有属性，对象原形上的属性其不会检测；但是对于原型对象本身来说，这些原型上的属性又是原型对象的自有属性，所以原形对象也可以使用hasOwnProperty()检测自己的自有属性；
```
let obj = {
    name:'张睿',
    age:18,
    eat:{
        eatname:'面条',
        water:{
            watername:'农夫山泉'
        }
    }
}
console.log(obj.hasOwnProperty('name')) //true
console.log(obj.hasOwnProperty('age'))  //true
console.log(obj.hasOwnProperty('eat'))  //true
console.log(obj.hasOwnProperty('eatname'))  //false
console.log(obj.hasOwnProperty('water'))  //false
console.log(obj.hasOwnProperty('watername'))  //false
console.log(obj.eat.hasOwnProperty('eatname'))  //true
console.log(obj.eat.hasOwnProperty('water'))  //true
console.log(obj.eat.hasOwnProperty('watername'))  //false
console.log(obj.eat.water.hasOwnProperty('watername'))  //true
```