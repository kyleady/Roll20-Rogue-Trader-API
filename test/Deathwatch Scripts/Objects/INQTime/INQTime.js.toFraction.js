var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.toFraction()', function() {
	it('should convert an array of times into an integer', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'minutes', quantity: 2},
      {type: 'hour', quantity: 1}
    ])).to.be.within(1, 4);
  });
  it('should accept a single object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction({type: 'days', quantity: 2})).to.be.within(54, 56);
  });
  it('should be able to handle minutes/minute', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'minutes', quantity: 3},
      {type: 'minute', quantity: 1}
    ])).to.be.within(0, 4);
  });
  it('should be able to handle hours/hour', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'hours', quantity: 3},
      {type: 'hour', quantity: 1}
    ])).to.be.within(4, 8);
  });
  it('should be able to handle days/day', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'days', quantity: 3},
      {type: 'day', quantity: 1}
    ])).to.be.within(108, 112);
  });
  it('should be able to handle weeks/week', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'weeks', quantity: 3},
      {type: 'week', quantity: 1}
    ])).to.be.within(764, 768);
  });
  it('should be able to handle months/month', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'months', quantity: 3},
      {type: 'month', quantity: 1}
    ])).to.be.within(3332, 3336);
  });
  it('should be able to handle years/year', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'years', quantity: 3},
      {type: 'year', quantity: 1}
    ])).to.equal(40000);
  });
  it('should be able to handle decades/decade', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'decades', quantity: 3},
      {type: 'decade', quantity: 1}
    ])).to.equal(400000);
  });
  it('should be able to handle century/centuries', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.toFraction([
      {type: 'centuries', quantity: 3},
      {type: 'century', quantity: 1}
    ])).to.equal(4000000);
  });
});
