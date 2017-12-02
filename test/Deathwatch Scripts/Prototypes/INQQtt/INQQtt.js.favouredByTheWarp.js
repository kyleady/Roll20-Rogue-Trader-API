var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.favouredByTheWarp()', function() {
	it('should add to the Psychic Phenomena Drop Dice', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Devastating[3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Favoured By The Warp'));
      var inqqtt = new INQQtt(inquse);
      inquse.PsyPheDrop = 3;
      inqqtt.favouredByTheWarp();
			expect(inquse.PsyPheDrop).to.equal(4);
      done();
    });
  });
  it('should do nothing if the character does not have the Favoured By the Warp Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Devastating[3])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      var inqqtt = new INQQtt(inquse);
      inquse.PsyPheDrop = 3;
      inqqtt.favouredByTheWarp();
			expect(inquse.PsyPheDrop).to.equal(3);
      done();
    });
  });
});
