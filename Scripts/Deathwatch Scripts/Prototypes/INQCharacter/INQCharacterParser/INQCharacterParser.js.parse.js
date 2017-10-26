//the full parsing of the character
INQCharacterParser.prototype.parse = function(character, graphic, callback){
  var parser = this;
  var myPromise = new Promise(function(resolve){
    parser.Content = new INQParser(character, function(){
      resolve(parser);
    });
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(parser){
    parser.Name = character.get("name");
    parser.ObjID = character.id;
    parser.ObjType = character.get("_type");

    if(graphic) parser.GraphicID = graphic.id;

    parser.controlledby = character.get("controlledby");

    parser.parseLists();
    parser.parseMovement();
    parser.parseSpecialRules();
    parser.parseAttributes(graphic);
    if(typeof callback == 'function'){
      callback(parser);
    }
  });
}
