---
title: Git学习
categories: Git
tags: Git
icon: code
---
# Git学习

## 背景介绍
Git是由Linux之父使用C语言开发的一个分布式版本控制系统。分布式版本控制系统的特点是没有中央服务器，每一个人的电脑上都有一个完整的版本库。

## Git安装与全局配置
在Windows系统下可以从官网下载Git安装包。在Mac系统下已经自带Git，如果需要安装更新版本，可以使用homebrew。

在安装完成后，可以进行全局用户名和电子邮件设置
```git
git config --global user.name 'name'
git config --global user.email '123@example.com'
```

如果忘记已经设置的用户名和电子邮件，可以使用以下命令查看
```git
git config --global user.name
git config --global user.email
```

如果文件夹名称中有中文，会出现乱码情况。可以使用
`git config --global core.quotepath false`

在Mac下git默认语言为中文，如果想改为中文，可以在`~/.zshrc`中加入
`export LC_ALL=en_US.UTF-8`


## 创建一个仓库

`git init`

## 把文件添加到仓库

`git add filename`

## 对本次操作进行说明

`git commit -m 'add a file'`

- 对上次的提交信息进行修改和更新
`git commit --amend -m`

## 查看仓库当前状态

`git status`

## 查看具体文件修改的内容

`git diff filename`

## 查看版本历史记录

- 完整显示
`git log`

- 单行显示
`git log --pretty=oneline`

## 版本回退

- 回退一个版本
`git reset --hard HEAD^`

- 回退n个版本
`git reset --hard HEAD~n`

- 根据版本号回退版本(不需写完整版本号)
`git reset --hard 1234a`

- 误操作时查看命令历史和版本号
`git reflog`

## 工作区和暂存区

在Git中，平时工作的文件夹称为工作区，`.git`目录中存放的称为版本库。在版本库中存在一个暂存区。`git add`可以把文件放入暂存区。`git commit`可以把暂存区的改动提交到新的分支。如果对文件进行了多次修改，只有经过了`git add`的改动才会被暂存区记录，否则不会被记录。

## 丢弃某个文件的修改(还原文件)

- 这个修改没有经过`git add`加入暂存区

`git checkout -- file`

- 这个修改已经经过`git add`加入暂存区
```git
git rm --cached [filename]
```

## 撤销提交

- 新增一次提交以抵消上一次提交的变化，不会改变过去的所有历史
`git revert head`

- 新增多次提交以抵消某几次提交的变化
`git revert [倒数第一次] [倒数第二次]`

## 丢弃提交

丢弃提交的含义是使某次提交之后的所有提交在历史中彻底删除，仍可以使用`git reflog`查看记录

`git reset [某次提交]`

还可以加上`--hard`参数，表示让工作区的文件也回到过去的状态

## 删除文件

- 删除没有经过`git add`的文件

`rm file`

- 删除已经经过`git add`的文件

```git
rm file
git rm file
```

## 本地仓库与远程仓库的结合

- 把一个本地仓库与远程仓库关联

`git remote add origin git@github.com:xxx.git`

其中`origin`表示远程仓库名。

- 把本地仓库的内容推送到远程仓库

`git push -u origin master`

- 把远程仓库的内容拷贝到本地仓库
`git clone git@github.com:xxx.git`


## git分支

- 创建一个分支并切换到该分支

`git checkout -b dev`

`git switch -c dev`

- 创建一个分支

`git branch dev`

- 删除一个分支

`git branch -d dev`

- 切换到dev分支

`git checkout dev`

`git switch dev`

- 查看所有分支

`git branch`

- 把a分支合并到b分支

```git
git checkout b
git merge a
```

- 非快速合并模式
`git merge --no-ff -m 'merge with no-diff' dev`

## 保存和恢复当前没提交的工作

- 保存暂存区的工作
`git stash`

- 恢复暂存区的工作并删除临时存储内容
`git stash pop`

## 把特定修改复制到当前分支
`git cherry-pick 1234ab`

## 查看远程地址

- 简略查看 
`git remote`

- 详细查看
`git remote -v`

## 给特定的提交打标签

- 给当前HEAD打标签

`git tag tagname`

- 给某个特定分支打标签
`git tag tagname commit-id`

- 给标签加上说明文字
`git tag -a v0.1 -m "version 0.1 released" 1094adb`

## .gitignore
`.gitignore`主要用于忽略一些文件，不加入版本库。

当现有文件已经被git跟踪时，再使用.gitignore并没有用。此时需要使用
`git rm -r --cached .`删除本地缓存，再使用.gitignore进行跟踪。


## Reference
[https://www.liaoxuefeng.com/wiki/896043488029600](https://www.liaoxuefeng.com/wiki/896043488029600/897271968352576)