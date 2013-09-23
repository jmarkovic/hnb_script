var Currency = require('./Currency');
var CurrencyTable = require('./CurrencyTable');
module.exports = {
    dateString :  function(pDate) {
        // If no parameter is provided, use TODAY date
        var date = pDate || new Date();
        var string = "";
        var day = date.getDate();
        day < 10 ? 	string += ('0' + day) : string += day;
        var month = date.getMonth() + 1;
        month < 10 ? string += ('0' + month) : string += month;
        var year = date.getFullYear() % 100;
        string += year;
        return string;
    },
    parseBody:  function(body) {
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
        return table;
    },
    Currency : Currency
}
