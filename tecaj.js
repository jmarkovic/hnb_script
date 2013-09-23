var logger = require('winston'),
    request = require("request"),
    usedDate = '',
    d = new Date(),
/* Returns a string representing a date in 'ddMMyy'
	string format. */
    helpers = require('./lib/helpers'),
    dateString = helpers.dateString,
    parseBody = helpers.parseBody,
/* Callback function called on request.
	Checks if any 'checked' error has occured,
	and if so, displays proper message. If request
	was successful, parse method is called.
	Ambiguous error message is displayed when
	something wrong happened. */
    d = new Date(),
    callback = function (error, response, body) {
        if (error) {
            logger.log(error);
        } else if (response.statusCode == 404) {
            logger.log('error','No document found under provided date. Trying day before');
            d.setDate(d.getDate() - 1);
            usedDate = dateString(d);
            var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";
            request(link, callback);
        } else if (!error && response.statusCode == 200) {
            logger.log('info', body);
            logger.log('info',JSON.stringify(parseBody(body)));
        } else {
            logger.log('error',"Error has occured");
        }
    }

usedDate = dateString(d);
var link = "http://www.hnb.hr/tecajn/f" + usedDate + ".dat";

request(link, callback);
