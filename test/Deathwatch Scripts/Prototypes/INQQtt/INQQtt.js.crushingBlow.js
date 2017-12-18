var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.crushingBlow()', function() {
	it('should add to the Weapon Damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Crushing Blow'));
      var inqqtt = new INQQtt(inquse);
      inqqtt.crushingBlow();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      done();
    });
  });
  it('should do nothing if the weapon is not a Melee weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Crushing Blow'));
      var inqqtt = new INQQtt(inquse);
      inqqtt.crushingBlow();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
  it('should do nothing if the character does not have the Crushing Blow talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      var inqqtt = new INQQtt(inquse);
      inqqtt.crushingBlow();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
});
