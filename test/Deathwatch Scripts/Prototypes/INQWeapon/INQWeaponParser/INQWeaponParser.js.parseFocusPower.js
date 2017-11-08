var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseFocusPower()', function() {
	it('should record the Class as Psychic', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseFocusPower('(+0) Willpower Test');
    expect(weaponparser.Class).to.equal('Psychic');
  });
  it('should record the FocusModifier as a Number and the FocusTest as a String', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseFocusPower('(-10) Corruption Test');
    expect(weaponparser.FocusTest).to.equal('Corruption');
    expect(weaponparser.FocusModifier).to.equal(-10);
  });
  it('should record Opposed as a Boolean if it is present', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseFocusPower('(-10) Corruption Test');
    expect(weaponparser.Opposed).to.be.undefined;
    weaponparser.parseFocusPower('Opposed (-10) Corruption Test');
    expect(weaponparser.Opposed).to.equal(true);
  });
});
