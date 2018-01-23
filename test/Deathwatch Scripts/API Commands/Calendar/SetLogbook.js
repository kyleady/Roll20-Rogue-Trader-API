var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('logEvent()', function() {
	it('should set the INQCalendar pastName and futureName', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content.indexOf('Log') == 0) {
        expect(INQCalendar.pastName).to.equal('Jericho Reach - Logbook');
        expect(INQCalendar.futureName).to.equal('Jericho Reach - Calendar');
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log = Jericho Reach');
  });
  it('should be able to reset the INQCalendar pastName and futureName', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content.indexOf('Log target reset') == 0) {
        expect(INQCalendar.pastName).to.equal('Logbook');
        expect(INQCalendar.futureName).to.equal('Calendar');
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log = Orks');
    player.MOCK20chat('!log = default');
  });
});
