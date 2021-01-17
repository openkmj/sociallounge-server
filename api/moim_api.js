var express = require("express");
var moim_api = express.Router();
const { QUERY } = require("../sql.js");

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "sociallounge.kr",
    user: "min",
    password: "sociallounge",
    database: "sociallounge",
});

connection.connect();

// normal api
// get all possible moim
// req params: none
// res data: List of moim
//
moim_api.get("/", (req, res) => {
    var responseData = {};
    var sql = QUERY.GET_MOIM_LIST;
    console.log(sql);
    var params = [];
    connection.query(sql, (err, result) => {
        if (result) {
            console.log(result);
            responseData.resultCode = "OK";
            responseData.data = result.map((item) => ({}));
            console.log("------get moimList called------");
            console.log(new Date());
            console.log("-----------------------------");
        } else {
            // 해당 값이 없음
            console.log(err);
            responseData.resultCode = "1";
        }
        res.json(responseData);
    });
});

module.exports = moim_api;
