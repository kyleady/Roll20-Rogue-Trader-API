var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');

describe('trimToPerfectMatches()', function() {
  Campaign().MOCK20reset();
  var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  var MyScript = fs.readFileSync(filePath, 'utf8');
  eval(MyScript);
  it('should trim an array down to the first perfect match', function(){
    var handout1 = createObj('handout', {name: 'match'});
    var handout2 = createObj('handout', {name: 'Match'});
    var handout3 = createObj('handout', {name: 'Perfect Match'});
    var handouts = [handout1, handout2, handout3];
    var perfectMatches = trimToPerfectMatches(handouts, 'Perfect Match');
    expect(perfectMatches).to.have.ordered.members([handout3]);
    expect(perfectMatches).to.not.have.members([handout1, handout2]);
  });
  it('should return the array unmodified if there is no perfect match', function(){
    var handout1 = createObj('handout', {name: 'match'});
    var handout2 = createObj('handout', {name: 'Match'});
    var handout3 = createObj('handout', {name: 'Nope'});
    var handouts = [handout1, handout2, handout3];
    var perfectMatches = trimToPerfectMatches(handouts, 'MATCH');
    expect(perfectMatches).to.have.members(handouts);
  });
});
