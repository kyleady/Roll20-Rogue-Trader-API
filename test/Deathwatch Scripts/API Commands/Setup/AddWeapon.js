var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('addWeapon()', function() {
  it('should create an ability for the selected characters', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    var character1 = createObj('character', {name: 'c1'});
    var character2 = createObj('character', {name: 'c2'});
    var graphic1 = createObj('graphic', {name: 'g1', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'g2', _pageid: page.id, represents: character2.id});
    var weapon = createObj('handout', {name: 'Combat Knife'});
    weapon.set('notes', '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Balanced<br>');
    var w1Added = false;
    var w2Added = false;
    var gm1msg = false;
    var gm2msg = false;
    var msg1 = false;
    var msg2 = false;
    on('add:ability', function(obj) {
      if(obj.get('_characterid') == character1.id) w1Added = true;
      if(obj.get('_characterid') == character2.id) w2Added = true;
      expect(obj.get('action')).to.match(/^!\s*use\s*weapon\s*Combat\s*Knife/i);
      if(w1Added && w2Added && gm1msg && gm2msg && msg1 && msg2) done();
    });

    on('chat:message', function(msg) {
      if(msg.content.indexOf(getLink(character1)) != -1) {
        if(msg.target == 'gm') {
          gm1msg = true;
        } else {
          msg1 = true;
        }
      } else if(msg.content.indexOf(getLink(character2)) != -1) {
        if(msg.target == 'gm') {
          gm2msg = true;
        } else {
          msg2 = true;
        }
      } else {
        return;
      }

      if(w1Added && w2Added && gm1msg && gm2msg && msg1 && msg2) done();
    });

    player.MOCK20chat('!add weapon Combat Knife', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ]});
  });
  it('should warn if the gm has nothing selected', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character1 = createObj('character', {name: 'c1'});
    var character2 = createObj('character', {name: 'c2'});
    var graphic1 = createObj('graphic', {name: 'g1', _pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {name: 'g2', _pageid: page.id, represents: character2.id});
    var weapon = createObj('handout', {name: 'Combat Knife'});
    weapon.set('notes', '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Balanced<br>');
    on('add:ability', function(obj) {
      throw 'Ability added';
    });

    on('chat:message', function(msg) {
      if(msg.type == 'api') return;
      expect(msg.content).to.match(/select/);
      done();
    });

    player.MOCK20chat('!add weapon Combat Knife');
  });
  it('should allow you to add ammo options', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    var character1 = createObj('character', {name: 'c1'});
    var graphic1 = createObj('graphic', {name: 'g1', _pageid: page.id, represents: character1.id});
    var weapon = createObj('handout', {name: 'Bolt Pistol'});
    var ammo1 = createObj('handout', {name: 'Hellfire Rounds'});
    var ammo2 = createObj('handout', {name: 'Vengeance Rounds'});
    weapon.set('notes', '<strong>Class</strong>: Pistol<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Balanced<br>');
    var w1Added = false;
    var gm1msg = false;
    var msg1 = false;
    on('add:ability', function(obj) {
      if(obj.get('_characterid') == character1.id) w1Added = true;
      expect(obj.get('action')).to.match(/^!\s*use\s*weapon\s*Bolt\s*Pistol/i);
      expect(obj.get('action')).to.match(/\?([^\|\)]+||Hellfire Rounds|Vengeance Rounds)/i);
      if(w1Added && gm1msg && msg1) done();
    });

    on('chat:message', function(msg) {
      if(msg.content.indexOf(getLink(character1)) != -1) {
        if(msg.target == 'gm') {
          gm1msg = true;
        } else {
          msg1 = true;
        }
      } else {
        return;
      }

      if(w1Added && gm1msg && msg1) done();
    });

    player.MOCK20chat('!add weapon Bolt Pistol (, hellfire, veng)', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id}
    ]});
  });
  it('should allow you to specify a clip size', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    var character1 = createObj('character', {name: 'c1'});
    var graphic1 = createObj('graphic', {name: 'g1', _pageid: page.id, represents: character1.id});
    var weapon = createObj('handout', {name: 'Frag Grenade'});
    weapon.set('notes', '<strong>Class</strong>: Thrown<br><strong>Dam</strong>: D10 X<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Blast(2)<br>');
    var w1Added = false;
    var gm1msg = false;
    var msg1 = false;
    on('add:ability', function(obj) {
      if(obj.get('_characterid') == character1.id) w1Added = true;
      expect(obj.get('action')).to.match(/^!\s*use\s*weapon\s*Frag\s*Grenade/i);
      expect(obj.get('action')).to.match(/"Clip":"3"/i);
      if(w1Added && gm1msg && msg1) done();
    });

    on('chat:message', function(msg) {
      if(msg.content.indexOf(getLink(character1)) != -1) {
        if(msg.target == 'gm') {
          gm1msg = true;
        } else {
          msg1 = true;
        }
      } else {
        return;
      }

      if(w1Added && gm1msg && msg1) done();
    });

    player.MOCK20chat('!add weapon frag    [x3]', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id}
    ]});
  });
  it('should suggest weapon names before ammo names', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    var character1 = createObj('character', {name: 'c1'});
    var graphic1 = createObj('graphic', {name: 'g1', _pageid: page.id, represents: character1.id});
    var weapon1 = createObj('handout', {name: 'Bolt Pistol'});
    var weapon2 = createObj('handout', {name: 'Inferno Pistol'});
    var ammo1 = createObj('handout', {name: 'Hellfire Rounds'});
    var ammo2 = createObj('handout', {name: 'Vengeance Rounds'});
    weapon1.set('notes', '<strong>Class</strong>: Pistol<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Balanced<br>');
    weapon2.set('notes', '<strong>Class</strong>: Pistol<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 0<br><strong>Special</strong>: Balanced<br>');
    var multiple = false;
    var multiplegm = false;
    var suggestPistol1 = false;
    var suggestPistol2 = false;
    var suggestPistol1gm = false;
    var suggestPistol2gm = false;
    on('add:ability', function(obj) {
      throw 'Ability added.';
    });
    on('chat:message', function(msg) {
      if(msg.type == 'api') return;
      if(msg.content.indexOf('multiple') != -1) {
        if(msg.target == 'gm') {
          multiplegm = true;
        } else {
          multiple = true;
        }
      } else if(msg.content.indexOf('[Bolt Pistol]') != -1) {
        if(msg.target == 'gm') {
          suggestPistol1gm = true;
        } else {
          suggestPistol1 = true;
        }
      } else if(msg.content.indexOf('[Inferno Pistol]') != -1) {
        if(msg.target == 'gm') {
          suggestPistol2gm = true;
        } else {
          suggestPistol2 = true;
        }
      }
      if(msg.content.indexOf('[Rounds]') != -1) throw 'Did Ammo First.';
      if(multiple && multiplegm
      && suggestPistol1 && suggestPistol2
      && suggestPistol1gm && suggestPistol2gm) done();
    });

    player.MOCK20chat('!add weapon Pistol (, rounds)', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id}
    ]});
  });
});
