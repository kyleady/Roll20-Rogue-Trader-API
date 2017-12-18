var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQObject', function() {
	it('should have an Object Type', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    expect(inqobject).to.have.property('ObjType');
  });
  it('should have an Object ID', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    expect(inqobject).to.have.property('ObjID');
  });
  it('should have an Object Name', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    expect(inqobject).to.have.property('Name');
  });
  it('should create a Link from the object details', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'INQObject handout'});
    var inqobject = new INQObject();
    inqobject.ObjType = handout.get('_type');
    inqobject.ObjID = handout.get('_id');
    inqobject.Name = handout.get('name');
    expect(inqobject.toLink()).to.equal(getLink(handout));
  });
});
