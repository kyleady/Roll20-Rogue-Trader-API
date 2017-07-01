//takes the character object and turns it into the INQCharacter Prototype
function INQVehicleParser(){
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
      } else if(/trait/i.test(name)){
        name = "Vehicle Traits";
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
  //saves any notes on the character
  this.parseLabels = function(){
    for(var i = 0; i < this.Content.Rules.length; i++){
      var label = this.Content.Rules[i].Name;
      var content = this.Content.Rules[i].Content;
      if(/^\s*type\s*$/i.test(label)){
        this.parseType(content);
      } else if(/^\s*tactical\s+speed\s*$/i.test(label)){
        this.parseTacticalSpeed(content);
      } else if(/^\s*cruising\s+speed\s*$/i.test(label)){
        this.parseCruisingSpeed(content);
      } else if(/^\s*size\s*$/i.test(label)){
        this.parseSize(content);
      } else if(/^\s*vehicle\s+traits\s*$/i.test(label)){
        this.parseVehicleTraits(content);
      } else if(/^\s*crew\s*$/i.test(label)){
        this.parseCrew(content);
      } else if(/^\s*carrying\s+capacity\s*$/i.test(label)){
        this.parseCarryingCapacity(content);
      } else if(/^\s*renown\s*$/i.test(label)){
        this.parseRenown(content);
      } else {
        this.SpecialRules.push(this.Content.Rules[i]);
      }
    }
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
      //roll20 stores token gmnotes in URI component
      var gmnotes = decodeURIComponent(graphic.get("gmnotes"));
      //create a hash of the temporary attributes
      var tempAttrs = new Hash(gmnotes);
      //overwrite any values detailed here
      for(var k in tempAttrs){
        this.Attributes[k] = Number(tempAttrs[k]);
      }
    }
  }

  this.parseType = function(content){
    this.Type = new INQLink(content);
  }

  this.parseTacticalSpeed = function(content){
    this.TacticalSpeed = content.trim();
  }

  this.parseCruisingSpeed = function(content){
    this.CruisingSpeed = content.trim();
  }

  this.parseSize = function(content){
    this.Size = content.trim();
  }

  this.parseCrew = function(content){
    this.Crew = content.trim();
  }

  this.parseCarryingCapacity = function(content){
    this.CarryingCapacity = content.trim();
  }

  this.parseRenown = function(content){
    this.Renown = content.trim();
  }

  //the full parsing of the character
  this.parse = function(character, graphic){
    this.Content = new INQParser(character);
    this.Name = character.get("name");
    this.ObjID = character.id;
    this.ObjType = character.get("_type");

    if(graphic){
      this.GraphicID = graphic.id;
    }

    this.controlledby = character.get("controlledby");

    this.parseLists();
    this.parseLabels();
    this.parseAttributes(graphic);
  }
}
