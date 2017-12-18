var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
Campaign().MOCK20reset();
var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
var MyScript = fs.readFileSync(filePath, 'utf8');
eval(MyScript);
describe('getAttribute()', function() {
	it('should retrieve an attribute object by name', function(){
    var character = createObj('character', {name: 'test character'});
    var attribute = createObj('attribute', {name: 'getAttribute target', _characterid: character.id});
    expect(getAttribute('getAttribute target')).to.equal(attribute);
  });
  it('should retrieve an attribute by characterid', function(){
    var character1 = createObj('character', {name: 'test character1'});
    var character2 = createObj('character', {name: 'test character2'});
    var attribute1 = createObj('attribute', {name: 'getAttribute same name', _characterid: character1.id});
    var attribute2 = createObj('attribute', {name: 'getAttribute same name', _characterid: character2.id});
    expect(getAttribute('getAttribute same name', {characterid: character1.id})).to.equal(attribute1);
    expect(getAttribute('getAttribute same name', {characterid: character2.id})).to.equal(attribute2);
  });
  it('should retrieve an attribute by graphicid', function(){
    var character1 = createObj('character', {name: 'test character1'});
    var character2 = createObj('character', {name: 'test character2'});
    var attribute1 = createObj('attribute', {name: 'getAttribute same name', _characterid: character1.id});
    var attribute2 = createObj('attribute', {name: 'getAttribute same name', _characterid: character2.id});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {represents: character1.id, _pageid: page.id});
    var graphic2 = createObj('graphic', {represents: character2.id, _pageid: page.id});
    expect(getAttribute('getAttribute same name', {graphicid: graphic1.id})).to.equal(attribute1);
    expect(getAttribute('getAttribute same name', {graphicid: graphic2.id})).to.equal(attribute2);
  });
});
