var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQClip.prototype.display()', function() {
	it('should return the remaining clip as a string', function(){
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
    var player = createObj('player', {_displayname: 'Display Name'}, {MOCK20override: true});
    var content = inqclip.display(player.id, false);
		expect(content).to.match(/Clip/);
		expect(content).to.match(/7\s*\/\s*10/);
  });
	it('should return an empty string if there is no clip object', function(){
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
    var player = createObj('player', {_displayname: 'Display Name'}, {MOCK20override: true});
    var content = inqclip.display(player.id, false);
		expect(content).to.be.empty;
  });
});
