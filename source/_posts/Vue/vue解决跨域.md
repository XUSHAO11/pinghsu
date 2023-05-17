---
title: Vue解决跨域
categories: Vue
tags: Vue
icon: note
---
跨域错误信息
Access to XMLHttpRequest at ‘http://192.168.2.92:3000/api/b/home’ from origin ‘http://localhost:8080’ has been blocked by CORS policy: Response to preflight request doesn’t pass access control check: It does not have HTTP ok status.

![在这里插入图片描述](https://img1.imgtp.com/2023/05/17/yKkpkryI.png)

## 一、跨域是什么？

当一个请求url的协议、域名、端口三者之间任何一个与当前页面的url不同即为跨域

## 为什么出现跨域？

---

浏览器在解析JavaScript出于安全方面的考虑，只允许在同域名下页面进行相互资源请求调用，不允许调用其他域名下的页面的对象；简单的理解就是因为JavaScript同源策略的限制。

 注意：跨域并不是请求发不出去，请求能发出去，服务器能收到请求并正常返回结果，只是结果被浏览器拦截了，所以页面无法正常使用数据。

---

## 什么是同源策略？

同源策略要求源相同才能进行正常的资源交互，即要求当前页面与调用资源的协议，域名、子域名、端口完全一致；不一致则就是跨域。

## 同源策略的限制

同源策略限制一个资源地址加载的文档或脚本与来自另一个资源地址的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的关键的安全机制。它的存在可以保护用户隐私信息，防止身份伪造等(读取Cookie)。

同源策略限制内容有：

```

1、Cookie、LocalStorage、IndexedDB等存储性内容

2、不允许进行DOM节点的操作

3、不能进行AJAX请求

```

***参考如举例说明理解：***

1、如果是协议和端口造成的跨域问题“前台”是无能为力的。

2、在跨域问题上，域仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。

举例说明：

```
#协议跨域
http://a.baidu.com 访问 https://a.baidu.com；
#端口跨域
http://a.baidu.com:8080 访问  http://a.baidu.com:80；
#域名跨域
http://a.baidu.com  访问  http://b.baidu.com；
```

## 二、解决跨域的办法

1.这里以使用vue脚手架生成的标准项目为准。一般在项目config目录下面有个index文件

.这里以使用vue脚手架生成的标准项目为准。一般在项目config目录下面有个index文件

```vue
module.exports = {
    publicPath: './',
    lintOnSave: true,
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints:false
        }
},
devServer: {
    proxy: {
        '/api': {
            target: 'http://192.168.2.90:3000',//后端接口地址
            changeOrigin: true,//是否允许跨越
            pathRewrite: {
                '^/api': '/api'//重写,
            }
        }
    }
}
}
```
此方法只能在开发环境中使用。
后端请求地址是http://192.168.92.2:3000，所有api的接口url都以/api开头。
所以首先需要匹配所有以/api开头的.然后修改target的地址为http://192.168.2.92:9090。
最后修改pathRewrite地址:将前缀’^api’转为’/api’。
如果本身的接口地址就有’/api’这种通用前缀，就可以把pathRewrite 删掉。

2.配置一下axios.defaults.baseURL = '/api’这样就可以保证动态的匹配生产和开发环境的定义前缀，代码如下:

```
// mock服务器
axios.defaults.baseURL ='/api';
```