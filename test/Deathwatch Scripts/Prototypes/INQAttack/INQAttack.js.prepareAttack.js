var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQAttack.prototype.prepareAttack()', function() {
	it('should call INQQtt.beforeDamage()', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
      'Blast[4]',
      'Claws[2]',
      'Dam[3]',
      'Damage Type[E]',
      'Devastating[5]',
      'Fist',
      'Force',
      'Horde Damage[6]',
      'Lance',
      'Legacy',
      'Melta',
      'Penetration[1]',
      'Power Field',
      'Proven[4]',
      'Razor Sharp',
      'Scatter',
      'Tainted',
      'Tearing'
    ];
    var options = {
			modifiers: '',
			custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3; ' + qualities.toString() + ')'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Attributes.Corruption = 90;
      inquse.inqcharacter.Attributes.Renown = 80;
      inquse.inqcharacter.Attributes.S = 60;
			inquse.SB = 6;
      inquse.inqcharacter.Attributes.PR = 3;
      inquse.inqcharacter.List.Talents.push(new INQLink('Flesh Render'));
      inquse.inqcharacter.List.Talents.push(new INQLink('Crushing Blow'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Hammer Blow'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Mighty Shot'));

			inquse.braced = false;
			inquse.range = 'Extended';
      inquse.mode = 'Single';
			inquse.options.RoF = 'All Out Attack';

			inquse.PsyPheDrop = 0;
			inquse.options.FocusStrength = 'Push';
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;

			inquse.indirect = 0;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.ammoMultiplier = 1;
			inquse.hitsMultiplier = 1;
			inquse.maxHitsMultiplier = 1;

			inquse.parseModifiers();
			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inquse.hordeDamageMultiplier).to.equal(14);
      expect(inquse.inqweapon.Damage.Modifier).to.equal(59);
      expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('E'));
      expect(inquse.hordeDamage).to.equal(6);
      expect(inquse.inqweapon.Penetration.Multiplier).to.equal(8);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(14);
      expect(inquse.rerollDam).to.equal(3);
      expect(inquse.inqweapon.has('Primitive')).to.not.be.undefined;
      expect(inquse.dropDice).to.equal(2);
      expect(inquse.inqweapon.Damage.DiceNumber).to.equal(12);
      var concussive = inquse.inqweapon.has('Concussive');
      var inqqtt = new INQQtt(inquse);
      var concussiveTotal = inqqtt.getTotal(concussive);
      expect(concussiveTotal).to.equal(2);
      done();
    });
  });
  it('should increase the weapon damage of melee weapons by the character\'s SB', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(26);
      done();
    });
  });
	it('should calculate the horde damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			inquse.hordeDamageMultiplier = 2;
			inquse.hordeDamage = 4;
			inquse.hits = 3;

			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(20);
			expect(inqattack.hordeDamage).to.equal(10);
      done();
    });
  });
	it('should save the horde damage as Hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			inquse.hordeDamageMultiplier = 2;
			inquse.hordeDamage = 4;
			inquse.hits = 3;

			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
			expect(hits.get('current')).to.equal(10);
			expect(hits.get('max')).to.equal(10);
      done();
    });
  });
	it('should not calculate the horde damage if the hits have not been calculated', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			var inqattack = new INQAttack(inquse);
      inqattack.prepareAttack();
      expect(inquse.inqweapon.Damage.Modifier).to.equal(20);
			expect(inqattack.hordeDamage).to.be.undefined;
      done();
    });
  });
});
