"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize.DataTypes);
db.season = require("./season")(sequelize, Sequelize.DataTypes);
db.moim = require("./moim")(sequelize, Sequelize.DataTypes);
db.apply = require("./apply")(sequelize, Sequelize.DataTypes);
db.notice = require("./notice")(sequelize, Sequelize.DataTypes);
db.faq = require("./faq")(sequelize, Sequelize.DataTypes);

module.exports = db;
