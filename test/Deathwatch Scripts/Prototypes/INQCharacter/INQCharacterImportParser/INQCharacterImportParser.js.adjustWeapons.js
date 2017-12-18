var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.adjustBonus()', function() {
	it('should subtract out Str Bonuses for melee weapons', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.S = 31;
    inqcharacterimport.Attributes['Unnatural S'] = 2;

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Knife';
    inqweapon.Class = 'Melee';
    inqweapon.DiceType = 5;
    inqweapon.DiceNumber = 1;
    inqweapon.DamageBase = 7;
    inqweapon.DamType = new INQLink('R');

    inqcharacterimport.List = {};
    inqcharacterimport.List.Talents = [];
    inqcharacterimport.List.Weapons = [inqweapon];

    inqcharacterimport.adjustWeapons();

    expect(inqweapon.DamageBase).to.equal(2);
  });
  it('should subtract out Fist and Crushing Blow for melee weapons', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.S = 31;
    inqcharacterimport.Attributes['Unnatural S'] = 2;

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Knife';
    inqweapon.Class = 'Melee';
    inqweapon.DiceType = 5;
    inqweapon.DiceNumber = 1;
    inqweapon.DamageBase = 15;
    inqweapon.DamType = new INQLink('R');
    inqweapon.Special = [new INQLink('Fist')];

    inqcharacterimport.List = {};
    inqcharacterimport.List.Talents = [new INQLink('Crushing Blow')];
    inqcharacterimport.List.Weapons = [inqweapon];

    inqcharacterimport.adjustWeapons();

    expect(inqweapon.DamageBase).to.equal(3);
  });
  it('should subtract out Fist and Crushing Blow for melee weapons', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.S = 31;
    inqcharacterimport.Attributes['Unnatural S'] = 2;

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Lasgun';
    inqweapon.Class = 'Basic';
    inqweapon.DiceType = 10;
    inqweapon.DiceNumber = 1;
    inqweapon.DamageBase = 15;
    inqweapon.DamType = new INQLink('E');
    inqweapon.Special = [new INQLink('Fist')];

    inqcharacterimport.List = {};
    inqcharacterimport.List.Talents = [new INQLink('Crushing Blow'), new INQLink('Mighty Shot')];
    inqcharacterimport.List.Weapons = [inqweapon];

    inqcharacterimport.adjustWeapons();

    expect(inqweapon.DamageBase).to.equal(13);
  });
});
