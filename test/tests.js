var should = require('should');
var tecaj = require('../index');

describe('tecaj', function(){
    it('should have a getTecaj method', function(){
        tecaj.should.have.property('getTecaj').with.type('function');
    });
    it('should return a value when called with 2 parameters', function(done){
        tecaj.getTecaj(null, function(t){
            should.exist(t); 
            done();
        });
    });
    it('should return a value when called with just a callback', function(done){
        tecaj.getTecaj(function(t){
            should.exist(t);
            done();
        });
    });
});
