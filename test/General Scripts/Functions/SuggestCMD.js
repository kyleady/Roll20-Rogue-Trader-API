var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
var INQTotal = '';
describe('suggestCMD()', function() {
	it('should return false if any of the phrases fail to match', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'phrase1 player'}, {MOCK20override: true});
		var output = suggestCMD('!$', ['phrase1', 'nothing will match this'], player.id, 'player');
		expect(output).to.equal(false);
	});
  it('should return false if any of the phrases have more than one match', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'phrase11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'phrase1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var output = suggestCMD('!$', ['phrase1', 'phrase2'], player.id, 'player');
    expect(output).to.equal(false);
  });
  it('should return an array of matching objs if each had exactly one match', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'phrase11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'phrase1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var output = suggestCMD('!$', ['phrase11', 'phrase2'], player.id, 'player');
    expect(output).to.deep.equal([player, player3]);
  });
  it('should allow you to enter one phrase instead of an array of phrases', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'phrase11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'phrase1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var output = suggestCMD('!$', 'phrase11', player.id, 'player');
    expect(output).to.deep.equal([player]);
  });
  it('should allow you to enter an array of roll20 types', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'phrase11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'phrase1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var output = suggestCMD('!$', 'phrase11', player.id, ['handout', 'player']);
    expect(output).to.deep.equal([player]);
  });
  it('should allow you to add additional criteria', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'phrase11 player', _online: true}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'phrase1  player', _online: false}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player', _online: false}, {MOCK20override: true});
    var output = suggestCMD('!$', 'phrase1', player.id, ['handout', 'player'], function(obj){
      return obj.get('_online') == true;
    });
    expect(output).to.deep.equal([player]);
  });
	it('should warn the user and the gm if no matches were found', function (done) {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'phrase1 player'}, {MOCK20override: true});
		var playerWhisper = false;
		var gmWhisper = false;
		on('chat:message', function(msg){
			expect(msg.content).to.include('nothing will match this');
			expect(msg.type).to.equal('whisper');
			switch(msg.target){
				case 'gm':
					gmWhisper = true;
				break;
				case player.id:
					playerWhisper = true;
				break;
			}

			if(gmWhisper && playerWhisper) done();
		});


		var output = suggestCMD('!$', ['phrase1', 'nothing will match this'], player.id, 'player');
		expect(output).to.equal(false);
  });
	it('should warn the user and the gm if too many matches were found', function (done) {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'PHRASE11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'PHRASE1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var playerWhisper = false;
		var gmWhisper = false;
		var buttonCount = 0;
		on('chat:message', function(msg){
			if(msg.content.includes('[')) {
				buttonCount++;
			} else {
				expect(msg.content).to.include('phrase1');
				expect(msg.type).to.equal('whisper');
				switch(msg.target){
					case 'gm':
						gmWhisper = true;
					break;
					case player.id:
						playerWhisper = true;
					break;
				}
			}
			if(gmWhisper && playerWhisper && buttonCount == 4) done();
		});


		var output = suggestCMD('!$', ['phrase1', 'phrase2'], player.id, 'player');
		expect(output).to.equal(false);
  });
	it('should replace the $ in the suggestion with a suggested name', function (done) {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'PHRASE11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'PHRASE1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var phrase11 = 0;
		var phrase1 = 0;
		on('chat:message', function(msg){
			if(!msg.content.includes('[')) return;
			if(msg.content.includes('PHRASE11')){
				expect(msg.content).to.equal('[PHRASE11 player](!{URIFixed}' + encodeURIFixed('replace the PHRASE11 player,phrase2') + ')');
				phrase11++;
			} else {
				expect(msg.content).to.equal('[PHRASE1  player](!{URIFixed}' + encodeURIFixed('replace the PHRASE1  player,phrase2') + ')');
				phrase1++;
			}

			if(phrase1 == 2 && phrase11 == 2) done();
		});


		var output = suggestCMD('!replace the $', ['phrase1', 'phrase2'], player.id, 'player');
		expect(output).to.equal(false);
  });
	it('should replace $$ with $ in the suggestion', function (done) {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
		MOCK20endOfLastScript();

		var player = createObj('player', {_displayname: 'PHRASE11 player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'PHRASE1  player'}, {MOCK20override: true});
    var player3 = createObj('player', {_displayname: 'phrase2  player'}, {MOCK20override: true});
    var phrase11 = 0;
		var phrase1 = 0;
		on('chat:message', function(msg){
			if(!msg.content.includes('[')) return;
			if(msg.content.includes('PHRASE11')){
				expect(msg.content).to.equal('[PHRASE11 player](!{URIFixed}' + encodeURIFixed('PHRASE11 player,phrase2 owe me $10') + ')');
				phrase11++;
			} else {
				expect(msg.content).to.equal('[PHRASE1  player](!{URIFixed}' + encodeURIFixed('PHRASE1  player,phrase2 owe me $10') + ')');
				phrase1++;
			}

			if(phrase1 == 2 && phrase11 == 2) done();
		});


		var output = suggestCMD('!$ owe me $$10', ['phrase1', 'phrase2'], player.id, 'player');
		expect(output).to.equal(false);
  });
});
