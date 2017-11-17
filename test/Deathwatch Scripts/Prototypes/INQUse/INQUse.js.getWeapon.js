var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.getWeapon()', function() {
	it('should retrive the named weapon and save it as a roll20 object', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var inquse = new INQUse('invalid weapon', undefined, undefined, undefined, player.id, function(){
      var valid = inquse.getWeapon('weapon handOut');
			expect(valid).to.equal(true);
      expect(inquse.inqweapon).to.not.be.an.instanceof(INQWeapon);
      expect(inquse.inqweapon).to.respondTo('get');
			expect(inquse.inqweapon.get('_type')).to.equal('handout');
      expect(inquse.inqweapon.get('name')).to.equal('Weapon Handout');
      done();
    });
  });
	it('should allow you use a custom Weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var inquse = new INQUse('invalid weapon', undefined, undefined, undefined, player.id, function(){
			inquse.options.custom = 'My Weapon(Pistol; D10+2; Pen 3; Spray)';
      var valid = inquse.getWeapon('Anything');
			expect(valid).to.equal(true);
      expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
      expect(inquse.inqweapon).to.deep.equal(new INQWeapon('My Weapon(Pistol; D10+2; Pen 3; Spray)'));
      done();
    });
  });
	it('should return false if it could not find the named weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var inquse = new INQUse('invalid weapon', undefined, undefined, undefined, player.id, function(){
			var valid = inquse.getWeapon('Nothing Will Match');
			expect(valid).to.equal(false);
      done();
    });
  });
});
