var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');

describe('numModifier', function() {
  Campaign().MOCK20reset();
  var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  var MyScript = fs.readFileSync(filePath, 'utf8');
  eval(MyScript);
	it('should be able to return a regex', function(){
    var re = RegExp(numModifier.regexStr());
    expect(re).to.be.a('RegExp');
  });
  it('should be able to perform basic mathematical operations', function(){
    expect(numModifier.calc('10', '  +', '2')).to.equal(12);
    expect(numModifier.calc('10', '-', '2')).to.equal(8);
    expect(numModifier.calc('10', '*', '2')).to.equal(20);
    expect(numModifier.calc('10', '/', '2')).to.equal(5);
    expect(numModifier.calc('10', '=', '2')).to.equal('2');
  });
});
