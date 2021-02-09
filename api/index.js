var express = require("express");
var api = express.Router();

var admin_api = require("./admin_api");

var user_api = require("./user_api");
var notice_api = require("./notice_api");
var faq_api = require("./faq_api");
var apply_api = require("./apply_api");
var item_api = require("./item_api");
var auth_api = require("./auth");
var moim_api = require("./moim_api");

api.use("/admin", admin_api);
api.use("/apply", apply_api);
api.use("/auth", auth_api);
api.use("/user", user_api);
api.use("/notice", notice_api);
api.use("/faq", faq_api);
api.use("/moim", moim_api);

module.exports = api;
