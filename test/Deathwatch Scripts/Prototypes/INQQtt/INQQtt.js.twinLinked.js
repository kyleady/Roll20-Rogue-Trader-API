var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.twinLinked()', function() {
	it('should double max hits and ammo spent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.mode = 'Full';
      var inqqtt = new INQQtt(inquse);
      inqqtt.twinLinked();
			expect(inquse.ammoMultiplier).to.equal(2);
      expect(inquse.maxHitsMultiplier).to.equal(2);
      expect(inquse.hitsMultiplier).to.equal(1);
      done();
    });
  });
  it('should set the mode to Semi if it is on Single Fire', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.mode = 'Single';
      var inqqtt = new INQQtt(inquse);
      inqqtt.twinLinked();
			expect(inquse.mode).to.equal('Semi');
      done();
    });
  });
  it('should not set the mode if not on Single Fire', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.mode = 'Full';
      var inqqtt = new INQQtt(inquse);
      inqqtt.twinLinked();
			expect(inquse.mode).to.equal('Full');
      done();
    });
  });
  it('should do nothing if the weapon does not have the Twin-linked Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.mode = 'Single';
      var inqqtt = new INQQtt(inquse);
      inqqtt.twinLinked();
			expect(inquse.mode).to.equal('Single');
      expect(inquse.ammoMultiplier).to.equal(1);
      expect(inquse.maxHitsMultiplier).to.equal(1);
      expect(inquse.hitsMultiplier).to.equal(1);
      done();
    });
  });
});
