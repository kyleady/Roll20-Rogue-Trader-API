//takes the character object and turns it into the INQCharacter Prototype
function INQCharacterParser(){
  //the text that will be parsed
  this.Text = "";

  //take apart this.Text to find all of the lists
  //currently it assumes that weapons will be in the form of a link
  this.parseLists = function(){
    var link = new INQLinkParser();
    var regex = "(?:\\s*(?:<br>|<em>|<strong>|<u>)\\s*){3,}";
    regex += "(Psychic Powers|Gear|Weapons|Skills|Talents|Traits)";
    regex += "(?:\\s*(?:<br>|<\\/em>|<\\/strong>|<\\/u>)\\s*){3,}";
    regex += "((?:"
    regex += link.regex();
    regex += "(?:<br>|\n|$)"
    regex += ")*)";
    var re = RegExp(regex, "gi");
    var matches = this.Text.match(re);
    var Lists = {};
    _.each(matches, function(list){
      re = RegExp(regex, "i");
      listMatches = list.match(re);
      if(listMatches){
        Lists[listMatches[1].toTitleCase()] = [];
        itemMatches = listMatches[2].split("<br>");
        _.each(itemMatches, function(item){
          var inqitem = new INQLinkParser();
          inqitem.parse(item);
          if(inqitem.Name && inqitem.Name != ""){
            Lists[listMatches[1].toTitleCase()].push(inqitem);
          }
        });
      }
    });
    this.List = Lists;
  }
  //parse out the movement of the character
  //assumes movement will be in the form of a table and in a specific order
  this.parseMovement = function(){
    var regex = "\\s*<table>";
    regex += "\\s*<tr>";
    regex += "\\s*<th>\\s*<em>\\s*half\\s*<\\/em>\\s*<\\/th>";
    regex += "\\s*<th>\\s*<em>\\s*full\\s*<\\/em>\\s*<\\/th>";
    regex += "\\s*<th>\\s*<em>\\s*charge\\s*<\\/em>\\s*<\\/th>";
    regex += "\\s*<th>\\s*<em>\\s*run\\s*<\\/em>\\s*<\\/th>";
    regex += "\\s*<\\/tr>";
    regex += "\\s*<tr>";
    regex += "\\s*<th>\\s*(\\d+)\\s*<\\/th>";
    regex += "\\s*<th>\\s*(\\d+)\\s*<\\/th>";
    regex += "\\s*<th>\\s*(\\d+)\\s*<\\/th>";
    regex += "\\s*<th>\\s*(\\d+)\\s*<\\/th>";
    regex += "\\s*<\\/tr>";
    regex += "\\s*<\\/table>";

    var re = RegExp(regex, "i");
    var matches = this.Text.match(re);

    if(matches){
      this.Movement.Half = Number(matches[1]);
      this.Movement.Full = Number(matches[2]);
      this.Movement.Charge = Number(matches[3]);
      this.Movement.Run = Number(matches[4]);
    }
  }
  //saves any notes on the character
  this.parseSpecialRules = function(){
    var link = new INQLinkParser();
    var regex = "\\s*(?:<strong>|<em>)";
    regex += "([^<>]+)";
    regex += "(?:<\\/strong>|<\\/em>)\\s*:\\s*";
    regex += "(\\S(?:[^<>$]|"
    regex += link.regex();
    regex += ")+)";
    regex += "(?:<br>|\n|$)";
    var re = RegExp(regex, "gi");
    var matches = this.Text.match(re);
    var Rules = [];
    _.each(matches, function(rule){
      re = RegExp(regex, "i");
      ruleMatches = rule.match(re);
      var inqrule = {
        Name: ruleMatches[1],
        Rule: ruleMatches[2]
      }
      Rules.push(inqrule);
    });
    this.SpecialRules = Rules;
  }
  //the full parsing of the character
  this.parse = function(character){
    var notes = "";
    character.get("bio", function(bio){
      notes += bio;
    });
    notes += "<br>";
    character.get("gmnotes", function(gmnotes){
      notes += gmnotes;
    });
    this.Text = notes;

    this.Name = character.get("name");
    this.ObjID = character.id;
    this.ObjType = character.get("_type");

    this.parseLists();
    this.parseMovement();
    this.parseSpecialRules();

    var attributes = findObjs({
      _type: "attribute",
      characterid: this.ObjID
    });

    for(var i = 0; i < attributes.length; i++){
      this.Attributes[attributes[i].get("name")] = attributes[i].get("max");
    }

    this.Text = "";
  }
}
