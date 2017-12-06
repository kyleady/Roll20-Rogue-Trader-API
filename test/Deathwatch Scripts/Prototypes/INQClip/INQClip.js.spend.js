var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQClip.prototype.spend()', function() {
	it('should should reduce clipObj\'s current value', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 8,
      max: 10
    });

    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj.get('current')).to.equal(7);
  });
	it('should return false if there is not enough ammo to fire', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 0,
      max: 10
    });

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo
    });
    expect(inqclip.spend()).to.equal(false);
  });
  it('should allow the options to specify a number of shots and a multiplier', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 8,
      max: 10
    });

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo,
      shots: 2,
      ammoMultilpier: 3
    });
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj.get('current')).to.equal(2);
  });
	it('should not spend ammo if it is a free shot', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 8,
      max: 10
    });

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo,
			freeShot: true,
      shots: 2,
      ammoMultilpier: 3
    });
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj.get('current')).to.equal(8);
  });
	it('should require ammunition to make a free shot', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 5,
      max: 10
    });

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo,
			freeShot: true,
      shots: 2,
      ammoMultilpier: 3
    });
    expect(inqclip.spend()).to.equal(false);
    expect(inqclip.clipObj.get('current')).to.equal(5);
  });
	it('should create a clip if one does not already exist', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = '10';
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo
    });
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj.get('current')).to.equal(9);
  });
	it('should not create a clip if the weapon does not have a clip value', function(){
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

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo
    });
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj).to.be.undefined;
  });
	it('should use an existing clip even if the weapon does not have a clip value', function(){
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
		var clipObj = createObj('attribute', {
      name: 'Ammo - Weapon Name (Ammo Name)',
      _characterid: character.id,
      current: 5,
      max: 100
    });

    var inqclip = new INQClip(inqweapon, character.id, {
      inqammo: inqammo
    });
    expect(inqclip.spend()).to.equal(true);
    expect(inqclip.clipObj.get('current')).to.equal(4);
  });
});
