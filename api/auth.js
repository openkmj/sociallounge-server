var express = require("express");
var passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const auth_api = express.Router();

// 디비 연결
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "sociallounge.kr",
  user: "min",
  password: "sociallounge",
  database: "sociallounge",
});
connection.connect();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: "b7f57b2324c3d9181eaecab31801ad2f",
      callbackURL: "http://175.113.223.199:8000/api/auth/kakao/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      var _profile = profile._json;
      //console.log(_profile);
      kakaoLogin(
        {
          auth_id: _profile.id,
          user_nickname: _profile.properties.nickname,
          user_img: _profile.properties.profile_image,
        },
        done
      );
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

function kakaoLogin(info, done) {
  if (!info) {
    return done(null, {});
  }
  console.log("kakaoLogin 실행");
  connection.query(
    "select * from TEST_USER where TEST_USER_KID=" + info.auth_id,
    (err, result) => {
      if (err) return done(err);
      if (result.length == 0) {
        // 신규 유저 회원가입
        console.log("신규 유저 회원가입");
        connection.query(
          "INSERT INTO TEST_USER (TEST_USER_KID, TEST_USER_NICKNAME) VALUES (?, ?)",
          [info.auth_id, info.user_nickname],
          (err, result) => {
            if (err) return done(err);
            else {
              console.log("신규 유저 등록 완료!");
              return done(null, {
                user_id: info.auth_id,
                user_nickname: info.user_nickname,
              });
            }
          }
        );
      } else if (result && result.length > 0) {
        // 기존 유저 로그인
        console.log("기존 유저 로그인");
        return done(null, {
          id: result[0].TEST_USER_ID,
          user_id: result[0].TEST_USER_KID,
          user_nickname: result[0].TEST_USER_NICKNAME,
        });
      }
    }
  );
}

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("리퀘스트에 어센티케이티드가 ?");
    res.json({
      result: "no login",
    });
  }
};

auth_api.get("/kakao", passport.authenticate("kakao"));

auth_api.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "http://175.113.223.199:7777/",
    failureRedirect: "http://175.113.223.199:7777/login",
  })
);

auth_api.get("/name", authenticateUser, (req, res) => {
  if (!req.user) {
    console.log("엥");
    res.json({ result: "no login" });
  } else {
    connection.query(
      "select * from TEST_USER where TEST_USER_KID=" + req.user.user_id,
      (err, result) => {
        if (err) {
          res.json({ result: "no data" });
        } else {
          res.json({
            result: "ok",
            data: {
              userId: result[0].TEST_USER_ID,
              userNickname: result[0].TEST_USER_NICKNAME,
              userKId: result[0].TEST_USER_KID,
            },
          });
        }
      }
    );
  }
});

exports.auth_api = auth_api;
exports.authenticateUser = authenticateUser;
