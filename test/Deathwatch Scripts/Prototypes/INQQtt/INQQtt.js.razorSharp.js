var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.razorSharp()', function() {
	it('should double the Penetration Multiplier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Razor Sharp)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 200};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(2);
      inquse.inqtest = {Successes: 2};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(4);
      done();
    });
  });
  it('should do nothing if the Successes are less than 2', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Razor Sharp)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 1};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(1);
      inquse.inqtest = {Successes: 0};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(1);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Razor Sharp quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 200};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(1);
      inquse.inqtest = {Successes: 2};
      inqqtt.razorSharp();
			expect(inquse.inqweapon.Penetration.Multiplier).to.equal(1);
      done();
    });
  });
});
