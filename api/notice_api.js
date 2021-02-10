var express = require("express");
const { notice } = require("../models");
var notice_api = express.Router();
const getConnection = require("../modules/db");

// ---------------------------------------------2020-10-22완성--------------------------------------------------
// normal api
// get all Notice
// req params: none
// res data: List of noticeObj
//
notice_api.get("/", (req, res) => {
    var responseData = {};
    notice
        .findAll({
            attributes: ["title", "description"],
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

// admin api
// create new Notice
// req params:
//          title: 'title',
//          desc: 'desc'
// res params:
//          result: 'result',
//          id: 'id'
//
notice_api.post("/", (req, res) => {
    var responseData = {};
    var sql = "INSERT INTO NOTICE (NOTICE_TITLE, NOTICE_DESC) VALUES (?, ?)";
    var params = [req.body.title, req.body.desc];
    if (!req.body.title || !req.body.desc) {
        responseData.result = "invalid input";
    } else {
        getConnection((conn) => {
            conn.query(sql, params, (err, result) => {
                if (result) {
                    responseData.result = "ok";
                    responseData.id = result.insertId;
                    console.log(result);
                    console.log(req.body.title, req.body.desc);
                } else {
                    responseData.result = "fail";
                }
                res.json(responseData);
            });
            conn.release();
        });
    }
});

// admin api
// delete the Notice
// url params: id
// req params: none
// res params:
//          result: 'result',
//
notice_api.delete("/:id", (req, res) => {
    var responseData = {};
    var sql = "DELETE FROM NOTICE WHERE NOTICE_ID = ?";
    var params = [req.params.id];
    getConnection((conn) => {
        conn.query(sql, params, (err, result) => {
            if (result) {
                responseData.result = "ok";
            } else {
                responseData.result = "fail";
            }
            res.json(responseData);
        });
        conn.release();
    });
});

// admin api
// update the Notice
// url params: id
// req params:
//          title: 'title',
//          desc: 'desc'
// res params:
//          result: 'result',
//
notice_api.put("/:id", (req, res) => {
    var responseData = {};
    var sql =
        "UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_DESC = ? WHERE (NOTICE_ID = ?)";
    var params = [req.body.title, req.body.desc, req.params.id];
    if (!req.body.title || !req.body.desc) {
        responseData.result = "invalid input";
    } else {
        getConnection((conn) => {
            conn.query(sql, params, (err, result) => {
                if (result) {
                    responseData.result = "ok";
                } else {
                    responseData.result = "fail";
                }
                res.json(responseData);
            });
            conn.release();
        });
    }
});

module.exports = notice_api;
