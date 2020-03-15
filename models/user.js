var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    nickname:{
        type:String,
        require:true 
    },
    password:{
        type:String,
        require:true
    },
    created_time:{
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type:String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [0,1,-1],
        default:-1
    },
    birthday: {
        type: Date
    },
    status: {
        type:Number,
        enum:[0,1,2],
        //1不可以评论
        //2不可以登陆
        default: 0
    }
  });

  var user = mongoose.model('User', userSchema);

  module.exports = user;