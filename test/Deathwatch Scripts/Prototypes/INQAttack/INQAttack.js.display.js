var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQAttack.prototype.display()', function() {
	it('should display a roll template'/*, function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		on('chat:message', function(msg){
			log(msg)
      expect(msg.rolltemplate).to.not.be.undefined;
      done();
    });

		var variables = createObj('character', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0, _characterid: variables.id});
		var damage = createObj('attribute', {name: 'Damage', current: 0, max: 0, _characterid: variables.id});
		var penetration = createObj('attribute', {name: 'Penetration', current: 0, max: 0, _characterid: variables.id});
		var onesLoc = createObj('attribute', {name: 'OnesLocation', current: 0, max: 0, _characterid: variables.id});
		var tensLoc = createObj('attribute', {name: 'TensLocation', current: 0, max: 0, _characterid: variables.id});
		var felling = createObj('attribute', {name: 'Felling', current: 0, max: 0, _characterid: variables.id});
		var primitive = createObj('attribute', {name: 'Primitive', current: 0, max: 0, _characterid: variables.id});
		var damageType = createObj('attribute', {name: 'DamageType', current: 0, max: 0, _characterid: variables.id});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.display();
    });
  }*/);
  it('should include a title, damage, penetration, damage type, horde damage, and notes'/*, function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		on('chat:message', function(msg){
      expect(msg.content).to.match(/{{name=/);
      expect(msg.content).to.match(/{{Damage=/);
      expect(msg.content).to.match(/{{Type=/);
      expect(msg.content).to.match(/{{Pen=/);
      expect(msg.content).to.match(/{{HDam=/);
      expect(msg.content).to.match(/{{Notes=/);
      done();
    });

		var variables = createObj('character', {name: 'Attack Variables'});
    var hits = createObj('attribute', {name: 'Hits', current: 0, max: 0, _characterid: variables.id});
		var damage = createObj('attribute', {name: 'Damage', current: 0, max: 0, _characterid: variables.id});
		var penetration = createObj('attribute', {name: 'Penetration', current: 0, max: 0, _characterid: variables.id});
		var felling = createObj('attribute', {name: 'Felling', current: 0, max: 0, _characterid: variables.id});
		var primitive = createObj('attribute', {name: 'Primitive', current: 0, max: 0, _characterid: variables.id});
		var damageType = createObj('attribute', {name: 'DamageType', current: 0, max: 0, _characterid: variables.id});
		var onesLoc = createObj('attribute', {name: 'OnesLocation', current: 0, max: 0, _characterid: variables.id});
		var tensLoc = createObj('attribute', {name: 'TensLocation', current: 0, max: 0, _characterid: variables.id});
		var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Melee; 100m; 10D10+20 R; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
			inquse.defaultProperties();
			inquse.SB = 6;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.inqtest = {Successes: 3};
      var inqattack = new INQAttack(inquse);
      inqattack.display();
    });
  }*/);
});
