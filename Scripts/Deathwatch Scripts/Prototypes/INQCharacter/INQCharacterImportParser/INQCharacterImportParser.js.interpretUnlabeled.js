INQCharacterImportParser.prototype.interpretUnlabeled = function(unlabeled){
  //search unlabled content for unnaturals and characteristics
  var addedLines = 0;
  for(var i = 0; i < unlabeled.length; i++){
    //only accept lines that are purely numbers, spaces, and parenthesies
    if(unlabeled[i].match(/^[—–-\s\d\(\)]+$/)){
      //are we free to fill out the unnaturals?
      if(addedLines == 0){
        this.interpretBonus(unlabeled[i]);
      //are we free to fill out the characteristics?
      } else if(addedLines == 1) {
        this.interpretCharacteristics(unlabeled[i]);
      } else {
        whisper("Too many numical lines. Stats and Unnatural Stats are likely inaccurate.");
      }
      //a numerical line has been interpreted
      addedLines++;
    }
  };

  //if only one numerical line was added, assume the only one added was the statline
  if(addedLines == 1){
    this.switchBonusOut();
  }
}
