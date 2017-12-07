var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQAttack.prototype.damDiceRule()', function() {
	it('should return the roll20 dice rules for Tearing and Proven', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
			modifiers: '',
			custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3; Tearing, Proven[4])'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.defaultProperties();
      inquse.test = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inqattack.damDiceRule()).to.equal('r<3dl1');
      done();
    });
  });
  it('should return an empty string if no roll20 dice rules are needed', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
			modifiers: '',
			custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3)'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push('Flesh Render');
      inquse.defaultProperties();
      inquse.test = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inqattack.damDiceRule()).to.equal('');
      done();
    });
  });
});
