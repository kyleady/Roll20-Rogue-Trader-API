var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.gyroStabilised()', function() {
	it('should add a modifier to reduce the Extended Range pentaly', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Gyro-Stabilised)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.braced = true;
      inquse.range = 'Extended';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([
        {Name: 'Gyro-Stabilised', Value: 10}
      ]);
      done();
    });
  });
  it('should add a modifier to reduce the Extreme Range penalty', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Gyro-Stabilised)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.braced = true;
      inquse.range = 'Extreme';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([
        {Name: 'Gyro-Stabilised', Value: 20}
      ]);
      done();
    });
  });
  it('should add a modifier to reduce the unbraced penalty', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Heavy; 10m; D10+2 I; Pen 3; Gyro-Stabilised)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.braced = false;
      inquse.range = 'Short';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([
        {Name: 'Gyro-Stabilised', Value: 10}
      ]);
      done();
    });
  });
  it('should not add a modifier to reduce the Extended Range penalty if the charcter has the Marksman Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Heavy; 10m; D10+2 I; Pen 3; Gyro-Stabilised)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Marksman'));
      inquse.braced = true;
      inquse.range = 'Extended';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
  it('should not add a modifier to reduce the unbraced penalty if the Weapon\'s Class is not Heavy', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3; Gyro-Stabilised)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.braced = false;
      inquse.range = 'Short';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Gyro-Stabilised Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Heavy; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.braced = false;
      inquse.range = 'Extended';
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.gyroStabilised();
      expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
