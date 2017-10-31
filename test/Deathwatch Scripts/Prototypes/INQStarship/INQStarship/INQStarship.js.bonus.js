var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQStarship.prototype.bonus()', function() {
  it('should return the given characteristic bonus', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Detection = 27;

    expect(inqstarship.bonus('Detection')).to.equal(2);
  });
	it('should count unnatural bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Detection = 16;
		inqstarship.Attributes['Unnatural Detection'] = 3;

    expect(inqstarship.bonus('Detection')).to.equal(4);
  });
	it('should handle non-existant unnatural bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Detection = 44;
		inqstarship.Attributes['Unnatural Detection'] = undefined;

    expect(inqstarship.bonus('Detection')).to.equal(4);
  });
});
