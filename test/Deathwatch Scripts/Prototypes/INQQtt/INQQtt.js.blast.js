var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.blast()', function() {
	it('should multiply inquse.hordeDamageMultiplier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 0;
      inquse.PR = 0;
      inquse.hordeDamageMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.blast();
			expect(inquse.hordeDamageMultiplier).to.equal(8);
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
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.hordeDamageMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.blast();
			expect(inquse.hordeDamageMultiplier).to.equal(1);
      done();
    });
  });
  it('should do nothing if the weapon does not have blast', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.SB = 3;
      inquse.PR = 2;
      inquse.hordeDamageMultiplier = 1;
      var inqqtt = new INQQtt(inquse);
      inqqtt.blast();
			expect(inquse.hordeDamageMultiplier).to.equal(1);
      done();
    });
  });
});
