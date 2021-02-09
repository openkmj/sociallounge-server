const CONST = require("../consts/const.js");
var express = require("express");
var request = require("request");
var user_api = express.Router();

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
