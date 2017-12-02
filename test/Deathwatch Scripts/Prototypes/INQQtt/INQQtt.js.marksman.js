var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.marksman()', function() {
	it('should add a Modifier to negate the Long Range penalty', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Legacy)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Marksman'));
      inquse.range = 'Long';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.marksman();
      expect(inquse.modifiers).to.deep.equal([
        {Name: 'Marksman', Value: 10}
      ]);
      done();
    });
  });
  it('should add a Modifier to negate the Extended Range penalty', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Legacy)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Marksman'));
      inquse.range = 'Extended';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.marksman();
      expect(inquse.modifiers).to.deep.equal([
        {Name: 'Marksman', Value: 20}
      ]);
      done();
    });
  });
  it('should do nothing if the character does not have the Marksman Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Legacy)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.range = 'Long';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.marksman();
      expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
