var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('getRange()', function() {
	it('should return the distance between two graphics', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'getRange Page', scale_number: 2, scale_units: 'm'}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'graphic1', top: 1, left: 2, _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'graphic2', top: 4, left: 6, _pageid: page.id});

		expect(getRange(graphic1.id, graphic2.id)).to.equal(10);
    expect(getRange(graphic2.id, graphic1.id)).to.equal(10);
  });
  it('should return undefined if the graphics are not on the same page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'getRange Page', scale_number: 1, scale_units: 'm'}, {MOCK20override: true});
    var page2 = createObj('page', {name: 'getRange Page2', scale_number: 1, scale_units: 'm'}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'graphic1', top: 1, left: 2, _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'graphic2', top: 4, left: 6, _pageid: page2.id});

		expect(getRange(graphic1.id, graphic2.id)).to.be.undefined;
    expect(getRange(graphic2.id, graphic1.id)).to.be.undefined;
  });
  it('should return undefined if at least one of the graphics does not exist', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'getRange Page', scale_number: 1, scale_units: 'm'}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'graphic1', top: 1, left: 2, _pageid: page.id});

		expect(getRange(graphic1.id)).to.be.undefined;
    expect(getRange(undefined, graphic1.id)).to.be.undefined;
  });
  it('should multiply the distance by 1000 if using kilometers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'getRange Page', scale_number: 2, scale_units: 'km'}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'graphic1', top: 1, left: 2, _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'graphic2', top: 4, left: 6, _pageid: page.id});

		expect(getRange(graphic1.id, graphic2.id)).to.equal(10000);
    expect(getRange(graphic2.id, graphic1.id)).to.equal(10000);
  });
});
