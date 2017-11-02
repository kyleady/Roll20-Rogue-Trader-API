var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.getInit()', function() {
	it('should return the pr of a turn with the given graphicid', function(){
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
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ];

    expect(inqturns.getInit(graphic.id)).to.equal(8);
  });
  it('should return a number, not a string', function(){
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
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ];

    expect(inqturns.getInit(graphic.id)).to.be.a('number');
    expect(inqturns.getInit(graphic.id)).to.not.be.a('string');
  });
  it('should return undefined if there is no matching graphicid', function(){
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
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ];

    expect(inqturns.getInit(graphic.id)).to.be.undefined;
  });
});
