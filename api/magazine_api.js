var express = require("express");
var request = require("request");
var magazine_api = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "sociallounge.kr",
  user: "min",
  password: "sociallounge",
  database: "sociallounge",
});

connection.connect();

// ---------------------------------------------2020-10-24완성--------------------------------------------------
// normal api
// get all Magazine
// req params: none
// res data: List of magazineObj
//
magazine_api.get("/", (req, res) => {
  var responseData = {};
  var sql = "SELECT * FROM MAGAZINE WHERE MAGAZINE_DEL = 0";
  var params = [];
  connection.query(sql, (err, result) => {
    if (result) {
      responseData.resultCode = "OK";
      responseData.data = result.map(item => ({
        magazineId: item.MAGAZINE_ID,
        magazineTitle: item.MAGAZINE_TITLE,
        magazineType: item.MAGAZINE_TYPE,
        magazineImg: item.MAGAZINE_IMG,
        magazineUrl: item.MAGAZINE_URL,
        magazineDate:MAGAZINE_DATE,
        magazineReadCnt:MAGAZINE_READ_CNT
      }));
      console.log("------get magazine called------")
      console.log(new Date());
      console.log("-----------------------------")
    } else {
      // 해당 값이 없음
      responseData.resultCode = "1";
    }
    res.json(responseData);
  });
});
// --------------------------------------------//2020-10-24완성--------------------------------------------------


module.exports = magazine_api;