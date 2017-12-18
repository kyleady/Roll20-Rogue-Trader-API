var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('addPilot()', function() {
  it('should add the attributes of the selected graphic to the named character', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'addPilot page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'addPilot player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqvehicle = new INQVehicle();
    inqvehicle.Name = 'addPilot vehicle';
    var character = createObj('character', {name: 'addPilot character'});
    var vehicle = inqvehicle.toCharacterObj();
    var graphic = createObj('graphic', {name: 'addPilot graphic', _pageid: page.id, represents: vehicle.id, layer: 'objects'});
    var attribute = createObj('attribute', {name: 'addPilot attribute', current: 0, max: 0, _characterid: character.id});

    on('add:attribute', function(attr){
      expect(attr.get('name')).to.equal('addPilot attribute');
      expect(attr.id).to.not.equal(attribute.id);
      expect(attr.get('_characterid')).to.equal(vehicle.id);
      done();
    });
    player.MOCK20chat('!add pilot addPilot character', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
  });
  it('should add the attributes of the selected graphic to the named character', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {name: 'addPilot page'}, {MOCK20override: true});
    var player = createObj('player', {_displayname: 'addPilot player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqvehicle = new INQVehicle();
    inqvehicle.Name = 'addPilot vehicle';
    var character = createObj('character', {name: 'addPilot character'});
    var vehicle = inqvehicle.toCharacterObj();
    var graphic = createObj('graphic', {name: 'addPilot graphic', _pageid: page.id, represents: vehicle.id, layer: 'objects'});
    var attribute = createObj('attribute', {name: 'addPilot attribute', current: 0, max: 0, _characterid: character.id});

    on('add:attribute', function(attr){
      expect(attr.get('name')).to.equal('addPilot attribute');
      expect(attr.id).to.not.equal(attribute.id);
      expect(attr.get('_characterid')).to.equal(vehicle.id);
      player.MOCK20chat('!add pilot addPilot character', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    });
    on('chat:message', function(msg){
      if(msg.content == 'This vehicle already has a pilot.') done();
    });
    player.MOCK20chat('!add pilot addPilot character', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
  });
});
