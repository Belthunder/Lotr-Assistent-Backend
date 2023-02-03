//DB CONNECTION SETUP
const express = require('express');
const db = require('.db')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3002;

//When processing json content
app.use(express.json())

var corsOptions = {
    origin: "http://localhost:3002"
}

app.use(cors(corsOptions));

//when processing URL content
app.use(express.urlencoded({extended: true}));

//ROUTES:
app.get("/", (req, res) => {
    res.json({message: "Welcome to LOTR LCG Assistant."})
})
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