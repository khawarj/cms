(function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var cardSchema = Schema({
        name: String,
        title: String,
        subtitle: String,
        copy: String,
        layout: String,
        links: [{
            title: String,
            href: String,
            altText: String
        }]
    });

    var Card = mongoose.model('Card', cardSchema);

    var card = {};

    card.save = function (card, cb) {
        if (card._id) {
            Card.findById(card._id, function (err, data) {
                if (err) {
                    cb(err, data);
                } else {
                    data.name = card.name;
                    data.title = card.title;
                    data.subtitle = card.subtitle;
                    data.copy = card.copy;
                    data.layout = card.layout;
                    data.save(function (err, data) {
                        cb(err, data);
                    })
                }
            })
        } else {
            var cardObj = new Card({
                name: card.name,
                title: card.title,
                subtitle: card.subtitle,
                copy: card.copy,
                layout: card.layout,
                links: []
            })

            cardObj.save(function (err, data) {
                cb(err, data);
            });
        }


    }

    card.getCards = function (cb) {
        Card.find({}, function (err, data) {
            cb(err, data);
        })
    }

    card.getCard = function (id, cb) {
        Card.findById(id, function (err, data) {
            cb(err, data);
        })
    }


    card.remove = function (id) {

    }


    module.exports = card;

}())