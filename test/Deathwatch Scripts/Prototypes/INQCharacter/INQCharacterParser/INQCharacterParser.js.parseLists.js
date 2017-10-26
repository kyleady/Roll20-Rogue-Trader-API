var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser.prototype.parseLists()', function() {
	it('should be able to parse lists into lists of INQLinks', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacterparser = new INQCharacterParser();
    inqcharacterparser.List = {};
    inqcharacterparser.Content = {Lists: []};
    inqcharacterparser.Content.Lists.push({Name: 'Weapons', Content: ['Boltgun', 'Sword']});
    inqcharacterparser.Content.Lists.push({Name: 'Gear', Content: ['Multikey']});
    inqcharacterparser.Content.Lists.push({Name: 'Psychic Powers', Content: ['Smite', 'Short Range Telepathy']});
    inqcharacterparser.Content.Lists.push({Name: 'Talents', Content: ['Fearless']});
    inqcharacterparser.Content.Lists.push({Name: 'Traits', Content: ['Space Marine']});
    inqcharacterparser.Content.Lists.push({Name: 'Skills', Content: ['Awareness', 'Tactics(Assault Doctrine)']});

    inqcharacterparser.parseLists();

    expect(inqcharacterparser.List.Weapons[0]).to.deep.equal(new INQLink('Boltgun'));
    expect(inqcharacterparser.List.Weapons[1]).to.deep.equal(new INQLink('Sword'));
    expect(inqcharacterparser.List.Gear[0]).to.deep.equal(new INQLink('Multikey'));
    expect(inqcharacterparser.List['Psychic Powers'][0]).to.deep.equal(new INQLink('Smite'));
    expect(inqcharacterparser.List['Psychic Powers'][1]).to.deep.equal(new INQLink('Short Range Telepathy'));
    expect(inqcharacterparser.List.Talents[0]).to.deep.equal(new INQLink('Fearless'));
    expect(inqcharacterparser.List.Traits[0]).to.deep.equal(new INQLink('Space Marine'));
    expect(inqcharacterparser.List.Skills[0]).to.deep.equal(new INQLink('Awareness'));
    expect(inqcharacterparser.List.Skills[1]).to.deep.equal(new INQLink('Tactics(Assault Doctrine)'));
  });
});
