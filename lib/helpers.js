var models = require('./models');
var Currency = models.Currency;
var CurrencyTable = models.CurrencyTable;
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

        var currencies = [];

        rowLines.forEach(function(row) {
            var rowSplit = row.split('       ');
            if (rowSplit.length > 1) {
                var currency = new Currency({
                    id : rowSplit[0].substring(0, 3),
                    name : rowSplit[0].substring(3, 6),
                    base : rowSplit[0].substring(6, 9),
                    low : parseFloat(rowSplit[1].replace(',','.')),
                    mid : parseFloat(rowSplit[2].replace(',','.')),
                    high : parseFloat(rowSplit[3].replace(',','.'))
                });

                currencies.push(currency);
            }
        });

        var dateMade = rowLines[0].substring(3, 11);
        var dateDisplay = rowLines[0].substring(11, 19);
        var table = new CurrencyTable({
            made : dateMade,
            display : dateDisplay,
            currency : currencies
        });

        return table;
    }
}
