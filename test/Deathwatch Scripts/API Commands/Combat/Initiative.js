var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('initiative()', function() {
	it('should roll initiative for every inqcharacter on the gm\'s current page', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var mainPage = createObj('page', {name: 'initiative main page'}, {MOCK20override: true});
    var gmPage = createObj('page', {name: 'initiative gm page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player', _lastpage: gmPage.id}, {MOCK20override: true});

    player.MOCK20gm = true;
    Campaign().set('playerpageid', mainPage.id);
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var gmCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: mainPage.id, represents: mainCharacter.id, layer: 'objects'});
    var gmGraphic = createObj('graphic', {name: 'initiative gm graphic', _pageid: gmPage.id, represents: gmCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init');
    on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(1);
      expect(turnorder[0]).to.have.property('custom', '');
			expect(Number(turnorder[0].pr)).to.be.above(0);
			expect(Number(turnorder[0].pr)).to.be.below(11);
      expect(turnorder[0]).to.have.property('id', gmGraphic.id);
      expect(turnorder[0]).to.have.property('_pageid', gmPage.id);
      done();
    });
  });
  it('should roll initiative for every selected inqcharacter', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var otherCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: page.id, represents: mainCharacter.id, layer: 'objects'});
    var otherGraphic = createObj('graphic', {name: 'initiative other graphic', _pageid: page.id, represents: otherCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
    on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(1);
      expect(turnorder[0]).to.have.property('custom', '');
			expect(Number(turnorder[0].pr)).to.be.above(0);
			expect(Number(turnorder[0].pr)).to.be.below(11);
      expect(turnorder[0]).to.have.property('id', mainGraphic.id);
      expect(turnorder[0]).to.have.property('_pageid', page.id);
      done();
    });
  });
  it('should roll initiative with a given modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var otherCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: page.id, represents: mainCharacter.id, layer: 'objects'});
    var otherGraphic = createObj('graphic', {name: 'initiative other graphic', _pageid: page.id, represents: otherCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init+10', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
    on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(1);
      expect(turnorder[0]).to.have.property('custom', '');
			expect(Number(turnorder[0].pr)).to.be.above(10);
			expect(Number(turnorder[0].pr)).to.be.below(21);
      expect(turnorder[0]).to.have.property('id', mainGraphic.id);
      expect(turnorder[0]).to.have.property('_pageid', page.id);
      done();
    });
  });
  it('should be able to edit an initiative roll that was already made', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var otherCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: page.id, represents: mainCharacter.id, layer: 'objects'});
    var otherGraphic = createObj('graphic', {name: 'initiative other graphic', _pageid: page.id, represents: otherCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
		var pr = 0;
		var changes = 0;
		on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(1);
      expect(turnorder[0]).to.have.property('custom', '');
			expect(turnorder[0]).to.have.property('id', mainGraphic.id);
      expect(turnorder[0]).to.have.property('_pageid', page.id);
			if(changes == 0){
				expect(Number(turnorder[0].pr)).to.be.above(0);
				expect(Number(turnorder[0].pr)).to.be.below(11);
				pr = Number(turnorder[0].pr);
				player.MOCK20chat('!init *= 3', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
			} else if(changes == 1) {
				expect(Number(turnorder[0].pr)).to.equal(pr*3);
				done();
			}
			changes++;
    });
  });
  it('should roll initiative if you are trying to edit a roll that doesn\'t exist yet', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var otherCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: page.id, represents: mainCharacter.id, layer: 'objects'});
    var otherGraphic = createObj('graphic', {name: 'initiative other graphic', _pageid: page.id, represents: otherCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init -= 2', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
    on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(1);
      expect(turnorder[0]).to.have.property('custom', '');
			expect(Number(turnorder[0].pr)).to.be.above(-2);
			expect(Number(turnorder[0].pr)).to.be.below(9);
      expect(turnorder[0]).to.have.property('id', mainGraphic.id);
      expect(turnorder[0]).to.have.property('_pageid', page.id);
      done();
    });
  });
  it('should replace an initiative roll if rolling again', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var mainCharacter = inqcharacter.toCharacterObj();
    var otherCharacter = inqcharacter.toCharacterObj();
    var mainGraphic = createObj('graphic', {name: 'initiative main graphic', _pageid: page.id, represents: mainCharacter.id, layer: 'objects'});
    var otherGraphic = createObj('graphic', {name: 'initiative other graphic', _pageid: page.id, represents: otherCharacter.id, layer: 'objects'});

    player.MOCK20chat('!init', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}, {_type: 'graphic', _id: otherGraphic.id}]});
		var pr = 0;
		var changes = 0;
		on('change:campaign:turnorder', function(){
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      expect(turnorder.length).to.equal(2);
      if(changes == 0){
				player.MOCK20chat('!init', {MOCK20selected: [{_type: 'graphic', _id: mainGraphic.id}]});
			} else if(changes == 1) {
				done();
			}
			changes++;
    });
  });
  it('should attempt to add initiative rolls in initiative order', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var characters = [];
		var graphics = [];
		var selected = [];
		var selected2ndGroup = [];
		for(var i = 0; i < 10; i++) {
			characters[i] = inqcharacter.toCharacterObj();
			graphics[i] = createObj('graphic', {name: 'initiative graphic', _pageid: page.id, represents: characters[i].id, layer: 'objects'});
			if(i < 5) {
				selected.push({_type: 'graphic', _id: graphics[i].id});
			} else {
				selected2ndGroup.push({_type: 'graphic', _id: graphics[i].id});
			}
		}

    player.MOCK20chat('!init', {MOCK20selected: selected});
		var pr = 0;
		var changes = 0;
		on('change:campaign:turnorder', function(){
			log('changed')
			var turnorder = JSON.parse(Campaign().get('turnorder'));
      for(var i = 1; i < turnorder.length; i++){
				expect(Number(turnorder[i-1].pr) >= Number(turnorder[i].pr)).to.equal(true);
			}

      if(changes == 0){
				expect(turnorder.length).to.equal(5);
				player.MOCK20chat('!init', {MOCK20selected: selected2ndGroup});
			} else if(changes == 1) {
				expect(turnorder.length).to.equal(10);
				done();
			}
			changes++;
    });
  });
	it('should allow players to query their initiative bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'initiative page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'initiative player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var graphic = createObj('graphic', {name: 'initiative graphic', _pageid: page.id, represents: character.id, layer: 'objects'});

    player.MOCK20chat('!init ?- 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.target == player.id){
				expect(msg.content).to.match(/^\s*initiative graphic's Initiative: -2 \+ D10\s*$/);
				done();
			}
    });
	});
});
