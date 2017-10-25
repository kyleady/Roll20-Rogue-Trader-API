var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.bonus()', function() {
	it('should return the given characteristic bonus', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.S = 47;

    expect(inqcharacter.bonus('S')).to.equal(4);
  });
	it('should count unnatural bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 36;
		inqcharacter.Attributes['Unnatural Ag'] = 7;

    expect(inqcharacter.bonus('Ag')).to.equal(10);
  });
	it('should handle non-existant unnatural bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.It = 27;
		inqcharacter.Attributes['Unnatural It'] = undefined;

    expect(inqcharacter.bonus('It')).to.equal(2);
  });
});
