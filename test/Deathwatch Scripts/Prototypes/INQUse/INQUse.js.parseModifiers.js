var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.parseModifiers()', function() {
	it('parse a string into an array of objects', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim, +6 Squad'};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.parseModifiers();
      expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>Aim</em>', Value: '+10'},
        {Name: '<em>Squad</em>', Value: '+6'}
      ]);
      done();
    });
  });
  it('should default to the name of Other if no name for a modifier is given', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {}, {MOCK20override: true});
    var options = {modifiers: '+10 Aim +6 '};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.parseModifiers();
      expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>Aim</em>', Value: '+10'},
        {Name: '<em>Other</em>', Value: '+6'}
      ]);
      done();
    });
  });
	it('should be able to use the legacy Modifier instead of modifiers', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {}, {MOCK20override: true});
    var options = {Modifier: '+10 Aim +6 '};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.parseModifiers();
      expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>Aim</em>', Value: '+10'},
        {Name: '<em>Other</em>', Value: '+6'}
      ]);
      done();
    });
  });
});
