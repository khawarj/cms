(function(){


    var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

    var cardSchema = Schema({
        _id: Number,
        name: String,
        title: String,
        subtitle: String,
        copy: String,
        layout: Number,
        links: [{type: Schema.Types.ObjectId, ref: 'Link'}]
    });

    var linkSchema = Schema({
        _id: Number,
        _creator: {type: Number, ref: 'Person'},
        title: String,
        href: String,
        altText: String
    });

    module.exports.cardSchema = cardSchema;
    module.exports.linkSchema = linkSchema;
}())