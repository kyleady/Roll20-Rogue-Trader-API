var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.reset()', function() {
	it('should reset the time properties to the roll20 maximums', function(){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.fraction = 30;
    INQTime.year = 18;
    INQTime.mill = 77;
    INQTime.reset();
    expect(INQTime.fraction).to.equal(1);
    expect(INQTime.year).to.equal(2);
    expect(INQTime.mill).to.equal(3);
  });
});
