var express = require('express');
var app = express();
var session = require('express-session');
var passport = require('passport');
var server = app.listen(8000, function(){
    console.log("MJserver now available");
})

var api = require('./api/index');
var bodyParser = require('body-parser');

// 미들웨어
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mjLove',
    cookie: { maxAge: 60 * 60 * 1000},
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 카카오톡 로그인 구현




// 카카오톡 로그인 구현

app.get('/test',(req,res)=>{
    res.json({
        resultCode:"OK",
        data:[{
            text:'방가방가~'
        }]
    })
})

app.post('/echo',(req,res)=>{
    console.log(req.body);
    res.json(req.body);
})

app.use('/api', api);

app.get('/hihihihi',(req,res)=>{
    res.redirect('https://www.google.com');
})

app.use(express.static(__dirname+'/build'));

app.get('*',(req,res)=>{
    res.sendFile(__dirname+"/build/index.html");
});

