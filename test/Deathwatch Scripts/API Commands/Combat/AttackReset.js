var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('attackReset()', function() {
	it('should set every attack value to max', function(){
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
    expect(attack.DamType.get('current')).to.equal('X');
		expect(attack.Dam.get('current')).to.equal('13');
		expect(attack.Pen.get('current')).to.equal('4');
		expect(attack.Fell.get('current')).to.equal('1');
		expect(attack.Prim.get('current')).to.equal('0');
		expect(attack.Hits.get('current')).to.equal('2');
		expect(attack.OnesLoc.get('current')).to.equal('9');
		expect(attack.TensLoc.get('current')).to.equal('8');
    player.MOCK20chat('!attack = max');
		expect(attack.DamType.get('current')).to.equal('R');
		expect(attack.Dam.get('current')).to.equal('23');
		expect(attack.Pen.get('current')).to.equal('34');
		expect(attack.Fell.get('current')).to.equal('2');
		expect(attack.Prim.get('current')).to.equal('3');
		expect(attack.Hits.get('current')).to.equal('1');
		expect(attack.OnesLoc.get('current')).to.equal('8');
		expect(attack.TensLoc.get('current')).to.equal('3');
  });
});
