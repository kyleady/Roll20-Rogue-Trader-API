var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('critLink()', function() {
	it('should whisper a link to a critical effects table to the user', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Explosive Critical Effects - Arm'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid != 'API') return;
			if(msg.target != player.id) return;
      expect(msg.content).to.include(getLink(handout.get('name')));
      done();
    });

    player.MOCK20chat('!crit?');
  });
  it('should allow you to specify a location', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Explosive Critical Effects - Head'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
			if(msg.playerid != 'API') return;
			if(msg.target != player.id) return;
      expect(msg.content).to.include(getLink(handout.get('name')));
      done();
    });

    player.MOCK20chat('!crit? h');
  });
  it('should allow you to specify a damage type', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Rending Critical Effects - Arm'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
			if(msg.playerid != 'API') return;
			if(msg.target != player.id) return;
      expect(msg.content).to.include(getLink(handout.get('name')));
      done();
    });

    player.MOCK20chat('!crit? R');
  });
  it('should allow you to specify a location and damage type', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Rending Critical Effects - Head'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
			if(msg.playerid != 'API') return;
			if(msg.target != player.id) return;
      expect(msg.content).to.include(getLink(handout.get('name')));
      done();
    });

    player.MOCK20chat('!crit? r h');
  });
  it('should allow you to specify a starship', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'critLink player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var attack = createObj('character', {name: 'Damage Catcher'});
    var handout = createObj('handout', {name: 'Starship Critical Effects'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    on('chat:message', function(msg){
			if(msg.playerid != 'API') return;
			if(msg.target != player.id) return;
      expect(msg.content).to.include(getLink(handout.get('name')));
      done();
    });

    player.MOCK20chat('!crit? s');
  });
});
