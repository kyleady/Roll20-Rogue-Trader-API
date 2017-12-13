var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('getPlayerPageID()', function() {
	it('should return a player\'s specific page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var gmPage = createObj('page', {name: 'gmPage'}, {MOCK20override: true});
    var specificPage = createObj('page', {name: 'specificPage'}, {MOCK20override: true});
    var playerPage = createObj('page', {name: 'playerPage'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: gmPage.id}, {MOCK20override: true});
    var specificPages = {};
    specificPages[player.id] = specificPage.id;
    Campaign().set('playerspecificpages', specificPages);
    Campaign().set('playerpageid', playerPage.id);
    expect(getPlayerPageID(player.id)).to.equal(specificPage.id);
  });
  it('should return a gm\'s last page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var gmPage = createObj('page', {name: 'gmPage'}, {MOCK20override: true});
    var specificPage = createObj('page', {name: 'specificPage'}, {MOCK20override: true});
    var playerPage = createObj('page', {name: 'playerPage'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: gmPage.id}, {MOCK20override: true});
    var specificPages = {};
    specificPages[player.id] = specificPage.id;
    Campaign().set('playerspecificpages', specificPages);
    Campaign().set('playerpageid', playerPage.id);
    player.MOCK20gm = true;
    expect(getPlayerPageID(player.id)).to.equal(gmPage.id);
  });
  it('should return the general player page if there is no specific page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var gmPage = createObj('page', {name: 'gmPage'}, {MOCK20override: true});
    var specificPage = createObj('page', {name: 'specificPage'}, {MOCK20override: true});
    var playerPage = createObj('page', {name: 'playerPage'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: gmPage.id}, {MOCK20override: true});
    var specificPages = {};
    specificPages[player.id] = undefined;
    Campaign().set('playerspecificpages', specificPages);
    Campaign().set('playerpageid', playerPage.id);
    expect(getPlayerPageID(player.id)).to.equal(playerPage.id);
  });
  it('should return the general player page if there is no last page for a gm', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var gmPage = createObj('page', {name: 'gmPage'}, {MOCK20override: true});
    var specificPage = createObj('page', {name: 'specificPage'}, {MOCK20override: true});
    var playerPage = createObj('page', {name: 'playerPage'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var specificPages = {};
    specificPages[player.id] = undefined;
    Campaign().set('playerspecificpages', specificPages);
    Campaign().set('playerpageid', playerPage.id);
    player.MOCK20gm = true;
    expect(getPlayerPageID(player.id)).to.equal(playerPage.id);
  });
  it('should warn if the player is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg) {
      expect(msg.content).to.equal('Player does not exist.');
      done();
    });

    getPlayerPageID('InvalidID');
  });
});
