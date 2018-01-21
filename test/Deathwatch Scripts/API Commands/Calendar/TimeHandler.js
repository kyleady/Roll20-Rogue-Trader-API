var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('timeHandler()', function() {
	it('should report the current time', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.type).to.equal('whisper');
      expect(msg.content).to.equal('8000002.M3');
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20chat('!time');
  });
  it('should report the time with a modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.type).to.equal('whisper');
      expect(msg.content).to.equal('8000012.M3');
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20chat('!time + 10 years');
  });
  it('should report the time with a negative modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.type).to.equal('whisper');
      expect(msg.content).to.equal('8000001.M2');
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20chat('!time ? - 1 year, 10 centuries');
  });
  it('should be able to edit the time attributes (GM only)', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.type).to.equal('general');
      expect(msg.content).to.include('8003002.M3');
      expect(INQTime.fractionObj.get('current')).to.be.within(30, 33);
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!time += 2 hour 1 day');
  });
  it('should be able to go back in time (GM only)', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.type).to.equal('general');
      expect(msg.content).to.include('8000000.M0');
      expect(INQTime.fractionObj.get('current')).to.be.equal(1);
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!time -= 2 year 30 centuries');
  });
});
