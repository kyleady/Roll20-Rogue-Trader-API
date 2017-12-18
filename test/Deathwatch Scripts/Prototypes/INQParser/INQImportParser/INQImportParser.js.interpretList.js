var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretList()', function() {
	it('should parse the given content into the given properties as a List', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretList('Logic, Tech-Use, Speak Language(Technalingua)', ["List", "Skills"]);
    expect(inqcharacter.List.Skills).to.deep.equal([new INQLink('Logic'), new INQLink('Tech-Use'), new INQLink('Speak Language(Technalingua)')]);
  });
});
