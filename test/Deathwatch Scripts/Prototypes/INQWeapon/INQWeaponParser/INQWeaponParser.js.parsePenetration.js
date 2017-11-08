var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parsePenetration()', function() {
	it('should record the Penetration as an INQFormula', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parsePenetration(' 5');
    expect(weaponparser.Penetration).to.deep.equal(new INQFormula('5'));
    weaponparser.parsePenetration('d10+3');
    expect(weaponparser.Penetration).to.deep.equal(new INQFormula('D10 + 3'));
  });
});
