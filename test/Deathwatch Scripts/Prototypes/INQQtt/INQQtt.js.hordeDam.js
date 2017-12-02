var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.hordeDmg()', function() {
	it('should add to the hordeDamageMultiplier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Horde Dam[+2])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.hordeDamageMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.hordeDmg();
      expect(inquse.hordeDamageMultiplier).to.equal(3);
      done();
    });
  });
  it('should default to a value of 1', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; HordeDamage)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.hordeDamageMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.hordeDmg();
      expect(inquse.hordeDamageMultiplier).to.equal(2);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Horde Damage Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.hordeDamageMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.hordeDmg();
      expect(inquse.hordeDamageMultiplier).to.equal(1);
      done();
    });
  });
});
