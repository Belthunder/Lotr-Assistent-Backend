const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        aquire: dbConfig.pool.aquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cards = require("./card.model.js")(sequelize, Sequelize);
db.decks = require("./deck.model.js")(sequelize, Sequelize);

db.cards.belongsToMany(db.decks, {
    through: "cards_in_decks",
    as: "decks",
    foreignKey: "card_id",
});

db.decks.belongsToMany(db.cards, {
    through: "cards_in_decks",
    as: "cards",
    foreignKey: "deck_id",
});

module.exports = db;