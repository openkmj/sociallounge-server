module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "notice",
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "공지사항 제목",
            },
            description: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "공지사항 내용",
            },
            isShow: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "Y",
                comment: "공지사항 노출 여부",
            },
            isDel: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "공지사항 삭제 여부",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
