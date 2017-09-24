//takes the character object and turns it into the INQCharacter Prototype
function INQCharacterParser(){
  //the text that will be parsed
  this.Text = "";

  //take apart this.Text to find all of the lists
  //currently it assumes that weapons will be in the form of a link
  this.parseLists = function(){
    //empty the previous lists
    var Lists = {};
    //work through the parsed lists
    _.each(this.Content.Lists, function(list){
      var name = list.Name;
      //be sure the list name is recognized and in the standard format
      if(/weapon/i.test(name)){
        name = "Weapons";
      } else if(/skill/i.test(name)){
        name = "Skills";
      } else if(/talent/i.test(name)){
        name = "Talents";
      } else if(/trait/i.test(name)){
        name = "Traits";
      } else if(/gear/i.test(name)){
        name = "Gear";
      } else if(/psychic\s*power/i.test(name)){
        name = "Psychic Powers";
      } else {
        //quit if the name is not approved
        return false;
      }
      //save the name of the list
      Lists[name] = Lists[name] || [];
      _.each(list.Content, function(item){
        //make the assumption that each item is a link (or just a simple phrase)
        var inqitem = new INQLink(item);
        //only add the item if it was succesfully parsed
        if(inqitem.Name && inqitem.Name != ""){
          Lists[name].push(inqitem);
        }
      });
    });
    this.List = Lists;
  }
  //parse out the movement of the character
  //assumes movement will be in the form of a table and in a specific order
  this.parseMovement = function(){
    var Movement = {};
    //search the parsed tables for movement
    _.each(this.Content.Tables, function(table){
      //be sure the name doesn't exist or that it's about movement
      if(/Move/i.test(table.Name) || table.Name == ""){
        _.each(table.Content, function(column){
          //be sure the column is the expected length of 2. Label + value
          if(column.length == 2){
            //trim out any bold tags
            column[0] = column[0].replace(/<\/?(?:strong|em)>/g, "");
            Movement[column[0]] = column[1];
          }
        });
      }
    });
    this.Movement = Movement;
  }
  //saves any notes on the character
  this.parseSpecialRules = function(){
    this.SpecialRules = this.Content.Rules;
  }
  //saves every attribute the character has
  this.parseAttributes = function(graphic){
    //start with the character sheet attributes
    var attributes = findObjs({
      _type: "attribute",
      characterid: this.ObjID
    });
    for(var i = 0; i < attributes.length; i++){
      this.Attributes[attributes[i].get("name")] = Number(attributes[i].get("current"));
    }
    //when working with a generic enemy's current stats, we need to check for temporary values
    //generic enemies are those who represent a character, yet none of their stats are linked
    if(graphic != undefined
    && graphic.get("bar1_link") == ""
    && graphic.get("bar2_link") == ""
    && graphic.get("bar3_link") == ""){
      var localAttributes = new LocalAttributes(graphic);
      for(var attr in localAttributes.Attributes){
        this.Attributes[attr] = Number(localAttributes.Attributes[attr]);
      }
    }
  }
  //the full parsing of the character
  this.parse = function(character, graphic, callback){
    (function(parser){
      return new Promise(function(resolve){
        parser.Content = new INQParser(character, function(){
          resolve(parser);
        });
      });
    })(this).then(function(parser){
      parser.Name = character.get("name");
      parser.ObjID = character.id;
      parser.ObjType = character.get("_type");

      if(graphic){
        parser.GraphicID = graphic.id;
      }

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
}
