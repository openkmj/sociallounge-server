var express = require("express");
var request = require("request");
var faq_api = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "sociallounge.kr",
  user: "min",
  password: "sociallounge",
  database: "sociallounge",
});

connection.connect();

// ---------------------------------------------2020-10-22-완성--------------------------------------------------
// normal api
// get all FAQ
// req params: none
// res data: List of faqObj
//
faq_api.get("/", (req, res) => {
  var responseData = {};
  var sql = "SELECT * FROM FAQ WHERE FAQ_DEL = 0";
  var params = [];
  connection.query(sql, (err, result) => {
    if (result) {
      responseData.resultCode = "OK";
      responseData.data = result.map((item) => ({
        faqId: item.FAQ_ID,
        faqTitle: item.FAQ_TITLE,
        faqDesc: item.FAQ_DESC,
        faqType: item.FAQ_TYPE,
        faqReadCnt: item.FAQ_READ_CNT,
      }));
      console.log("------get faq called------");
      console.log(new Date());
      console.log("--------------------------");
    } else {
      // 해당 값이 없음
      console.log(result);
      responseData.resultCode = "1";
    }
    res.json(responseData);
  });
});
// --------------------------------------------//2020-10-22-완성--------------------------------------------------

// admin api
// create new FAQ
// req params:
//          title: 'title',
//          desc: 'desc',
//          type: 'type'
// res params:
//          result: 'result',
//          id: 'id'
//
faq_api.post("/", (req, res) => {
  var responseData = {};
  var sql = "INSERT INTO FAQ (FAQ_TITLE, FAQ_DESC, FAQ_TYPE) VALUES (?, ?, ?)";
  var params = [req.body.title, req.body.desc, req.body.type];
  if (!req.body.title || !req.body.desc || !req.body.type) {
    responseData.result = "invalid input";
  } else {
    connection.query(sql, params, (err, result) => {
      if (result) {
        responseData.result = "ok";
        responseData.id = result.insertId;
        console.log(result);
        console.log(req.body.title, req.body.desc, req.body.type);
      } else {
        responseData.result = "fail";
      }
      res.json(responseData);
    });
  }
});

// admin api
// delete the FAQ
// url params: id
// req params: none
// res params:
//          result: 'result',
//
faq_api.delete("/:id", (req, res) => {
  var responseData = {};
  var sql = "DELETE FROM FAQ WHERE FAQ_ID = ?";
  var params = [req.params.id];
  connection.query(sql, params, (err, result) => {
    if (result) {
      responseData.result = "ok";
    } else {
      responseData.result = "fail";
    }
    res.json(responseData);
  });
});

// admin api
// update the FAQ
// url params: id
// req params:
//          title: 'title',
//          desc: 'desc',
//          type: 'type'
// res params:
//          result: 'result',
//
faq_api.put("/:id", (req, res) => {
  var responseData = {};
  var sql =
    "UPDATE FAQ SET FAQ_TITLE = ?, FAQ_DESC = ?, FAQ_TYPE = ? WHERE (FAQ_ID = ?)";
  var params = [req.body.title, req.body.desc, req.body.type, req.params.id];
  if (!req.body.title || !req.body.desc || !req.body.type) {
    responseData.result = "invalid input";
  } else {
    connection.query(sql, params, (err, result) => {
      if (result) {
        responseData.result = "ok";
      } else {
        responseData.result = "fail";
      }
      res.json(responseData);
    });
  }
});

module.exports = faq_api;
