var express = require("express");
const { faq } = require("../models");
var faq_api = express.Router();

// normal api
// get all FAQ
// req params: none
// res data: List of faqObj
//
faq_api.get("/", (req, res) => {
    var responseData = {};
    faq.findAll({
        attributes: [
            "id",
            "title",
            "description",
            "type",
            ["updatedAt", "date"],
        ],
        where: {
            isShow: "Y",
            isDel: "N",
        },
    })
        .then((result) => {
            responseData.resultCode = "OK";
            responseData.success = true;
            responseData.data = result;
            console.log("------get faq called------");
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

module.exports = faq_api;
