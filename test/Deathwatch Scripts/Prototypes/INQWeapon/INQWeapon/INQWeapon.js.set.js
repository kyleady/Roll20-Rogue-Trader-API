var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeapon.prototype.set()', function() {
	it('should use the given object to edit each property', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.set({
      Name: 'Set Name',
      Damage: 'D10+2',
      DamageType: 'E',
      Special: 'Razor Sharp, Unbalanced'
    });

    expect(inqweapon.Name).to.equal('Set Name');
    expect(inqweapon.Damage).to.deep.equal(new INQFormula('D10+2'));
    expect(inqweapon.DamageType).to.deep.equal(new INQLink('E'));
    expect(inqweapon.Special).to.deep.equal([new INQLink('Razor Sharp'), new INQLink('Unbalanced')]);
  });
  it('should ignore properties that do not exist on the object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon();
    inqweapon.set({
      Name: 'Set Name',
      Damage: 'D10+2',
      DamageType: 'E',
      Special: 'Razor Sharp, Unbalanced',
      Nope: 'Definitely Not'
    });

    expect(inqweapon.Name).to.equal('Set Name');
    expect(inqweapon.Damage).to.deep.equal(new INQFormula('D10+2'));
    expect(inqweapon.DamageType).to.deep.equal(new INQLink('E'));
    expect(inqweapon.Special).to.deep.equal([new INQLink('Razor Sharp'), new INQLink('Unbalanced')]);
    expect(inqweapon.Nope).to.be.undefined;
  });
});
