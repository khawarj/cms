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

        app.post("/createCard", function (req, res) {
            cardApi.save(req.body, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.send("success");
                }
            })
        })

        app.listen(3500, function () {
            console.log("Listening at 3500");
        })
    });


}())