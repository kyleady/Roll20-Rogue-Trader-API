var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('hordeKill()', function() {
	it('should X out a number of selected tokens equal to the Hits attribute', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var deadCount = 0;
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(0);
    player.MOCK20chat('!horde dam', {MOCK20selected: selected});
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(2);
  });
  it('should reduce the current number of Hits by the number of graphics X\'ed out', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '12', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var deadCount = 0;
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(attributeValue('Hits')).to.equal('12');
    expect(deadCount).to.equal(0);
    player.MOCK20chat('!horde dam', {MOCK20selected: selected});
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(10);
    expect(attributeValue('Hits')).to.equal(2);
  });
  it('should whisper a button to use the leftover Hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '12', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API'){
        expect(msg.content).to.include('[2](!hordeDam)');
        done();
      }
    });
    player.MOCK20chat('!horde dam', {MOCK20selected: selected});
  });
  it('should allow you to ignore the Hits attribute by submitting your own number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var deadCount = 0;
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(0);
    player.MOCK20chat('!horde dam 3', {MOCK20selected: selected});
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(3);
  });
  it('should not reduce the current number of Hits if you submit your own number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '12', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var deadCount = 0;
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(attributeValue('Hits')).to.equal('12');
    expect(deadCount).to.equal(0);
    player.MOCK20chat('!horde dam 14', {MOCK20selected: selected});
    for(var graphic of graphics) {
      if(graphic.get('status_dead')) deadCount++;
    }
    expect(deadCount).to.equal(10);
    expect(attributeValue('Hits')).to.equal('12');
  });
  it('should whisper a button to use the leftover damage, and this button should also not use the Hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'hordeKill player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'hordeKill page'}, {MOCK20override: true});
    var graphics = [];
    for(var i = 0; i < 10; i++){
      graphics.push(
        createObj('graphic', {name: 'hordeKill graphic ' + i, _pageid: page.id})
      );
    }

    var selected = [];
    for(var graphic of graphics) {
      selected.push({
        _type: 'graphic',
        _id: graphic.id
      });
    }

    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '12', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    on('chat:message', function(msg){
      if(msg.playerid == 'API'){
        expect(msg.content).to.include('[4](!hordeDam4)');
        done();
      }
    });
    player.MOCK20chat('!horde dam 14', {MOCK20selected: selected});
  });
});
