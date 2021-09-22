const express = require('express')
const app = express()
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldkov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const userCollection = client.db("najj").collection("users");

    app.post('/signup', (req, res) => {
        const newUser = req.body;
        userCollection.insertOne(newUser)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/users/:mail', (req, res) => {
        userCollection.find({ email: req.params.mail })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.get('/users/:phone', (req, res) => {
        userCollection.find({ phone: req.params.phone })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

});



app.listen(port)