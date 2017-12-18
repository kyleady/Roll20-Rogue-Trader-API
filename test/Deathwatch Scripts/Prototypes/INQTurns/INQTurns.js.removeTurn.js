var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.removeTurn()', function() {
	it('should delete every instance of the given graphicid', function(){
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
      {custom: '', id: graphic4.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '12', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '11', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '15', _pageid: page.id}
    ];

    inqturns.removeTurn(graphic.id);
    expect(inqturns.turnorder).to.deep.equal([
      {custom: '', id: graphic3.id, pr: '2', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '1', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '12', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '11', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '15', _pageid: page.id}
    ]);
  });
});
