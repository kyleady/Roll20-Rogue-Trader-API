var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.parseInput()', function() {
	it('should parse a string of times into an array of objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.parseInput('4 daYs, 3 MONTHS, and 2 years')).to.deep.equal([
      {type: 'daYs', quantity: 4},
      {type: 'MONTHS', quantity: 3},
      {type: 'years', quantity: 2}
    ]);
  });
  it('should return an empty array if no input is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.parseInput()).to.deep.equal([]);
  });
});
