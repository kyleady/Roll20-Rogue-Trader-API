var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseRenown()', function() {
	it('should be limited to the only known renowns', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    var renowns = [
      'Initiate',
      'Respected',
      'Distinguished',
      'Famed',
      'Hero'
    ];
    for(var renown of renowns){
      weaponparser.parseRenown(renown);
      expect(weaponparser.Renown).to.equal(renown);
    }

    weaponparser.parseRenown('Invalid Renown');
    expect(weaponparser.Renown).to.not.equal('Invalid Renown');
  });
  it('should parse dashes as Initiate Renown', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var weaponparser = new INQWeaponParser();
    var renowns = [
      '-',
      '–',
      '—'
    ];
    for(var renown of renowns){
      weaponparser.parseRenown(renown);
      expect(weaponparser.Renown).to.equal('Initiate');
    }
  });
});
