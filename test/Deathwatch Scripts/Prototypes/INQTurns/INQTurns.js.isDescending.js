var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.isDescending()', function() {
	it('should return true if the turns are in descending order', function(){
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
      {custom: '', id: graphic3.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '4', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '3', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(true);
  });
  it('should return true if the turns are in descending order, starting from the largest', function(){
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
      {custom: '', id: graphic2.id, pr: '3', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '4', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(true);

    inqturns.turnorder = [
      {custom: '', id: graphic2.id, pr: '4', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '3', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '5', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(true);
  });
  it('should return true if the turnorder is empty', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqturns = new INQTurns();
    expect(inqturns.isDescending()).to.equal(true);
  });
  it('should return false if the turns are not in descending order', function(){
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
      {custom: '', id: graphic2.id, pr: '3', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '4', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '5', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(false);

    inqturns.turnorder = [
      {custom: '', id: graphic.id, pr: '4', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '3', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(false);

    inqturns.turnorder = [
      {custom: '', id: graphic.id, pr: '5', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '3', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '4', _pageid: page.id}
    ];

    expect(inqturns.isDescending()).to.equal(false);
  });
});
