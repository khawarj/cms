(function () {

    function Init(cb) {

        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/CMS');

        var db = mongoose.connection;
        db.on('error', function () {
            cb("error");
            console.error.bind(console, 'connection error:')
        });

        db.once('open', function () {
            cb();
        });
    }


    module.exports = Init;
}())