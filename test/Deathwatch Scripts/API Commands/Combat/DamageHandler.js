var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('damageHandler()', function() {
	it('should whisper the details of the current attack to the gm', function(done){
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

		on('chat:message', function(msg){
      if(msg.playerid == 'API'){
        expect(msg.inlinerolls).to.not.be.empty;
        expect(msg.inlinerolls[0].expression).to.equal('13');
        expect(msg.inlinerolls[1].expression).to.equal('4');
        expect(msg.inlinerolls[2].expression).to.equal('1');
        expect(msg.inlinerolls[3].expression).to.equal('2');
        expect(msg.content).to.not.match(/primitive/i);
        expect(msg.content).to.match(/X/);
        done();
      }
    });
    player.MOCK20chat('!attack?');
  });
  it('should whisper the details of the attack\'s max values to the gm', function(done){
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

		on('chat:message', function(msg){
      if(msg.playerid == 'API'){
        expect(msg.inlinerolls).to.not.be.empty;
        expect(msg.inlinerolls[0].expression).to.equal('23');
        expect(msg.inlinerolls[1].expression).to.equal('34');
        expect(msg.inlinerolls[2].expression).to.equal('2');
        expect(msg.inlinerolls[3].expression).to.equal('1');
        expect(msg.content).to.match(/primitive/i);
        expect(msg.content).to.match(/R/);
        done();
      }
    });
    player.MOCK20chat('!max attack?');
  });
  it('should whisper the details of the starship attacks to the gm', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'S', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

		on('chat:message', function(msg){
      if(msg.playerid == 'API'){
        expect(msg.inlinerolls).to.not.be.empty;
        expect(msg.inlinerolls[0].expression).to.equal('13');
        expect(msg.content).to.match(/pen(etration)?\s*:\s*true/i);
        expect(msg.content).to.not.match(/primitive/i);
        expect(msg.content).to.match(/Starship/);
        done();
      }
    });
    player.MOCK20chat('!attack?');
  });
  it('should allow you to change the damage type', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'S', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

    var details = damDetails();
    expect(details.DamType.get('current')).to.equal('S');
    player.MOCK20chat('!damage type = E');
    expect(details.DamType.get('current')).to.equal('E');
  });
});
