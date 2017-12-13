var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcScatter()', function() {
	it('should output a roll template line', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 1;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter).to.have.property('Name');
      expect(scatter).to.have.property('Content');
      done();
    });
  });
  it('should not scatter if the weapon does not have blast', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Thrown; D10+2; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 1;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter).to.be.undefined;
      done();
    });
  });
  it('should not scatter if the weapon is not Ranged', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Psychic; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 1;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter).to.be.undefined;
      done();
    });
  });
  it('should always scatter if the weapon is Indirect', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Psychic; D10+2; Pen 3; Indirect[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 2;
      inquse.maxHitsMultiplier = 1;
      inquse.indirect = 4;
      inquse.inqcharacter = new INQCharacter();
      var scatter = inquse.calcScatter();
      expect(scatter).to.not.be.undefined;
      done();
    });
  });
  it('should not scatter if the Ranged weapon hits with every potential hit', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 1;
      inquse.hits = 1;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter).to.be.undefined;
      done();
    });
  });
  it('should output the scatter distance as an inline', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 0;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter.Content).to.match(/\[\[[^\]]*D10[^\]]*\]\]/i);
      done();
    });
  });
  it('should output a scatter direction', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 2;
      inquse.hits = 0;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      expect(scatter.Content).to.match(/(N|S|E|W){1,3}/);
      done();
    });
  });
  it('should output a scatter for each miss', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Blast[4])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 10;
      inquse.hits = 7;
      inquse.maxHitsMultiplier = 1;
      var scatter = inquse.calcScatter();
      var commas = scatter.Content.match(/,/g);
      expect(commas.length).to.equal(2);
      done();
    });
  });
  it('should output a scatter for each hit and miss, if it is indirect', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Indirect[6])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.maxHits = 10;
      inquse.hits = 7;
      inquse.maxHitsMultiplier = 1;
      inquse.indirect = 6;
      inquse.inqcharacter = new INQCharacter();
      var scatter = inquse.calcScatter();
      var commas = scatter.Content.match(/,/g);
      expect(commas.length).to.equal(9);
      done();
    });
  });
});
