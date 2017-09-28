var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('painSuppress()', function() {
	it('should default to 6 uses if no Ammo - Pain Suppressant attribute is available', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'painSuppress player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'painSuppress character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'painSuppress page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'painSuppress graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Ammo - Pain Suppressant', _characterid: character.id}) || []).to.be.empty;
    player.MOCK20chat('!pain suppreSs Custom Msg');
    var painSuppressObjs = findObjs({_type: 'attribute', name: 'Ammo - Pain Suppressant', _characterid: character.id}) || [];
    expect(painSuppressObjs).to.not.be.empty;
    expect(painSuppressObjs[0].get('current')).to.equal(6 -1);
  });
	it('should not do anything if you have 0 Pain Suppressants left', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'painSuppress player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'painSuppress character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'painSuppress page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'painSuppress graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Ammo - Pain Suppressant', _characterid: character.id}) || []).to.be.empty;
    player.MOCK20chat('!pain suppreSs Custom Msg');
    var painSuppressObjs = findObjs({_type: 'attribute', name: 'Ammo - Pain Suppressant', _characterid: character.id}) || [];
    expect(painSuppressObjs).to.not.be.empty;
		painSuppressObjs[0].set('current', 0);
		player.MOCK20chat('!pain suppreSs Custom Msg');
    expect(painSuppressObjs[0].get('current')).to.equal(0);
  });
	it('should store your message in the turn tracker with the graphic\'s name', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'painSuppress player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'painSuppress character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'painSuppress page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'painSuppress graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Ammo - Pain Suppressant', _characterid: character.id}) || []).to.be.empty;
    player.MOCK20chat('!pain suppreSs Custom Msg');
		var turnorder = Campaign().get('turnorder') || '[]';
    turnorder = JSON.parse(turnorder);
    expect(turnorder[0]).to.not.be.undefined;
    expect(turnorder[0]).to.include({
      id: '-1',
      custom: graphic.get('name') + '(Custom Msg)',
      formula: '-1'
    });
  });
});
