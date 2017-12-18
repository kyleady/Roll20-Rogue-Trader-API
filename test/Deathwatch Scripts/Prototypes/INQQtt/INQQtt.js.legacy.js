var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.legacy()', function() {
	it('should increase the Damage and Penetration by half the Character\'s Renown Bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Legacy)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.Renown = 20;
      inquse.inqcharacter.Attributes['Unnatural Renown'] = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.legacy();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(5);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Legacy Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.Renown = 20;
      inquse.inqcharacter.Attributes['Unnatural Renown'] = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.legacy();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(3);
      done();
    });
  });
});
