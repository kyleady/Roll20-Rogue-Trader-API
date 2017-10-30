var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.parse()', function() {
	it('should parse its Text property into Tables, Lists, Rules, and Misc', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
		inqcharacter.Movement = {Half: '4', Full: '8', Charge: '12', Run: '24'};
    inqcharacter.List.Skills.push(new INQLink('Awareness'));
    inqcharacter.List.Skills.push(new INQLink('Tactics(Void Combat)'));
    inqcharacter.List.Talents.push(new INQLink('Air of Authority'));
    inqcharacter.List.Talents.push(new INQLink('Ambidextrous'));
    inqcharacter.List.Traits.push(new INQLink('Tyranid'));
    inqcharacter.List.Traits.push(new INQLink('Unnatural Characteristic(Fe)(+3)'));
    inqcharacter.List.Gear.push(new INQLink('Medikit'));
    inqcharacter.List.Gear.push(new INQLink('Manacles'));
    inqcharacter.List['Psychic Powers'].push(new INQLink('Nurgle\'s Rot'));
    inqcharacter.List['Psychic Powers'].push(new INQLink('Warp Blast'));
    inqcharacter.List.Weapons.push(new INQWeapon('Neural Whip(D10+5 R; Pen 3; Flexible)'));
		inqcharacter.List.Weapons.push(new INQWeapon('Laspistol(Pistol; S/2/-; D10+2 E; Pen 0; Reliable)'));
		inqcharacter.SpecialRules.push({Name: 'Special', Rule: 'A special rule.'});
		var character = inqcharacter.toCharacterObj();

		var inqparser = new INQParser();
    inqparser.objectToText(character, function(){
      inqparser.parse();
      expect(inqparser.Text).to.equal('' + '<br>' + inqcharacter.getCharacterBio());
			expect(inqparser.Tables).deep.equal([{Name: '', Content: [
				['<strong>Half</strong>', '4'],
				['<strong>Full</strong>', '8'],
				['<strong>Charge</strong>', '12'],
				['<strong>Run</strong>', '24']
			]}]);
			expect(inqparser.Rules).to.deep.equal([
				{Name: 'Special', Content: 'A special rule.'}
			]);
			expect(inqparser.Lists).to.deep.equal([
				{Name: 'Psychic Powers', Content: ['Nurgle\'s Rot', 'Warp Blast']},
				{Name: 'Weapons', Content: ['Neural Whip (Melee; D10+5 R; Pen 3; Flexible)', 'Laspistol (Pistol; S/2/-; D10+2 E; Pen 0; Reliable)']},
				{Name: 'Gear', Content: ['Medikit', 'Manacles']},
				{Name: 'Talents', Content: ['Air of Authority', 'Ambidextrous']},
				{Name: 'Traits', Content: ['Tyranid', 'Unnatural Characteristic(Fe)(+3)']},
				{Name: 'Skills', Content: ['Awareness', 'Tactics(Void Combat)']}
			]);
			expect(inqparser.Misc).to.be.empty;
			done();
    });
  });
});
