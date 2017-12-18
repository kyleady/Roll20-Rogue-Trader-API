var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.maximal()', function() {
	it('should increase the shots spent by 200%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.ammoMultiplier).to.equal(4);
      done();
    });
  });
	it('should increase the Range by 33%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.Range.Multiplier).to.equal(1.33);
      done();
    });
  });
	it('should increase the Damage Dice Number by 50%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; 100D10+2 I; Pen 3; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
      var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.Damage.DiceNumber).to.equal(150);
      done();
    });
  });
	it('should increase the Damage Modifier by 25%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(120);
      done();
    });
  });
	it('should gain the Recharge Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.has('Recharge')).to.not.be.undefined;
      done();
    });
  });
	it('should increase the Blast Quality by 50%', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Blast[100], Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
			var blast = inquse.inqweapon.has('Blast');
      expect(inqqtt.getTotal(blast)).to.equal(150);
      done();
    });
  });
	it('should not add a Blast Quality if there is no Blast Quality to increase', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
			var blast = inquse.inqweapon.has('Blast');
			expect(blast).to.be.undefined;
      done();
    });
  });
	it('should lose the Use Maximal Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Maximal, Use Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.has('Use Maximal')).to.be.undefined;
      done();
    });
  });
	it('should lose the Maximal Quality if it does not have the Use Maximal Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 100; Maximal)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.has('Maximal')).to.be.undefined;
      done();
    });
  });
	it('should do nothing if the weapon does not have the Use Maximal Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+100 I; Pen 200; Maximal, Blast[10])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			var inqqtt = new INQQtt(inquse);
      inqqtt.maximal();
      expect(inquse.inqweapon.has('Maximal')).to.be.undefined;
			expect(inquse.inqweapon.has('Recharge')).to.be.undefined;
			expect(inquse.ammoMultiplier).to.equal(2);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
			expect(inquse.inqweapon.Damage.Modifier).to.equal(100);
			expect(inquse.inqweapon.Penetration.Modifier).to.equal(200);
			var blast = inquse.inqweapon.has('Blast');
			expect(inqqtt.getTotal(blast)).to.equal(10);
      done();
    });
  });
});
