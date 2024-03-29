//DB CONNECTION SETUP
const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8080;

//When processing json content
app.use(express.json())

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

//when processing URL content
app.use(express.urlencoded({extended: true}));


const db = require("./app/models");

db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("failed to sync: error: " + err.message);
});

//ROUTES:
const cardRoutes = require("./app/routes/card.routes")(app)
const deckRoutes = require("./app/routes/deck.routes")(app) 

app.get("/", (req, res) => {
    res.json({message: "Welcome to LOTR LCG Assistant."})
})

cardRoutes
deckRoutes

//LISTEN
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})