var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQStarship()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQStarship()).to.be.an.instanceof(INQStarship);
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqstarship = new INQStarship();
    expect(inqstarship).to.have.property('Details');
    expect(inqstarship.Details).to.have.property('Hull');
    expect(inqstarship.Details).to.have.property('Class');
    expect(inqstarship.Details).to.have.property('Dimentions');
    expect(inqstarship.Details).to.have.property('Mass');
    expect(inqstarship.Details).to.have.property('Crew');
    expect(inqstarship.Details).to.have.property('Accel');

    expect(inqstarship).to.have.property('Speed');
    expect(inqstarship).to.have.property('WeaponCapacity');

    expect(inqstarship).to.have.property('List');
    expect(inqstarship.List).to.have.property('Essential Components');
    expect(inqstarship.List).to.have.property('Supplemental Components');
    expect(inqstarship.List).to.have.property('Weapon Components');

    expect(inqstarship).to.have.property('SpecialRules');

    expect(inqstarship).to.have.property('Attributes');
    expect(inqstarship.Attributes).to.have.property('Population');
    expect(inqstarship.Attributes).to.have.property('Moral');
    expect(inqstarship.Attributes).to.have.property('Hull');
    expect(inqstarship.Attributes).to.have.property('VoidShields');

    expect(inqstarship.Attributes).to.have.property('Turret');
    expect(inqstarship.Attributes).to.have.property('Crew');
    expect(inqstarship.Attributes).to.have.property('Manoeuvrability');
		expect(inqstarship.Attributes).to.have.property('Detection');

    expect(inqstarship.Attributes).to.have.property('Armour_F');
    expect(inqstarship.Attributes).to.have.property('Armour_P');
    expect(inqstarship.Attributes).to.have.property('Armour_S');
    expect(inqstarship.Attributes).to.have.property('Armour_A');

		expect(inqstarship.Attributes).not.have.property('WS');
  });
  it('should inherent from INQObject', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    var inqstarship = new INQStarship();
    for(var prop in inqobject) {
      expect(inqstarship).to.have.property(prop);
    }
  });
});
