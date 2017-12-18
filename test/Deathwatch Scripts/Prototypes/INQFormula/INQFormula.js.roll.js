var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.roll()', function() {
	it('should return a numerical value', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('3SB x 2PRD5 - SB');
    var value = inqformula.roll({PR: 2, SB: 3});
    expect(value).to.be.a('number');
    expect(value).to.be.below(154);
    expect(value).to.be.above(8);
    for(var i = 0; i < 10000; i++){
      value = inqformula.roll({PR: 2, SB: 3});
      expect(value).to.be.below(154);
      expect(value).to.be.above(8);
    }
  });
  it('should default to a PR and SB of 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('2PRD5 - 2');
    var value = inqformula.roll();
    expect(value).to.equal(-2);
  });
});
