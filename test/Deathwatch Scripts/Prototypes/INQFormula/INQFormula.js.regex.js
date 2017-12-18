var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQFormula.regex()', function() {
	it('should return a string regex', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var regex = INQFormula.regex({requireDice: false});
    expect(regex).to.be.a('string');
    expect(RegExp(regex)).to.be.a('RegExp');
  });
	it('should be able to require dice in the regex', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var needDice = INQFormula.regex({requireDice: true});
		var either = INQFormula.regex({requireDice: false});
    var reDice = new RegExp(needDice, 'i');
		var reEither = new RegExp(either, 'i');
    expect(reDice.test('3 x SB')).to.equal(false);
		expect(reEither.test('3 x SB')).to.equal(true);
  });
	it('should default to not requiring dice', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var regex = INQFormula.regex();
    var re = new RegExp(regex, 'i');
    expect(re.test('3 x SB')).to.equal(true);
  });
});
