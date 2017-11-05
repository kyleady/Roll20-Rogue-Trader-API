var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQFormula()).to.be.an.instanceof(INQFormula);
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqformula = new INQFormula();
    expect(inqformula).to.have.property('Multiplier');
    expect(inqformula).to.have.property('Multiplier_SB');
    expect(inqformula).to.have.property('Multiplier_PR');

    expect(inqformula).to.have.property('DiceNumber');
    expect(inqformula).to.have.property('DiceNumber_SB');
    expect(inqformula).to.have.property('DiceNumber_PR');

    expect(inqformula).to.have.property('DiceType');

    expect(inqformula).to.have.property('Modifier');
    expect(inqformula).to.have.property('Modifier_SB');
    expect(inqformula).to.have.property('Modifier_PR');
  });
	it('should be able to parse a string', function(){
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
	});
});
