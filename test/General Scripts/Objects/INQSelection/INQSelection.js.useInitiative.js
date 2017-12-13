var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQSelection.useInitiative()', function() {
	it('should edit the given msg to select the graphic whose turn it is', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.deep.equal([{_type: 'graphic', _id: graphic2.id}]);
  });
  it('should not use the intiative graphic if the msg already has something selected', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id, selected: ['something']};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.deep.equal(['something']);
  });
  it('should not use the intiative graphic if the initiative window is closed', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', false);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
  it('should not use the intiative graphic if the turn order is empty', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', '');

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
  it('should not use the intiative graphic if that graphic is on a different page than the player', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var page2 = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page2.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
  it('should not use the intiative graphic if it does not represent a graphic', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {pr: 1},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
  it('should not use the intiative graphic if it does not represent a character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
  it('should not use the intiative graphic if the user cannot control the character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'Player', _lastpage: page.id}, {MOCK20override: true});
    var character1 = createObj('character', {});
    var character2 = createObj('character', {});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id, represents: character2.id});
    Campaign().set('initiativepage', true);
    var turnorder = [
      {id: graphic2.id, pr: 1, _pageid: page.id},
      {id: graphic1.id, pr: 5, _pageid: page.id}
    ];
    Campaign().set('turnorder', JSON.stringify(turnorder));

    var msg = {playerid: player.id};
    INQSelection.useInitiative(msg);
    expect(msg.selected).to.be.undefined;
  });
});
