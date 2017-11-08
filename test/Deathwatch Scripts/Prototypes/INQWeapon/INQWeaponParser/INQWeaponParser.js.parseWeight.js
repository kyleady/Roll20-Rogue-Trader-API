var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseWeight()', function() {
	it('should save the Weight as a Floating Point Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseWeight('154.25kg');
    expect(weaponparser.Weight).to.equal(154.25);

    weaponparser.parseWeight(' - ');
    expect(weaponparser.Weight).to.equal(0);
  });
});
