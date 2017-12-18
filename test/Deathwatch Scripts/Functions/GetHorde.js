var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.calcHorde()', function() {
	it('should return the graphics that have the same horde label, including the original member', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    expect(getHorde(graphic1)).to.deep.include.members([
      graphic1,
      graphic2,
      graphic3,
      graphic4,
      graphic5
    ]);
  });
  it('should ignore graphics that are dead', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    graphic1.set('status_dead', true);
    graphic4.set('status_dead', true);
    expect(getHorde(graphic1)).to.deep.include.members([
      graphic2,
      graphic3,
      graphic5
    ]);
  });
  it('should ignore graphics that do not share the same bar2_value', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'h1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H2'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    expect(getHorde(graphic1)).to.deep.include.members([
      graphic1,
      graphic4,
      graphic5
    ]);
  });
  it('should ignore graphics that are not on the same page', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var page2 = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page2.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page2.id, bar2_value: 'H1'});
    expect(getHorde(graphic1)).to.deep.include.members([
      graphic1,
      graphic2,
      graphic3
    ]);
  });
});
