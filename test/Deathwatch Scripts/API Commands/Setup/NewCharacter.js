var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('newCharacter()', function() {
  it('should add a new roll20 character in the INQCharacter format', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!newCharacter');
    var characters = findObjs({_type: 'character'});
    expect(characters.length).to.equal(1);
    var character = characters[0];
    expect(character.get('name')).to.equal('New Character');
    var wounds = findObjs({_type: 'attribute', _characterid: character.id, name: 'Wounds'});
    expect(wounds.length).to.equal(1);
    var checkBio = false;
    var checkGMNotes = false;
    character.get('bio', function(bio){
      expect(bio).to.be.empty;
      checkBio = true;
      if(checkBio && checkGMNotes) done();
    });
    character.get('gmnotes', function(gmnotes){
      expect(gmnotes).to.not.be.empty;
      checkGMNotes = true;
      if(checkBio && checkGMNotes) done();
    });
  });
  it('should be able to add vehicles', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!newVehicle');
    var characters = findObjs({_type: 'character'});
    expect(characters.length).to.equal(1);
    var character = characters[0];
    expect(character.get('name')).to.equal('New Vehicle');
    var strInt = findObjs({_type: 'attribute', _characterid: character.id, name: 'Structural Integrity'});
    expect(strInt.length).to.equal(1);
    var checkBio = false;
    var checkGMNotes = false;
    character.get('bio', function(bio){
      expect(bio).to.be.empty;
      checkBio = true;
      if(checkBio && checkGMNotes) done();
    });
    character.get('gmnotes', function(gmnotes){
      expect(gmnotes).to.not.be.empty;
      checkGMNotes = true;
      if(checkBio && checkGMNotes) done();
    });
  });
  it('should be able to add starships', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!newStarship');
    var characters = findObjs({_type: 'character'});
    expect(characters.length).to.equal(1);
    var character = characters[0];
    expect(character.get('name')).to.equal('New Starship');
    var hull = findObjs({_type: 'attribute', _characterid: character.id, name: 'Hull'});
    expect(hull.length).to.equal(1);
    var checkBio = false;
    var checkGMNotes = false;
    character.get('bio', function(bio){
      expect(bio).to.be.empty;
      checkBio = true;
      if(checkBio && checkGMNotes) done();
    });
    character.get('gmnotes', function(gmnotes){
      expect(gmnotes).to.not.be.empty;
      checkGMNotes = true;
      if(checkBio && checkGMNotes) done();
    });
  });
  it('should add a number to the name if the new name isn\'t unique', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    createObj('character', {name: 'New Starship'});
    createObj('character', {name: 'New Starship 2'});
    createObj('character', {name: 'New Starship 4'});
    player.MOCK20chat('!newStarship');
    var characters = findObjs({_type: 'character', name: 'New Starship 3'});
    expect(characters.length).to.equal(1);
    var character = characters[0];
    var hull = findObjs({_type: 'attribute', _characterid: character.id, name: 'Hull'});
    expect(hull.length).to.equal(1);
    var checkBio = false;
    var checkGMNotes = false;
    character.get('bio', function(bio){
      expect(bio).to.be.empty;
      checkBio = true;
      if(checkBio && checkGMNotes) done();
    });
    character.get('gmnotes', function(gmnotes){
      expect(gmnotes).to.not.be.empty;
      checkGMNotes = true;
      if(checkBio && checkGMNotes) done();
    });
  });
  it('should put the notes in the bio if the player modifier is added', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!new player starship');
    var characters = findObjs({_type: 'character', name: 'New Starship'});
    expect(characters.length).to.equal(1);
    var character = characters[0];
    var hull = findObjs({_type: 'attribute', _characterid: character.id, name: 'Hull'});
    expect(hull.length).to.equal(1);
    var checkBio = false;
    var checkGMNotes = false;
    character.get('bio', function(bio){
      expect(bio).to.not.be.empty;
      checkBio = true;
      if(checkBio && checkGMNotes) done();
    });
    character.get('gmnotes', function(gmnotes){
      expect(gmnotes).to.be.empty;
      checkGMNotes = true;
      if(checkBio && checkGMNotes) done();
    });
  });
});
