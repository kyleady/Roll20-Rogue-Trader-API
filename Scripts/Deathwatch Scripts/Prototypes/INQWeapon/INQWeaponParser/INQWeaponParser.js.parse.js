//use all of the above parsing functions to transform text into the INQWeapon prototype
INQWeaponParser.prototype.parse = function(obj, callback){
  var parser = this;
  var myPromise = new Promise(function(resolve){
    parser.Content = new INQParser(obj, function(){
      resolve(parser);
    });
  });

  myPromise.then(function(inqweapon){
    //save the non-text details of the handout
    parser.Name = obj.get("name");
    parser.ObjID = obj.id;
    parser.ObjType = obj.get("_type");

    //parse all the rules of the weapon based on the rule name
    for(var i = 0; i < parser.Content.Rules.length; i++){
      var name = parser.Content.Rules[i].Name;
      var content = parser.Content.Rules[i].Content;
      if(/class/i.test(name)){
        parser.parseClass(content);
      } else if(/^\s*range\s*$/i.test(name)){
        parser.parseRange(content);
      } else if(/^\s*(rof|rate\s+of\s+fire)\s*$/i.test(name)){
        parser.parseRoF(content);
      } else if(/^\s*dam(age)?\s*$/i.test(name)){
        parser.parseDamage(content);
      } else if(/^\s*pen(etration)?\s*$/i.test(name)){
        parser.parsePenetration(content);
      } else if(/^\s*clip\s*$/i.test(name)){
        parser.parseClip(content);
      } else if(/^\s*reload\s*$/i.test(name)){
        parser.parseReload(content);
      } else if(/^\s*special\s*(rules)?\s*$/i.test(name)){
        parser.parseSpecialRules(content);
      } else if(/^\s*weight\s*$/i.test(name)){
        parser.parseWeight(content);
      } else if(/^\s*req(uisition)?\s*$/i.test(name)){
        parser.parseRequisition(content);
      } else if(/^\s*renown/i.test(name)){
        parser.parseRenown(content);
      } else if(/^\s*availability/i.test(name)){
        parser.parseAvailability(content);
      } else if(/^\s*focus\s*power\s*$/i.test(name)){
        parser.parseFocusPower(content);
      } else if(/^\s*Opposed\s*$/i.test(name)){
        parser.parseOpposed(content);
      }
    }
    //if the weapon still has no damage and it isn't a psychic power, it is gear
    if(parser.DamageBase == 0 && parser.DiceNumber == 0 && parser.Class != "Psychic"){
      parser.Class = "Gear";
    }
    delete parser.Content;
    if(typeof callback == 'function'){
      callback(parser);
    }
  });
}
