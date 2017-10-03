var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('shipCrit()', function() {
  it('should be able to note critical effects on a graphic', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var page = createObj('page', {name: 'shipCrit page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'shipCrit player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character = createObj('character', {name: 'shipCrit character'});
    var graphic = createObj('graphic', {name: 'shipCrit graphic', _pageid: page.id, represents: character.id, layer: 'objects'});
    var changes = 0;
    on('change:graphic:statusmarkers', function(){
      var markers = graphic.get('statusmarkers');
      switch(changes) {
        case 0:
          expect(markers).to.equal('edge-crack@1');
          break;
        case 1:
          expect(markers).to.equal('edge-crack@1,spanner@2');
          break;
        case 2:
          expect(markers).to.equal('edge-crack@1,spanner@2,bleeding-eye@3');
          break;
        case 3:
          expect(markers).to.equal('edge-crack@1,spanner@2,bleeding-eye@3,cobweb@4');
          break;
        case 4:
          expect(markers).to.equal('edge-crack@1,spanner@2,bleeding-eye@3,cobweb@4,half-haze@5');
          break;
        case 5:
          expect(markers).to.equal('edge-crack@1,spanner@2,bleeding-eye@3,cobweb@4,half-haze@5,snail@6');
          break;
        case 6:
          expect(markers).to.equal('edge-crack@1,spanner@2,bleeding-eye@3,cobweb@4,half-haze@5,snail@6,lightning-helix@1');
          done();
          break;
      }
      changes++;
    });
    player.MOCK20chat('!crit += depressurized', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += damaged 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += sensors 3', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += thrusters 4', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += fire 5', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += engines 6', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += unpowered 1', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should be able to remove critical effects on a graphic', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var page = createObj('page', {name: 'shipCrit page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'shipCrit player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character = createObj('character', {name: 'shipCrit character'});
    var graphic = createObj('graphic', {name: 'shipCrit graphic', _pageid: page.id, represents: character.id, layer: 'objects'});
    var changes = 0;
    on('change:graphic:statusmarkers', function(){
      var markers = graphic.get('statusmarkers');
      switch(changes) {
        case 0:
          expect(markers).to.equal('bleeding-eye@3');
          break;
        case 1:
          expect(markers).to.equal('bleeding-eye@3,cobweb@4');
          break;
        case 2:
          expect(markers).to.equal('bleeding-eye@3,cobweb@2');
          done()
          break;
      }
      changes++;
    });
    player.MOCK20chat('!crit += sensors 3', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += thrusters 4', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit -= thrusters 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should not be able to send critical effects into the negative', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var page = createObj('page', {name: 'shipCrit page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'shipCrit player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var character = createObj('character', {name: 'shipCrit character'});
    var graphic = createObj('graphic', {name: 'shipCrit graphic', _pageid: page.id, represents: character.id, layer: 'objects'});
    var changes = 0;
    on('change:graphic:statusmarkers', function(){
      var markers = graphic.get('statusmarkers');
      switch(changes) {
        case 0:
          expect(markers).to.equal('bleeding-eye@3');
          break;
        case 1:
          expect(markers).to.equal('bleeding-eye@3,cobweb@4');
          break;
        case 2:
          expect(markers).to.equal('bleeding-eye@3');
          done()
          break;
      }
      changes++;
    });
    player.MOCK20chat('!crit += sensors 3', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit += thrusters 4', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    player.MOCK20chat('!crit -= thrusters 6', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
  });
});
