var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.characteristics()', function() {
	it('should return an array of INQCharacter or INQStarship stats', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var array = INQTest.characteristics();
    expect(array.length).to.be.above(0);
    var inqstarship = new INQStarship();
    var inqcharacter = new INQCharacter();

    for(var stat of array){
      if(stat.PartyStat) continue;
      expect(stat.Name).to.satisfy(function(name){
        return inqstarship.Attributes[name] != undefined || inqcharacter.Attributes[name] != undefined;
      });
    }
  });
  it('should include alternate names for stats', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var array = INQTest.characteristics();
    expect(array[0].Alternates).to.deep.equal(['Weapon Skill']);
  });
});
