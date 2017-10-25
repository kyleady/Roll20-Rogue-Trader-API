INQCharacterImportParser.prototype.interpretCharacteristics = function(line){
  //save every number found
  var stat = line.match(/(\d+|–\s*–|—)/g);
  //correlate the numbers with the named stats
  for(var i = 0; i < this.StatNames.length; i++){
    //default to "0" when no number is given for a stat
    if(Number(stat[i])){
      this.Attributes[this.StatNames[i]] = Number(stat[i]);
    } else {
      this.Attributes[this.StatNames[i]] = 0;
    }
  }
}
