var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/a');
var connection = mongoose.connection;

module.exports = {
    saveIt : function(item) {
        item.save(function(err, savedItem) {
            if (err) console.log("there was an error saving the item: " + err);
            console.log("item was properly saved: " + savedItem);
        })
    },
    findIt : function(model) {
        model.find(function(err, item) {
            if (err) console.log("there was an error when trying to find: " + err);
            console.log("found: " + item);
        })
    }
}
