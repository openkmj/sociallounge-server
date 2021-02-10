module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "faq",
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "FAQ 제목",
            },
            description: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "FAQ 내용",
            },
            type: {
                type: DataTypes.STRING(1),
                allowNull: false,
                comment: "FAQ 분류",
            },
            isShow: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "Y",
                comment: "FAQ 노출 여부",
            },
            isDel: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "FAQ 삭제 여부",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
