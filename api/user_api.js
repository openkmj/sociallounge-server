const CONST = require("../const.js");
var express = require("express");
var request = require("request");
var user_api = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "sociallounge.kr",
    user: "min",
    password: "sociallounge",
    database: "sociallounge",
});

connection.connect();

user_api.get("/", (req, res) => {
    var responseData = {};
    var query = connection.query(
        "select FAQ_TITLE from faq where FAQ_ID=1",
        (err, result) => {
            if (result) {
                responseData.result = "ok";
                responseData.title = result[0].FAQ_TITLE;
                console.log(result[0].FAQ_TITLE);
            } else {
                responseData.result = "no data";
            }
            res.json(responseData);
        }
    );
});

user_api.post("/", (req, res) => {
    var responseData = {};
    console.log(req.body);
    if (req.body.id) {
        var query = connection.query(
            "select FAQ_TITLE from faq where FAQ_ID=" + req.body.id,
            (err, result) => {
                if (err) throw err;
                if (result && result.length > 0) {
                    responseData.result = "ok";
                    console.log(result);
                    responseData.title = result[0].FAQ_TITLE;
                    console.log(result[0].FAQ_TITLE);
                } else {
                    responseData.result = "no data";
                }
                res.json(responseData);
            }
        );
    } else {
        responseData.result = "invalid input";
        res.json(responseData);
        return;
    }
});

user_api.get("/login", (req, res) => {
    var code = req.query.code;
    console.log(code);
    request(
        {
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            form: {
                grant_type: "authorization_code",
                client_id: "b7f57b2324c3d9181eaecab31801ad2f",
                redirect_uri: CONST.LOCAL_BACK_SERVER_URL + "/api/user/login",
                code: code,
            },
            headers: {
                "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        },
        (err, response, body) => {
            if (err) {
                console.log(err);
                res.redirect(CONST.LOCAL_FRONT_SERVER_URL);
            } else {
                console.log("res", response.body);
                console.log("body", body);
                res.redirect(CONST.LOCAL_FRONT_SERVER_URL);
            }
        }
    );
});

user_api.get("/login_success", (req, res) => {
    console.log(req);
    res.redirect(CONST.LOCAL_FRONT_SERVER_URL);
});

module.exports = user_api;
