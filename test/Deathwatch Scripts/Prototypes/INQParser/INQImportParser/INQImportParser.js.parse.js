var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.parse()', function() {
	it('should use the saved Patterns to parse the given text', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);
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

    var text = '05 05 10 20 30 30 10 30 10 – –';
		text += '<br>';
		text += 'Movement: 3/6/9/18';
		text += '<br>';
		text += 'Wounds: 19';
		text += '<br>'
		text += 'Armour: all 5';
		text += '<br>';
		text += 'Skills: Forbidden Lore (Daemonology, Heresy, The Warp) (Int).';
		text += '<br>';
		text += 'Talents: Bloodcaller†.';
		text += '<br>';
		text += 'Traits: Psyker.';
		text += '<br>';
		text += 'Weapons: Axe(Melee; D10+6 I; Pen 2; Primitive).';
		text += '<br>';
		text += 'Gear: Brass Binding Chains††, gore-soaked robes.';

    var unlabeled = parser.parse(text);

    expect(inqcharacter.Movement.Half).to.equal('3');
		expect(inqcharacter.Movement.Full).to.equal('6');
		expect(inqcharacter.Movement.Charge).to.equal('9');
		expect(inqcharacter.Movement.Run).to.equal('18');

		expect(inqcharacter.Attributes.Wounds).to.equal('19');

		expect(inqcharacter.Attributes.Armour_H).to.equal('5');
		expect(inqcharacter.Attributes.Armour_RA).to.equal('5');
		expect(inqcharacter.Attributes.Armour_LA).to.equal('5');
		expect(inqcharacter.Attributes.Armour_B).to.equal('5');
		expect(inqcharacter.Attributes.Armour_RL).to.equal('5');
		expect(inqcharacter.Attributes.Armour_LL).to.equal('5');

		expect(inqcharacter.List.Skills[0]).to.deep.equal(new INQLink('Forbidden Lore(Daemonology, Heresy, The Warp)'));
		expect(inqcharacter.List.Talents[0]).to.deep.equal(new INQLink('Bloodcaller†'));
		expect(inqcharacter.List.Traits[0]).to.deep.equal(new INQLink('Psyker'));
		expect(inqcharacter.List.Gear[0]).to.deep.equal(new INQLink('Brass Binding Chains††'));
		expect(inqcharacter.List.Gear[1]).to.deep.equal(new INQLink('gore-soaked robes'));
    expect(inqcharacter.List.Weapons[0]).to.deep.equal(new INQWeapon('Axe(Melee; D10+6 I; Pen 2; Primitive)'));
  });
  it('should return any unlabeled lines', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);

    var text = '05 05 10 20 30 30 10 30 10 – –';
		text += '<br>';
		text += 'Movement: 3/6/9/18';
		text += '<br>';
		text += 'Wounds: 19';
		text += '<br>'
		text += 'Armour: all 5';
		text += '<br>';
		text += 'Skills: Forbidden Lore (Daemonology, Heresy, The Warp) (Int).';
		text += '<br>';
		text += 'Talents: Bloodcaller†.';
		text += '<br>';
		text += 'Traits: Psyker.';
		text += '<br>';
		text += 'Weapons: Axe(Melee; D10+6 I; Pen 2; Primitive).';
		text += '<br>';
		text += 'Gear: Brass Binding Chains††, gore-soaked robes.';

    var unlabeled = parser.parse(text);

    expect(unlabeled).to.deep.equal(['05 05 10 20 30 30 10 30 10 – –']);
  });
});
