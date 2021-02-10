module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "apply",
        {
            moimId: {
                type: DataTypes.INTEGER(11),
                references: {
                    model: "moims",
                    key: "id",
                },
                allowNull: false,
                comment: "신청 모임 정보",
            },
            userId: {
                type: DataTypes.INTEGER(11),
                references: {
                    model: "users",
                    key: "id",
                },
                allowNull: false,
                comment: "신청 유저 정보",
            },
            status: {
                type: DataTypes.STRING(1),
                allowNull: false,
                comment: "신청 상태",
            },
            method: {
                type: DataTypes.STRING(1),
                allowNull: false,
                comment: "결제 방식",
            },
            merchantUid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "",
            },
            impUid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "",
            },
            receiptUrl: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "영수증 url",
            },
            refundDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "환불 요청 날짜",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
