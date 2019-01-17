INQImportParser.prototype.parse = function(text){
  //split the input by line
  text = this.clean(text);
  var lines = text.split(/\s*<(?:\/?p|br)[^>]*>\s*/);
  //disect each line into label and content (by the colon)
  var labeled = [];
  var unlabeled = [];
  this.SpecialRules = [];
  log('==Lines==');
  _.each(lines,function(line){
    log(line);
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

  log('==Labeled==')
  log(labeled)
  log('==Unlabeled==')
  log(unlabeled)
  //interpret the lines
  this.interpretLabeled(labeled);
  this.saveProperty(this.SpecialRules, "SpecialRules");
  return unlabeled;
}
