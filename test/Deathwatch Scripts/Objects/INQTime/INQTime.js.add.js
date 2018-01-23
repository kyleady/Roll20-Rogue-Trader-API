var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.add()', function() {
	it('should add to the INQTime', function(){
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
    INQTime.add([
      {type: 'centuries', quantity: 50},
      {type: 'years', quantity: 3},
      {type: 'hours', quantity: 1}
    ]);

    expect(INQTime.fraction).to.be.within(2,3);
    expect(INQTime.year).to.equal(5);
    expect(INQTime.mill).to.equal(8);
  });
  it('should not save the changes to the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    var fraction = createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    var year = createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    var mill = createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.add([
      {type: 'centuries', quantity: 50},
      {type: 'years', quantity: 3},
      {type: 'hour', quantity: 1}
    ]);

    expect(INQTime.fraction).to.be.within(2,3);
    expect(INQTime.year).to.equal(5);
    expect(INQTime.mill).to.equal(8);
    expect(fraction.get('max')).to.equal(1);
    expect(year.get('max')).to.equal(2);
    expect(mill.get('max')).to.equal(3);
  });
  it('should overflow fraction into years then years into mill', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    var fraction = createObj('attribute', {name: 'Year Fraction', current: 10, max: 9999, _characterid: INQVariables.id});
    var year = createObj('attribute', {name: 'Year', current: 20, max: 999, _characterid: INQVariables.id});
    var mill = createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.add([{type: 'hour', quantity: 1}]);

    expect(INQTime.fraction).to.be.within(0, 1);
    expect(INQTime.year).to.equal(0);
    expect(INQTime.mill).to.equal(4);
  });
  it('should borrow from years first, then mill', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    var fraction = createObj('attribute', {name: 'Year Fraction', current: 10, max: 0, _characterid: INQVariables.id});
    var year = createObj('attribute', {name: 'Year', current: 20, max: 0, _characterid: INQVariables.id});
    var mill = createObj('attribute', {name: 'Millennia', current: 30, max: 41, _characterid: INQVariables.id});
    INQTime.load();
    INQTime.add([{type: 'hour', quantity: -1}]);

    expect(INQTime.fraction).to.be.within(9998, 9999);
    expect(INQTime.year).to.equal(999);
    expect(INQTime.mill).to.equal(40);
  });
});
