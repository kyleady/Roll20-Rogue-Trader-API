INQImportParser.prototype.interpretArmour = function(content, properties){
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
