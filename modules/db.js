var mysql = require("mysql");
var DB = require("../consts/db_config");
var pool = mysql.createPool(DB);

function getConnection(callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("DB CONNECTION ERROR");
        } else {
            callback(conn);
        }
    });
}

module.exports = getConnection;
