var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.damageType()', function() {
	it('should overwrite the Weapon Damage Type', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Dam Type[R])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.damageType();
			expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('R'));
      done();
    });
  });
  it('should ignore equal signs', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; damageType[=X])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.damageType();
			expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('X'));
      done();
    });
  });
});
