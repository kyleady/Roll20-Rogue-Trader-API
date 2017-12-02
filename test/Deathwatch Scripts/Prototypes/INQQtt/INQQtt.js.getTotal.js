var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.getTotal()', function() {
	it('should return the total value from a list of subgroups', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality[2], Quality[3], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality, 0);
    expect(total).to.equal(5);
  });
  it('should account for SB and PR', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality[2PR], Quality[3SB], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality, 0);
    expect(total).to.equal(13);
  });
  it('should return the minimum value if the total is less than the minimum', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality[2], Quality[3], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality, 10);
    expect(total).to.equal(10);
  });
  it('should set the minimum value as 1 by default', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality[2], Quality[-3], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality);
    expect(total).to.equal(1);
  });
  it('should ignore values that have an equal sign', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality[=2], Quality[3], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality);
    expect(total).to.equal(3);
  });
  it('should treat Qualities without an attached number as having a value equal to the minimum', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('My Weapon(Melee; D10+2 I; Pen 3; Quality, Quality[1], Something Else[1])');
    var quality = inqweapon.has('Quality');
    var inqqtt = new INQQtt({PR: 2, SB: 3});
    var total = inqqtt.getTotal(quality);
    expect(total).to.equal(2);
  });
});
