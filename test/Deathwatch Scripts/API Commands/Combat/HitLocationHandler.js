var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('hitLocationHandler()', function() {
	it('should be able to target specific locations on a character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var attack = damDetails();
    var Names = {H: 'Head', RA: 'Right Arm', LA: 'Left Arm', B: 'Body', RL: 'Right Leg', LL: 'Left Leg'};
    for(var loc in Names){
      player.MOCK20chat('!target = ' + Names[loc]);
      var location = getHitLocation(attack.TensLoc.get('current'), attack.OnesLoc.get('current'), 'character');
      expect(location).to.equal(loc);
    }
  });
  it('should be able to target specific locations on a vehicle', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var attack = damDetails();
    var Names = {F: 'Front', S: 'Side', R: 'Rear'};
    for(var loc in Names){
      player.MOCK20chat('!target = ' + Names[loc]);
      var location = getHitLocation(attack.TensLoc.get('current'), attack.OnesLoc.get('current'), 'vehicle');
      expect(location).to.equal(loc);
    }
  });
  it('should be able to target specific locations on a starship', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var attack = damDetails();
    var Names = {F: 'Front', P: 'Port', S: 'Starboard', A: 'Aft'};
    for(var loc in Names){
      player.MOCK20chat('!target = ' + Names[loc]);
      var location = getHitLocation(attack.TensLoc.get('current'), attack.OnesLoc.get('current'), 'starship');
      expect(location).to.equal(loc);
    }
  });
  it('should be able to target a vehicle\'s Motive Systems', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Motive Systems Critical Effects'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API' && msg.content.includes('Critical Effects')){
        expect(msg.content).to.include(getLink(handout.get('name')));
        done();
      }
    });
    player.MOCK20chat('!target = Motive Systems');
    player.MOCK20chat('!crit? v');
  });
  it('should be able to target a vehicle\'s Weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Weapon Critical Effects'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API' && msg.content.includes('Critical Effects')){
        expect(msg.content).to.include(getLink(handout.get('name')));
        done();
      }
    });
    player.MOCK20chat('!target = Weapon');
    player.MOCK20chat('!crit? v');
  });
  it('should be able to target a vehicle\'s Turret', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Turret Critical Effects'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API' && msg.content.includes('Critical Effects')){
        expect(msg.content).to.include(getLink(handout.get('name')));
        done();
      }
    });
    player.MOCK20chat('!target = Turret');
    player.MOCK20chat('!crit? v');
  });
  it('should be able to target a vehicle\'s Hull', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Hull Critical Effects'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API' && msg.content.includes('Critical Effects')){
        expect(msg.content).to.include(getLink(handout.get('name')));
        done();
      }
    });
    player.MOCK20chat('!target = Hull')
    player.MOCK20chat('!crit? v');
  });
});
