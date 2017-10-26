var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser.prototype.parse()', function() {
	it('should be able to parse a Roll20 character object', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Gear.push(new INQLink('Chartograph'));
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'INQCharacter page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'INQCharacter graphic', _pageid: page.id, represents: character.id});

    var inqcharacterparser = new INQCharacterParser();
		inqcharacterparser.List = {};
		inqcharacterparser.Attributes = {};
    inqcharacterparser.parse(character, graphic, function(parsedCharacter){
			expect(parsedCharacter.List.Gear).to.have.lengthOf(1);
	    expect(parsedCharacter.List.Gear[0]).to.deep.equal(new INQLink('Chartograph'));
			done();
		});
  });
});
