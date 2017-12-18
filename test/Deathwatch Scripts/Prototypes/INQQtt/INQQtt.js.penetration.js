var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.penetration()', function() {
	it('should add to the Weapon Penetration', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; pen[+2])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.penetration();
			expect(inquse.inqweapon.Penetration.Modifier).to.equal(5);
      done();
    });
  });
  it('should allow you to overwrite the Penetration Formula', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; Penetration[=2D5+3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.penetration();
			expect(inquse.inqweapon.Penetration).to.deep.equal(new INQFormula('2D5+3'));
      done();
    });
  });
  it('should overwrite Penetration Formula before it adds to the Weapon Damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2; Pen 3; penetration[2], Pen[=2D5+1], PEN[+2])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inqqtt.penetration();
			expect(inquse.inqweapon.Penetration).to.deep.equal(new INQFormula('2D5+5'));
      done();
    });
  });
});
