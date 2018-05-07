var express = require("express");
var path = require("path");
// body-parser:解析从React客户端发起的post请求；
var bodyParser = require("body-parser");

var app = express();
// 启用JSON解析;
app.use(bodyParser.json());
//设置app的静态路径，确保在该路径中可以找到静态文件；
app.use(express.static(path.join(__dirname,"/html")));
// 为应用程序分配一个监听的端口号，创建服务；
app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})

//引入session；
var session = require('express-session');
var cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 
app.use(session({  
    resave: true, 
    saveUninitialized: false, 
    secret: 'my-secret',
    name: 'identityKey',  
    cookie: {  
        maxAge: 80000  //80000ms；
    } 
}));  
var sessions;

// 提交表单；
app.post('/signin', function (req, res) {
  sessions=req.session;
  var user_name=req.body.email;
  var password=req.body.password;
  if(user_name=='admin' && password=='admin'){
      sessions.username = user_name;
      res.send('成功登录！');
  }
  else{
      res.send('密码或用户名错误。');
  }
})

//为登录成功后的home页设置express路由；
app.get('/home', function (req, res) {
  sessions = req.session;
  if(sessions && sessions.username){
    //已登录，显示home页;
    res.sendFile(__dirname + '/html/home.html');
  }
  else{
    //未登录，跳转login页重新登录;
    res.sendFile(__dirname + '/html/index.html');
  }
})



