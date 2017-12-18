var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicleParser.prototype.parseLists()', function() {
	it('should be able to parse lists into lists of INQLinks', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqvehicleparser = new INQVehicleParser();
    inqvehicleparser.List = {};
    inqvehicleparser.Content = {Lists: []};
    inqvehicleparser.Content.Lists.push({Name: 'Weapons', Content: ['Lascannon', 'Heavy Bolter']});
    inqvehicleparser.Content.Lists.push({Name: 'Vehicle Traits', Content: ['Sturdy']});

    inqvehicleparser.parseLists();

    expect(inqvehicleparser.List.Weapons[0]).to.deep.equal(new INQLink('Lascannon'));
    expect(inqvehicleparser.List.Weapons[1]).to.deep.equal(new INQLink('Heavy Bolter'));
    expect(inqvehicleparser.List['Vehicle Traits'][0]).to.deep.equal(new INQLink('Sturdy'));
  });
});
