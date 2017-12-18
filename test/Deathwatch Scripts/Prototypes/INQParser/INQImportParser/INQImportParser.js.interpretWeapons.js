var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretWeapons()', function() {
	it('should parse the given content into the given properties as a List of INQWeapons', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqimportparser = new INQImportParser(inqcharacter);
    inqimportparser.interpretWeapons('Boltgun(Basic; 33m; S/3/-; D10+10 X; Pen 5; Tearing, Accurate), Combat Knife(D10; Primitive, Balanced)', ["List", "Weapons"]);
    expect(inqcharacter.List.Weapons).to.deep.equal([new INQWeapon('Boltgun(Basic; 33m; S/3/-; D10+10 X; Pen 5; Tearing, Accurate)'), new INQWeapon('Combat Knife(D10; Primitive, Balanced)')]);
  });
});
