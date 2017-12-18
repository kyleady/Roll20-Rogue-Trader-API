var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.onlyZero()', function() {
	it('should return true if the formula will always return 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('0');
    expect(inqformula.onlyZero()).to.equal(true);

    inqformula = new INQFormula('0 x (D10 + 3)');
    expect(inqformula.onlyZero()).to.equal(true);

    inqformula = new INQFormula('D1 - 1');
    expect(inqformula.onlyZero()).to.equal(true);

    inqformula = new INQFormula('2PRD1 - 2PR');
    expect(inqformula.onlyZero()).to.equal(true);

    inqformula = new INQFormula('3SBD1 - 3SB');
    expect(inqformula.onlyZero()).to.equal(true);
  });
  it('should return false if the formula can return something besides 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('3');
    expect(inqformula.onlyZero()).to.equal(false);

    inqformula = new INQFormula('2 x (D10 + 3)');
    expect(inqformula.onlyZero()).to.equal(false);

    inqformula = new INQFormula('D2 - 1');
    expect(inqformula.onlyZero()).to.equal(false);

    inqformula = new INQFormula('2PRD1 - 2SB');
    expect(inqformula.onlyZero()).to.equal(false);

    inqformula = new INQFormula('3SBD1 - 2SB');
    expect(inqformula.onlyZero()).to.equal(false);
  });
});
