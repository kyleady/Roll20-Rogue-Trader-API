var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('logEvent()', function() {
	it('should log the given description in the logbook', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {
        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8000000.M0</strong>: Event Test');
					done();
				});
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log Event Test');
  });
	it('should use the current date', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {
        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8765900.M41</strong>: Event Date Test');
					done();
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log Event Date Test');
  });
	it('should be able to specify a date with @', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {
        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8111222.M3</strong>: Specific Date Test');
					done();
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log Specific Date Test @ 8111222.M3');
  });
	it('should be able to modify the date with +', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Calendar') + ' updated.') {
        var calendar = findObjs({name: 'Calendar', _type: 'handout'})[0];
        expect(calendar.get('_type')).to.equal('handout');
				calendar.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8765938.M41</strong>: Altered Date Test');
					done();
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log Altered Date Test + 8 years and 3 decades');
  });
	it('should be able to modify the date with a -', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {
        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8765800.M41</strong>: Altered Date Test Minus');
					done();
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!log Altered Date Test Minus -1 century');
  });
	it('should be able to add an event to the gm notes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {
        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('gmnotes', function(notes) {
					expect(notes).to.equal('<strong>8765900.M41</strong>: GM Test');
					done();
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!gmLog GM Test');
  });
	it('should append the event on a new line', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var logCount = 0;
    on('chat:message', function(msg) {
      if(msg.content == getLink('Logbook') + ' updated.') {

        var logbook = findObjs({name: 'Logbook', _type: 'handout'})[0];
        expect(logbook.get('_type')).to.equal('handout');
				logbook.get('notes', function(notes) {
					logCount++;
					if(logCount == 1) {
						expect(notes).to.equal('<strong>8765900.M41</strong>: Base Test');
						player.MOCK20chat('!Log Append Test');
					} else if(logCount == 2) {
						expect(notes).to.equal('<strong>8765900.M41</strong>: Base Test<br><strong>8765900.M41</strong>: Append Test');
						done();
					}
				});
      }
    });

		INQTime.load();
		INQTime.mill = 41;
		INQTime.year = 900;
		INQTime.fraction = 7653;
		INQTime.save();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    player.MOCK20gm = true;
		player.MOCK20chat('!Log Base Test');
  });
});
