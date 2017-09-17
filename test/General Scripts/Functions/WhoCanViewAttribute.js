var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('whoCanViewAttribute()', function() {
  Campaign().MOCK20reset();
  var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  var MyScript = fs.readFileSync(filePath, 'utf8');
  eval(MyScript);
  it('should get an array of player ids that can view the attribute\'s character', function(){
    var player1 = createObj('player', {}, {MOCK20override: true});
    var player2 = createObj('player', {}, {MOCK20override: true});
    var character = createObj('character', {inplayerjournals: player1.id + ',' + player2.id + ',all'});
    var attribute = createObj('attribute', {name: 'unique whocanviewattribute', _characterid: character.id});
    expect(canViewAttribute('unique whocanviewattribute')).to.contain.members([player1.id, player2.id, 'all']);
  });
});
