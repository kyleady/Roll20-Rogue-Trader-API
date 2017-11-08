var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseOpposed()', function() {
	it('should only recognize Yes or No', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseOpposed('true');
    expect(weaponparser.Opposed).to.be.undefined;
    weaponparser.parseOpposed('Opposed');
    expect(weaponparser.Opposed).to.be.undefined;
    weaponparser.parseOpposed('Yes');
    expect(weaponparser.Opposed).to.equal(true);
    weaponparser.parseOpposed('No');
    expect(weaponparser.Opposed).to.equal(false);
  });
});
