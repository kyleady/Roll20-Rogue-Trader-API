var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('addCounter()', function() {
	it('should add a counter to the turn tracker with the given text', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'add counter player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!AddCounter this is some text 10');
    var turnorder = Campaign().get('turnorder') || '[]';
    turnorder = JSON.parse(turnorder);
    expect(turnorder[0]).to.not.be.undefined;
    expect(turnorder[0]).to.deep.equal({
      id: '-1',
      pr: '10',
      custom: 'this is some text',
      formula: '-1'
    });
  });
});
