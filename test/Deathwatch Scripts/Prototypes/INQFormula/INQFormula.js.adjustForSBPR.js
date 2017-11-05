var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.adjustForSBPR()', function() {
	it('should return an object of adjusted values', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('3SB x 2PRD5 - SB');
    var adjusted;
    adjusted = inqformula.adjustForSBPR({PR: 1, SB: 1});
    expect(adjusted).to.deep.equal({multiplier: 3, dicenumber: 2, modifier: -1});
    adjusted = inqformula.adjustForSBPR({PR: 0, SB: 2});
    expect(adjusted).to.deep.equal({multiplier: 6, dicenumber: 0, modifier: -2});
    adjusted = inqformula.adjustForSBPR({PR: 2, SB: 0});
    expect(adjusted).to.deep.equal({multiplier: 0, dicenumber: 4, modifier: -0});
  });
  it('should default to 0 PR and 0 SB', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('4 x D5 + 9PR');
    var adjusted = inqformula.adjustForSBPR();
    expect(adjusted).to.deep.equal({multiplier: 4, dicenumber: 1, modifier: 0});
  });
});
