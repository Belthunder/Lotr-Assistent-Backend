const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        card_name: {
            type: Sequelize.STRING
        },
        card_sphere: {
            type: Sequelize.STRING
        },
        card_type: {
            type: Sequelize.STRING
        },
        card_text: {
            type: Sequelize.STRING
        }, 
    });

    return Card;
};