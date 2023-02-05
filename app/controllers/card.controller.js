const db = require("../models");

const Card = db.cards;
const Op = db.Sequelize.Op;

//to create a new card:
exports.create = (req, res) => {
    //validate the request: if there's no card name, it's not a valid request
    if (!req.body.card_name) {
        res.status(400).send({
            message: "Card requires a title."
        });
        return;
    }

    
    //if the request was valid, create the card:
    const card = {
        card_name: req.body.card_name,
        card_sphere: req.body.card_sphere,
        card_type: req.body.card_type,
        card_text: req.body.card_text
    }

    //save the created card to the database:
    Card.create(card).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "an error occurred while creating the card"
        });     
    });
};

//to read all cards:
exports.findAll = (req, res) => {
    const card_name = req.query.card_name;
    var condition = card_name? {card_name: {[Op.like]: `%${title}%`}} : null;

    Card.findAll({ where: condition}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "An error occured while fetching cards"
        });
    });
};

//to read a specific card:
exports.findOne = (req, res) => {
    const id = req.params.id;

    Card.findByPk(id).then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Card with id =${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Card with id=" + id
        });
    });
};

//to update a specific card:
exports.update = (req, res) => {
    const id = req.params.id;

    Card.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Card was updated successfully."
            });
        } else {
            res.send({
                message: `Can't update Card with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Card with id=" + id
        });
    });
};

//to delete a specrific card:
exports.delete = (req, res) => {
    const id = req.params.id;

    Card.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Card was deleted successfully!"
            });
        } else {
            res.send({
                message: `Can't delete the Card with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Card with id=" + id
        });
    });
};

//to delete all cards:
exports.deleteAll = (req, res) => {
    Card.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({message: `${nums} Cards were successfully deleted.`});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while trying to remove Cards."
        });
    });
};


