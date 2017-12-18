var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeapon.prototype.has()', function() {
	it('should search the Special property for the named link', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Balanced)');
    expect(inqweapon.has('Balanced')).to.not.be.undefined;
  });
  it('should return undefined if it isn\'t found', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Balanced)');
    expect(inqweapon.has('Power Field')).to.be.undefined;
  });
  it('should return an object with the Bonus if it is found', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Balanced)');
    expect(inqweapon.has('Balanced')).to.deep.equal({Bonus: 0});
  });
  it('should return an array of objects with their own bonuses if the item has a subgroup', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Blast[5])');
    expect(inqweapon.has('Blast')).to.deep.equal([{Name: '5', Bonus: 0}]);
  });
});
