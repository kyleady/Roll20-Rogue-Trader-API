var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.applyOptions()', function() {
	it('should allow the options to edit values', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)',
      freeShot: true,
      autoHit: true,
      braced: false,
      jamsAt: 101,
      gm: true
    };

    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.applyOptions();
      expect(inquse.freeShot).to.equal(true);
      expect(inquse.autoHit).to.equal(true);
      expect(inquse.braced).to.equal(false);
      expect(inquse.jamsAt).to.equal(101);
      expect(inquse.gm).to.equal(true);
      done();
    });
  });
  it('should ignore options that are undefined', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)',
      freeShot: true,
      autoHit: true,
      braced: false,
      jamsAt: 101,
      gm: true
    };

    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.applyOptions();
      expect(inquse.freeShot).to.equal(true);
      expect(inquse.autoHit).to.equal(true);
      expect(inquse.braced).to.equal(false);
      expect(inquse.jamsAt).to.equal(101);
      expect(inquse.gm).to.equal(true);
      inquse.options = {};
      inquse.applyOptions();
      expect(inquse.freeShot).to.equal(true);
      expect(inquse.autoHit).to.equal(true);
      expect(inquse.braced).to.equal(false);
      expect(inquse.jamsAt).to.equal(101);
      expect(inquse.gm).to.equal(true);
      done();
    });
  });
});
