var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.showDate()', function() {
	it('should output the time as a string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.fraction = 1239;
    INQTime.year = 456;
    INQTime.mill = 7;
    expect(INQTime.showDate()).to.equal('8123456.M7');
  });
  it('should keep the fraction and year three digits long', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.fraction = 9;
    INQTime.year = 0;
    INQTime.mill = 0;
    expect(INQTime.showDate()).to.equal('8000000.M0');
    INQTime.fraction = 99;
    INQTime.year = 8;
    INQTime.mill = 0;
    expect(INQTime.showDate()).to.equal('8009008.M0');
    INQTime.fraction = 999;
    INQTime.year = 88;
    INQTime.mill = 0;
    expect(INQTime.showDate()).to.equal('8099088.M0');
  });
});
