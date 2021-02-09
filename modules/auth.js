var CONST = require("../consts/const");
var getConnection = require("./db");

var passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

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
    getConnection((conn) => {
        conn.query(
            "select * from TEST_USER where TEST_USER_KID=" + info.auth_id,
            (err, result) => {
                if (err) return done(err);
                if (result.length == 0) {
                    // 신규 유저 회원가입
                    console.log("신규 유저 회원가입");
                    conn.query(
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
        conn.release();
    });
}

passport.use(
    "kakao",
    new KakaoStrategy(
        {
            clientID: "b7f57b2324c3d9181eaecab31801ad2f",
            callbackURL:
                CONST.LOCAL_BACK_SERVER_URL + "/api/auth/kakao/callback",
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

exports.passport = passport;
exports.authenticateUser = authenticateUser;
