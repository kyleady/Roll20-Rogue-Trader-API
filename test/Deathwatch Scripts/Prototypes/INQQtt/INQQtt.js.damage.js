var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.damage()', function() {
	it('should add to the Weapon Damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; dam[+3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.damage();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(5);
      done();
    });
  });
  it('should allow you to overwrite the Damage Formula', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; Damage[=2D5+3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.damage();
			expect(inquse.inqweapon.Damage).to.deep.equal(new INQFormula('2D5+3'));
      done();
    });
  });
  it('should overwrite Weapon Damage before it adds to the Weapon Damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; damage[2], Dam[=2D5+1], DAM[+2])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.damage();
			expect(inquse.inqweapon.Damage).to.deep.equal(new INQFormula('2D5+5'));
      done();
    });
  });
});
