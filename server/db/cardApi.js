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
        cardObj = new Card({
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

    card.remove = function (id) {

    }


    module.exports = card;

}())