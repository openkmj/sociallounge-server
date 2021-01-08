var express = require("express");
var api = express.Router();

var admin_api = require("./admin_api");

var user_api = require("./user_api");
var notice_api = require("./notice_api");
var faq_api = require("./faq_api");
var apply_api = require("./apply_api");
var item_api = require("./item_api");
const magazine_api = require("./magazine_api");
var auth_api = require("./auth");

api.use("/admin", admin_api);
api.use("/apply", apply_api);
api.use("/auth", auth_api.auth_api);
api.use("/user", user_api);
api.use("/magazine", magazine_api);
api.use("/notice", notice_api);
api.use("/faq", faq_api);

api.get("/about", (req, res) => {
  console.log(req.user);
  return res.send("here is social lounge!! good");
});
api.get("/about2", auth_api.authenticateUser, (req, res) => {
  console.log(req.user);
  return res.send("here is social lounge!! good");
});

api.post("/about", (req, res) => {
  console.log(req.body);
  return res.json({ id: "환영", password: "한다" });
});


module.exports = api;
