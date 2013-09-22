var request = require("request");
var Currency = function() {
	return this;
}
var CurrencyTable = function(dateMade, dateDisplay, currency) {
	this.made = dateMade;
	this.display = dateDisplay;
	this.currency = currency;
	return this;
}
var usedDate = '';
var d = new Date();

/* Returns a string representing a date in 'ddMMyy'
	string format. */
var dateString = function(pDate) {
	var date;
	// If no parameter is provided, use TODAY date
	if (typeof pDate === 'undefined') {
		var date = new Date();
	} else {
		date = pDate;
	}
	var string = "";

	var day = date.getDate();
	if (day < 10) {
		string += ('0' + day);
	} else {
		string += day;
	}
	var month = date.getMonth() + 1;
	if (month < 10) {
		string += ('0' + month);
	} else {
		string += month;
	}
	var year = date.getFullYear() % 100;
	string += year;
	return string;
}

var parseBody = function(body) {
	var rowLines = body.split('\r\n');

	var currencies = {};

	rowLines.forEach(function(row) {
		var rowSplit = row.split('       ');
		if (rowSplit.length > 1) {

			var currency = new Currency();
			currency.id = rowSplit[0].substring(0, 3);
			currency.name = rowSplit[0].substring(3, 6);
			currency.base = rowSplit[0].substring(6, 9);

			currency.low = parseFloat(rowSplit[1].replace(',','.'), 10);
			currency.mid = parseFloat(rowSplit[2].replace(',','.'), 10);
			currency.high = parseFloat(rowSplit[3].replace(',','.'), 10);

			currencies[currency.id] = currency;
		}
	});

	var dateMade = rowLines[0].substring(3, 11);
	var dateDisplay = rowLines[0].substring(11, 19);
	var table = new CurrencyTable(dateMade, dateDisplay, currencies);

	// Currently, result is only displayed to console
	console.log(table);
}

/* Callback function called on request.
	Checks if any 'checked' error has occured,
	and if so, displays proper message. If request
	was successful, parse method is called.
	Ambiguous error message is displayed when
	something wrong happened. */
var callback = function (error, response, body) {
	if (error) {
		console.log(error);
	} else if (response.statusCode == 404) {
		console.log("No document found under provided date. Trying day before");
		d = new Date();
		d.setDate(d.getDate() - 1);
		usedDate = dateString(d);
		var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";
		request(link, callback);
	} else if (!error && response.statusCode == 200) {
		console.log(body);
		parseBody(body);
	} else {
		console.log("Error has occured");
	}
}

usedDate = dateString(d);
var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";

request(link, callback);