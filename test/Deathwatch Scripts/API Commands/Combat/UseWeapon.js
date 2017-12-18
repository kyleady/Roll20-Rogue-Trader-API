var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('useWeapon()', function() {
  it('should warn if the Weapon does not exist', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      expect(msg.content).to.match(/Invalid Weapon/);
      if(msg.target == player.id){
        gmWarned = true;
      } else if(msg.target == 'gm') {
        playerWarned = true;
      }
      if(gmWarned && playerWarned){
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page'}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Character';
    var character = inqcharacter.toCharacterObj();
    var graphic = createObj('graphic', {name: 'Graphic', _pageid: page.id, represents: character.id});
    useWeapon(['', 'Invalid Weapon', '{"RoF":"Single"}'], {playerid: player.id, selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should warn if the Weapon is out of Range', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      expect(msg.content).to.match(/range/i);
      if(msg.target == player.id){
        gmWarned = true;
      } else if(msg.target == 'gm') {
        playerWarned = true;
      }
      if(gmWarned && playerWarned){
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page', scale_number: 1}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Character';
    var character = inqcharacter.toCharacterObj();
    var inqtarget = new INQCharacter();
    inqtarget.Name = 'Target';
    var target = inqtarget.toCharacterObj();
    var graphic = createObj('graphic', {name: 'Graphic', _pageid: page.id, top: 0*70, left: 0*70, represents: character.id});
    var graphic2 = createObj('graphic', {name: 'Graphic 2', _pageid: page.id, top: 50*70, left: 0*70, represents: target.id});
    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Pistol<br><strong>Range</strong>: 10m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    useWeapon(['', 'Weapon Handout', '{"RoF":"Single","target":"' + graphic2.id + '"}'], {playerid: player.id, selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should warn if the Weapon is out of Ammo', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      expect(msg.content).to.match(/Ammo/i);
      if(msg.target == player.id){
        gmWarned = true;
      } else if(msg.target == 'gm') {
        playerWarned = true;
      }
      if(gmWarned && playerWarned){
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page', scale_number: 1}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Character';
    inqcharacter.controlledby = 'all';
    var character = inqcharacter.toCharacterObj();
    var inqtarget = new INQCharacter();
    inqtarget.Name = 'Target';
    var target = inqtarget.toCharacterObj();
    var graphic = createObj('graphic', {name: 'Graphic', _pageid: page.id, top: 0*70, left: 0*70, represents: character.id});
    var graphic2 = createObj('graphic', {name: 'Graphic 2', _pageid: page.id, top: 5*70, left: 0*70, represents: target.id});
    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Pistol<br><strong>Range</strong>: 10m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var clipObj = createObj('attribute', {name: 'Ammo - Weapon Handout', current: 0, max: 200, _characterid: character.id});
    useWeapon(['', 'Weapon Handout', '{"RoF":"Single","target":"' + graphic2.id + '"}'], {playerid: player.id, selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should not roll the attack if it fails to hit', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      if(msg.rolltemplate){
        expect(msg.content).to.match(/{{name=[^}]*BS[^}]*Character[^}]*}}/);
        expect(msg.content).to.match(/{{Successes=[^}]*}}/);
        expect(msg.content).to.match(/{{Unnatural=[^}]*}}/);
        expect(msg.content).to.match(/{{Modifiers=[^}]*Other[^}]*\(\-50\)[^}]*Close Range[^}]*\(\+10\)[^}]*Standard[^}]*\(\+10\)}}/);
        expect(msg.content).to.match(/{{Hits=\$\[\[\d+\]\]}}/);
        expect(msg.inlinerolls.length).to.equal(3);
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page', scale_number: 1}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Character';
    inqcharacter.controlledby = 'all';
    var character = inqcharacter.toCharacterObj();
    var inqtarget = new INQCharacter();
    inqtarget.Name = 'Target';
    var target = inqtarget.toCharacterObj();
    var graphic = createObj('graphic', {name: 'Graphic', _pageid: page.id, top: 0*70, left: 0*70, represents: character.id});
    var graphic2 = createObj('graphic', {name: 'Graphic 2', _pageid: page.id, top: 5*70, left: 0*70, represents: target.id});
    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Pistol<br><strong>Range</strong>: 10m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Clip</strong>: 10'});
    useWeapon(['', 'Weapon Handout', '{"modifiers":"-50","RoF":"Single","target":"' + graphic2.id + '"}'], {playerid: player.id, selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should use INQSelection initiative character if nothing was selected', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      if(msg.rolltemplate){
        expect(msg.content).to.match(/{{name=[^}]*BS[^}]*INQSelection Init Character[^}]*}}/);
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page', scale_number: 1}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INQSelection Init Character';
    inqcharacter.controlledby = 'all';
    var character = inqcharacter.toCharacterObj();
    var inqtarget = new INQCharacter();
    inqtarget.Name = 'Target';
    var target = inqtarget.toCharacterObj();
    var graphic = createObj('graphic', {name: 'INQSelection Graphic', _pageid: page.id, top: 0*70, left: 0*70, represents: character.id});
    var graphic2 = createObj('graphic', {name: 'Graphic 2', _pageid: page.id, top: 5*70, left: 0*70, represents: target.id});
    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Pistol<br><strong>Range</strong>: 10m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Clip</strong>: 10'});
    var turnorder = [{id: graphic.id, pr: 0, _pageid: page.id}];
    Campaign().set('turnorder', JSON.stringify(turnorder));
    Campaign().set('initiativepage', true);
    Campaign().set('playerpageid', page.id);
    useWeapon(['', 'Weapon Handout', '{"modifiers":"-50","RoF":"Single","target":"' + graphic2.id + '"}'], {playerid: player.id, selected: []});
  });
  it('should use a saved INQSelection if nothing was selected', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var gmWarned = false;
    var playerWarned = false;

    on('chat:message', function(msg){
      if(msg.rolltemplate){
        expect(msg.content).to.match(/{{name=[^}]*BS[^}]*INQSelection Character[^}]*}}/);
        done();
      }
    });

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'Page', scale_number: 1}, {MOCK20override: true});
    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INQSelection Character';
    inqcharacter.controlledby = 'all';
    var character = inqcharacter.toCharacterObj();
    var inqtarget = new INQCharacter();
    inqtarget.Name = 'Target';
    var target = inqtarget.toCharacterObj();
    var graphic = createObj('graphic', {name: 'INQSelection Graphic', _pageid: page.id, top: 0*70, left: 0*70, represents: character.id});
    var graphic2 = createObj('graphic', {name: 'Graphic 2', _pageid: page.id, top: 5*70, left: 0*70, represents: target.id});
    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Pistol<br><strong>Range</strong>: 10m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Clip</strong>: 10'});
    INQSelection.selected = [{_type: 'graphic', _id: graphic.id}];
    useWeapon(['', 'Weapon Handout', '{"modifiers":"-50","RoF":"Single","target":"' + graphic2.id + '"}'], {playerid: player.id, selected: []});
  });
});
