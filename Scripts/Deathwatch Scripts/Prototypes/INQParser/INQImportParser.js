function INQImportParser(targetObj){

  var target = targetObj;
  var Patterns = [];

  this.parse = function(text){
    //split the input by line
    var lines = text.split(/\s*<br>\s*/);
    //disect each line into label and content (by the colon)
    var labeled = [];
    var unlabeled = [];
    this.SpecialRules = [];
    _.each(lines,function(line){
      if(line.match(/:/g)){
        //disect the content by label
        var label = line.substring(0,line.indexOf(":"));
        var content = line.substring(line.indexOf(":")+1);
        labeled.push({label: label, content: content});
      } else {
        //this line is not labeled
        //check if we can add this to the last labeled line
        if(labeled.length > 0){
          //attach this to the last bit of content
          labeled[labeled.length-1].content += " " + line;
        } else {
          //there is no label to attach this content to
          unlabeled.push(line);
        }
      }
    });

    //interpret the lines
    this.interpretLabeled(labeled);
    this.saveProperty(this.SpecialRules, "SpecialRules");
    return unlabeled;
  }

  this.getNumber = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: this.interpretNumber});
  }

  this.getContent = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: this.interpretContent});
  }

  this.getList = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: this.interpretList});
  }

  this.getWeapons = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: this.interpretWeapons});
  }

  this.getArmour = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: this.interpretArmour});
  }

  this.getNothing = function(regex, property){
    Patterns.push({regex: regex, property: property, interpret: function(){}});
  }

  this.getUnlabled = function(regex, property){
    UnlabledPatterns.push({regex: regex, property: property});
  }

  this.interpretLabeled = function(labeled){
    for(var i = 0; i < labeled.length; i++){
      labeled[i].content = labeled[i].content.replace(/\.\s*$/, "");
      var matched = false;
      for(var j = 0; j < Patterns.length; j++){
        if(Patterns[j].regex.test(labeled[i].label)){
          matched = true;
          Patterns[j].interpret.call(this, labeled[i].content, Patterns[j].property);
        }
      }
      if(!matched){
        this.SpecialRules.push({Name: labeled[i].label, Rule: labeled[i].content});
      }
    }
  }

  this.saveProperty = function(content, properties){
    if(!Array.isArray(properties)){
      properties = [properties];
    }
    var propertyTarget = target;
    for(var i = 0; i < properties.length-1; i++){
      propertyTarget = propertyTarget[properties[i]];
    }
    if(Array.isArray(properties[properties.length-1])){
      for(var i = 0; i < properties[properties.length-1].length && i < content.length; i++){
        propertyTarget[properties[properties.length-1][i]] = content[i];
      }
    } else {
      propertyTarget[properties[properties.length-1]] = content;
    }
  }

  this.interpretNumber = function(content, properties){
    var matches = content.match(/(?:\+\s*|-\s*|)\d+/g);
    if(!matches){return;}
    if(matches.length == 1){
      this.saveProperty(matches[0], properties);
    } else {
      this.saveProperty(matches, properties);
    }

  }

  this.interpretContent = function(content, properties){
    var inqlink = new INQLink(content);
    this.saveProperty(inqlink, properties);
  }

  this.interpretList = function(content, properties){
    var List = [];
    //remove any occurance of a grammatical 'and' in the list
    content = content.replace(/,\s+and\s+/g, ', ');
    //replace commas that are outside parenthesies with semicolon
    var parenthesiesDepth = 0;
    content = content.split('');
    for(var i = 0; i < content.length; i++){
      if(content[i] == "("){
        parenthesiesDepth++;
      } else if(content[i] == ")"){
        parenthesiesDepth--;
      } else if(content[i] == "," && parenthesiesDepth <= 0){
        content[i] = ";";
      }
    }
    content = content.join('');
    //clean out any skill characteristic suggestions
    content = content.replace(/\((?:WS|BS|S|T|Ag|Per|WP|Int|Fel)\)/g, '');
    //create a pattern for items in the list
    var inqlink = new INQLinkParser();
    var itemregex = new RegExp(inqlink.regex(),"g");
    //create a list of all the items
    var itemList = content.match(itemregex);
    //break up each item into its parts and save those parts
    _.each(itemList, function(item){
      var inqlink = new INQLink(item);
      List.push(inqlink);
    });
    this.saveProperty(List, properties);
  }


  this.interpretArmour = function(content, properties){
    //all the details about the locations are contained in the last property
    var locations = properties.pop();
    //parse out each location with its armour value
    var matches = content.match(/\d*[\sa-z]{2,}\d*/gi);
    //step through each parsed location
    for(var i = 0; i < matches.length; i++){
      //step through each location
      for(var k in locations){
        if(locations[k].test(matches[i])){
          var number = matches[i].match(/\d+/);
          this.saveProperty(number[0], properties.concat(k));
        }
        if(/all/i.test(matches[i])){
          var number = matches[i].match(/\d+/);
          this.saveProperty(number[0], properties.concat(k));
        }
      }
    }
  }

  this.interpretWeapons = function(content, properties){
    var List = [];
    //replace parenthesies that are inside parenthesies with square brackets
    var parenthesiesDepth = 0;
    content = content.split('');
    for(var i = 0; i < content.length; i++){
      if(content[i] == "("){
        if(parenthesiesDepth > 0){
          content[i] = "[";
        }
        parenthesiesDepth++;
      } else if(content[i] == ")"){
        parenthesiesDepth--;
        if(parenthesiesDepth > 0){
          content[i] = "]";
        }
      }
    }
    content = content.join('');
    //separate each weapon out
    var inqlink = new INQLinkParser();
    var re = RegExp(inqlink.regex(), "gi");
    var weaponMatches = content.match(re);
    //parse the weapons
    re = RegExp(inqlink.regex(), "i");
    for(var i = 0; i < weaponMatches.length; i++){
      var weapon = new INQWeapon(weaponMatches[i]);
      weapon.Name = weapon.Name.replace(/(?:^| )or /, "").replace(",", "");
      weapon.Name = weapon.Name.toTitleCase();
      List.push(weapon);
    }
    this.saveProperty(List, properties);
  }
}
