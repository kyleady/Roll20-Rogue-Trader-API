var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.getSkillModifier()', function() {
	it('should record the Stat and Unnatural Stat of the INQCharacter', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'WS'});
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.WS = 23;
    inqcharacter.Attributes['Unnatural WS'] = 3;

    inqtest.getStats(inqcharacter);
    expect(inqtest.Stat).to.equal(23);
    expect(inqtest.Unnatural).to.equal(3);
  });
  it('should only record the Stat if no matching Unnatural Stat is found', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Insanity'});
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Insanity = 19;

    inqtest.getStats(inqcharacter);
    expect(inqtest.Stat).to.equal(19);
    expect(inqtest.Unnatural).to.equal(undefined);
  });
  it('should search the entire campaign for the one Attribute with the given name if it is a Party Stat', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Profit Factor'});
    var variables = createObj('character', {name: 'Variables'});
    var attribute = createObj('attribute', {name: 'Profit Factor', current: 18, max: 19, _characterid: variables.id});
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Insanity = 23;

    inqtest.getStats(inqcharacter);
    expect(inqtest.Stat).to.equal(18);
    expect(inqtest.Unnatural).to.equal(undefined);
  });
});
