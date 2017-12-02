var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.deadeye()', function() {
	it('should add a modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Dead Eye Shot'));
      inquse.options = {RoF: 'Called Shot'};
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.deadeye();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Deadeye', Value: 10}
      ]);
      done();
    });
  });
  it('should do nothing if the weapon is not ranged', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Dead Eye'));
      inquse.options = {RoF: 'Called Shot'};
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.deadeye();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
  it('should do nothing if the character did not make a called shot', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Heavy; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Deadeye Shot'));
      inquse.options = {RoF: 'Single'};
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.deadeye();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
  it('should do nothing if the character does not have the Dead Eye Shot Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Heavy; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.options = {RoF: 'Called Shot'};
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.deadeye();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
