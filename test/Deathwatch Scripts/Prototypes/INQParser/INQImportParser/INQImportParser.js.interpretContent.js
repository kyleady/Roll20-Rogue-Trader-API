var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretContent()', function() {
	it('should parse the given content into the given properties without modification', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretContent('Tyranid', ["Attributes", "Faction"]);
    expect(inqcharacter.Attributes.Faction).to.deep.equal(new INQLink('Tyranid'));
  });
});
