var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('skillHandler()', function() {
	it('should set the modifier to -20 if the skill is not found', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});

    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*-20\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Logic');
  });
	it('should set the modifier to +0 if the skill is found', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Awareness = new INQLink('Awareness');
		inqcharacter.List.Skills.push(Awareness);
    var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('Per')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*0\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!aWareness');
  });
	it('should set the modifier to the skill\'s modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Dodge = new INQLink('Dodge+20');
		inqcharacter.List.Skills.push(Dodge);
    var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('Ag')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*20\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!dodge');
  });
	it('should be able to detect subgroups', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Tactics = new INQLink('Tactics(Assault Doctrine, Defensive Doctrine)+10');
		inqcharacter.List.Skills.push(Tactics);
    var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*10\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!tactics(assault doctrine)');
  });
	it('should be able to detect a missing subgroup', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Tactics = new INQLink('Tactics(Assault Doctrine, Defensive Doctrine)+10');
		inqcharacter.List.Skills.push(Tactics);
    var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*-20\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Tactics(Stealth and Recon)');
  });
	it('should ask you to specify a subgroup if there are subgroups and you do not specifiy any of them', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Tactics = new INQLink('Tactics(Assault Doctrine, Defensive Doctrine)+10');
		inqcharacter.List.Skills.push(Tactics);
    var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.target == 'gm') {
        expect(msg.content).to.match(/specify a subgroup/i);
        done();
      }
    });
    player.MOCK20chat('!Tactics');
  });
	it('should still roll a check even if you specify a subgroup and the skill has no subgroups', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var CommonLore = new INQLink('Common Lore–10');
		inqcharacter.List.Skills.push(CommonLore);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*-10\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Common Lore(War)');
  });
	it('should regcognize the all subgroup as every possible subgroup', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var ForbiddenLore = new INQLink('Forbidden Lore(all)+10');
		inqcharacter.List.Skills.push(ForbiddenLore);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*10\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Forbidden lore(Traitor Marines)');
  });
	it('should default to the highest relevant modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var ScholasticLore = new INQLink('Scholastic Lore(all)-10');
		inqcharacter.List.Skills.push(ScholasticLore);
		var ScholasticLore2 = new INQLink('Scholastic Lore(Beasts)+30');
		inqcharacter.List.Skills.push(ScholasticLore2);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*30\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Scholastic lore(BEasts)');
  });
	it('should allow you to include a modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Navigation = new INQLink('Navigation(Surface)+10');
		inqcharacter.List.Skills.push(Navigation);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('It')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*16\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!navigation(surFace)+6');
  });
	it('should allow you to specify an alternate Characteristic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Intimidate = new INQLink('Intimidate');
		inqcharacter.Attributes.T = 20;
		inqcharacter.List.Skills.push(Intimidate);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('T')) {
				expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*20\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!Intimidate | T');
  });
	it('should allow you to whisper the skill check to the gm', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'skillHandler player'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
		var Scrutiny = new INQLink('Scrutiny');
		inqcharacter.List.Skills.push(Scrutiny);
		var character = inqcharacter.toCharacterObj();
    character.set('controlledby', player.id);
		var page = createObj('page', {name: 'skillHandler page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'skillHandler graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('Per') && msg.target == 'gm') {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*0\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!gm Scrutiny');
  });
});
