var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseSpecialRules()', function() {
	it('should save Special as an array of INQLink\'s', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    weaponparser.Special = [];

    weaponparser.parseSpecialRules('-');
    expect(weaponparser.Special).to.deep.equal([]);

    weaponparser.parseSpecialRules('Blast(2)');
    expect(weaponparser.Special).to.deep.equal([new INQLink('Blast(2)')]);

    weaponparser.parseSpecialRules('Blast(2), Reliable');
    expect(weaponparser.Special).to.deep.equal([new INQLink('Blast(2)'), new INQLink('Reliable')]);
  });
});
