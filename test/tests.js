var should = require('should');
var tecaj = require('../index');

describe('tecaj', function(){
    it('should have a getTecaj method', function(){
        tecaj.should.have.property('getTecaj').with.type('function');
    });
    it('should return a value when called', function(done){
        tecaj.getTecaj(null, function(t){
            should.exist(t); 
            done();
        });
    });
});
