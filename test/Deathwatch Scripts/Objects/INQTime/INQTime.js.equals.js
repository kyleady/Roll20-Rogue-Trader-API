var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.equals()', function() {
	it('should set the current time equal to the given date', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.mill = 3;
    INQTime.year = 4;
    INQTime.fraction = 18;
    INQTime.equals('8813276.M555');
    expect(INQTime.toString()).to.equal('8813276.M555');
  });
});
