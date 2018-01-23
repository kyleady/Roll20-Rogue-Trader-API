var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.toString()', function() {
	it('should convert the input into a string date', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toString({
      mill: 41,
      year: 576,
      fraction: 9321
    })).to.equal('8932576.M41');
  });
  it('should convert the input into a string noting the time difference, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toString({
      years: 3,
      days: 1,
      weeks: 0,
      future: false
    }, 'diff')).to.equal('1 day, 3 years since ');
  });
  it('should note if the difference is 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toString({
      years: 0,
      days: 0,
      weeks: 0,
      future: true
    }, 'diff')).to.equal('No time until ');
  });
});
