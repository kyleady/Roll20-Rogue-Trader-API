var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicle.prototype.parse()', function() {
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
		text += 'Availability: Near Unique';
		text += '<br>';
		text += 'Weapons: Pintle-mounted Storm Bolter (Facing All, 100m, S/2/4,'
		text += '<br>';
		text += '2d10+5 X, Pen 5, Clip 100, Reload 2Full, Storm, Tearing)';
		text += '<br>';
		text += 'Reinforced Hull: Unnatural Structural Integrity(+2)';
		text += '<br>';
		text += 'Reliable: +20 to Repair';

    var parsedVehicle = new INQVehicleImportParser();
    parsedVehicle.Bio = {};
    parsedVehicle.Attributes = {};
    parsedVehicle.SpecialRules = [];
    parsedVehicle.parse(text);

		expect(parsedVehicle.Bio['Type']).to.deep.equal(new INQLink('Ground Vehicle'));
		expect(parsedVehicle.Bio['Tactical Speed']).to.deep.equal(new INQLink('15 m'));
		expect(parsedVehicle.Bio['Cruising Speed']).to.deep.equal(new INQLink('70 kph'));
		expect(parsedVehicle.Bio['Size']).to.deep.equal(new INQLink('Enormous'));
		expect(parsedVehicle.Bio['Crew']).to.deep.equal(new INQLink('Driver'));
		expect(parsedVehicle.Bio['Carry Capacity']).to.deep.equal(new INQLink('10 Space Marines with wargear'));
		expect(parsedVehicle.Bio['Availability']).to.deep.equal(new INQLink('Near Unique'));

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
