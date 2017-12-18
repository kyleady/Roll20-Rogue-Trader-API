var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseRange()', function() {
	it('should record the Range as an INQFormula', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseRange(' 6m');
    expect(weaponparser.Range).to.deep.equal(new INQFormula('6'));
    weaponparser.parseRange('3 x SB m');
    expect(weaponparser.Range).to.deep.equal(new INQFormula('3xsb'));
  });
  it('should multiply by 1000 when given kilometers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseRange('PR x 10 km');
    expect(weaponparser.Range).to.deep.equal(new INQFormula('1000PR x 10'));
  });
});
