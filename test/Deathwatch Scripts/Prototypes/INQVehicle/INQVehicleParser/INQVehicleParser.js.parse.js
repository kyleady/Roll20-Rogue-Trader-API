var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicleParser.prototype.parse()', function() {
  it('should parse a roll20 character into an INQ vehicle', function(done){
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
    inqvehicle.List['Vehicle Traits'].push(new INQLink('Enclosed'));
    inqvehicle.List['Vehicle Traits'].push(new INQLink('Reinforced Armour'));
    inqvehicle.List['Vehicle Traits'].push(new INQLink('Rugged'));
    inqvehicle.List['Vehicle Traits'].push(new INQLink('Tracked Vehicle'));

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

    var parser = new INQVehicleParser();
    parser.Bio = {};
    parser.Attributes = {};
    parser.SpecialRules = [];
    parser.parse(vehicle, graphic, function(parsedVehicle){
      expect(parsedVehicle.Name).to.equal('INQVehicle Name');

      expect(parsedVehicle.Bio['Type']).to.deep.equal(new INQLink('Ground Vehicle'));
      expect(parsedVehicle.Bio['Tactical Speed']).to.equal('15 m');
      expect(parsedVehicle.Bio['Cruising Speed']).to.equal('70 kph');
      expect(parsedVehicle.Bio['Size']).to.equal('Enormous');
      expect(parsedVehicle.Bio['Crew']).to.equal('Driver');
      expect(parsedVehicle.Bio['Carry Capacity']).to.equal('10 Space Marines with wargear');
      expect(parsedVehicle.Bio['Renown']).to.equal('Respected');

      expect(parsedVehicle.List.Weapons).to.deep.equal([new INQLink('Pintle-Mounted Storm Bolter (Basic; 100m; S/2/4; 2D10 + 5 X; Pen 5; Clip 100; Reload 2 Full; Facing All, Storm, Tearing)')]);
      expect(parsedVehicle.List['Vehicle Traits']).to.deep.equal([
        new INQLink('Enclosed'),
        new INQLink('Reinforced Armour'),
        new INQLink('Rugged'),
        new INQLink('Tracked Vehicle')
      ]);
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
});
