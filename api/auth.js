const CONST = require("../consts/const.js");
var express = require("express");
var { passport, authenticateUser } = require("../modules/auth");
const auth_api = express.Router();
var getConnection = require("../modules/db");

auth_api.get("/kakao", passport.authenticate("kakao"));

auth_api.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        successRedirect: CONST.LOCAL_FRONT_SERVER_URL,
        failureRedirect: CONST.LOCAL_FRONT_SERVER_URL + "/login",
    })
);

auth_api.get("/name", authenticateUser, (req, res) => {
    if (!req.user) {
        console.log("엥");
        res.json({ result: "no login" });
    } else {
        getConnection((conn) => {
            conn.query(
                "select * from TEST_USER where TEST_USER_KID=" +
                    req.user.user_id,
                (err, result) => {
                    if (err) {
                        res.json({ result: "no data" });
                    } else {
                        res.json({
                            result: "ok",
                            data: {
                                userId: result[0].TEST_USER_ID,
                                userNickname: result[0].TEST_USER_NICKNAME,
                                userKId: result[0].TEST_USER_KID,
                            },
                        });
                    }
                }
            );
            conn.release();
        });
    }
});

auth_api.get("/logout", authenticateUser, (req, res) => {
    req.logout();
    res.json({ result: "success" });
});

module.exports = auth_api;
