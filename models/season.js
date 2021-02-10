module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "season",
        {
            title: {
                type: DataTypes.STRING(20),
                allowNull: false,
                comment: "시즌 제목",
            },
            mainImg: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "시즌 메인 이미지",
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "시즌 시작 날짜",
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "시즌 종료 날짜",
            },
            isShow: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "시즌 노출 여부",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
