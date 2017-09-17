var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('eachCharacter()', function() {
	it('should execute the given function for each selected character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
    var page = createObj('page', {name: 'test page'}, {MOCK20override: true});
    var character1 = createObj('character', {name: 'test character 1'});
    var character2 = createObj('character', {name: 'test character 2'});
    var graphic1 = createObj('graphic', {name: 'test graphic 1', represents: character1.id, _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'test graphic 2', represents: character2.id, _pageid: page.id});
    var graphics = [];
    var characters = [];
    on('chat:message:eachCharacter_execute', function(msg){
      eachCharacter(msg, function(character, graphic) {
        characters.push(character.id);
        graphics.push(graphic.id);
      });
    });
    expect(graphics).to.be.empty;
    expect(characters).to.be.empty;
    sendChat('Mock20', '!api selected', null, {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ], MOCK20tag: 'eachCharacter_execute'});
    expect(graphics).includes.members([graphic1.id, graphic2.id]);
    expect(characters).includes.members([character1.id, character2.id]);
  });
  it('should use defaultCharacter() if a player has nothing selected', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
    var player = createObj('player', {_displayname: 'player name'}, {MOCK20override: true});
    var page1 = createObj('page', {name: 'main page'}, {MOCK20override: true});
    var page2 = createObj('page', {name: 'player page'}, {MOCK20override: true});
    var page3 = createObj('page', {name: 'extra page'}, {MOCK20override: true});
    Campaign().set('playerpageid', page1.id);
    var playerspecificpages = {};
    playerspecificpages[player.id] = page2.id;
    Campaign().set('playerspecificpages', playerspecificpages);
    var character = createObj('character', {name: 'test character', controlledby: player.id});
    var graphic1 = createObj('graphic', {name: 'test graphic 1', represents: character.id, _pageid: page1.id});
    var graphic2 = createObj('graphic', {name: 'test graphic 2', represents: character.id, _pageid: page2.id});
    var graphic3 = createObj('graphic', {name: 'test graphic 3', represents: character.id, _pageid: page3.id});
    var graphics = [];
    on('chat:message:eachCharacter_defaultCharacter', function(msg){
			eachCharacter(msg, function(character, graphic) {
        graphics.push(graphic.id);
      });
    });
    expect(graphics).to.be.empty;
    player.MOCK20chat('!api default', {MOCK20selected: [], MOCK20tag: 'eachCharacter_defaultCharacter'});
    expect(graphics).to.have.ordered.members([graphic2.id]);

    graphics = [];
    graphic2.remove();
    player.MOCK20chat('!api default', {MOCK20selected: [], MOCK20tag: 'eachCharacter_defaultCharacter'});
    expect(graphics).to.have.ordered.members([graphic1.id]);

    graphics = [];
    graphic1.remove();
    player.MOCK20chat('!api default', {MOCK20selected: [], MOCK20tag: 'eachCharacter_defaultCharacter'});
    expect(graphics).to.have.ordered.members([graphic3.id]);
  });
	it('should use every graphic on gm\'s current page if the gm has nothing selected', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		var page1 = createObj('page', {name: 'main page'}, {MOCK20override: true});
    var page2 = createObj('page', {name: 'player page'}, {MOCK20override: true});
    var page3 = createObj('page', {name: 'gm page'}, {MOCK20override: true});
		var player = createObj('player', {_displayname: 'player name', _lastpage: page3.id}, {MOCK20override: true});
		player.MOCK20gm = true;
    Campaign().set('playerpageid', page1.id);
    var playerspecificpages = {};
    playerspecificpages[player.id] = page2.id;
		var character1 = createObj('character', {name: 'test character', controlledby: player.id});
    var graphic1 = createObj('graphic', {name: 'test graphic 1', represents: character1.id, _pageid: page1.id, layer: 'objects'});
    var graphic2 = createObj('graphic', {name: 'test graphic 2', represents: character1.id, _pageid: page2.id, layer: 'objects'});
    var graphic3 = createObj('graphic', {name: 'test graphic 3', represents: character1.id, _pageid: page3.id, layer: 'objects'});
		var character2 = createObj('character', {name: 'test character', controlledby: player.id});
    var graphic4 = createObj('graphic', {name: 'test graphic 4', represents: character2.id, _pageid: page1.id, layer: 'objects'});
    var graphic5 = createObj('graphic', {name: 'test graphic 5', represents: character2.id, _pageid: page2.id, layer: 'objects'});
    var graphic6 = createObj('graphic', {name: 'test graphic 6', represents: character2.id, _pageid: page3.id, layer: 'objects'});
		var graphics = [];
    on('chat:message:eachCharacter_gm', function(msg){
			eachCharacter(msg, function(character, graphic) {
				graphics.push(graphic.id);
      });
    });
		player.MOCK20chat('!api gm', {MOCK20selected: [], MOCK20tag: 'eachCharacter_gm'});
		expect(graphics).to.have.members([graphic3.id, graphic6.id]);
		expect(graphics).not.to.have.members([graphic1.id, graphic2.id, graphic4.id, graphic5.id]);
	});
	it('should execute without a graphic or character if the _type is \'unique\'', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		var counter = 0;
		on('chat:message:eachCharacter_unique', function(msg){
			log('pre-boop')
			expect(counter).to.equal(0);
			msg.selected = [];
			eachCharacter(msg, function(character, graphic) {
				log('should not boop')
				counter++;
      });
			expect(counter).to.equal(0);
			msg.selected = [{_type: 'unique', _id: undefined}];
			eachCharacter(msg, function(character, graphic) {
				log('should boop')
				counter++;
      });
    });
		sendChat('Mock20', '!api unique', null, {MOCK20tag: 'eachCharacter_unique'});
		expect(counter).to.equal(1);
	});
});
