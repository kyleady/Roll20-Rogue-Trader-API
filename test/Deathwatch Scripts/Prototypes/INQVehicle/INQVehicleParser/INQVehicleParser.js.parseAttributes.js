var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicleParser.prototype.parseAttributes()', function() {
	it('should be able to record local and roll20 attributes as properties', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var vehicle = createObj('character', {name: 'INQVehicleParser vehicle'});
		var page = createObj('page', {name: 'INQVehicleParser page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'INQVehicleParser graphic', _pageid: page.id, represents: vehicle.id});
    var attribute = createObj('attribute', {name: 'INQVehicleParser attribute', _characterid: vehicle.id, current: 11, max: 12});
    var localAttributes = new LocalAttributes(graphic);
    localAttributes.set('INQVehicleParser local attribute', 13);

    var inqvehicleparser = new INQVehicleParser();
    inqvehicleparser.ObjID = vehicle.id;
    inqvehicleparser.Attributes = {};
    inqvehicleparser.parseAttributes(graphic);
    expect(inqvehicleparser.Attributes['INQVehicleParser attribute']).to.equal(11);
    expect(inqvehicleparser.Attributes['INQVehicleParser local attribute']).to.equal(13);
  });
	it('should record the max value for Structural Integrity instead of the current', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var vehicle = createObj('character', {name: 'INQVehicleParser vehicle'});
		var page = createObj('page', {name: 'INQVehicleParser page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'INQVehicleParser graphic', _pageid: page.id, represents: vehicle.id});
    var attribute = createObj('attribute', {name: 'Structural Integrity', _characterid: vehicle.id, current: 11, max: 12});

    var inqvehicleparser = new INQVehicleParser();
    inqvehicleparser.ObjID = vehicle.id;
    inqvehicleparser.Attributes = {};
    inqvehicleparser.parseAttributes(graphic);
    expect(inqvehicleparser.Attributes['Structural Integrity']).to.equal(12);
  });
});
