var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.tainted()', function() {
	it('should add to the Damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Tainted)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.Corruption = 30;
      inquse.inqcharacter.Attributes['Unnatural Corruption'] = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tainted();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(7);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Tainted Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.Corruption = 30;
      inquse.inqcharacter.Attributes['Unnatural Corruption'] = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tainted();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
});
