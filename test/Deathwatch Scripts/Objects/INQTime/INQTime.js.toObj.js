var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.toObj()', function() {
	it('should convert a number to a date object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj(11000010)).to.deep.equal({
      mill: 2,
      year: 100,
      fraction: 10
    });
  });
  it('should convert a string to a date object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj('8123456.M79')).to.deep.equal({
      mill: 79,
      year: 456,
      fraction: 1230
    });
  });
  it('should default to the current date when pieces of a string date are missing', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.fraction = 3;
    INQTime.year = 2;
    INQTime.mill = 4;

    expect(INQTime.toObj('456')).to.deep.equal({
      fraction: 3,
      year: 456,
      mill: 4
    });
  });
  it('should convert an array to a date object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj([{
      mill: 1,
      year: 2,
      fraction: 3
    }])).to.deep.equal({
      mill: 1,
      year: 2,
      fraction: 3
    });
  });
  it('should return a data obj without modification', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj({
      mill: 16,
      year: 26,
      fraction: 36
    })).to.deep.equal({
      mill: 16,
      year: 26,
      fraction: 36
    });
  });
  it('should use the current date if no date obj is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.mill = 17;
    INQTime.year = 27;
    INQTime.fraction = 37;
    expect(INQTime.toObj()).to.deep.equal({
      mill: 17,
      year: 27,
      fraction: 37
    });
  });
  it('should convert a number to a diff object, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj(11001010, 'diff')).to.deep.equal({
      years: 1100,
      days: 2,
      weeks: 5,
      future: false
    });
  });
  it('should convert a string to a diff object, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj('2 decades and 1 month since ', 'diff')).to.deep.equal({
      weeks: 4,
      days: 2,
      years: 20,
      future: true
    });
  });
  it('should convert an array to a diff object, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj([{quantity: -400, type: 'Centuries'}], 'diff')).to.deep.equal({
      days: 0,
      weeks: 0,
      years: 40000,
      future: true
    });
  });
  it('should return a diff obj without modification, if the type is diff', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toObj({
      years: 834,
      weeks: 9,
      days: 3,
      future: false
    }, 'diff')).to.deep.equal({
      years: 834,
      weeks: 9,
      days: 3,
      future: false
    });
  });
});
