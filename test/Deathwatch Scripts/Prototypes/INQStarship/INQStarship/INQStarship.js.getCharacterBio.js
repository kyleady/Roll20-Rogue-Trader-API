var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQStarship.prototype.getCharacterBio()', function() {
	it('should construct the bio of the INQStarship', function(){
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

    var bio = inqstarship.getCharacterBio();

    expect(bio).to.include('Hull: Raider');
    expect(bio).to.include('Class: Infidel Raider');
    expect(bio).to.include('Dimentions: 1.5 km long, 0.25 km abeam approx.');
    expect(bio).to.include('Mass: 6 megatonnes approx.');
    expect(bio).to.include('Crew: 24000 crew, approx.');
    expect(bio).to.include('Accel: 5 gravities max sustainable acceleration.');

    expect(bio).to.include('Essential Components');
    expect(bio).to.include('Jovian Pattern Class 2 Drive');
    expect(bio).to.include('Strelov 1 Warp Engine');
    expect(bio).to.include('Supplemental Components');
    expect(bio).to.include('Reinforced Interior Bulkheads');
    expect(bio).to.include('Weapon Components');

    expect(bio).to.include('<strong>Speed</strong>: 10');
    expect(bio).to.include('<strong>Weapon Capacity</strong>: Prow 1, Dorsal 1');

  });
});
