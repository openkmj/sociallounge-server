module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
                comment: "유저 이름",
            },
            userKid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "유저 카카오 로그인 아이디",
            },
            gender: {
                type: DataTypes.STRING(1),
                allowNull: true,
                comment: "유저 성별",
            },
            age: {
                type: DataTypes.STRING(1),
                allowNull: true,
                comment: "유저 나이대",
            },
            phone: {
                type: DataTypes.STRING(11),
                allowNull: true,
                comment: "유저 전화번호",
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: true,
                comment: "유저 이메일",
            },
            comment: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "안녕하세요. 반갑습니다.",
                comment: "유저 소개글",
            },
            noticeAgree: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "유저 알림 동의 여부",
            },
            isDel: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "유저 탈퇴 여부",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
