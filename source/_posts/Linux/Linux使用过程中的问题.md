---
title: Linux系统使用过程中遇到的一些问题
categories: Linux
tags: Linux
icon: note
---

## 1 无法进入GUI界面，可以使用Ctrl+Alt+F4进入命令行界面
这种情况可能是Nvidia显卡驱动安装出现了问题。解决方法：
1. 卸载原驱动：`sudo apt-get purge nvidia*`
2. 把显卡驱动加入PPA：
   `sudo add-apt-repository ppa:graphics-drivers` 
   
   `sudo apt-get update`
3. 查找显卡驱动最新的版本号
   `sudo apt-cache search nvidia`
4. 采用apt-get命令在终端安装
   `sudo apt-get install nvidia-390 nvidia-settings nvidia-prime`
5. 使用`lsmod | grep nvidia`或`watch -n 1 nvidia-smi`查看是否安装成功-smi`查看是否安装成功