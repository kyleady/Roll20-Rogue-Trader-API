var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.largestIndex()', function() {
	it('should return the index of the turn with the greatest initiative', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var graphic3 = createObj('graphic', {_pageid: page.id});
    var graphic4 = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    inqturns.turnorder = [
      {custom: '', id: graphic3.id, pr: '2', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '3', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '1', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '5', _pageid: page.id}
    ];

    expect(inqturns.largestIndex()).to.equal(3);
  });
});
