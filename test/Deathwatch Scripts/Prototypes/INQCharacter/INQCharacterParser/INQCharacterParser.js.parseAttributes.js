var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser.prototype.parseAttributes()', function() {
	it('should be able to record local and roll20 attributes as properties', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var character = createObj('character', {name: 'INQCharacterParser character'});
		var page = createObj('page', {name: 'INQCharacterParser page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'INQCharacterParser graphic', _pageid: page.id, represents: character.id});
    var attribute = createObj('attribute', {name: 'INQCharacterParser attribute', _characterid: character.id, current: 11, max: 11});
    var localAttributes = new LocalAttributes(graphic);
    localAttributes.set('INQCharacterParser local attribute', 12);

    var inqcharacterparser = new INQCharacterParser();
    inqcharacterparser.ObjID = character.id;
    inqcharacterparser.Attributes = {};
    inqcharacterparser.parseAttributes(graphic);
    expect(inqcharacterparser.Attributes['INQCharacterParser attribute']).to.equal(11);
    expect(inqcharacterparser.Attributes['INQCharacterParser local attribute']).to.equal(12);
  });
});
