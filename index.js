var tecaj = require('./tecaj.js');
tecaj.getTecaj(process.argv[2], function(result) {
  console.log('THIS IS A RESULT: ' + JSON.stringify(result));
});