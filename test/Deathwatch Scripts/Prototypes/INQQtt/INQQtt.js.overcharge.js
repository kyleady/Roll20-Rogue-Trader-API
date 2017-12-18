var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.overcharge()', function() {
	it('should increase the shots spent by 200%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      expect(inquse.ammoMultiplier).to.equal(4);
      done();
    });
  });
  it('should add the Concussive(2) Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Concussive');
      expect(inqqtt.getTotal(quality)).to.equal(2);
      done();
    });
  });
  it('should add the Devastating(2) Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Devastating');
      expect(inqqtt.getTotal(quality)).to.equal(2);
      done();
    });
  });
  it('should add the Overheats Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Overheats');
      expect(quality).to.not.be.undefined;
      done();
    });
  });
  it('should add the Recharge Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Recharge');
      expect(quality).to.not.be.undefined;
      done();
    });
  });
	it('should lose the Use Overcharge Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Overcharge, Use Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Use Overcharge');
      expect(quality).to.be.undefined;
      done();
    });
  });
	it('should lose the Overcharge Quality if it does not have the Use Overcharge Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      var quality = inquse.inqweapon.has('Overcharge');
      expect(quality).to.be.undefined;
      done();
    });
  });
	it('should do nothing if the weapon does not have the Use Overcharge Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 200; Overcharge)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.overcharge();
      expect(inquse.inqweapon.has('Overcharge')).to.be.undefined;
			expect(inquse.inqweapon.has('Recharge')).to.be.undefined;
      expect(inquse.inqweapon.has('Overheats')).to.be.undefined;
      expect(inquse.inqweapon.has('Devastating')).to.be.undefined;
      expect(inquse.inqweapon.has('Concussive')).to.be.undefined;
      done();
    });
  });
});
