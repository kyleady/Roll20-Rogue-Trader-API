var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.accurate()', function() {
	it('should add a modifier if the Successes were not determined yet', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.mode = 'Single';
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'},
				{Name: 'Accurate', Value: 10}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      done();
    });
  });
	it('should add Damage Dice based on the number of successes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.mode = 'Single';
			inquse.parseModifiers();
			inquse.inqtest = {Successes: 0};
      var inqqtt = new INQQtt(inquse);
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 1};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 2};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 3};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 4};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(3);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 5};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(3);

			inquse.inqweapon.Damage.DiceNumber = 1;
			inquse.inqtest = {Successes: 6};
			inqqtt.accurate();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(3);
      done();
    });
  });
	it('should do nothing if the weapon is not accurate', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.mode = 'Single';
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
			inquse.inqtest = {Successes: 3};
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      done();
    });
  });
	it('should do nothing if the weapon was not fired on Single', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.mode = 'Semi';
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
			inquse.inqtest = {Successes: 3};
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Aim</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      done();
    });
  });
	it('should do nothing if the weapon was not Aimmed', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.mode = 'Single';
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Other</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
			inquse.inqtest = {Successes: 3};
      inqqtt.accurate();
			expect(inquse.modifiers).to.deep.equal([
				{Name: '<em>Other</em>', Value: '+10'}
			]);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      done();
    });
  });
});
