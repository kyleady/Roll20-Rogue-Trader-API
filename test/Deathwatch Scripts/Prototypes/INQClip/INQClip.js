var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQClip()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQClip()).to.be.an.instanceof(INQClip);
  });
  it('should save the given inqweapon, characterid, and options', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    var inqammo = new INQWeapon();
    var character = createObj('character', {});
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    expect(inqclip.inqweapon).to.equal(inqweapon);
    expect(inqclip.characterid).to.equal(character.id);
    expect(inqclip.options.inqammo).to.equal(inqammo);
  });
  it('should defualt options to an empty object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    var inqammo = new INQWeapon();
    var character = createObj('character', {});
    var inqclip = new INQClip(inqweapon, character.id);
    expect(inqclip.options).to.deep.equal({});
  });
  it('should calculate the name property', function(){
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
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    expect(inqclip.name).to.equal('Ammo - Weapon Name (Ammo Name)');
  });
});
