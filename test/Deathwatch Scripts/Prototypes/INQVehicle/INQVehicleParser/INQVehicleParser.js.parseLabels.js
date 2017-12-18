var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQVehicleParser.prototype.parseLabels()', function() {
	it('should be able to parse labeled rules into Bio details and Special Rules', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqvehicleparser = new INQVehicleParser();
    inqvehicleparser.Bio = {};
    inqvehicleparser.SpecialRules = [];
    inqvehicleparser.Content = {Rules: []};
    inqvehicleparser.Content.Rules.push({Name: 'Type ', Content: 'Walker '});
    inqvehicleparser.Content.Rules.push({Name: 'Tactical Speed ', Content: '7 m '});
    inqvehicleparser.Content.Rules.push({Name: 'Cruising Speed ', Content: '87 kph '});
    inqvehicleparser.Content.Rules.push({Name: 'Size ', Content: 'Hulking '});
    inqvehicleparser.Content.Rules.push({Name: 'Crew ', Content: 'One Goblin '});
    inqvehicleparser.Content.Rules.push({Name: 'Carry Capacity ', Content: '- '});
    inqvehicleparser.Content.Rules.push({Name: 'Renown ', Content: '  '});
    inqvehicleparser.Content.Rules.push({Name: 'Availability ', Content: 'Very Rare '});
    inqvehicleparser.Content.Rules.push({Name: 'Something Else ', Content: 'It really is something else. '});

    inqvehicleparser.parseLabels();

    expect(inqvehicleparser.Bio.Type).to.deep.equal(new INQLink('Walker'));
    expect(inqvehicleparser.Bio['Tactical Speed']).to.equal('7 m');
    expect(inqvehicleparser.Bio['Cruising Speed']).to.equal('87 kph');
    expect(inqvehicleparser.Bio.Size).to.equal('Hulking');
    expect(inqvehicleparser.Bio.Crew).to.equal('One Goblin');
    expect(inqvehicleparser.Bio['Carry Capacity']).to.equal('-');
    expect(inqvehicleparser.Bio.Renown).to.equal('');
    expect(inqvehicleparser.Bio.Availability).to.equal('Very Rare');
    expect(inqvehicleparser.SpecialRules).to.deep.equal([{Name: 'Something Else', Rule: 'It really is something else.'}]);
  });
});
