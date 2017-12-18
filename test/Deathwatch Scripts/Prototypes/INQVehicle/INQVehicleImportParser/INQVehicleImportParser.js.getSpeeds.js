var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicleImportParser.prototype.getSpeeds()', function() {
  it('should record Tactical Speed in the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var vehicleimport = new INQVehicleImportParser();
    vehicleimport.Bio = {};
    vehicleimport.Attributes = {};

    vehicleimport.Bio['Tactical Speed'] = '15m';
    vehicleimport.Attributes['Tactical Speed'] = 0;
    vehicleimport.getSpeeds();
    expect(vehicleimport.Attributes['Tactical Speed']).to.equal(15);
  });
  it('should record Aerial Speed in the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var vehicleimport = new INQVehicleImportParser();
    vehicleimport.Bio = {};
    vehicleimport.Attributes = {};

    vehicleimport.Bio['Tactical Speed'] = '63 AUs';
    vehicleimport.Attributes['Aerial Speed'] = 0;
    vehicleimport.getSpeeds();
    expect(vehicleimport.Attributes['Aerial Speed']).to.equal(63);
  });
  it('should record Tactical Speed and Aerial Speed at the same time', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var vehicleimport = new INQVehicleImportParser();
    vehicleimport.Bio = {};
    vehicleimport.Attributes = {};

    vehicleimport.Bio['Tactical Speed'] = '15  m, 63AUs';
    vehicleimport.Attributes['Tactical Speed'] = 0;
    vehicleimport.Attributes['Aerial Speed'] = 0;
    vehicleimport.getSpeeds();
    expect(vehicleimport.Attributes['Tactical Speed']).to.equal(15);
    expect(vehicleimport.Attributes['Aerial Speed']).to.equal(63);
  });
});
