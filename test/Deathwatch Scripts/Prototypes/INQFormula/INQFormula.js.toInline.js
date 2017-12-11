var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.toInline()', function() {
	it('should return a string that roll20 can use as an inline', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula();
    inqformula.parse('3SB x 2PRD5 - SB');
    var inline = inqformula.toInline({SB: 4, PR: 5, dicerule: 'ro<2'});
    expect(inline).to.equal('[[12 * (10D5ro<2-4)]]');
  });
  it('should default to 0 PR, 0 SB, and an empty dice rule', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula();
    inqformula.parse('D10 + SB');
    var inline = inqformula.toInline();
    expect(inline).to.equal('[[1D10 + 0]]');
  });
});
