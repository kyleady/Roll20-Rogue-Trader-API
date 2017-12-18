var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.mightyShot()', function() {
	it('should increase the damage of ranged weapons', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Melta)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Mighty Shot'));
      var inqqtt = new INQQtt(inquse);
      inqqtt.mightyShot();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      done();
    });
  });
  it('should do nothing if the weapon is not a ranged weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; 10m; D10+2 I; Pen 3; Melta)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Mighty Shot'));
      var inqqtt = new INQQtt(inquse);
      inqqtt.mightyShot();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
  it('should do nothing if the character does not have the Mighty Shot Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Basic; 10m; D10+2 I; Pen 3; Melta)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      var inqqtt = new INQQtt(inquse);
      inqqtt.mightyShot();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
});
