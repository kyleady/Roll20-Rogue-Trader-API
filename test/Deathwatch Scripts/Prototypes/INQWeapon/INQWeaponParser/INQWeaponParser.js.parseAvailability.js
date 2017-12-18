var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser.prototype.parseAvailability()', function() {
	it('should be limited to the only known availailities', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();


    var weaponparser = new INQWeaponParser();
    var availabilities = [
      'Ubiquitous',
      'Abundant',
      'Plentiful',
      'Common',
      'Average',
      'Scarce',
      'Rare',
      'Very\\s+Rare',
      'Extremely\\s+Rare',
      'Near\\s+Unique',
      'Unique'
    ];
    for(var availability of availabilities){
      weaponparser.parseAvailability(availability.replace('\\s+', ' '));
      expect(weaponparser.Availability).to.match(RegExp('^' + availability + '$'));
    }

    weaponparser.parseAvailability('Invalid Availability');
    expect(weaponparser.Availability).to.not.equal('Invalid Availability');
  });
});
