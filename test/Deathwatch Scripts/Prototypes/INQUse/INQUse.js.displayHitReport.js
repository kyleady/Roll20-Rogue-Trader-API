var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.displayHitReport()', function() {
	it('should display the INQTest', function(done){
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
        expect(msg.rolltemplate).to.not.be.undefined;
        expect(msg.content).to.match(/{{name=[^}]*BS[^}]*Space Marine[^}]*}}/);
        expect(msg.content).to.match(/{{Successes=[^}]*}}/);
        expect(msg.content).to.match(/{{Unnatural=[^}]*}}/);
        expect(msg.content).to.match(/{{Modifiers=[^}]*Aim[^}]*\(\+10\)[^}]*Standard[^}]*\(\+10\)[^}]*Accurate[^}]*\(\+10\)}}/);
        expect(msg.inlinerolls.length).to.equal(3);
        done();
      });

      inquse.displayHitReport();
    });
  });
  it('should include the number of Hits', function(done){
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
        expect(msg.content).to.match(/{{Hits=\$\[\[\d+\]\]}}/);
        done();
      });

      inquse.displayHitReport();
    });
  });
  it('should include a Psychic Phenomena Roll if the attack trigger the roll', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Psychic; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.inqcharacter.Attributes.PR = 4;
      inquse.options.FocusStrength = 'True';
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();

      on('chat:message', function(msg){
        expect(msg.content).to.match(/{{Phenomena=[^{]*}}/);
        expect(msg.inlinerolls.length).to.equal(5);
        done();
      });

      inquse.displayHitReport();
    });
  });
  it('should include a dash instead of a Roll if no Psy Phe was triggered', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Psychic; D10+2; Pen 3; Accurate)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.inqcharacter.Attributes.PR = 4;
      inquse.options.FocusStrength = 'Fettered';
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
      inquse.roll();

      on('chat:message', function(msg){
        expect(msg.content).to.match(/{{Phenomena=-}}/);
        expect(msg.inlinerolls.length).to.equal(4);
        done();
      });

      inquse.displayHitReport();
    });
  });
	it('should include a scatter roll if the weapon scattered', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim', custom: 'My Weapon(Heavy; D10+2; Pen 3; Blast[3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.Name = 'Space Marine';
      inquse.inqcharacter.controlledby = 'all';
      inquse.inqcharacter.Attributes.BS = 40;
      inquse.inqcharacter.Attributes['Unnatural BS'] = 2;
      inquse.inqcharacter.Attributes.PR = 4;
      inquse.calcModifiers();
      inquse.mode = 'Semi';
      inquse.maxHits = 3;
			inquse.roll();
			inquse.hits = 1;

      on('chat:message', function(msg){
        expect(msg.content).to.match(/{{Scatter=/);
        expect(msg.inlinerolls.length).to.equal(5);
        done();
      });

      inquse.displayHitReport();
    });
  });
});
