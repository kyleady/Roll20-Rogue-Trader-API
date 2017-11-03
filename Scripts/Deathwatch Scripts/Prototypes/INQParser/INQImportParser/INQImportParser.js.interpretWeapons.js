INQImportParser.prototype.interpretWeapons = function(content, properties){
  var List = [];
  //replace parenthesies that are inside parenthesies with square brackets
  var parenthesiesDepth = 0;
  content = content.split('');
  for(var i = 0; i < content.length; i++){
    if(content[i] == '('){
      if(parenthesiesDepth > 0) content[i] = '[';
      parenthesiesDepth++;
    } else if(content[i] == ')'){
      parenthesiesDepth--;
      if(parenthesiesDepth > 0) content[i] = ']';
    }
  }
  content = content.join('');
  //separate each weapon out
  var inqlink = new INQLinkParser();
  var re = RegExp(inqlink.regex(), 'gi');
  var weaponMatches = content.match(re);
  //parse the weapons
  re = RegExp(inqlink.regex(), 'i');
  for(var i = 0; i < weaponMatches.length; i++){
    var weapon = new INQWeapon(weaponMatches[i]);
    weapon.Name = weapon.Name.replace(/(?:^| )or /, '').replace(',', '');
    weapon.Name = weapon.Name.toTitleCase();
    List.push(weapon);
  }
  this.saveProperty(List, properties);
}
