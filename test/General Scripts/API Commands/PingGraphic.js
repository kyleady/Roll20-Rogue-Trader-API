var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('pingGraphic()', function() {
	it('should warn if the graphic is invalid', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.playerid != player.id) {
        expect(msg.content).to.equal('Graphic does not exist.');
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20chat('!pingG InvalidGraphicID');
  });
  it('should ping the given graphic');
});
