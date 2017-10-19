INQWeaponNoteParser.prototype.parsePenetration = function(detail){
   var PenMatches = detail.match(/^Pen(?:etration)?:?\s*(?:(\d*)\s*(?:d|D)\s*(\d+)\s*\+?)?\s*(\d*)$/);

   if(PenMatches[1] && Number(PenMatches[1])){
     this.PenDiceNumber = Number(PenMatches[1]);
   }
   if(PenMatches[2] && Number(PenMatches[2])){
     this.PenDiceType = Number(PenMatches[2]);
   }
   if(PenMatches[3] && Number(PenMatches[3])){
     this.Penetration = Number(PenMatches[3]);
   }
}
