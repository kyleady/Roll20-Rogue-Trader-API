var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.prototype.parse()', function() {
	it('should parse a string to set its own properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula();
    inqformula.parse('3SB x 2PRD5 - SB');
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

    inqformula.parse('D100 - 4');
    expect(inqformula.Multiplier).to.equal(1);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(1);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(false);

    expect(inqformula.DiceType).to.equal(100);

    expect(inqformula.Modifier).to.equal(-4);
    expect(inqformula.Modifier_SB).to.equal(false);
    expect(inqformula.Modifier_PR).to.equal(false);

    inqformula.parse('3 x SB');
    expect(inqformula.Multiplier).to.equal(3);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(0);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(false);

    expect(inqformula.DiceType).to.equal(10);

    expect(inqformula.Modifier).to.equal(1);
    expect(inqformula.Modifier_SB).to.equal(true);
    expect(inqformula.Modifier_PR).to.equal(false);

    inqformula.parse('PR x D10');
    expect(inqformula.Multiplier).to.equal(1);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(true);

    expect(inqformula.DiceNumber).to.equal(1);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(false);

    expect(inqformula.DiceType).to.equal(10);

    expect(inqformula.Modifier).to.equal(0);
    expect(inqformula.Modifier_SB).to.equal(false);
    expect(inqformula.Modifier_PR).to.equal(false);

    inqformula.parse('PRD10');
    expect(inqformula.Multiplier).to.equal(1);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(1);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(true);

    expect(inqformula.DiceType).to.equal(10);

    expect(inqformula.Modifier).to.equal(0);
    expect(inqformula.Modifier_SB).to.equal(false);
    expect(inqformula.Modifier_PR).to.equal(false);

    inqformula.parse('2PR');
    expect(inqformula.Multiplier).to.equal(1);
    expect(inqformula.Multiplier_SB).to.equal(false);
    expect(inqformula.Multiplier_PR).to.equal(false);

    expect(inqformula.DiceNumber).to.equal(0);
    expect(inqformula.DiceNumber_SB).to.equal(false);
    expect(inqformula.DiceNumber_PR).to.equal(false);

    expect(inqformula.DiceType).to.equal(10);

    expect(inqformula.Modifier).to.equal(2);
    expect(inqformula.Modifier_SB).to.equal(false);
    expect(inqformula.Modifier_PR).to.equal(true);
  });
});
