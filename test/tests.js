var should = require('should');
var tecaj = require('../index');

describe('tecaj', function(){
    it('should have a getTecaj method', function(){
        tecaj.should.have.property('getTecaj').with.type('function');
    });
});
