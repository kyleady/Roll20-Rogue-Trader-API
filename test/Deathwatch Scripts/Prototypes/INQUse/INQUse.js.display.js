var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.display()', function() {
	it('should display the Weapon Name and Mode', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.defaultProperties();
      inquse.mode = 'Semi';
      inquse.maxHits = 4;

      on('chat:message', function(msg){
        expect(msg.content).to.match(/<strong>Weapon<\/strong>: My Weapon/);
        expect(msg.content).to.match(/<strong>Mode<\/strong>: Semi\(4\)/);
        done();
      });

      inquse.display();
    });
  });
	it('should include maxHitsMultiplier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.defaultProperties();
      inquse.mode = 'Semi';
      inquse.maxHits = 4;
			inquse.maxHitsMultiplier = 2;

      on('chat:message', function(msg){
        expect(msg.content).to.match(/<strong>Weapon<\/strong>: My Weapon/);
        expect(msg.content).to.match(/<strong>Mode<\/strong>: Semi\(8\)/);
        done();
      });

      inquse.display();
    });
  });
  it('should show the inqammo used if there was one', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.mode = 'Semi';
      inquse.maxHits = 4;
      inquse.inqammo = new INQWeapon();
      inquse.inqammo.Name = 'My Ammo';
      on('chat:message', function(msg){
        expect(msg.content).to.match(/<strong>Ammo<\/strong>: My Ammo/);
        done();
      });

      inquse.display();
    });
  });
  it('should show the range if it is not empty', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.mode = 'Semi';
      inquse.range = 'Long(13/12)';
      inquse.maxHits = 4;
      on('chat:message', function(msg){
        expect(msg.content).to.match(/<strong>Range<\/strong>: Long\(13\/12\)/);
        done();
      });

      inquse.display();
    });
  });
	it('should not show the range if the weapon is Melee', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Melee; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.mode = 'Semi';
      inquse.range = 'Melee(0/1)';
      inquse.maxHits = 4;
      on('chat:message', function(msg){
        expect(msg.content).to.not.match(/<strong>Range<\/strong>: /);
        done();
      });

      inquse.display();
    });
  });
	it('should display the Clip if there is an INQClip', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
		var character = createObj('character', {});
		var clipObj = createObj('attribute', {
			name: 'Ammo - Weapon Name (Ammo Name)',
			_characterid: character.id,
			current: 8,
			max: 10
		});
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqweapon.Name = 'Weapon Name';
	    inquse.inqweapon.Clip = '10';
	    inquse.inqammo = new INQWeapon();
	    inquse.inqammo.Name = 'Ammo Name';
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.ObjID = character.id;
	    inquse.inqclip = new INQClip(inquse.inqweapon, character.id, {inqammo: inquse.inqammo});
			inquse.inqclip.spend();
			inquse.mode = 'Semi';
      inquse.range = 'Long(13/12)';
      inquse.maxHits = 4;

	    on('chat:message', function(msg){
				if(/Clip/.test(msg.content)){
					expect(msg.content).to.match(/7\s*\/\s*10/);
		      done();
				}
	    });

	    inquse.display();
    });
  });
	it('should show the roll to hit if there is an INQTest', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();
      on('chat:message', function(msg){
				if(msg.rolltemplate){
					expect(msg.content).to.match(/{{name=[^}]*BS[^}]*Space Marine[^}]*}}/);
	        expect(msg.content).to.match(/{{Successes=[^}]*}}/);
	        expect(msg.content).to.match(/{{Unnatural=[^}]*}}/);
	        expect(msg.content).to.match(/{{Modifiers=[^}]*Aim[^}]*\(\+10\)[^}]*Standard[^}]*\(\+10\)[^}]*Accurate[^}]*\(\+10\)}}/);
	        expect(msg.inlinerolls.length).to.equal(3);
	        done();
				}
      });

      inquse.display();
    });
  });
	it('should display any Reroll buttons if they exist', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();
			inquse.inqtest.Die = 100;
			inquse.diceEvents();
			inquse.offerReroll();
			var gmWhisper = false;
			var playerWhisper = false;
			on('chat:message', function(msg){
				if(msg.type == 'whisper') {
					expect(msg.content).to.match(/\[Reroll\]/);
					if(msg.target == 'gm') {
						gmWhisper = true;
					} else if(msg.target == player.id) {
						playerWhisper = true;
					}
					if(gmWhisper && playerWhisper) done();
				}
      });

      inquse.display();
    });
  });
	it('should warn if there was a Critical', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();
			inquse.inqtest.Die = 100;
			inquse.diceEvents();
			var critical = false;
			var warning = false;
      on('chat:message', function(msg){
				if(msg.type == 'emote') {
					if(/My Weapon/.test(msg.content)) {
						expect(msg.content).to.match(/Jam/);
						warning = true;
					} else if(/Failure!/.test(msg.content)) {
						expect(msg.who).to.equal('Critical');
						critical = true;
					}
					if(critical && warning) done();
				}
      });

      inquse.display();
    });
  });
	it('should warn if there was an Auto Failure', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();
			inquse.inqtest.Die = 99;
			inquse.diceEvents();
      on('chat:message', function(msg){
				if(msg.type == 'emote'){
					expect(msg.content).to.match(/My Weapon/);
					expect(msg.content).to.match(/Jam/);
	        done();
				}
      });

      inquse.display();
    });
  });
	it('should roll the Weapon Damage if an INQAttack exists');
});
