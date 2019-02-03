var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('Stat Handler API CMD', function() {
	it('should be able to use the Attribute Handler without the attr prefix for recogized stats', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var msgCount = 0;
    on('chat:message', function(msg) {
      if(msg.type == 'api') return;
      if(/<table/i.test(msg.content)) msgCount++;
      if(msgCount >= 64) done();
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.controlledby = player.id;
    var character = inqcharacter.toCharacterObj();
    var inqvehicle = new INQVehicle();
    var vehicle = inqvehicle.toCharacterObj();
    var inqstarship = new INQStarship();
    var starship = inqstarship.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var vgraphic = createObj('graphic', {_pageid: page.id, represents: vehicle.id});
    var sgraphic = createObj('graphic', {_pageid: page.id, represents: starship.id});
    player.MOCK20chat('!WS?');
    player.MOCK20chat('!BS?');
    player.MOCK20chat('!S?');
    player.MOCK20chat('!T?');
    player.MOCK20chat('!Ag?');
    player.MOCK20chat('!Int?');
    player.MOCK20chat('!In?');
    player.MOCK20chat('!It?');
    player.MOCK20chat('!Wp?');
    player.MOCK20chat('!Pr?');
    player.MOCK20chat('!Pe?');
    player.MOCK20chat('!Per?');
    player.MOCK20chat('!Fel?');
    player.MOCK20chat('!Fe?');
    player.MOCK20chat('!Cor?');
    player.MOCK20chat('!Corruption?');
    player.MOCK20chat('!Wounds?');
    player.MOCK20chat('!Structural   Integrity?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
		player.MOCK20chat('!S I?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});

    player.MOCK20chat('!Unnatural WS?');
    player.MOCK20chat('!Unnatural BS?');
    player.MOCK20chat('!Unnatural S?');
    player.MOCK20chat('!Unnatural T?');
    player.MOCK20chat('!Unnatural Ag?');
    player.MOCK20chat('!Unnatural Int?');
    player.MOCK20chat('!Unnatural In?');
    player.MOCK20chat('!Unnatural It?');
    player.MOCK20chat('!Unnatural Wp?');
    player.MOCK20chat('!Unnatural Pr?');
    player.MOCK20chat('!Unnatural Pe?');
    player.MOCK20chat('!Unnatural Per?');
    player.MOCK20chat('!Unnatural Fel?');
    player.MOCK20chat('!Unnatural Fe?');
    player.MOCK20chat('!Unnatural Cor?');
    player.MOCK20chat('!Unnatural Corruption?');
    player.MOCK20chat('!Unnatural Wounds?');
    player.MOCK20chat('!Unnatural StructuralIntegrity?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
		player.MOCK20chat('!Unnaturalsi?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});

    player.MOCK20chat('!Armor H?');
    player.MOCK20chat('!Armor RA?');
    player.MOCK20chat('!Armor LA?');
    player.MOCK20chat('!Armor B?');
    player.MOCK20chat('!Armor LL?');
    player.MOCK20chat('!Armor RL?');
    player.MOCK20chat('!Armor F?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
    player.MOCK20chat('!Armor S?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
    player.MOCK20chat('!Armor R?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
    player.MOCK20chat('!Armor A?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Armor P?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});

    player.MOCK20chat('!PsyRating?');
    player.MOCK20chat('!Fate?');
    player.MOCK20chat('!Insanity?');
    player.MOCK20chat('!Renown?');
    player.MOCK20chat('!Crew?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Fatigue?');
    player.MOCK20chat('!Population?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Morale?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Hull?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Void  Shields?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Turret?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Manoeuvrability?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
    player.MOCK20chat('!Detection?', {MOCK20selected: [{_type: 'graphic', _id: sgraphic.id}]});
    player.MOCK20chat('!Tactical   Speed?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
    player.MOCK20chat('!Aerial     Speed?', {MOCK20selected: [{_type: 'graphic', _id: vgraphic.id}]});
  });
});