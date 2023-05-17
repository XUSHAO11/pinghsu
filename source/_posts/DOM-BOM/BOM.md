---
title: BOM
categories: DOM-BOM
tags: DOM-BOM
icon: code
---
# BOM

bom（browser object Model）浏览器对象模型 它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是window；

### bom与dom的区别

bom是由一系列相关的对象构成，并且每个对象都提供了很多方法和属性

Dom 文档对象模型，就是把文档当作一个对象来看待，其顶级对象是document。dom主要学习的是操作页面元素，dom是w3c标准规范

Bom是浏览器对象模型，把浏览器当作一个对象，bom的顶级对象是window，bom学习的是浏览器窗口交互的一些对象，bom是由浏览器厂商在各自浏览器上定义的，兼容性较差

BOM比DOM更大，它包含DOM

window （document location navigation screen history）

### BOM的构成

window对象是浏览器的顶级对象，当打开一个页面的时候就有一个window对象，它具有双重角色

- 它是一个全局对象，定义在全局作用域内的变量，函数都会成为window对象的属性和方法，在调用时可以直接省略window，比如 window.alert()

  Window下一个特殊的属性 window.name，所以我们在给变量命名的时候不要使用name作变量名

- 它是js访问浏览器窗口的一个接口

  浏览器给我们提供一套操作浏览器的属性和方法

  所有和BOM相关的api都是window.xxx;在js代码书写的时候可以省略window不写

#### 浏览器尺寸

指的是浏览器的可视窗口的尺寸，浏览器有可能会出现滚动条，在一般浏览器上滚动条算是浏览器的一部分，在MAC上，是不算的（mac上的滚动条是压在页面上的）

window对象上有两个属性获取浏览器的尺寸（包含滚动条的尺寸）

**inner系列属性**

- window.innerWidth 属性     window可省略不写  获取页面可视区域的宽度，也就是页面的宽度

  （包含滚动条的尺寸）

  document.documentElement.clientWidth获取html宽度

- window.innerHeight 属性

  document.documentElement.clientHeight获取html高度

**outer系列属性**

- window.outerwidth 属性  获取浏览器外部宽度 即整个浏览器的宽度 包括边栏
- window.outerHeight 属性  获取浏览器外部高度 即整个浏览器的高度 包括边栏

### 浏览器事件

- load  页面加载完毕

- scroll  滚动

- resize  窗口尺寸改变

- offline  网络断开

  一般会在网络断开时跳转到一个缓存页面，做用户提示

- online 网络恢复  由没网到恢复

- onhashchange   当地址栏的地址hash值改变时触发

**窗口加载事件**

- window.onload是窗口（页面）加载事件

  当文档内容（包括图片 ，音视频，脚本文件 css文件）全部加载完毕就会触发该事件，调用处理函数

作用：当需要将js代码写在页面元素的上方时，可以加上window.onload给其设置事件处理函数，当页面元素加载完后再执行里面的代码

window.onload传统注册事件方式只能写一次，如果有多个，后面的会覆盖前面的

window.addEventListener 则可以写多个依次执行

```js
window.addEventListener('DOMContentLoaded',function(){})
```

DOMContentLoaded在页面Dom加载完成就会触发 ，不包括图片 css flash等，ie9+才支持

优点：如果页面图片很多，从用户访问到onload触发可能需要较长的时间，交互效果就不能实现，影响用户体验，此时使用DOMContentLoaded就比较合适

#### **调整窗口大小事件**

 浏览器尺寸变化时触发 pc响应式，移动端 判断横屏竖屏

```js
window.onresize=function(){
	console.log('频幕变化了')
	console.log('innerWidth')
}
window.addEventListerner('resize',function(){})
```

浏览器可视窗口改变的时候就会触发该事件

一般配合innerWidth和innerHeight来判断频幕的尺寸，来做响应视布局

window.innerWidth为当前屏幕的宽度

移动端：判断横屏竖屏

### location对象

url是互联网上的标准资源的地址，互联网上的每一个资源都有一个唯一的url，它包含的信息，指出文件的位置以及浏览器该怎么处理它

一个url地址的组成部分：https://www.baidu.com:8080/a/b/c/index.html?a=100&b=200#abc

url格式 ： protocol：//host[:port]/path/[?query]#fragment

- Portocol:传输协议 http ftp maito等

  作用：前后端交互的方式

- host  域名    www.baidu.com   ip地址

  作用：找到一台服务器电脑

- port 端口   

​       可以省略，省略时使用方案的默认端口  如http的默认端口为80

- path 路径 由零或者多个/ 符号隔开的字符串

  作用：一般用来表示主机上的一个目录或者文件地址

- ?a=100&b=200  查询字符串（queryString）

  以键值对的形式 通过&符号分隔开

  作用：可有可没有，不影响打开网页；是打开这个网页时所携带的信息

- abc 哈希（hash）（fragmaent 片段）

  作用：锚点定位

每一台计算机有一个ip地址，ip就是用来通过网络方式找到这台计算机的，但是IP地址不好记忆了

域名具有商业价值，比如京东域名--本来是www.360buy.com   现在只需要输入  jd.com就可以



window对象里有一个location属性，属性值是个对象，我们将这个属性称为location对象，里面存储着和网页地址相关的信息

location对象的属性

- location.href  当前网页的地址 可读写属性 ***

  window.location.href 获取当前网页的地址 

  location.href ="新的网页地址"     设置当前打开页面的url地址，可以实现页面跳转  

  ```js
    btn.onclick = function () {
              // 写入的时候可以改变当前页面的url地址，实现跳转
              window.location.href = 'https://www.taobao.com'
       }
         //btn为一个按钮元素
  ```

- location.host 返回主机域名

- location.port  返回端口号 如果未写则返回空字符串

- location.pathname 返回路径

- location.search 当前网页地址的查询字符串     *必须掌握

获取：查询到的是一个字符串，访问网页所有带的信息，我们需要将这个字符串解析后才能使用  (表单提交)

https://www.baidu.com?a=88&b=99&c=22#abc

地址中没有？或者？后没有参数信息的时候，window.location.href的值是空字符串 ""

- location.hash  当前网页的hash值

#### location对象的方法

- location.reload() 重新加载刷新页面 ,相当于按下浏览器左上角的刷新按钮 相当于f5

  可以有参数，参数为true  为强制刷新 重新从服务器获取数据 ctrl+f5

  **注意此语句不要写在一打开页面就可以执行的地方，一进来就刷新，会死循环，多和按钮配合使用**

- location.assign('新地址') 根href一样，可以跳转页面 （重定向页面）

- location.replace('新地址') 替换当前的页面 因为不记录历史 所以不能回退

### navigator 对象

navigator航海家

widown对象下有一个成员叫做：navigator，它是一个对象，包含浏览器的版本信息

它有很多属性，常用的

- userAgent属性：我们可以知道用户使用的浏览器的版本及型号信息

​        获取：window.navigator.userAgent

- appName

  所有的浏览器都是统一的名字 netscape（网景）致敬网景公司  ，ie低版本不是

  window.navigator.appName

- platform

  浏览器所在操作系统

判断是否在微信内打开网页案例

```js
        function isWei() {
            //获取user-agaent标识头
            var ua = window.navigator.userAgent.toLowerCase();
            //判断ua和微信浏览器的标识头是否匹配
            if (ua.match(/micromessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
        console.log(isWei());
```

### history对象

window下有一个叫做history的成员，是一个对象，里面包含着一些操作历史记录的属性和方法

作用：可以操作浏览器的前进后退

history包含用户（在浏览器窗口中）访问过的url

- window.history.back(); 

作用：回退到上一条历史记录，相当于浏览器左上角的后退按钮

前提：需要有历史记录，否则无法回退

- window.history.forward() 前进


作用：前进到下一条历史记录，相当前进按钮

前提：需要回退过以后才可以前进

- window.history.go(参数)  


参数为正值 前进

参数 负值为后退

参数为0 刷新当前页面

### scroll系列属性

scroll系列属性可以动态的获取到元素的大小，滚动距离等

- 元素.scrollTop 返回元素被卷去的上侧距离 返回值不带单位
- 元素.scrollleft 返回元素被卷去的左侧距离 返回值不带单位
- 元素.scrollWidth  返回元素自身的实际内容的宽度，不含边框，返回值不带单位
- 元素.scrollHeight  返回元素自身的实际内容的高度，不含边框，返回值不带单位

跟offsetHeight属性一样可以获取页面的高度

**浏览器scroll滚动事件**

window.onscroll=function(){}

当浏览器滚动条滚动时触发的事件，不管横向还是竖向只要滚动就会触发

作用：

1: 楼层导航  

2 :顶部通栏和回到顶部按钮按钮的显示  

3:渐进显示页面 

4:瀑布流

 **获取页面被卷去的头部距离，有兼容性问题，因此被卷去的头部通常有以下几种写法**

- document.documentElement.scrollTop


使用必须要有 DOCTYPE标签,如果没有则获取的滚动高度一直是0

可读写属性：设置时直接赋值 ,直接改变浏览器滚动的位置

- document.body.scrollTop


使用必须要没有 DOCTYPE标签,如果有则返回的高度一直是0

兼容性写法

```js
let scrollTop=document.documentElement.scrollTop||document.body.scrollTop|| window.pageYOffset
//兼容性写法获取页面卷上去的高度
```

**获取页面卷去的宽度**

- document.documentElement.scrollLeft


使用必须要有DOCTYPE标签

可读写属性：设置时直接赋值 ,直接改变浏览器滚动的位置

- document.body.scrollLeft


使用必须没有 DOCTYPE标签

兼容性写法

```js
let scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft|| window.pageXOffset
//兼容性写法获取页面卷上去的高度
```

封装获取页面被卷上去的高度和宽度值案例

```js
function getScroll(){
	return{ left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
	}
}
使用时 getScroll().top
//返回值为一个对象使用时调用函数得到返回值使用·语法获取被卷上去的高度和宽度即可
```

### scrollTo属性

scrollTo是window里的一个可读写的属性

可以设置浏览器可视窗口在页面中的位置

scroll和scrollTo属性在使用上一样，所以用这两个属性改变可视窗口位置都可以

格式1：window.scrollTo(横向坐标，纵向坐标);

- 书写不需要带单位，直接设置数字就可以了，参数是数值必须要设置两个参数，否则会报错

  特点：瞬间定位


格式2：window.scrollTo({top:纵向坐标，left：横向坐标});

- 如果参数是对象，对象里的属性写几个都可以

- 特点：可以依靠第三个配置项来决定是瞬间定位还是平缓移动

  behvaior："smooth" 平滑或'instant'立即 不能决定滚动时间

  但是：如果设置的是平滑的滚动的时候，页面无论滚动的距离是多还是少，所花费的秒数是一样的，1s或者2s，这样滚动的速度是不一样的。若是我们想要当页面滚动的距离多时耗时稍微久一点（保持滚动的速度是一样的），通过api提供的功能是没有办法实现的，需要我们自己写

```js
      btn.onclick=function(){
            //让浏览器平滑的滚动到指定位置
            window.scrollTo({top:20,left:100,behavior:"smooth"})
        }
```

### window.devicePixelRatio   获取物理像素比 dpr

```js
console.log(window.devicePixelRatio)
//获取到不同的客户端的像素比，可以在控制台调整不同的客户端型号
```

他们offset client scroll三大系统的使用总结

- offset系列

  经常用于获取元素的位置 	offsetLeft offsetTop 返回相对于设置了定位的父元素上/左面距离

​        offsetWidth/offsetHeight：content padding border 滚动条

​            滚动条的宽度：offsetWidth-clientWidth-border

- client经常用来获取元素的大小 clientWidth clientHeight    包含：content padding

  document.body.clientWidth/document.body.clientHeight  页面可见区域的宽高，不包含滚动条

  元素.clientTop 返回元素的border-top-width ；元素.clientLeft  返回元素的border-left-width

- scroll 经常用来获取元素的滚动距离（被卷去的距离） scrollTop scrollLeft

  scrollWidth/scrollHeigh  包含content padding 溢出内容的尺寸，如论这个一处内容是隐藏还是滚动条

- 页面滚动距离 使用 window.pageXoffset 获取

- window.innerwidth / window.innerheight 返回窗口的文档显示区的宽

- outerWidth 和 outerHeight 属性获取加上 工具条与滚动条窗口的宽度与高度



