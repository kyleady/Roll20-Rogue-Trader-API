var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseRange()', function() {
	it('should parse Reload as a Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseReload('-');
    expect(weaponparser.Reload).to.equal(-1);
    weaponparser.parseReload('Free Action');
    expect(weaponparser.Reload).to.equal(0);
    weaponparser.parseReload('Half');
    expect(weaponparser.Reload).to.equal(0.5);
    weaponparser.parseReload('Full Action');
    expect(weaponparser.Reload).to.equal(1);
    weaponparser.parseReload('2 Full Actions');
    expect(weaponparser.Reload).to.equal(2);
  });
});
