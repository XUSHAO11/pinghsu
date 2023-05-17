---
title: Git常用命令
categories: Git
tags: Git
icon: code
---

## [提交一个工程到github](https://blog.csdn.net/codingEMIPark/article/details/78016588)

## 初始化
- git config --global user.name xxx
- git config --global user.email xxx@xxx.com

## 常用命令
- `git init`
- `git pull origin master`
- `git push origin master`
- `git add .`
- `git add -A` 提交所有改变（包括删除）
- `git commit -m 'commit_content'`
- `git checkout filename`
- `git clone xx`
- `git clone xx --depth=1` 只拷贝最近一次的提交

## 在coding.net中添加项目的流程
    1. 将～/.ssh中的public key加入coding.net的设置中
    2. `git init`
    3. `git add .`
    4. `git commit -m 'content'`
    5. `git remote add origin gitaddress`
    6. `git push origin master`

## 创建分支和转换的流程
    1. 创建分支：`git branch <name>`
    2. 切换分支：`git checkout <name>`
    3. 创建加切换分支：`git checkout -b <name>`
    4. 删除本地分支：`git branch -d <branch_name>`

## 创建多个远程仓库并上传不同分支
    1. 创建多个远程仓库：`git remote add <name> <address>`. 注意：远程仓库名不能于origin相同
    2. 上传不同分支到远程仓库： `git push <remote_name> <local name>`
    3. 删除远程仓库中的分支：`git push <remote_name> --delete <branch_name>`.注意，在github上删除master分支前要先到设置更改默认分支.

## 查看git的状态
`git status`

## 查看文件修改状态
`git diff (filename)`

