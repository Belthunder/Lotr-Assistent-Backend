module.exports = app => {
    const decks = require("../controllers/deck.controller");

    var router = require("express").Router();

    //create a deck:
    router.post('/', decks.create);

    //read all decks:
    router.get('/', decks.findAll);

    //read a specific deck:
    router.get("/:id", decks.findOne);

    //update a specific deck:
    router.put("/:id", decks.update);

    //delete a specific deck:
    router.delete("/:id", decks.delete);

    //delete all decks:
    router.delete("/", decks.deleteAll);

    //add a card to a deck:
    router.post("/add", decks.addCardToDeck);

    app.use("/api/decks", router)
}