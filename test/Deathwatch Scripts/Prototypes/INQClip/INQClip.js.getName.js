var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQClip.prototype.getName()', function() {
	it('should detail the name property', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip();
    inqclip.inqweapon = inqweapon;
    inqclip.characterid = character.id;
    inqclip.options = {inqammo: inqammo};
    inqclip.getName();
    expect(inqclip.name).to.equal('Ammo - Weapon Name (Ammo Name)');
  });
  it('should do nothing if there is no inqweapon', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip();
    inqclip.characterid = character.id;
    inqclip.options = {inqammo: inqammo};
    inqclip.getName();
    expect(inqclip.name).to.be.undefined;
  });
  it('should allow inqweapon and inqammo to be a string', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = 'Weapon Name';
    var inqammo = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip();
    inqclip.inqweapon = inqweapon;
    inqclip.characterid = character.id;
    inqclip.options = {inqammo: inqammo};
    inqclip.getName();
    expect(inqclip.name).to.equal('Ammo - Weapon Name (Ammo Name)');
  });
	it('should not require inqammo', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = 'Weapon Name';
    var character = createObj('character', {});
    var inqclip = new INQClip();
    inqclip.inqweapon = inqweapon;
    inqclip.characterid = character.id;
    inqclip.getName();
    expect(inqclip.name).to.equal('Ammo - Weapon Name');
  });
});
