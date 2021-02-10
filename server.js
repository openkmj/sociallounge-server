var express = require("express");
var app = express();
var session = require("express-session");
var { passport } = require("./modules/auth");
var sequelize = require("./models/index").sequelize;

var api = require("./api/index");
var bodyParser = require("body-parser");

sequelize
    .sync()
    .then(() => {
        console.log("sequelize init success");
    })
    .catch((e) => {
        console.log(e);
    });

// 미들웨어
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: "mjLove",
        cookie: { maxAge: 60 * 60 * 1000 },
        resave: true,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/test", (req, res) => {
    res.json({
        resultCode: "OK",
        data: [
            {
                text: "방가방가~",
            },
        ],
    });
});

app.post("/echo", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.use("/api", api);

var server = app.listen(3000, function () {
    console.log("MJserver now available");
});
