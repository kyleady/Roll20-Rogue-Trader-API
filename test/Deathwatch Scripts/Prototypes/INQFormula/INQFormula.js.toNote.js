var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.toNote()', function() {
	it('should return the formula as a string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula;
    inqformula = new INQFormula('3 x SB');
    expect(inqformula.toNote()).to.equal('3 x SB');

    inqformula = new INQFormula('PR x D10');
    expect(inqformula.toNote()).to.equal('PR x D10');

    inqformula = new INQFormula('PRD10');
    expect(inqformula.toNote()).to.equal('PRD10');

    inqformula = new INQFormula('2PR');
    expect(inqformula.toNote()).to.equal('2PR');

    inqformula = new INQFormula('2D10+SB');
    expect(inqformula.toNote()).to.equal('2D10 + SB');

    inqformula = new INQFormula('PR');
    expect(inqformula.toNote()).to.equal('PR');

    inqformula = new INQFormula('5 x PR x 2D10+SB');
    expect(inqformula.toNote()).to.equal('5PR x (2D10 + SB)');
  });
});
