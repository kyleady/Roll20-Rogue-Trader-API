var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicle.js.getCharacterBio.js()', function() {
	it('should construct a string to use as the vehicle\'s bio', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqvehicle = new INQVehicle();

		inqvehicle.Name = 'INQVehicle Name';

    inqvehicle.Bio['Type'] = 'Ground Vehicle';
		inqvehicle.Bio['Tactical Speed'] = '15 m';
		inqvehicle.Bio['Cruising Speed'] = '70 kph';
		inqvehicle.Bio['Size'] = 'Enormous';
		inqvehicle.Bio['Crew'] = 'Driver';
		inqvehicle.Bio['Carry Capacity'] = '10 Space Marines with wargear';
		inqvehicle.Bio['Renown'] = 'Respected';


    inqvehicle.List.Weapons.push(new INQWeapon('Pintle-Mounted Storm Bolter (Facing All, 100m, S/2/4, 2d10 + 5 X, Pen 5, Clip 100, Reload 2Full, Storm, Tearing)'));

    inqvehicle.SpecialRules.push({Name: 'Reinforced Hull', Rule: 'Unnatural Structural Integrity(+2)'});
		inqvehicle.SpecialRules.push({Name: 'Reliable', Rule: '+20 to Repair'});

		inqvehicle.Attributes['Structural Integrity'] = 25;
		inqvehicle.Attributes['Unnatural Structural Integrity'] = 2;
		inqvehicle.Attributes['Tactical Speed'] = 15;

    inqvehicle.Attributes.Armour_F = 31;
		inqvehicle.Attributes.Armour_S = 31;
		inqvehicle.Attributes.Armour_R = 20;

		inqvehicle.Attributes.Manoeuvrability = 0;

    var lines = [
      '<strong>Type</strong>: Ground Vehicle',
      '<strong>Tactical Speed</strong>: 15 m',
      '<strong>Cruising Speed</strong>: 70 kph',
      '<strong>Size</strong>: Enormous',
      '<strong>Crew</strong>: Driver',
      '<strong>Carry Capacity</strong>: 10 Space Marines with wargear',
      '<strong>Renown</strong>: Respected',
      '',
      '<u><strong>Weapons</strong></u>',
			'Pintle-Mounted Storm Bolter (Basic; 100m; S/2/4; 2D10 + 5 X; Pen 5; Clip 100; Reload 2 Full; Facing All, Storm, Tearing)',
			'',
			'<u><strong>Vehicle Traits</strong></u>',
			'',
			'<strong>Reinforced Hull</strong>: Unnatural Structural Integrity(+2)',
			'',
			'<strong>Reliable</strong>: +20 to Repair',
    ];
		var bioCheck = lines.join('<br>') + '<br>';
		var bio = inqvehicle.getCharacterBio();
		for(var i = 0; i < bio.length; i++){
			if(bio[i] != bioCheck[i]){
				log('@' + i)
				log(bio[i] + ' != ' + bioCheck[i])
			}
		}
    expect(inqvehicle.getCharacterBio()).to.equal(lines.join('<br>') + '<br>');
  });
});
