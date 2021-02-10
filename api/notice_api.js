var express = require("express");
const { notice } = require("../models");
var notice_api = express.Router();

// normal api
// get all Notice
// req params: none
// res data: List of noticeObj
//
notice_api.get("/", (req, res) => {
    var responseData = {};
    notice
        .findAll({
            attributes: ["id", "title", "description", ["updatedAt", "date"]],
            where: {
                isShow: "Y",
                isDel: "N",
            },
        })
        .then((result) => {
            responseData.resultCode = "OK";
            responseData.success = true;
            responseData.data = result;
            console.log("------get notice called------");
            console.log(new Date());
            console.log("-----------------------------");
            res.json(responseData);
        })
        .catch((err) => {
            responseData.success = false;
            responseData.resultCode = "QUERY ERROR";
            res.json(responseData);
        });
});

module.exports = notice_api;
