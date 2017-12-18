var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseDamage()', function() {
	it('should save the Damage as an INQFormula and the Damage Type as an INQLink', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseDamage('2D10+3 X');
    expect(weaponparser.Damage).to.deep.equal(new INQFormula('2D10+3'));
    expect(weaponparser.DamageType).to.deep.equal(new INQLink('X'));
  });
  it('should default to Impact if no Damage Type is listed', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseDamage('D10+9');
    expect(weaponparser.Damage).to.deep.equal(new INQFormula('D10+9'));
    expect(weaponparser.DamageType).to.deep.equal(new INQLink('I'));
  });
});
