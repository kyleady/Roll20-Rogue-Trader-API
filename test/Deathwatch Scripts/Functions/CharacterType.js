var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('characterType()', function() {
	it('should be able to detect characters', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
		expect(characterType(character)).to.equal('character');
  });
  it('should be able to detect vehicles', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqvehicle = new INQVehicle();
    //var vehicle = inqvehicle.toCharacterObj();
		//expect(characterType(vehicle)).to.equal('vehicle');
  });
  it('should be able to detect starships', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    var starship = inqstarship.toCharacterObj();
		expect(characterType(starship)).to.equal('starship');
  });
});
