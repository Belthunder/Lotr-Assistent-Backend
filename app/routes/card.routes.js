module.exports = app => {
    const cards = require("../controllers/card.controller");

    var router = require("express").Router();

    //create a card:
    router.post('/', cards.create);

    //read all cards:
    router.get('/', cards.findAll);

    //read a specific card:
    router.get("/:id", cards.findOne);

    //update a specific card:
    router.put("/:id", cards.update);

    //delete a specific card:
    router.delete("/:id", cards.delete);

    //delete all cards:
    router.delete("/", cards.deleteAll);

    app.use("/api/cards", router)
}