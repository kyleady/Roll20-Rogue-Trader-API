var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretArmour()', function() {
	it('should parse the given content into the given properties as Armour', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretArmour('thick, gnarled bark (2 Head, 4 Arms, 3 Legs)', ["Attributes", {
      Armour_H:  /\s*head\s*/i,
      Armour_RA: /\s*arms\s*/i,
      Armour_LA: /\s*arms\s*/i,
      Armour_B:  /\s*body\s*/i,
      Armour_RL: /\s*legs\s*/i,
      Armour_LL: /\s*legs\s*/i
    }]);
    expect(inqcharacter.Attributes.Armour_H).to.equal('2');
    expect(inqcharacter.Attributes.Armour_RA).to.equal('4');
    expect(inqcharacter.Attributes.Armour_LA).to.equal('4');
    expect(inqcharacter.Attributes.Armour_B).to.equal(0);
    expect(inqcharacter.Attributes.Armour_LL).to.equal('3');
    expect(inqcharacter.Attributes.Armour_LL).to.equal('3');
  });
  it('should parse all as pointing to each of the given properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretArmour('thick, gnarled bark (1 All)', ["Attributes", {
      Armour_H:  /\s*head\s*/i,
      Armour_RA: /\s*arms\s*/i,
      Armour_LA: /\s*arms\s*/i,
      Armour_B:  /\s*body\s*/i,
      Armour_RL: /\s*legs\s*/i,
      Armour_LL: /\s*legs\s*/i
    }]);
    expect(inqcharacter.Attributes.Armour_H).to.equal('1');
    expect(inqcharacter.Attributes.Armour_RA).to.equal('1');
    expect(inqcharacter.Attributes.Armour_LA).to.equal('1');
    expect(inqcharacter.Attributes.Armour_B).to.equal('1');
    expect(inqcharacter.Attributes.Armour_LL).to.equal('1');
    expect(inqcharacter.Attributes.Armour_LL).to.equal('1');
  });
});
