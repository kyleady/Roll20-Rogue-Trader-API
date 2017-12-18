var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQParser()).to.be.an.instanceof(INQParser);
  });
	it('should return itself in a callback', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		new INQParser(undefined, function(inqparser){
			expect(inqparser).to.be.an.instanceof(INQParser);
      done();
		});
  });
  it('should parse the text of the given roll20 character', function(done){
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

		new INQParser(character, function(parser){
			expect(parser.Text).to.equal('<br>' + inqcharacter.getCharacterBio());
			expect(parser.Tables).deep.equal([{Name: '', Content: [
				['<strong>Half</strong>', '4'],
				['<strong>Full</strong>', '8'],
				['<strong>Charge</strong>', '12'],
				['<strong>Run</strong>', '24']
			]}]);
			expect(parser.Rules).to.deep.equal([
				{Name: 'Special', Content: 'A special rule.'}
			]);
			expect(parser.Lists).to.deep.equal([
				{Name: 'Psychic Powers', Content: ['Nurgle\'s Rot', 'Warp Blast']},
				{Name: 'Weapons', Content: ['Neural Whip (Melee; D10 + 5 R; Pen 3; Flexible)', 'Laspistol (Pistol; S/2/-; D10 + 2 E; Pen 0; Reliable)']},
				{Name: 'Gear', Content: ['Medikit', 'Manacles']},
				{Name: 'Talents', Content: ['Air of Authority', 'Ambidextrous']},
				{Name: 'Traits', Content: ['Tyranid', 'Unnatural Characteristic(Fe)(+3)']},
				{Name: 'Skills', Content: ['Awareness', 'Tactics(Void Combat)']}
			]);
			expect(parser.Misc).to.be.empty;
			done();
		});
  });
  it('should parse the text of the given roll20 handout', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var text = 'The Infernus pistol represents specialised and ancient technology, almost impossible for even the Adeptus Astartes to recreate.';
		text += '<br>';
		text += '<strong>Class</strong>: Pistol';
		text += '<br>';
		text += '<strong>Range</strong>: 10m';
		text += '<br>';
		text += '<strong>RoF</strong>: S/-/-';
		text += '<br>';
		text += '<strong>Dam</strong>: 2D10+12 E';
		text += '<br>';
		text += '<strong>Pen</strong>: 12';
		text += '<br>';
		text += '<strong>Clip</strong>: 4';
		text += '<br>';
		text += '<strong>Reload</strong>: Full';
		text += '<br>';
		text += '<strong>Special</strong>: Melta';
		text += '<br>';
		text += '<strong>Weight</strong>: 5kg';
		text += '<br>';
		text += '<strong>Requisition</strong>: 35';
		text += '<br>';
		text += '<strong>Renown</strong>: Famed';

		var handout = createObj('handout', {});
		handout.set('notes', text);

		new INQParser(handout, function(parser){
			expect(parser.Text).to.equal(text + '<br>');
			expect(parser.Tables).to.be.empty;
			expect(parser.Rules).to.deep.equal([
				{Name: 'Class', Content: 'Pistol'},
				{Name: 'Range', Content: '10m'},
				{Name: 'RoF', Content: 'S/-/-'},
				{Name: 'Dam', Content: '2D10+12 E'},
				{Name: 'Pen', Content: '12'},
				{Name: 'Clip', Content: '4'},
				{Name: 'Reload', Content: 'Full'},
				{Name: 'Special', Content: 'Melta'},
				{Name: 'Weight', Content: '5kg'},
				{Name: 'Requisition', Content: '35'},
				{Name: 'Renown', Content: 'Famed'}
			]);
			expect(parser.Lists).to.be.empty;
			expect(parser.Misc).to.deep.equal([
				{Name: '', Content: 'The Infernus pistol represents specialised and ancient technology, almost impossible for even the Adeptus Astartes to recreate.'}
			]);
			done();
		});
  });
});
