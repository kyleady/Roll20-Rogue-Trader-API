INQCharacterImportParser.prototype.interpretBonus = function(line){
  //save every number found
  var bonus = line.match(/(\d+|-)/g);
  //correlate the numbers with the named stats
  for(var i = 0; i < this.StatNames.length; i++){
    //default to "0" when no number is given for a stat
    if(Number(bonus[i])){
      this.Attributes["Unnatural " + this.StatNames[i]] = Number(bonus[i]);
    } else {
      this.Attributes["Unnatural " + this.StatNames[i]] = 0;
    }
  }
}
