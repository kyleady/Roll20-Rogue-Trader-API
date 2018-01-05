var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.parseDate()', function() {
	it('should parse a string date into an object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.parseDate('8123456.M7')).to.deep.equal({
      fraction: 1230,
      year: 456,
      mill: 7
    });
  });
  it('should default to the current date when pieces are missing', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.fraction = 3;
    INQTime.year = 2;
    INQTime.mill = 4;

    expect(INQTime.parseDate('456')).to.deep.equal({
      fraction: 3,
      year: 456,
      mill: 4
    });
  });
});
