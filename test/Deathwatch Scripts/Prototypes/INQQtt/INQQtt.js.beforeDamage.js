var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.applyBeforeDamage()', function() {
	it('should apply all the Qualities, Talents, and Traits for before the Roll To Hit', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
			'Accurate',
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
			modifiers: '+10 Aim',
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
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeDamage();
			expect(inquse.hordeDamageMultiplier).to.equal(10);
      expect(inquse.inqweapon.Damage.Modifier).to.equal(53);
			expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('E'));
      expect(inquse.hordeDamage).to.equal(6);
      expect(inquse.inqweapon.Penetration.Multiplier).to.equal(8);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(14);
      expect(inquse.rerollDam).to.equal(3);
      expect(inquse.inqweapon.has('Primitive')).to.not.be.undefined;
      expect(inquse.dropDice).to.equal(2);
      expect(inquse.inqweapon.Damage.DiceNumber).to.equal(13);
      var concussive = inquse.inqweapon.has('Concussive');
      var concussiveTotal = inqqtt.getTotal(concussive);
      expect(concussiveTotal).to.equal(2);
      done();
    });
  });
	it('should ignore anything that requires an attacker', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
			'Accurate',
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
			modifiers: '+10 Aim',
			custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3; ' + qualities.toString() + ')'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
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
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeDamage();
			expect(inquse.hordeDamageMultiplier).to.equal(10);
      expect(inquse.inqweapon.Damage.Modifier).to.equal(29);
      expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('E'));
      expect(inquse.hordeDamage).to.equal(6);
      expect(inquse.inqweapon.Penetration.Multiplier).to.equal(8);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(4);
      expect(inquse.rerollDam).to.equal(3);
      expect(inquse.inqweapon.has('Primitive')).to.not.be.undefined;
      expect(inquse.dropDice).to.equal(1);
      expect(inquse.inqweapon.Damage.DiceNumber).to.equal(12);
      done();
    });
  });
	it('should ignore anything that requires an INQTest if there is no INQTest', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
			'Accurate',
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
			modifiers: '+10 Aim',
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
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeDamage();
			expect(inquse.hordeDamageMultiplier).to.equal(10);
      expect(inquse.inqweapon.Damage.Modifier).to.equal(47);
			expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('E'));
      expect(inquse.hordeDamage).to.equal(6);
      expect(inquse.inqweapon.Penetration.Multiplier).to.equal(1);
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(14);
      expect(inquse.rerollDam).to.equal(3);
      expect(inquse.inqweapon.has('Primitive')).to.not.be.undefined;
      expect(inquse.dropDice).to.equal(2);
      expect(inquse.inqweapon.Damage.DiceNumber).to.equal(12);
      var concussive = inquse.inqweapon.has('Concussive');
      var concussiveTotal = inqqtt.getTotal(concussive);
      expect(concussiveTotal).to.equal(2);
      done();
    });
  });
});
