var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('calcInitBonus()', function() {
	it('should return the given character\'s initiative bonus in a callback', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).not.be.undefined;
      done();
    });
  });
  it('should account for the character\'s Agility', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 39;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.equal(3);
      done();
    });
  });
  it('should account for the character\'s Unnatural Agility', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 32;
    inqcharacter.Attributes['Unnatural Ag'] = 2;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.equal(5);
      done();
    });
  });
  it('should account for Lightning Reflexes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 31;
    inqcharacter.Attributes['Unnatural Ag'] = 2;
    var LightningReflexes = new INQLink('Lightning Reflexes');
    inqcharacter.List.Talents.push(LightningReflexes);
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.equal(10);
      done();
    });
  });
  it('should account for Paranoia', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 38;
    inqcharacter.Attributes['Unnatural Ag'] = 2;
    var Paranoia = new INQLink('Paranoia');
    inqcharacter.List.Talents.push(Paranoia);
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.equal(7);
      done();
    });
  });
  it('should use Detection instead of Ag on a starship', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Detection = 27;
    var starship = inqstarship.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: starship.id});

    calcInitBonus(starship, graphic, function(bonus){
      expect(bonus).to.equal(2);
      done();
    });
  });
  it('should use local attributes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Ag = 30;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});
    var localAttributes = new LocalAttributes(graphic);
    localAttributes.set('Ag', 46);

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.equal(4);
      done();
    });
  });
  it('should set the bonus as undefined if the character object does not have Ag or Detection', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character = createObj('character', {name: 'calcInitBonus character'});
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id});

    calcInitBonus(character, graphic, function(bonus){
      expect(bonus).to.be.undefined;
      done();
    });
  });
});
