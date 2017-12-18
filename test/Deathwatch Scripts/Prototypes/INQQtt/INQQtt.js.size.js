var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.size()', function() {
	it('should add a modifier for Miniscule', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Miniscule)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Miniscule', Value: -30}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(1)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Miniscule', Value: -30}
      ]);
      done();
    });
  });
  it('should add a modifier for Puny', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Puny)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Puny', Value: -20}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(2)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Puny', Value: -20}
      ]);
      done();
    });
  });
  it('should add a modifier for Scrawny', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Scrawny)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Scrawny', Value: -10}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(3)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Scrawny', Value: -10}
      ]);
      done();
    });
  });
  it('should do nothing for Average', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Average)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(4)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
  it('should add a modifier for Hulking', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Hulking)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Hulking', Value: 10}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(5)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Hulking', Value: 10}
      ]);
      done();
    });
  });
  it('should add a modifier for Enormous', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Enormous', Value: 20}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(6)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Enormous', Value: 20}
      ]);
      done();
    });
  });
  it('should add a modifier for Massive', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Massive)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Massive', Value: 30}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(7)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Massive', Value: 30}
      ]);
      done();
    });
  });
  it('should add a modifier for Immense', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Immense)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Immense', Value: 40}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(8)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Immense', Value: 40}
      ]);
      done();
    });
  });
  it('should add a modifier for Monumental', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Monumental)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Monumental', Value: 50}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(9)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Monumental', Value: 50}
      ]);
      done();
    });
  });
  it('should add a modifier for Titanic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Titanic)'));
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Titanic', Value: 60}
      ]);
      inquse.inqtarget.List.Traits = [];
      inquse.inqtarget.List.Traits.push(new INQLink('Size(10)'));
      inquse.modifiers = [];
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Titanic', Value: 60}
      ]);
      done();
    });
  });
  it('should do nothing if the target does not have the Size Trait', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Volatile)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.size();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
