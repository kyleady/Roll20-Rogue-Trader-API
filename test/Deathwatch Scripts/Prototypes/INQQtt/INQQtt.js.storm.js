var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.storm()', function() {
	it('should multiply the ammo and hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 20m; D10+2 I; Pen 3; Storm)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
			inqqtt.storm();
      expect(inquse.ammoMultiplier).to.equal(2);
      expect(inquse.hitsMultiplier).to.equal(2);
      expect(inquse.maxHitsMultiplier).to.equal(1);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Storm Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 20m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.ammoMultiplier = 1;
      inquse.hitsMultiplier = 1;
      inquse.maxHitsMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
			inqqtt.storm();
      expect(inquse.ammoMultiplier).to.equal(1);
      expect(inquse.hitsMultiplier).to.equal(1);
      expect(inquse.maxHitsMultiplier).to.equal(1);
      done();
    });
  });
});
