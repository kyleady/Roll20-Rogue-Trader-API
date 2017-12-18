var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.addMisc()', function() {
	it('should save unrecognized lines in the Misc property', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Misc = [];
    inqparser.addMisc('An unrecognized line.');
    expect(inqparser.Misc).to.deep.equal([{Name: '', Content: 'An unrecognized line.'}]);
  });
});
