//the full parsing of the character
INQCharacterParser.prototype.parse = function(character, graphic, callback){
  var inqcharacterparser = this;
  var myPromise = new Promise(function(resolve){
    new INQParser(character, function(parser){
      inqcharacterparser.Content = parser;
      resolve(parser);
    });
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(parser){
    var name = character.get('name');
    if(graphic) name = graphic.get('name');
    inqcharacterparser.Name = name;
    inqcharacterparser.ObjID = character.id;
    inqcharacterparser.ObjType = character.get("_type");
    if(graphic) inqcharacterparser.GraphicID = graphic.id;
    inqcharacterparser.controlledby = character.get("controlledby");
    inqcharacterparser.parseLists();
    inqcharacterparser.parseMovement();
    inqcharacterparser.parseSpecialRules();
    inqcharacterparser.parseAttributes(graphic);
    if(typeof callback == 'function'){
      callback(inqcharacterparser);
    }
  });
}
