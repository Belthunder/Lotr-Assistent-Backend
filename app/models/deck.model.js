const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Deck = sequelize.define("deck", {
        deck_name: {
            type: Sequelize.STRING
        },
        deck_creator: {
            type: Sequelize.STRING
        },
        deck_games_played: {
            type: Sequelize.DataTypes.INTEGER
        },
        deck_games_won: {
            type: Sequelize.DataTypes.INTEGER
        }, 
    });

    return Deck;
};