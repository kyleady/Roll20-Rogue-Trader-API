var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseClass()', function() {
	it('should be limited to the only known classes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();


    var weaponparser = new INQWeaponParser();
    var classes = [
      'Gear',
      'Melee',
      'Pistol',
      'Basic',
      'Heavy',
      'Thrown',
      'Psychic'
    ];
    for(var Class of classes){
      weaponparser.parseClass(Class.replace('\\s+', ' '));
      expect(weaponparser.Class).to.match(RegExp('^' + Class + '$'));
    }

    weaponparser.parseClass('Invalid Class');
    expect(weaponparser.Class).to.not.equal('Invalid Class');
  });
});
