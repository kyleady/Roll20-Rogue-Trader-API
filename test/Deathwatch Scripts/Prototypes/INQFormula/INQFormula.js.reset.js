var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.reset()', function() {
	it('should reset the properties of the object to their default values', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula('3SB x 2PRD5 - SB');
    expect(inqformula.Multiplier).to.equal(3);
    expect(inqformula.Multiplier_SB).to.equal(true);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(2);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(true);

    expect(inqformula.DiceType).to.equal(5);

    expect(inqformula.Modifier).to.equal(-1);
    expect(inqformula.Modifier_SB).to.equal(true);
    expect(inqformula.Modifier_PR).to.equal(false);

    inqformula.reset();

    expect(inqformula.Multiplier).to.equal(1);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(0);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(false);

    expect(inqformula.DiceType).to.equal(10);

    expect(inqformula.Modifier).to.equal(0);
    expect(inqformula.Modifier_SB).to.equal(false);
    expect(inqformula.Modifier_PR).to.equal(false);
  });
});
