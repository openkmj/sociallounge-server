var express = require("express");
var request = require("request");
var item_api = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "sociallounge.kr",
  user: "min",
  password: "sociallounge",
  database: "sociallounge",
});

connection.connect();

item_api.post("/login", (req, res) => {
  var responseData = {};
  var sql = "SELECT * FROM ADMIN WHERE ADMIN_NAME = ?";
  var params = [req.body.name];
  connection.query(sql, params, (err, result) => {
    if (result && result.length > 0) {
      if (result[0].ADMIN_PASSWORD == req.body.password) {
        responseData.result = "ok";
      } else {
        responseData.result = "invalid password";
      }
    } else {
      responseData.result = "invalid id";
    }
    res.json(responseData);
  });
});

module.exports = item_api;
