INQImportParser.prototype.interpretList = function(content, properties){
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
