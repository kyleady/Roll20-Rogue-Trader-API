var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.horde()', function() {
	it('should add a modifier for the attacker\'s horde size', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    for(var i = 0; i < 16; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqtarget = new INQCharacter();
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.horde();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Horde', Value: 17}
      ]);
      done();
    });
  });
  it('should add a modifier for the target\'s horde size', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    for(var i = 0; i < 16; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.GraphicID = graphic1.id;
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.horde();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Horde', Value: 10}
      ]);
      done();
    });
  });
  it('should add bonus Damage Dice based on the number of Successes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    for(var i = 0; i < 36; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqtarget = new INQCharacter();
      inquse.inqcharacter.GraphicID = graphic1.id;
      var inqqtt = new INQQtt(inquse);
      inquse.modifiers = [];
      inqqtt.horde();
      inquse.inqtest = {Successes: 1};
      inqqtt.horde();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);
      done();
    });
  });
  it('should limit the Bonus Damage Dice by the Horde Bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    for(var i = 0; i < 16; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqtarget = new INQCharacter();
      inquse.inqcharacter.GraphicID = graphic1.id;
      var inqqtt = new INQQtt(inquse);
      inquse.modifiers = [];
      inqqtt.horde();
      inquse.inqtest = {Successes: 4};
      inqqtt.horde();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);
      done();
    });
  });
  it('should limit the bonus Damage Dice by 2', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    for(var i = 0; i < 36; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqtarget = new INQCharacter();
      inquse.inqcharacter.GraphicID = graphic1.id;
      var inqqtt = new INQQtt(inquse);
      inquse.modifiers = [];
      inqqtt.horde();
      inquse.inqtest = {Successes: 4};
      inqqtt.horde();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(3);
      done();
    });
  });
  it('should do nothing if the character and target are not hordes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    for(var i = 0; i < 36; i++) createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqtarget = new INQCharacter();
      inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqtarget.GraphicID = graphic1.id;
      var inqqtt = new INQQtt(inquse);
      inquse.modifiers = [];
      inqqtt.horde();
      inquse.inqtest = {Successes: 4};
      inqqtt.horde();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
