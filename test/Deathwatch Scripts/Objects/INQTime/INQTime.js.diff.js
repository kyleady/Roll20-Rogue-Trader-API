var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.diff()', function() {
	it('should return an object containing the details of the time difference', function(){
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
		var time = {
			fraction: 0,
			year: 0,
			mill: 0
		};

		expect(INQTime.toObj(INQTime.diff(time), 'diff')).to.deep.equal({
      future: false,
      days: 0,
      years: 3002,
      weeks: 0
    });
  });
  it('should note if the date is in the future', function(){
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
		var time = {
			fraction: 0,
			year: 0,
			mill: 4
		};
    expect(INQTime.toObj(INQTime.diff(time), 'diff')).to.deep.equal({
      future: true,
      days: 1,
      years: 997,
      weeks: 52
    });
  });
  it('should note the years, weeks, and days away from the current date', function(){
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
		var time = {
			fraction: 3000,
			year: 4,
			mill: 3
		};
    expect(INQTime.toObj(INQTime.diff(time), 'diff')).to.deep.equal({
      future: true,
      days: 4,
      years: 2,
      weeks: 15
    });
  });
});
