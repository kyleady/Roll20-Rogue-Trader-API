var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQLinkParser.prototype.regex()', function() {
	it('should return a string regex', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqlinkparser = new INQLinkParser();
    expect(inqlinkparser.regex()).to.be.a('string');
    expect(RegExp(inqlinkparser.regex())).to.be.a('RegExp');
  });
});
