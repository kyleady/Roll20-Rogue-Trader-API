var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.modifierRegex()', function() {
	it('should return a string regex', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.modifierRegex()).to.be.a('string');
  });
  it('should match a list of modifiers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var re = RegExp('^' + INQTime.modifierRegex() + '$');
    expect('2 centuries, 8 months, 9 years, 7 minutes, 1 day, and 3 hours').to.match(re);
  });
  it('should make commas optional', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var re = RegExp('^' + INQTime.modifierRegex() + '$');
    expect('1  century   1   month   1   year   1   minute   2  days   1   hour').to.match(re);
  });
});
