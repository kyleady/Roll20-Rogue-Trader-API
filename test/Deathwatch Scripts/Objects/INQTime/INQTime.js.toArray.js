var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.toArray()', function() {
	it('should convert the input into an array that contains a date obj', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toArray({
      year: 2,
      mill: 3,
      fraction: 4
    })).to.deep.equal([{
      year: 2,
      mill: 3,
      fraction: 4
    }]);
  });
  it('should convert object and number input into an array of times and quantities, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toArray({
      years: 3,
      weeks: 2,
      days: 4,
			future: true
    }, 'diff')).to.deep.equal([
			{type: 'years', quantity: -3},
			{type: 'weeks', quantity: -2},
			{type: 'days', quantity: -4}
    ]);

		expect(INQTime.toArray(-111010, 'diff')).to.deep.equal([
			{type: 'years', quantity: -11},
			{type: 'weeks', quantity: -5},
			{type: 'days', quantity: -2}
    ]);
  });
	it('should convert string input into an array of times and quantities, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toArray('3 decades, 10 months', 'diff')).to.deep.equal([
			{type: 'decades', quantity: 3},
			{type: 'months', quantity: 10}
    ]);

		expect(INQTime.toArray('3 decades, 10 months since', 'diff')).to.deep.equal([
			{type: 'decades', quantity: -3},
			{type: 'months', quantity: -10}
    ]);
  });
});
