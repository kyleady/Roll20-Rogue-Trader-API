var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseRequisition()', function() {
	it('should save the Requisition as a Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.parseRequisition('154');
    expect(weaponparser.Requisition).to.equal(154);

    weaponparser.parseRequisition(' - ');
    expect(weaponparser.Requisition).to.equal(-1);
  });
});
