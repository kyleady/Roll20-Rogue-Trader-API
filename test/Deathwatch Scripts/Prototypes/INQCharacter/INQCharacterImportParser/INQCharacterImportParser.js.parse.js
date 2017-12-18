var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.parse()', function() {
	it('should parse the given text and turn the INQCharacterImportParser into an INQCharacter', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

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
		text += 'Weapons: None.';
		text += '<br>';
		text += 'Gear: Brass Binding Chains††, gore-soaked robes.';

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Movement = {};
    inqcharacterimport.List = {};
    inqcharacterimport.List.Gear = [];
    inqcharacterimport.List.Weapons = [];
    inqcharacterimport.List.Talents = [];
    inqcharacterimport.List.Traits = [];
    inqcharacterimport.List.Skills = [];
    inqcharacterimport.List['Psychic Powers'] = [];
    inqcharacterimport.parse(text);

    expect(inqcharacterimport.Attributes.WS).to.equal(5);
		expect(inqcharacterimport.Attributes.BS).to.equal(5);
		expect(inqcharacterimport.Attributes.S).to.equal(10);
		expect(inqcharacterimport.Attributes.T).to.equal(20);
		expect(inqcharacterimport.Attributes.Ag).to.equal(30);
		expect(inqcharacterimport.Attributes.It).to.equal(30);
		expect(inqcharacterimport.Attributes.Per).to.equal(10);
		expect(inqcharacterimport.Attributes.Wp).to.equal(30);
		expect(inqcharacterimport.Attributes.Fe).to.equal(10);

		expect(inqcharacterimport.Movement.Half).to.equal('3');
		expect(inqcharacterimport.Movement.Full).to.equal('6');
		expect(inqcharacterimport.Movement.Charge).to.equal('9');
		expect(inqcharacterimport.Movement.Run).to.equal('18');

		expect(inqcharacterimport.Attributes.Wounds).to.equal('19');

		expect(inqcharacterimport.Attributes.Armour_H).to.equal('5');
		expect(inqcharacterimport.Attributes.Armour_RA).to.equal('5');
		expect(inqcharacterimport.Attributes.Armour_LA).to.equal('5');
		expect(inqcharacterimport.Attributes.Armour_B).to.equal('5');
		expect(inqcharacterimport.Attributes.Armour_RL).to.equal('5');
		expect(inqcharacterimport.Attributes.Armour_LL).to.equal('5');

		expect(inqcharacterimport.List.Skills[0]).to.deep.equal(new INQLink('Forbidden Lore(Daemonology, Heresy, The Warp)'));
		expect(inqcharacterimport.List.Talents[0]).to.deep.equal(new INQLink('Bloodcaller†'));
		expect(inqcharacterimport.List.Traits[0]).to.deep.equal(new INQLink('Psyker'));
		expect(inqcharacterimport.List.Gear[0]).to.deep.equal(new INQLink('Brass Binding Chains††'));
		expect(inqcharacterimport.List.Gear[1]).to.deep.equal(new INQLink('gore-soaked robes'));
  });
});
