var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('LocalAttributes', function() {
	Campaign().MOCK20reset();
	var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
	var MyScript = fs.readFileSync(filePath, 'utf8');
  eval(MyScript);
  var character = createObj('character', {name: 'test character'});
  var page = createObj('page', {name: 'test page'}, {MOCK20override: true});
  var graphic = createObj('graphic', {name: 'test graphic', represents: character.id, _pageid: page.id});
  it('should store its data in the gmnotes of a graphic encoded with URI Component', function(){
    var localAttributes = new LocalAttributes(graphic);
    localAttributes.set('Armour (Head)', '10');
    expect(graphic.get('gmnotes')).not.to.include('Armour (Head)');
    expect(graphic.get('gmnotes')).to.include(encodeURIComponent('Armour (Head)'));
  });
  it('should be able to retrive local attributes from a graphic', function(){
    var localAttributes = new LocalAttributes(graphic);
    expect(localAttributes.get('Armour (Head)')).to.equal('10');
  });
  it('should be able to delete local attributes', function(){
    var localAttributes = new LocalAttributes(graphic);
    expect(localAttributes.get('Armour (Head)')).to.equal('10');
    localAttributes.remove('Armour (Head)');
    expect(localAttributes.get('Armour (Head)')).to.be.undefined;
    var localAttributes2 = new LocalAttributes(graphic);
    expect(localAttributes2.get('Armour (Head)')).to.be.undefined;
  });
});
