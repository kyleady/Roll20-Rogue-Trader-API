var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.spray()', function() {
	it('should randomize the hordeDamageMultiplier based on range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 20m; D10+2 I; Pen 3; Spray)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 3;
      inquse.PR = 2;
      inquse.autoHit = false;
      var inqqtt = new INQQtt(inquse);
			for(var i = 0; i < 1000; i++){
        inquse.hordeDamageMultiplier = 1;
        inqqtt.spray();
        expect(inquse.hordeDamageMultiplier).to.be.within(6,10);
      }
      done();
    });
  });
  it('should record the weapon as autoHitting', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 20m; D10+2 I; Pen 3; Spray)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 3;
      inquse.PR = 2;
      inquse.autoHit = false;
      var inqqtt = new INQQtt(inquse);
      inquse.hordeDamageMultiplier = 1;
      inqqtt.spray();
      expect(inquse.autoHit).to.equal(true);
      done();
    });
  });
  it('should not record the weapon as autoHitting if the weapon is Psychic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Psychic; 20m; D10+2 I; Pen 3; Spray)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 3;
      inquse.PR = 2;
      inquse.autoHit = false;
      var inqqtt = new INQQtt(inquse);
      inquse.hordeDamageMultiplier = 1;
      inqqtt.spray();
      expect(inquse.autoHit).to.equal(false);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Spray Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Psychic; 20m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 3;
      inquse.PR = 2;
      inquse.autoHit = false;
      var inqqtt = new INQQtt(inquse);
      inquse.hordeDamageMultiplier = 1;
      inqqtt.spray();
      expect(inquse.hordeDamageMultiplier).to.equal(1);
      expect(inquse.autoHit).to.equal(false);
      done();
    });
  });
});
