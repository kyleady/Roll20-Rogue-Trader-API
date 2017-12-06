var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQClip.prototype.getClipObj()', function() {
	it('should retrieve the roll20 attribute used to track the clip', function(){
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
      current: 8,
      max: 10
    });
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    inqclip.getClipObj(true);
    expect(inqclip.clipObj).to.equal(clipObj);
  });
  it('should create a roll20 attribute if there is nothing already', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = 10;
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    inqclip.getClipObj(true);
    expect(inqclip.clipObj.get('name')).to.equal('Ammo - Weapon Name (Ammo Name)');
    expect(inqclip.clipObj.get('_characterid')).to.equal(character.id);
    expect(inqclip.clipObj.get('current')).to.equal(inqweapon.Clip);
    expect(inqclip.clipObj.get('max')).to.equal(inqweapon.Clip);
  });
  it('should not create a new object if makeObj is false', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = 10;
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    inqclip.getClipObj(false);
    expect(inqclip.clipObj).to.be.undefined;
  });
  it('should default makeObj to true', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.Name = 'Weapon Name';
    inqweapon.Clip = 10;
    var inqammo = new INQWeapon();
    inqammo.Name = 'Ammo Name';
    var character = createObj('character', {});
    var inqclip = new INQClip(inqweapon, character.id, {inqammo: inqammo});
    inqclip.getClipObj();
    expect(inqclip.clipObj.get('name')).to.equal('Ammo - Weapon Name (Ammo Name)');
    expect(inqclip.clipObj.get('_characterid')).to.equal(character.id);
    expect(inqclip.clipObj.get('current')).to.equal(inqweapon.Clip);
    expect(inqclip.clipObj.get('max')).to.equal(inqweapon.Clip);
  });
});
