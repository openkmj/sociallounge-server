module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "moim",
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "모임 제목",
            },
            subtitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "모임 부제목",
            },
            mainImg: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "모임 대표 이미지",
            },
            type: {
                type: DataTypes.STRING(1),
                allowNull: false,
                comment: "모임 타입 S:시즌, E:이벤트",
            },
            seasonId: {
                type: DataTypes.INTEGER(11),
                references: {
                    model: "seasons",
                    key: "id",
                },
                allowNull: true,
                comment: "해당 시즌 아이디(시즌 모임인 경우)",
            },
            description: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                comment: "모임 소개 섹션 문구",
            },
            descriptionImg: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "모임 소개 섹션 이미지",
            },
            dday: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                comment: "모임 일정 섹션 문구",
            },
            ddayImg: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "모임 일정 섹션 이미지",
            },
            curriculum: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                comment: "모임 커리큘럼 섹션 문구",
            },
            curriculumImg: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "모임 커리큘럼 섹션 이미지",
            },
            location: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "모임 장소 이름",
            },
            locationDetail: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "모임 장소 상세 주소",
            },
            locationX: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: "모임 장소 X값(지도용)",
            },
            locationY: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: "모임 장소 Y값(지도용)",
            },
            hashtags: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "모임 해시태그",
            },
            maxMember: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "모임 모집인원",
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "모임 가격",
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "모임 모집 마감기간",
            },
            moimDate: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "모임 일정(요일, 시간)",
            },
            moimTime: {
                type: DataTypes.STRING(10),
                allowNull: false,
                comment: "모임 소요시간",
            },
            moimCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "모임 횟수",
            },
            isShow: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: "N",
                comment: "모임 노출 여부",
            },
        },
        { timestamps: true, charset: "utf8" }
    );
};
