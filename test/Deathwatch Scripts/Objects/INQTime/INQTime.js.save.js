var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.save()', function() {
	it('should record the time variables in the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.fraction = 9;
    INQTime.year = 99;
    INQTime.mill = 999;
    INQTime.save();
    expect(INQTime.fractionAttr.get('current')).to.equal(9);
    expect(INQTime.fractionAttr.get('max')).to.equal(9);

    expect(INQTime.yearAttr.get('current')).to.equal(99);
    expect(INQTime.yearAttr.get('max')).to.equal(99);

    expect(INQTime.millAttr.get('current')).to.equal(999);
    expect(INQTime.millAttr.get('max')).to.equal(999);
  });
  it('should execute time events in the order they were added', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.fraction = 9;
    INQTime.year = 99;
    INQTime.mill = 999;

    var thisFirst = false;
    var thisSecond = false;
    INQTime.on('change:time', function(){thisFirst = true; if(thisSecond) throw 2;});
    INQTime.on('change:time', function(){thisSecond = true; if(!thisFirst) throw 1;});
    INQTime.save();
    expect(thisFirst).to.equal(true);
    expect(thisSecond).to.equal(true);
  });
  it('should enter the current time, previous time, and time difference as arguments in the time events', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.fraction = 9;
    INQTime.year = 99;
    INQTime.mill = 999;

    var thisFirst = false;
    var thisSecond = false;
    INQTime.on('change:time', function(currTime, prevTime, dt){
      expect(currTime).to.deep.equal({
        fraction: 9,
        year: 99,
        mill: 999
      });
      expect(prevTime).to.deep.equal({
        fraction: 1,
        year: 2,
        mill: 3
      });
      expect(dt).to.equal(996097.0008);
    });
    INQTime.save();
  });
});
