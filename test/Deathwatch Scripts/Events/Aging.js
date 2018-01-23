var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('Aging()', function() {
	it('should increase every single aging attribute by the change in time', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character1 = createObj('character', {name: 'Character 1'});
    var attribute1 = createObj('attribute', {name: 'Age', current: 27.3106, max: 84.5832, _characterid: character1.id});
    var character2 = createObj('character', {name: 'Character 2'});
    var attribute2 = createObj('attribute', {name: 'Age', current: 270.3106, max: 840.5832, _characterid: character2.id});

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!time += 2 years, 30 centuries, 1 day');

    expect(attribute1.get('current')).to.be.within(3086.5859, 3086.5860);
    expect(attribute2.get('current')).to.be.within(3842.5859, 3842.5860);
    expect(findObjs({_type: 'attribute', name: 'Age'}).length).to.equal(2);
  });
});
