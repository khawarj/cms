(function () {

    var express = require("express");
    var app = express();
    var path = require("path");
    var bodyParser = require('body-parser');


    var connection = require("./server/db/connect.js");
    var cardApi = require("./server/db/cardApi.js");


    connection(function () {

        app.use('/public', express.static('public'));
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({extended: false}))

        // parse application/json
        app.use(bodyParser.json())


        app.get("/", function (req, res) {
            res.sendFile('home.html', {root: path.join(__dirname, '/public/templates')});
        })


        app.get("/createCard", function (req, res) {
            res.sendFile('cardCreate.html', {root: path.join(__dirname, '/public/templates')});
        })

        app.post("/api/cards", function (req, res) {
            cardApi.save(req.body, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error");
                } else {
                    res.send(data);
                }
            })
        })


        app.get("/api/cards", function (req, res) {
            cardApi.getCards(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error");
                } else {
                    res.send(data);
                }
            })
        })

        app.get("/api/cards/:cardId", function (req, res) {

            if (req.params.cardId) {
                cardApi.getCard(req.params.cardId, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error");
                    } else {
                        res.send(data);
                    }
                })

            } else {
                res.status(500).send("Need card id");
            }
        })


        app.post("/api/cards/:cardId", function (req, res) {
            if (req.params.cardId) {
                cardApi.save(req.body, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error");
                    } else {
                        res.send(data);
                    }
                })
            } else {
                res.status(500).send("Need card id");
            }
        })

        app.listen(3500, function () {
            console.log("Listening at 3500");
        })
    });


}())