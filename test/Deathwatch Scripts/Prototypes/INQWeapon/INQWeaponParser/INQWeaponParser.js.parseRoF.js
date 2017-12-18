var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseRoF()', function() {
	it('should save Single as a Boolean, Semi as an INQFormula, and Full as an INQFormula', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.Semi = new INQFormula('0');
    weaponparser.Full = new INQFormula('0');

    weaponparser.parseRoF('S/-/-');
    expect(weaponparser.Single).to.equal(true);
    expect(weaponparser.Semi).to.deep.equal(new INQFormula('0'));
    expect(weaponparser.Full).to.deep.equal(new INQFormula('0'));

    weaponparser.parseRoF('S/2/5');
    expect(weaponparser.Single).to.equal(true);
    expect(weaponparser.Semi).to.deep.equal(new INQFormula('2'));
    expect(weaponparser.Full).to.deep.equal(new INQFormula('5'));

    weaponparser.parseRoF('-/PR/2PR');
    expect(weaponparser.Single).to.equal(false);
    expect(weaponparser.Semi).to.deep.equal(new INQFormula('PR'));
    expect(weaponparser.Full).to.deep.equal(new INQFormula('2PR'));
  });
});
