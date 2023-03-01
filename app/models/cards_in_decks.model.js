const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Cards_In_Decks = sequelize.define("cards_in_decks", {
        card_number: {
            type: Sequelize.DataTypes.INTEGER
        },
    });

    return Cards_In_Decks;
};