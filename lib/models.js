var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencySchema = new Schema({
	id : { type : String, default : "000"},
	name : String,
	base : { type : Number, default : 1 },
	low : Number,
	mid : Number,
	high : Number
});

var currencyTableSchema = new Schema({
	made : String,
	display : String,
	currency : [currencySchema]
});

var Currency = mongoose.model('Currency', currencySchema);
var CurrencyTable = mongoose.model('CurrencyTable', currencyTableSchema);

module.exports = { Currency : Currency, CurrencyTable : CurrencyTable };