var express = require("express");
var admin_api = express.Router();
const getConnection = require("../modules/db");

admin_api.post("/login", (req, res) => {
    var responseData = {};
    var sql = "SELECT * FROM ADMIN WHERE ADMIN_NAME = ?";
    var params = [req.body.name];
    getConnection((conn) => {
        conn.query(sql, params, (err, result) => {
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
        conn.release();
    });
});

module.exports = admin_api;
