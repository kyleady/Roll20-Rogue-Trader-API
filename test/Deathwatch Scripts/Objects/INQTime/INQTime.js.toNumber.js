var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.toNumber()', function() {
	it('should convert the input into a number of year 10000ths', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toNumber({
      mill: 41,
      year: 998,
      fraction: 8765
    })).to.equal(409988765);
  });
  it('should convert the input into the difference in year 10000ths, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toNumber({
      years: 40000,
      days: 3,
      weeks: 18,
      future: true
    }, 'diff')).to.be.within(-400003540, -400003519);
  });
});
