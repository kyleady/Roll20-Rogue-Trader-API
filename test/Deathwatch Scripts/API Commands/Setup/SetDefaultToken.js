var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('setDefaultToken()', function() {
  it('should set the default token for the named character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Wounds = 2;
    inqcharacter.Attributes.Fate = 3;
    inqcharacter.Attributes.Fatigue = 4;
    inqcharacter.Name = 'Character Name';

    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'Old Name', _pageid: page.id});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!giveTokenTo ' + character.get('name'), {MOCK20selected: [
      {_id: graphic.id, _type: 'graphic'}
    ]});

    expect(graphic.get('bar1_link')).to.equal('');
    expect(graphic.get('bar2_link')).to.equal('');
    expect(graphic.get('bar3_link')).to.equal('');
    expect(graphic.get('represents')).to.equal(character.id);
    expect(graphic.get('name')).to.equal('Character Name');
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('bar3_value')).to.equal(2);
    expect(graphic.get('bar1_max')).to.equal(4);
    expect(graphic.get('bar2_max')).to.equal(3);
    expect(graphic.get('bar3_max')).to.equal(2);
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('showname')).to.equal(true);
    expect(graphic.get('showplayers_name')).to.equal(true);
    expect(graphic.get('showplayers_bar1')).to.equal(true);
    expect(graphic.get('showplayers_bar2')).to.equal(true);
    expect(graphic.get('showplayers_bar3')).to.equal(true);
    expect(graphic.get('showplayers_aura1')).to.equal(true);
    expect(graphic.get('showplayers_aura2')).to.equal(true);
  });
  it('should work with Vehicles', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqvehicle = new INQVehicle();
    inqvehicle.Attributes['Structural Integrity'] = 2;
    inqvehicle.Attributes['Aerial Speed'] = 3;
    inqvehicle.Attributes['Tactical Speed'] = 4;
    inqvehicle.Name = 'Vehicle Name';

    var character = inqvehicle.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'Old Name', _pageid: page.id});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!giveTokenTo ' + character.get('name'), {MOCK20selected: [
      {_id: graphic.id, _type: 'graphic'}
    ]});

    expect(graphic.get('bar1_link')).to.equal('');
    expect(graphic.get('bar2_link')).to.equal('');
    expect(graphic.get('bar3_link')).to.equal('');
    expect(graphic.get('represents')).to.equal(character.id);
    expect(graphic.get('name')).to.equal('Vehicle Name');
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('bar3_value')).to.equal(2);
    expect(graphic.get('bar1_max')).to.equal(4);
    expect(graphic.get('bar2_max')).to.equal(3);
    expect(graphic.get('bar3_max')).to.equal(2);
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('showname')).to.equal(true);
    expect(graphic.get('showplayers_name')).to.equal(true);
    expect(graphic.get('showplayers_bar1')).to.equal(true);
    expect(graphic.get('showplayers_bar2')).to.equal(true);
    expect(graphic.get('showplayers_bar3')).to.equal(true);
    expect(graphic.get('showplayers_aura1')).to.equal(true);
    expect(graphic.get('showplayers_aura2')).to.equal(true);
  });
  it('should work with Starships', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Hull = 2;
    inqstarship.Attributes.Morale = 3;
    inqstarship.Attributes.Population = 4;
    inqstarship.Name = 'Starship Name';

    var character = inqstarship.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'Old Name', _pageid: page.id});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!giveTokenTo ' + character.get('name'), {MOCK20selected: [
      {_id: graphic.id, _type: 'graphic'}
    ]});

    expect(graphic.get('bar1_link')).to.equal('');
    expect(graphic.get('bar2_link')).to.equal('');
    expect(graphic.get('bar3_link')).to.equal('');
    expect(graphic.get('represents')).to.equal(character.id);
    expect(graphic.get('name')).to.equal('Starship Name');
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('bar3_value')).to.equal(2);
    expect(graphic.get('bar1_max')).to.equal(4);
    expect(graphic.get('bar2_max')).to.equal(3);
    expect(graphic.get('bar3_max')).to.equal(2);
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('showname')).to.equal(true);
    expect(graphic.get('showplayers_name')).to.equal(true);
    expect(graphic.get('showplayers_bar1')).to.equal(true);
    expect(graphic.get('showplayers_bar2')).to.equal(true);
    expect(graphic.get('showplayers_bar3')).to.equal(true);
    expect(graphic.get('showplayers_aura1')).to.equal(true);
    expect(graphic.get('showplayers_aura2')).to.equal(true);
  });
  it('should add attribute links for player tokens', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Attributes.Hull = 2;
    inqstarship.Attributes.Morale = 3;
    inqstarship.Attributes.Population = 4;
    inqstarship.Name = 'Starship Name';

    var character = inqstarship.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'Old Name', _pageid: page.id});
    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    player.MOCK20chat('!givePlayerTokenTo ' + character.get('name'), {MOCK20selected: [
      {_id: graphic.id, _type: 'graphic'}
    ]});

    expect(graphic.get('bar1_link')).to.not.equal('');
    expect(graphic.get('bar2_link')).to.not.equal('');
    expect(graphic.get('bar3_link')).to.not.equal('');
    expect(graphic.get('represents')).to.equal(character.id);
    expect(graphic.get('name')).to.equal('Starship Name');
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('bar3_value')).to.equal(2);
    expect(graphic.get('bar1_max')).to.equal(4);
    expect(graphic.get('bar2_max')).to.equal(3);
    expect(graphic.get('bar3_max')).to.equal(2);
    expect(graphic.get('bar1_value')).to.equal(4);
    expect(graphic.get('bar2_value')).to.equal(3);
    expect(graphic.get('showname')).to.equal(true);
    expect(graphic.get('showplayers_name')).to.equal(true);
    expect(graphic.get('showplayers_bar1')).to.equal(true);
    expect(graphic.get('showplayers_bar2')).to.equal(true);
    expect(graphic.get('showplayers_bar3')).to.equal(true);
    expect(graphic.get('showplayers_aura1')).to.equal(true);
    expect(graphic.get('showplayers_aura2')).to.equal(true);
  });
});
