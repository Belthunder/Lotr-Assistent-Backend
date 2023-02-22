const db = require("../models");

const Deck = db.decks;
const Card = db.cards;
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
        res.status(500).send({
            message: err.message || "an error occurred while creating the deck"
        });
    });
};

//to read all decks:
exports.findAll = (req, res) => {
    const deck_name = req.query.deck_name;
    var condition = deck_name? {deck_name: {[Op.like]: `%${deck_name}%`}} : null;

    Deck.findAll({ 
        where: condition,
        include: [
            {
                model: Card,
                as: "cards",
                attributes: ["card_name"],
                through: {
                    attributes: []
                }
            }
        ] 
    }).then(data => {
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

    Deck.findByPk(id).then(data => {
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
exports.update = (req, res) => {
    const id = req.params.id;

    Deck.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Deck was updated successfully."
            });
        } else {
            res.send({
                message: `Can't update deck with deck_id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating deck with id = " + id
        });
    });
};

//to delete a specific deck
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

exports.addCardToDeck = (req, res) => {
    return Deck.findByPk(parseInt(req.body.deck_id)).then((deck) => {
        if(!deck) {
            res.status(400).send({message: `deck with id ${req.body.deck_id} was not found`})
            return null;
        }
        return Card.findByPk(parseInt(req.body.card_id)).then((card) => {
            if (!card) {
                res.status(400).send({message: `card with id ${req.body.card_id} was not found`})
                return null;
            }


            deck.addCard(card);
            res.send({message: `Added card ${card.id} to deck ${deck.id}.`})
            return deck;
        });
    }).catch(err => {
        res.status(400).send({message: `error while adding card to deck`});
    });
};

