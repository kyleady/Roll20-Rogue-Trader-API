var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.scatter()', function() {
	it('should double the Hits Multiplier when at Point Blank Range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Scatter)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.range = 'Point Blank';
      inquse.hitsMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.scatter();
      var primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(4);
      expect(primitive).to.be.undefined;
      done();
    });
  });
  it('should gain the Primitive Quality at Long Range or further', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Scatter)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.range = 'Long';
      inquse.hitsMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.scatter();
      var primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.not.be.undefined;
      inquse.range = 'Extended';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.not.be.undefined;
      inquse.range = 'Extreme';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.not.be.undefined;
      inquse.range = 'Impossible';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.not.be.undefined;
      done();
    });
  });
  it('should do nothing at Standard and Short Range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Scatter)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.range = 'Standard';
      inquse.hitsMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.scatter();
      var primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Short';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      done();
    });
  });
  it('should do nothing if the weapon does not have the Scatter Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.range = 'Standard';
      inquse.hitsMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.scatter();
      var primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Short';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Point Blank';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Long';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Extended';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Extreme';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      inquse.range = 'Impossible';
      inquse.hitsMultiplier = 2;
      inqqtt.scatter();
      inquse.inqweapon.removeQuality('Primitive');
      primitive = inquse.inqweapon.has('Primitive');
			expect(inquse.hitsMultiplier).to.equal(2);
      expect(primitive).to.be.undefined;
      done();
    });
  });
});
