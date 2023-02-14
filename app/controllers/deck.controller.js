const db = require("../models");

const Deck = db.decks;
const Op = db.sequelize.Op;

//to create a new deck:
exports.create = (req, res) => {
    //validate the deck, it needs a name.
    if (!req.body.deck_name) {
        res.status(400).send({
            message: "Deck requires a name."
        });
        return;
    }

    //if the request was valid, create the deck:
    const deck = {
        deck_name: req.body.deck_name,
        deck_creator: req.body.deck_creator,
        deck_games_played: req.body.deck_games_played,
        deck_games_won: req.body.deck_games_won
    }

    //save the created deck to the database:
    Deck.create(deck).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.staus(500).send({
            message: err.message || "an error occurred while creating the deck"
        });
    });
};

//to read all decks:
exports.findAll = (req, res) => {
    const deck_name = req.query.deck_name;
    var condition = deck_name? {deck_name: {[Op.like]: `%${deck_name}%`}} : null;

    Deck.findAll({ where: condition }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while fetching decks."
        });
    });
};

//To find a specific Deck:
exports.findOne = (req, res) => {
    const id = req.params.id;

    Deck.findbyPk(id).then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Deck with id = ${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Deck with deck_id= " + id
        });
    });
};

//To update a specific Deck:
exports.delete = (req, res) => {
    const id = req.params.id;

    Deck.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Deck was successfully deleted!"
            });
        } else {
            res.send({
                message: `Can't delete the deck with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete the deck with id= " + id
        });
    });
};

//to delete all decks:
exports.deleteAll = (req,res) => {
    Deck.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({message: `${nums} decks were successfully deleted.`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while trying to remove decks."
        });
    });
};