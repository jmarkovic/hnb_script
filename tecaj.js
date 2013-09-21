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

var dateString = function() {
	var date = new Date();
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

	console.log(table);
}

var callback = function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	console.log(body);
    	parseBody(body);
  	} else {
		console.log("Error has occured");
	}
}

var link = "http://www.hnb.hr/tecajn/f" + dateString() + ".dat"
console.log(link);

request(link, callback);