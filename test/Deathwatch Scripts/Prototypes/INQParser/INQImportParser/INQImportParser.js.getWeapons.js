var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.getWeapons()', function() {
	it('should add a Pattern to watch for, interpreting it as Weapons', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqimportparser = new INQImportParser();
    expect(inqimportparser.Patterns).to.be.empty;
    inqimportparser.getWeapons(/\s*Weapons?\s*/i, ['List', 'Weapons']);
    expect(inqimportparser.Patterns).to.deep.equal([{
      regex: /\s*Weapons?\s*/i,
      property: ['List', 'Weapons'],
      interpret: inqimportparser.interpretWeapons
    }]);
  });
});
