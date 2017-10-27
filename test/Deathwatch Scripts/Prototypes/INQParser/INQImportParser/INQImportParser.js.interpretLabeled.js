var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.interpretLabeled()', function() {
	it('should use all of the saved Patterns to parse the given lines', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);
    parser.SpecialRules = [];

    parser.getList(/^\s*skills\s*$/i, ["List", "Skills"]);
    parser.getList(/^\s*talents\s*$/i, ["List", "Talents"]);
    parser.getList(/^\s*traits\s*$/i, ["List", "Traits"]);
    parser.getList(/^\s*gear\s*$/i, ["List", "Gear"]);
    parser.getList(/^\s*psychic\s+powers\s*$/i, ["List", "Psychic Powers"]);
    parser.getNumber(/^\s*move(ment)?\s*$/i, ["Movement", ["Half", "Full", "Charge", "Run"]]);
    parser.getNumber(/^\s*wounds\s*$/i, ["Attributes", "Wounds"]);
    parser.getNothing(/^\s*total\s+TB\s*$/i);
    parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
    parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
      Armour_H:  /\s*head\s*/i,
      Armour_RA: /\s*arms\s*/i,
      Armour_LA: /\s*arms\s*/i,
      Armour_B:  /\s*body\s*/i,
      Armour_RL: /\s*legs\s*/i,
      Armour_LL: /\s*legs\s*/i
    }]);

    parser.interpretLabeled([
      {label: 'Gear', content: 'Loose Change'},
      {label: 'Traits', content: 'Brutal Charge(3)'},
      {label: 'Total TB', content: '9'},
      {label: 'Talents', content: 'Die Hard, Fearless'},
      {label: 'Skills', content: 'Awareness, Pilot(Personal)'},
      {label: 'Psychic Powers', content: 'Compel, Firebolt'},
      {label: 'Armour', content: 'Power Armour(Body 10, Arms 8, Head 8, Legs 8)'},
      {label: 'Movement', content: '3/6/9/18'},
      {label: 'Wounds', content: '  15'},
      {label: 'Weapons', content: 'Knife(Melee; D10+7 R; Primitive)'},
      {label: 'This does not match any pattern', content: 'A unique rule'}
    ]);

    expect(inqcharacter.List.Skills).to.deep.equal([new INQLink('Awareness'), new INQLink('Pilot(Personal)')]);
    expect(inqcharacter.List.Talents).to.deep.equal([new INQLink('Die Hard'), new INQLink('Fearless')]);
    expect(inqcharacter.List.Traits).to.deep.equal([new INQLink('Brutal Charge(3)')]);
    expect(inqcharacter.List.Gear).to.deep.equal([new INQLink('Loose Change')]);
    expect(inqcharacter.List['Psychic Powers']).to.deep.equal([new INQLink('Compel'), new INQLink('Firebolt')]);
    expect(inqcharacter.Movement).to.deep.equal({Half: '3', Full: '6', Charge: '9', Run: '18'});
    expect(inqcharacter.Attributes.Wounds).to.equal('15');
    expect(inqcharacter.Attributes['Total TB']).to.be.undefined;
    expect(inqcharacter.List.Weapons).to.deep.equal([new INQWeapon('Knife(Melee; D10+7 R; Primitive)')]);
    expect(inqcharacter.Attributes.Armour_H).to.equal('8');
    expect(inqcharacter.Attributes.Armour_RA).to.equal('8');
    expect(inqcharacter.Attributes.Armour_LA).to.equal('8');
    expect(inqcharacter.Attributes.Armour_B).to.equal('10');
    expect(inqcharacter.Attributes.Armour_LL).to.equal('8');
    expect(inqcharacter.Attributes.Armour_LL).to.equal('8');
    expect(parser.SpecialRules).to.deep.equal([{Name: 'This does not match any pattern', Rule: 'A unique rule'}]);
  });
});
