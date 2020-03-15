var express = require('express');
var session = require('express-session')


var path = require('path')

var app = express()
var bodyParser = require('body-parser')

var router = require('./router.js')



//开放静态资源
app.use('/public/', express.static(path.join(__dirname,'./public/')))
// app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//配置模板引擎
app.engine('html', require('express-art-template'));

// 配置解析表单post请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/////ceshiyixi

// parse application/json
app.use(bodyParser.json())


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

// 中间键定义在挂载路由之前
//把路由挂载到app中 
app.use(router)

//配置一个处理404的中间件

app.use(function(req,res) {
    res.render('404.html')
})

//配置错误处理中间件

app.use(function(err,req,res,next) {
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})

app.listen(3000,function(err,data) {
        if(err) {
            console.log('service is not found')
        } else {
            console.log('service is running....') 
        }
})