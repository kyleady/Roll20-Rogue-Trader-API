var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseClip()', function() {
	it('should save the Clip as a Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseClip('154');
    expect(weaponparser.Clip).to.equal(154);

    weaponparser.parseClip(' - ');
    expect(weaponparser.Clip).to.equal(0);
  });
});
