var logger = require('winston'),
    request = require("request"),
    usedDate = '',
    d = new Date(),
    helpers = require('./lib/helpers'),
/* Variable that, when set, represent a function
    that will be called when tecaj.js successfully receives JSON */
    resultCallback,
/* Returns a string representing a date in 'ddMMyy'
	string format. */
    dateString = helpers.dateString,
    parseBody = helpers.parseBody,
/* Callback function called on request.
	Checks if any 'checked' error has occured,
	and if so, displays proper message. If request
	was successful, parse method is called.
	Ambiguous error message is displayed when
	something wrong happened. */
    callback = function (error, response, body) {
        if (error) {
            logger.log(error);
        } else if (response.statusCode == 404) {
            logger.log('error','No document found under provided date [' + usedDate
                       + ']. Trying day before');
            d.setDate(d.getDate() - 1);
            usedDate = dateString(d);
            var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";
            request(link, callback);
        } else if (!error && response.statusCode == 200) {
            var a = parseBody(body);
            logger.log('info',JSON.stringify(a));
          if (resultCallback !== null) {
            resultCallback(a);
          }
        } else {
            logger.log('error',"Error has occured");
        }
    }

module.exports = { getTecaj : function(date, results) {
    resultCallback = results;
    usedDate = date || dateString(d);
    var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";
    request(link, callback); }
}
