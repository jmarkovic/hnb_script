var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var connection = mongoose.connection;

module.exports = {
    saveIt : function(item) {
        item.save(function(err, savedItem) {
            if (err) console.log("there was an error saving the item: " + err);
            console.log("item was properly saved: " + savedItem);
        })
    },
    findAll : function(model) {
        model.find(function(err, item) {
            if (err) console.log("there was an error when trying to find: " + err);
            console.log("found all: " + item);
        })
    },
    findOneOf : function(where, model, callback) {
        model.find().where(where[0].key).equals(where[0].value).exec(function(err, res) {
            if (err) {
                console.log("error occurred when trying to query with " + where + " : " + err);
                callback(null);
            } else {
                if (res.length > 0) {
                    callback(res);
                }
                else callback(null);
            }
        });
    }
}
