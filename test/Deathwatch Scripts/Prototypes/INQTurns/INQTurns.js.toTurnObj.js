var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.toTurnObj()', function() {
	it('should make a turn object out of the given information', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();

    expect(inqturns.toTurnObj(graphic, '13', 'custom')).to.deep.equal({custom: 'custom', id: graphic.id, pr: '13', _pageid: page.id});
  });
  it('should default to an empty string for the custom property', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();

    expect(inqturns.toTurnObj(graphic, '13')).to.deep.equal({custom: '', id: graphic.id, pr: '13', _pageid: page.id});
  });
  it('should convert numbers into strings for initiative', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();

    expect(inqturns.toTurnObj(graphic, 13)).to.deep.equal({custom: '', id: graphic.id, pr: '13', _pageid: page.id});
  });
});
