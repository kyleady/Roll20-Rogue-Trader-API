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
      inquse.test = {Die: 29};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(false);

      inquse.options.FocusStrength = 'Unfettered';
      inquse.PsyPhe = false;
      inquse.test = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(false);

      inquse.options.FocusStrength = 'Unfettered';
      inquse.PsyPhe = false;
      inquse.test = {Die: 29};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);

      inquse.options.FocusStrength = 'Push';
      inquse.PsyPhe = false;
      inquse.test = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);

      inquse.options.FocusStrength = 'True';
      inquse.PsyPhe = false;
      inquse.test = {Die: 28};
      inquse.diceEvents();
      expect(inquse.PsyPhe).to.equal(true);
      done();
    });
  });
  it('should never autoFail if the weapon is Melee or Gear', function(done){
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
      inquse.test = {Die: 100};
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      inquse.inqweapon.Class = 'Gear';
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      done();
    });
  });
  it('should autoFail with Fail on 91+ if the weapon is Psychic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Psychic; D10+2; Pen 3)',
      FocusStrength: 'Fettered'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.mode = 'Full';
      inquse.defaultProperties();
      inquse.test = {Die: 90};
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      inquse.test = {Die: 91};
      inquse.diceEvents();
      expect(inquse.autoFail).to.equal(true);
      expect(inquse.jamResult).to.equal('Fail');
      done();
    });
  });
  it('should autoFail with Fail on 96+ if the weapon is Ranged and firing on Single', function(done){
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
      inquse.mode = 'Single';
      inquse.defaultProperties();
      inquse.test = {Die: 95};
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      inquse.test = {Die: 96};
      inquse.diceEvents();
      expect(inquse.autoFail).to.equal(true);
      expect(inquse.jamResult).to.equal('Jam');
      done();
    });
  });
  it('should autoFail with Fail on 94+ if the weapon is Ranged and firing on Semi/Full', function(done){
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
      inquse.mode = 'Semi';
      inquse.defaultProperties();
      inquse.test = {Die: 93};
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      inquse.test = {Die: 94};
      inquse.diceEvents();
      expect(inquse.autoFail).to.equal(true);
      expect(inquse.jamResult).to.equal('Jam');

      inquse.mode = 'Full';
      inquse.autoFail = false;
      inquse.jamResult = '';
      inquse.defaultProperties();
      inquse.test = {Die: 93};
      inquse.diceEvents();
      expect(inquse.autoFail).to.not.equal(true);
      inquse.test = {Die: 94};
      inquse.diceEvents();
      expect(inquse.autoFail).to.equal(true);
      expect(inquse.jamResult).to.equal('Jam');
      done();
    });
  });
});
