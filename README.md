## 第一步 初始化项目

+ 新建一个文件夹 npm init -y
+ 建立一个仓库  git init
+ 建立一个readme说明文件
+ 建立一个 .gitignore文件---git 忽略项，那些文件（n-module）不用提交到git 上
+ 安装依赖 npm i A B
+ 建立一个目录 public 建立公开的资源 供客户端使用
+ 新建一个app.js文件
+ 在app.js开启服务 http://expressjs.com/en/starter/static-files.html
  - 注意 测试javescript 的api可以在浏览器的控制台测试，测试node的api 可以在 cmd 测试  >node 然后就可以测试了
+ 安装模板引擎 npm i art-template express-art-template  配置模板引擎  app.engine('html', require('express-art-template')); 然后建立一个views 将所有的渲染页面 html 放在views下面  res.render('lujin',{模板对象})
+ C:\Program Files\MongoDB\Server\4.2\bin;E:\Microsoft VS Code\bin
+ 

## 路由设计

|   路径    | 方法 | get参数 |         post参数          | 是否需要登陆 |     备注     |
| :-------: | :--: | :-----: | :-----------------------: | :----------: | :----------: |
|     /     | get  |         |                           |              |   渲染首页   |
| /register | get  |         |                           |              | 渲染注册页面 |
| /register | post |         | email，nickname，password |              | 处理注册请求 |
|  /login   | get  |         |                           |              | 渲染登陆页面 |
|  /login   | post |         |      email，password      |              | 处理登陆请求 |
|  /logout  | get  |         |                           |              | 处理退出请求 |

+ 开启服务，创建一个router.js 再将router挂载到app中，然后做一些配置

## 设置数据模型 
+ user topic comment 存储在model文件中 是js文件

## 中间件