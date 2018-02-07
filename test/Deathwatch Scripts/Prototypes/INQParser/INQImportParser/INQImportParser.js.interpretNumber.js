var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretNumber()', function() {
	it('should parse the given content into the given properties as a Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretNumber('The first one is Half 3 the next one is full 6 the third is charge which is three times half which is 9. The very last one is Run 18. Extra numbers like 1 100 and 18 don\'t matter.',
      ["Movement", ["Half" , "Full", "Charge", "Run"]]);
    expect(inqcharacter.Movement).to.deep.equal({Half: '3', Full: '6', Charge: '9', Run: '18'});
  });
	it('should be able to parse alternate dashes as minus signs', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretNumber('-1+4–2—3',
      ["Movement", ["Half" , "Full", "Charge", "Run"]]);
    expect(inqcharacter.Movement).to.deep.equal({Half: '-1', Full: '+4', Charge: '-2', Run: '-3'});
  });
});
