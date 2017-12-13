var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQSelection', function() {
	it('should be an object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQSelection).to.be.an('object');
  });
});
