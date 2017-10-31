var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQStarship.prototype.toCharacterObj()', function() {
	it('should convert an INQ starship object into a Roll20 character object', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    inqstarship.Details.Hull = 'Raider';
    inqstarship.Details.Class = 'Infidel Raider';
    inqstarship.Details.Dimentions = '1.5 km long, 0.25 km abeam approx.';
    inqstarship.Details.Mass = '6 megatonnes approx.';
    inqstarship.Details.Crew = '24000 crew, approx.';
    inqstarship.Details.Accel = '5 gravities max sustainable acceleration.';


    inqstarship.List['Essential Components'].push(new INQLink('Jovian Pattern Class 2 Drive'));
    inqstarship.List['Essential Components'].push(new INQLink('Strelov 1 Warp Engine'));
    inqstarship.List['Supplemental Components'].push(new INQLink('Reinforced Interior Bulkheads'));

    inqstarship.SpecialRules.push({Name: 'Reinforced Interior Bulkheads', Rule: 'The bonuses for this Component have already been included in the ship profile.'});

    inqstarship.Speed = 10;
    inqstarship.WeaponCapacity = 'Prow 1, Dorsal 1';

    inqstarship.Attributes.Population = 37;
    inqstarship.Attributes.Moral = 37;
    inqstarship.Attributes.Hull = 33;
    inqstarship.Attributes.VoidShields = 1;

    inqstarship.Attributes.Armour_F = 17;
    inqstarship.Attributes.Armour_P = 17;
    inqstarship.Attributes.Armour_S = 17;
    inqstarship.Attributes.Armour_A = 17;

    inqstarship.Attributes.Turret = 1;
    inqstarship.Attributes.Crew = 40;
    inqstarship.Attributes.Manoeuvrability = 25;
    inqstarship.Attributes.Detection = 10;

    inqstarship.Name = 'toCharacterObj Name';


    var character = inqstarship.toCharacterObj();

    var attributes = findObjs({_type: 'attribute', _characterid: character.id});
		for(var attr in inqstarship.Attributes){
			var match = false;
			_.each(attributes, function(roll20attr){
				if(attr == roll20attr.get('name') && inqstarship.Attributes[attr] == roll20attr.get('max')){
					match = true;
				}
			});
			expect(match).to.equal(true);
		}

    expect(character.get('name')).to.equal(inqstarship.Name);

    character.get('gmnotes', function(bio){
      expect(bio).to.include('Essential Components');
			done();
    });
  });
	it('should save the bio in the bio if it is marked as a player', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    var character = inqstarship.toCharacterObj(true);

    character.get('bio', function(bio){
      expect(bio).to.include('Essential Components');
			done();
    });
	});
	it('should save the bio in the bio if it is controlled by anyone', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var player = createObj('player', {}, {MOCK20override: true});
    var inqstarship = new INQStarship();
		inqstarship.controlledby = player.id;
    var character = inqstarship.toCharacterObj();
		expect(character.get('controlledby')).to.equal(inqstarship.controlledby);

    character.get('bio', function(bio){
      expect(bio).to.include('Essential Components');
			done();
    });
	});
});
