(function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var linkSchema = new Schema({
        title: String,
        href: String,
        altText: String
    })

    var cardSchema = new Schema({
        name: String,
        title: String,
        subtitle: String,
        copy: String,
        layout: String,
        links: [linkSchema]
    });

    var Card = mongoose.model('Card', cardSchema);
    var Link = mongoose.model('link', linkSchema);

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

    card.getLink = function (cardId, linkId, cb) {
        if (linkId) {
            Card.find({"links._id": linkId}, function (err, data) {
                cb(err, data);
            })
        } else {
            cb("Need Link Id to get Link", undefined)
        }
    }


    card.saveLink = function (cardId, link, cb) {
        if (cardId) {
            Card.findById(cardId, function (err, card) {
                if (err) {
                    cb(err, card);
                } else {
                    if (link._id && link._id != 0) {
                        card.links.findById(link._id, function (err, linkDb) {
                            if (err) {
                                cb(err, link);
                            } else {
                                linkDb.title = link.title;
                                linkDb.href = link.href;
                                linkDb.altText = link.altText;

                                linkDb.save(function (err, data) {
                                    cb(err, data);
                                })
                            }
                        })
                    } else {
                        //new Link
                        var linkObj = new Link({
                            title: link.title,
                            href: link.href,
                            altText: link.altText
                        });
                        card.links.push(linkObj);
                        card.save(function (err, card) {
                            cb(err, card);
                        })
                    }
                }
            })
        } else {
            cb("Need Link Id to get Link", undefined)
        }
    }

    card.remove = function (id) {

    }


    module.exports = card;

}())