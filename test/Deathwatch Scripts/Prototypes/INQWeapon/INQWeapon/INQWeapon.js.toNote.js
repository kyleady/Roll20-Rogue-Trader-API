var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeapon.prototype.toNote()', function() {
	it('should return the INQWeapon as a single line note', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var Energy = createObj('handout', {name: 'E'});
    var PowerField = createObj('handout', {name: 'Power Field'});
    var Fist = createObj('handout', {name: 'Fist'});
    var inqweapon = new INQWeapon('Power Fist(2d10 E; Pen 7; Power Field, Fist)');
    var expected = 'Power Fist (Melee; 2D10 ' + getLink(Energy) + '; Pen 7; ' + getLink(PowerField) + ', ' + getLink(Fist) + ')';
    expect(inqweapon.toNote(false)).to.equal(expected);
  });
  it('should be able to return a string without any HTML links', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var Energy = createObj('handout', {name: 'E'});
    var PowerField = createObj('handout', {name: 'Power Field'});
    var Fist = createObj('handout', {name: 'Fist'});
    var inqweapon = new INQWeapon('Power Fist(2d10 E; Pen 7; Power Field, Fist)');
    var withLinks = 'Power Fist (Melee; 2D10 ' + getLink(Energy) + '; Pen 7; ' + getLink(PowerField) + ', ' + getLink(Fist) + ')';
    var noLinks = 'Power Fist (Melee; 2D10 E; Pen 7; Power Field, Fist)';
    expect(inqweapon.toNote(false)).to.equal(withLinks);
    expect(inqweapon.toNote(true)).to.equal(noLinks);
  });
  it('should default to including HTML links', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var Energy = createObj('handout', {name: 'E'});
    var PowerField = createObj('handout', {name: 'Power Field'});
    var Fist = createObj('handout', {name: 'Fist'});
    var inqweapon = new INQWeapon('Power Fist(2d10 E; Pen 7; Power Field, Fist)');
    var withLinks = 'Power Fist (Melee; 2D10 ' + getLink(Energy) + '; Pen 7; ' + getLink(PowerField) + ', ' + getLink(Fist) + ')';
    expect(inqweapon.toNote()).to.equal(withLinks);
  });
});
