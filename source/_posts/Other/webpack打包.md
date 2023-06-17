---
title: vite ssr vs nuxt js 区别
categories: Other
tags: vite ssr vs nuxt js
icon: note
---

# webpack打包
Webpack 是一个模块打包器(module bundler)。它的主要作用是将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。
## Webpack 的主要功能 
1. 代码转换:TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。 
2. 文件优化:压缩 JavaScript 、CSS、HTML 代码,压缩图片文件等。 
3. 代码分割:提取多个页面的共同部分、提取首屏不需要执行部分的代码等。 
4. 模块合并:在采用模块化的项目里会有很多个模块和文件,需要构建功能把模块分类合并成一个文件。
5. 自动刷新:监听本地资源变化,自动构建并刷新浏览器。 
6. 代码校验:在代码提交到仓库前需要校验代码是否符合规范,以及 single-page 应用的构建。
7. 自动发布:更新完代码后,自动构建出线上发布代码并传输给发布系统。
## Webpack的主要构成 
- 入口 entry:导入模块的起点。
- 输出 output: bundles(包) 的名称和输出路径。 
- loader:模块转换器,用于把模块原内容按照需求转换成新内容。 
- 插件 plugins:用于执行范围更广的任务。 
- 模式 mode:模式(development/production),决定打包环境。 
## 一个简单的webpack配置文件
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}; 
```
这会将src/index.js作为入口,打包成bundle.js,输出到dist文件夹中。
## Webpack的使用场景
1. 代码转换:TypeScript 转 JS、SCSS 转 CSS 等。 
2. 文件优化:压缩 JS/CSS/IMG、tree shaking。  
3. 代码分割:提取公用部分、按需加载。
4. 模块合并:合并零散的模块为一个文件。 
5. 自动刷新:监听变化并自动刷新。
6. 自动发布:发布时自动构建。