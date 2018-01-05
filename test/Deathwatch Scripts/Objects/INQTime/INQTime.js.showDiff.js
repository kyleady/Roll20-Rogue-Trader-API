var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.showDiff()', function() {
	it('should output the time difference as a string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.showDiff({
      days: 10,
      weeks: 2,
      years: 3,
      future: true
    })).to.equal('10 days, 2 weeks, 3 years until ');
  });
  it('should not pluralize 1', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.showDiff({
      days: 1,
      weeks: 1,
      years: 1,
      future: false
    })).to.equal('1 day, 1 week, 1 year since ');
  });
  it('should note if the time difference is or is not in the future', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.showDiff({
      days: 1,
      weeks: 1,
      years: 1,
      future: false
    })).to.equal('1 day, 1 week, 1 year since ');
    expect(INQTime.showDiff({
      days: 1,
      weeks: 1,
      years: 1,
      future: true
    })).to.equal('1 day, 1 week, 1 year until ');
  });
  it('should note if there is no time difference', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.showDiff({
      days: 0,
      weeks: 0,
      years: 0,
      future: false
    })).to.equal('No time since ');
  });
});
