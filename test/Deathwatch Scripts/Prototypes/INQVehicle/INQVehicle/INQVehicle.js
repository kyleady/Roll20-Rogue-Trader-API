var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicle()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQVehicle()).to.be.an.instanceof(INQVehicle);
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqvehicle = new INQVehicle();
    expect(inqvehicle).to.have.property('Bio');
    expect(inqvehicle.Bio).to.have.property('Type');
    expect(inqvehicle.Bio).to.have.property('Tactical Speed');
    expect(inqvehicle.Bio).to.have.property('Cruising Speed');
    expect(inqvehicle.Bio).to.have.property('Size');
    expect(inqvehicle.Bio).to.have.property('Crew');
    expect(inqvehicle.Bio).to.have.property('Carry Capacity');
    expect(inqvehicle.Bio).to.have.property('Renown');
    expect(inqvehicle.Bio).to.have.property('Availability');

    expect(inqvehicle).to.have.property('List');
    expect(inqvehicle.List).to.have.property('Weapons');
    expect(inqvehicle.List).to.have.property('Vehicle Traits');

    expect(inqvehicle).to.have.property('SpecialRules');

    expect(inqvehicle).to.have.property('Attributes');
    expect(inqvehicle.Attributes).to.have.property('Structural Integrity');
    expect(inqvehicle.Attributes).to.have.property('Unnatural Structural Integrity');
    expect(inqvehicle.Attributes).to.have.property('Tactical Speed');
    expect(inqvehicle.Attributes).to.have.property('Aerial Speed');

    expect(inqvehicle.Attributes).to.have.property('Armour_F');
    expect(inqvehicle.Attributes).to.have.property('Armour_S');
    expect(inqvehicle.Attributes).to.have.property('Armour_R');

    expect(inqvehicle.Attributes).to.have.property('Manoeuvrability');

		expect(inqvehicle.Attributes).not.have.property('WS');
  });
  it('should inherent from INQCharacter', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqvehicle = new INQVehicle();
    for(var prop in inqcharacter) {
      if(typeof inqcharacter[prop] == 'function'){
        expect(inqvehicle).to.have.property(prop);
      }
    }
  });
	it('should be able to parse a Roll20 character', function(done){
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


    inqvehicle.List.Weapons.push(new INQWeapon('Pintle-Mounted Storm Bolter (Facing All, 100m, S/2/4, 2d10+5 X, Pen 5, Clip 100, Reload 2Full, Storm, Tearing)'));

    inqvehicle.SpecialRules.push({Name: 'Reinforced Hull', Rule: 'Unnatural Structural Integrity(+2)'});
		inqvehicle.SpecialRules.push({Name: 'Reliable', Rule: '+20 to Repair'});

		inqvehicle.Attributes['Structural Integrity'] = 25;
		inqvehicle.Attributes['Unnatural Structural Integrity'] = 2;
		inqvehicle.Attributes['Tactical Speed'] = 15;

    inqvehicle.Attributes.Armour_F = 31;
		inqvehicle.Attributes.Armour_S = 31;
		inqvehicle.Attributes.Armour_R = 20;

		inqvehicle.Attributes.Manoeuvrability = 0;

		var vehicle = inqvehicle.toCharacterObj();
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {_pageid: page.id, represents: vehicle.id});

		new INQVehicle(vehicle, graphic, function(parsedVehicle){
			expect(parsedVehicle.Name).to.equal('INQVehicle Name');

	    expect(parsedVehicle.Bio['Type']).to.deep.equal(new INQLink('Ground Vehicle'));
			expect(parsedVehicle.Bio['Tactical Speed']).to.equal('15 m');
			expect(parsedVehicle.Bio['Cruising Speed']).to.equal('70 kph');
			expect(parsedVehicle.Bio['Size']).to.equal('Enormous');
			expect(parsedVehicle.Bio['Crew']).to.equal('Driver');
			expect(parsedVehicle.Bio['Carry Capacity']).to.equal('10 Space Marines with wargear');
			expect(parsedVehicle.Bio['Renown']).to.equal('Respected');

			expect(parsedVehicle.List.Weapons).to.deep.equal([new INQLink('Pintle-Mounted Storm Bolter (Basic; 100m; S/2/4; 2D10 + 5 X; Pen 5; Clip 100; Reload 2 Full; Facing All, Storm, Tearing)')]);
			expect(parsedVehicle.SpecialRules).to.deep.equal([
				{Name: 'Reinforced Hull', Rule: 'Unnatural Structural Integrity(+2)'},
				{Name: 'Reliable', Rule: '+20 to Repair'}
			]);

			expect(parsedVehicle.Attributes['Structural Integrity']).to.equal(25);
			expect(parsedVehicle.Attributes['Unnatural Structural Integrity']).to.equal(2);
			expect(parsedVehicle.Attributes['Tactical Speed']).to.equal(15);

	    expect(parsedVehicle.Attributes.Armour_F).to.equal(31);
			expect(parsedVehicle.Attributes.Armour_S).to.equal(31);
			expect(parsedVehicle.Attributes.Armour_R).to.equal(20);

			expect(parsedVehicle.Attributes.Manoeuvrability).to.equal(0);
			done();
		});
	});
	it('should be able to parse a string', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var text = '';
		text += 'Type: Ground Vehicle';
		text += '<br>';
		text += 'Tactical Speed: 15 m';
		text += '<br>';
		text += 'Cruising Speed: 70 kph';
		text += '<br>';
		text += 'Manoeuvrability: +0';
		text += '<br>';
		text += 'Structural Integrity: 25';
		text += '<br>';
		text += 'Size: Enormous';
		text += '<br>';
		text += 'Armour: Front 31, Side 31, Rear 20';
		text += '<br>';
		text += 'Crew: Driver';
		text += '<br>';
		text += 'Carrying Capacity: 10 Space Marines with wargear.';
		text += '<br>';
		text += 'Renown: Respected';
		text += '<br>';
		text += 'Weapons: Pintle-mounted Storm Bolter (Facing All, 100m, S/2/4,'
		text += '<br>';
		text += '2d10+5 X, Pen 5, Clip 100, Reload 2Full, Storm, Tearing)';
		text += '<br>';
		text += 'Reinforced Hull: Unnatural Structural Integrity(+2)';
		text += '<br>';
		text += 'Reliable: +20 to Repair';

		new INQVehicle(text, undefined, function(parsedVehicle){
			expect(parsedVehicle.Bio['Type']).to.deep.equal(new INQLink('Ground Vehicle'));
			expect(parsedVehicle.Bio['Tactical Speed']).to.deep.equal(new INQLink('15 m'));
			expect(parsedVehicle.Bio['Cruising Speed']).to.deep.equal(new INQLink('70 kph'));
			expect(parsedVehicle.Bio['Size']).to.deep.equal(new INQLink('Enormous'));
			expect(parsedVehicle.Bio['Crew']).to.deep.equal(new INQLink('Driver'));
			expect(parsedVehicle.Bio['Carry Capacity']).to.deep.equal(new INQLink('10 Space Marines with wargear'));
			expect(parsedVehicle.Bio['Renown']).to.deep.equal(new INQLink('Respected'));

			expect(parsedVehicle.SpecialRules).to.deep.equal([
				{Name: 'Reinforced Hull', Rule: 'Unnatural Structural Integrity(+2)'},
				{Name: 'Reliable', Rule: '+20 to Repair'}
			]);

			expect(parsedVehicle.Attributes['Structural Integrity']).to.equal('25');
			expect(parsedVehicle.Attributes['Tactical Speed']).to.equal(15);
			expect(parsedVehicle.Attributes.Armour_F).to.equal('31');
			expect(parsedVehicle.Attributes.Armour_S).to.equal('31');
			expect(parsedVehicle.Attributes.Armour_R).to.equal('20');
			expect(parsedVehicle.Attributes.Manoeuvrability).to.equal('+0');

			new INQWeapon('Pintle-mounted Storm Bolter (Facing All, 100m, S/2/4, 2d10+5 X, Pen 5, Clip 100, Reload 2Full, Storm, Tearing)', function(newWeapon){
				expect(parsedVehicle.List.Weapons).to.deep.equal([newWeapon]);
				done();
			});
		});
	});
});
