var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.diceEvents()', function() {
	it('should detect if Psychic Phenomena was triggered', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+10 Aim',
      custom: 'My Weapon(Psychic; D10+2; Pen 3; Accurate)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.options.FocusStrength = 'Fettered';
      inquse.PsyPhe = false;
      inquse.inqtest = {Die: 29};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(false);

      inquse.options.FocusStrength = 'Unfettered';
      inquse.PsyPhe = false;
      inquse.inqtest = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(false);

      inquse.options.FocusStrength = 'Unfettered';
      inquse.PsyPhe = false;
      inquse.inqtest = {Die: 29};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);

      inquse.options.FocusStrength = 'Push';
      inquse.PsyPhe = false;
      inquse.inqtest = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);

      inquse.options.FocusStrength = 'True';
      inquse.PsyPhe = false;
      inquse.inqtest = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);
      done();
    });
  });
  it('should never Jam if the weapon is Melee or Gear', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Melee; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.mode = 'Single';
      inquse.defaultProperties();
      inquse.inqtest = {Die: 100, Successes: 4};
      inquse.diceEvents();
      expect(inquse.warning).to.be.undefined;
      inquse.inqweapon.Class = 'Gear';
      inquse.diceEvents();
      expect(inquse.warning).to.be.undefined;
      done();
    });
  });
  it('should autoFail if the Die is >= jamsAt, delivering the jamResult as the warning', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Heavy; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.jamsAt = 96;
			inquse.jamResult = 'Jam';
      inquse.inqtest = {Die: 95, Successes: 4};
      inquse.diceEvents();
      expect(inquse.inqtest.Successes).to.equal(4);
			expect(inquse.warning).to.be.undefined;
      inquse.inqtest = {Die: 96, Successes: 4};
      inquse.diceEvents();
      expect(inquse.inqtest.Successes).to.equal(-1);
      expect(inquse.warning).to.include('Jam');
      done();
    });
  });
	it('should detect if a Critical Success was rolled', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Heavy; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqtest = {Die: 1, Successes: 4};
      inquse.diceEvents();
      expect(inquse.critical).to.equal('Success!');
      done();
    });
  });
	it('should detect if a Critical Failure was rolled, and should autoFail', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Heavy; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqtest = {Die: 100, Successes: 4};
      inquse.diceEvents();
      expect(inquse.critical).to.equal('Failure!');
			expect(inquse.inqtest.Successes).to.equal(-1);
      done();
    });
  });
});
