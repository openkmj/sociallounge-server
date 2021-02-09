var express = require("express");
var apply_api = express.Router();

//아임포트 연동
var Iamport = require("iamport");
var iamport = new Iamport({
    impKey: "4700514744750425",
    impSecret:
        "pj0EIxjajlgUvJFYaoybSLIOTfKD6nMvHMapktzDPPykyejJCRVvDDjxT4aZrXv8KFx487IXWhivwBf8",
});

apply_api.post("/", (req, res) => {
    iamport.payment
        .getByImpUid({
            imp_uid: req.body.imp_uid,
        })
        .then((result) => {
            if (result.status === "paid" && req.body.amount === result.amount) {
                console.log("결제 확인 완료!!!");
            } else {
                console.log("결제 확인 실패!!!");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    // var responseData = {};
    // var sql = "INSERT INTO APPLY (, ) VALUES (?, ?)";
    // var params = [req.body.name];
    // connection.query(sql, params, (err, result) => {
    //   if (result && result.length > 0) {
    //     if (result[0].ADMIN_PASSWORD == req.body.password) {
    //       responseData.result = "ok";
    //     } else {
    //       responseData.result = "invalid password";
    //     }
    //   } else {
    //     responseData.result = "invalid id";
    //   }
    //   res.json(responseData);
    // });
});
// // 아임포트 고유 아이디로 결제 정보를 조회
// iamport.payment.getByImpUid({
//   imp_uid: 'your imp_uid'
// }).then(function(result){
//   // To do
// }).catch(function(error){
//   // handle error
// });

// // 상점 고유 아이디로 결제 정보를 조회
// iamport.payment.getByMerchant({
//   merchant_uid: 'your merchant_uid'
// })

// // 상태별 결제 정보 조회
// iamport.payment.getByStatus({
//   payment_status: 'your payment_status'
// })

module.exports = apply_api;
