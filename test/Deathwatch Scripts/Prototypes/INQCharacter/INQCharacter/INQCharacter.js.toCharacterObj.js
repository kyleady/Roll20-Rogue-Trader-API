var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe.only('INQCharacter.prototype.toCharacterObj()', function() {
	it('should convert an INQ characer object into a Roll20 character object', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Movement.Half = '1';
    inqcharacter.Movement.Full = '2';
    inqcharacter.Movement.Charge = '3';
    inqcharacter.Movement.Run = '6';

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Knife';
    inqweapon.Class = 'Melee';
    inqweapon.DiceType = 5;
    inqweapon.DiceNumber = 1;
    inqweapon.DamType = new INQLink('R');

    inqcharacter.List['Psychic Powers'].push(new INQLink('Doombolt'));
    inqcharacter.List.Gear.push(new INQLink('Chartograph'));
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    inqcharacter.List.Traits.push(new INQLink('Sturdy'));
    inqcharacter.List.Skills.push(new INQLink('Psyniscience'));
    inqcharacter.List.Weapons.push(inqweapon);

    inqcharacter.SpecialRules.push({Name: 'Special', Rule: 'This character is very special.'});

    inqcharacter.Attributes.Wounds = 19;

    inqcharacter.Name = 'toCharacterObj Name';

    var character = inqcharacter.toCharacterObj();

    var abilities = findObjs({_type: 'ability', _characterid: character.id});
    var wounds = findObjs({_type: 'attribute', _characterid: character.id, name: 'Wounds'});

    expect(character.get('name')).to.equal(inqcharacter.Name);
    expect(abilities[0].get('action')).to.match(/Knife/);
    expect(wounds[0].get('max')).to.equal(19);

    character.get('gmnotes', function(bio){
      expect(bio).to.match(/<table>.*1.*2.*3.*6.*<\/table>/);
      expect(bio).to.match(/Doombolt/);
      expect(bio).to.match(/Knife/);
      expect(bio).to.match(/Chartograph/);
      expect(bio).to.match(/Swift Attack/);
      expect(bio).to.match(/Psyniscience/);
      expect(bio).to.match(/This character is very special\./);
      done();
    });
  });
});
