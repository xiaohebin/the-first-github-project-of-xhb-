var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')


var router = express.Router()

/**
 * 渲染首页
 */
router.get('/',function(req,res) {
    // console.log('req.session',req.session.user)
    res.render('index.html',{
        user:req.session.user
    })
})

/**
 * 渲染注册页面
 */
router.get('/register',function(req,res) {
    res.render('register.html')
})

/**
 * 处理注册请求
 */
router.post('/register',function(req,res,next) {
    // console.log('req.body',req.body)
    var body = req.body
    
    // User.find({$or:[{email:body.email},{nickname: body.nickname}]}).pretty()
    User.findOne({$or:[{email:body.email},{nickname: body.nickname}]},function(err,data,next) {
        if(err) {
            // return res.status(500).json({
            //     err_code: 500,
            //     message: '服务端错误'
            // })
            return next(err)
        }
        if(data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者昵称已存在'
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save(function(err,user) {
            if(err) {
                // return res.status(500).json({
                //     err_code: 500,
                //     message: '服务端错误'
                // })
                return   next(err)
            }
            //注册成功，使用session 记录用户登录的状态
            req.session.user = user;
            res.status(200).json({
                err_code: 0,
                msg: 'ok',
                data:user
                
            })
        })

        
    })
})

/**
 * 渲染登录页面
 */
router.get('/login',function(req,res) {
    res.render('login.html')
})

/**
 * 处理登陆请求
 */
router.post('/login',function(req,res,next) {
    var body = req.body;
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function(err,user) {
        if(err) {
            // console.log('err',err)
            // return res.status(500).json({
            //     err_code: 500,
            //     message: err.message
            // })
            return next(err)
        }
        if(!user) {
            return res.status(200).json({
                err_code:1,
                message:'email or password is invalid'
            })
        }
        // console.log('data',user)
        req.session.user = user
        res.status(200).json({
            err_code:0,
            message:'登陆成功'
        })
    })
})

/**
 * 处理退出请求
 */
router.get('/logout',function(req,res) {
    req.session.user = null;
    res.redirect('/login')
})


module.exports = router;