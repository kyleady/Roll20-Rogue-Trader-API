var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.force()', function() {
	it('should add the character\'s base PR to the Weapon Damage and Penetration', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Force)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.PR = 2;
      inquse.PR = 5;
      var inqqtt = new INQQtt(inquse);
      inqqtt.force();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(5);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Force Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.PR = 2;
      inquse.PR = 5;
      var inqqtt = new INQQtt(inquse);
      inqqtt.force();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(3);
      done();
    });
  });
});
