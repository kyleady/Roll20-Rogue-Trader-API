var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.getUnlabled()', function() {
	it('should add a Pattern to watch for Unlabeled lines', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqimportparser = new INQImportParser();
    expect(inqimportparser.Patterns).to.be.empty;
    expect(inqimportparser.UnlabledPatterns).to.be.empty;
    inqimportparser.getUnlabled(/\s*(\d+\s*)+/, 'Stats');
    expect(inqimportparser.Patterns).to.be.empty;
    expect(inqimportparser.UnlabledPatterns).to.deep.equal([{
      regex: /\s*(\d+\s*)+/,
      property: 'Stats'
    }]);
  });
});
