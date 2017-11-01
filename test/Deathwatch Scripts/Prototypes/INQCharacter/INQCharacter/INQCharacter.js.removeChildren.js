var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.removeChildren()', function() {
	it('should delete any attributes or abilities owned by the character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character = createObj('character', {});
    var ability = createObj('ability', {_characterid: character.id});
    var attribute = createObj('attribute', {_characterid: character.id});

    expect(getObj('ability', ability.id)).to.not.be.undefined;
    expect(getObj('attribute', attribute.id)).to.not.be.undefined;

    var inqcharacter = new INQCharacter();
    inqcharacter.removeChildren(character.id);

    expect(getObj('ability', ability.id)).to.be.undefined;
    expect(getObj('attribute', attribute.id)).to.be.undefined;
  });
});
