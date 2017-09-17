var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('find()', function() {
	it('should whisper links of matching handouts and characters the user can view', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'find player'}, {MOCK20override: true});
    var handout1 = createObj('handout', {name: 'Mock20FindTest handout', inplayerjournals: player.id});
    var handout2 = createObj('handout', {name: 'Mock20 Find Test handout', inplayerjournals: ''});
    var character1 = createObj('character', {name: 'Mock20FindTestCharacter', inplayerjournals: 'all'});
    var character2 = createObj('character', {name: 'Mock20 Find Test Character', inplayerjournals: 'all'});
		var handout3 = createObj('handout', {name: 'w1ll not f1nd th1s handout', inplayerjournals: 'all'});

		var handout1Found = false;
		var handout2Found = false;
		var handout3Found = false;
		var character1Found = false;
		var character2Found = false;
		on('chat:message', function(msg){
			if (msg.target == player.id) {
				if (msg.content.includes(getLink(handout1.get('name')))) {
					handout1Found = true;
				}
				if (msg.content.includes(getLink(handout2.get('name')))) {
					handout2Found = true;
				}
				if (msg.content.includes(getLink(handout3.get('name')))) {
					handout3Found = true;
				}
				if (msg.content.includes(getLink(character1.get('name')))) {
					character1Found = true;
				}
				if (msg.content.includes(getLink(character2.get('name')))) {
					character2Found = true;
				}
				if (handout1Found && !handout2Found && !handout3Found && character1Found && character2Found) {
					done();
				}
			}
		});
    player.MOCK20chat('!finD test moCk20 FIND');
  });
	it('should whisper all matching handouts and characters when the gm searches', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'find player'}, {MOCK20override: true});
		player.MOCK20gm = true;
    var handout1 = createObj('handout', {name: 'Mock20FindTest handout'});
    var handout2 = createObj('handout', {name: 'Mock20 Find Test handout', inplayerjournals: 'someother-player-id'});
    var character1 = createObj('character', {name: 'Mock20FindTestCharacter', inplayerjournals: player.id});
    var character2 = createObj('character', {name: 'Mock20 Find Test Character', inplayerjournals: 'all'});
		var handout3 = createObj('handout', {name: 'w1ll not f1nd th1s handout', inplayerjournals: 'all'});

		var handout1Found = false;
		var handout2Found = false;
		var handout3Found = false;
		var character1Found = false;
		var character2Found = false;
		on('chat:message', function(msg){
			if (msg.target == player.id) {
				if (msg.content.includes(getLink(handout1.get('name')))) {
					handout1Found = true;
				}
				if (msg.content.includes(getLink(handout2.get('name')))) {
					handout2Found = true;
				}
				if (msg.content.includes(getLink(handout3.get('name')))) {
					handout3Found = true;
				}
				if (msg.content.includes(getLink(character1.get('name')))) {
					character1Found = true;
				}
				if (msg.content.includes(getLink(character2.get('name')))) {
					character2Found = true;
				}
				if (handout1Found && handout2Found && !handout3Found && character1Found && character2Found) {
					done();
				}
			}
		});
    player.MOCK20chat('!finD test moCk20 FIND');
  });
});
