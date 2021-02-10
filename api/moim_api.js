var express = require("express");
var moim_api = express.Router();
const { QUERY } = require("../consts/sql.js");
const getConnection = require("../modules/db");

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
    getConnection((conn) => {
        conn.query(
            "SELECT TITLE AS title, MAIN_IMG AS mainImg, START_DATE AS startDate, END_DATE AS endDate FROM SEASON WHERE VIEW_YN='Y'",
            (err, result) => {
                if (err) responseData.result = "QUERY ERROR";
                else if (result) {
                    responseData.result = "OK";
                    responseData.data = {};
                    responseData.data.season = result[0];
                    conn.query(sql, (err, result) => {
                        if (result) {
                            responseData.result = "OK";
                            responseData.data.seasonMoim = result.filter(
                                (i) => i.type == "S"
                            );
                            responseData.data.eventMoim = result.filter(
                                (i) => i.type === "E"
                            );
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
                } else {
                    responseData.result = "NO DATA";
                }
            }
        );

        conn.release();
    });
});

moim_api.get("/:id", (req, res) => {
    var responseData = {};
    getConnection((conn) => {
        conn.query(
            "SELECT * FROM MOIM WHERE MOIM_ID = ?",
            [req.params.id],
            (err, result) => {
                if (err) responseData.result = "QUERY ERROR";
                else if (result) {
                    responseData.result = "OK";
                    responseData.data = result[0];
                } else {
                    responseData.result = "NO DATA";
                }
                res.json(responseData);
            }
        );
        conn.release();
    });
});

module.exports = moim_api;
