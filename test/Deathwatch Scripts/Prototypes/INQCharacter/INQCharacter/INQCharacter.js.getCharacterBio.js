var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.getCharacterBio()', function() {
	it('should return a string for a Roll20 character bio', function(){
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

    inqcharacter.List['Psychic Powers'].push(new INQLink('Doombolt'));
    inqcharacter.List.Weapons.push(new INQLink('Power Sword'));
    inqcharacter.List.Gear.push(new INQLink('Chartograph'));
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    inqcharacter.List.Traits.push(new INQLink('Sturdy'));
    inqcharacter.List.Skills.push(new INQLink('Psyniscience'));

    inqcharacter.SpecialRules.push({Name: 'Special', Rule: 'This character is very special.'});

    var bio = inqcharacter.getCharacterBio();

    expect(bio).to.match(/<table>.*1.*2.*3.*6.*<\/table>/);
    expect(bio).to.match(/Doombolt/);
    expect(bio).to.match(/Power Sword/);
    expect(bio).to.match(/Chartograph/);
    expect(bio).to.match(/Swift Attack/);
    expect(bio).to.match(/Psyniscience/);
    expect(bio).to.match(/This character is very special\./);
  });
});
