//DB CONNECTION SETUP
const express = require('express');
const db = require('.db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())


//ROUTES:

//READ

//Read all cards
app.get('/api/get', (req, res) => {
    db.query("SELECT * FROM cards", (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

//Read one card
app.get('/api/getFromId/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cards WEHERE id = ?', id, (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

//CREATE


//UPDATE


//DELETE

//LISTEN
app.listen(PORT, () => {
    console.log("Listening on port ${PORT}")
})