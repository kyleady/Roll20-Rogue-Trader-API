INQWeaponNoteParser.prototype.parseDetails = function(details){
  var rangeRe = new RegExp('^' + INQFormula.regex() + 'k?m$', 'i');
  var rofRe = new RegExp('^(S|-|–|—)/(' + INQFormula.regex() + '|-|–|—)/(' + INQFormula.regex() + '|-|–|—)$', 'i');
  var damageRe = new RegExp('^' + INQFormula.regex({requireDice: true}) + INQLinkParser.regex() + '$', 'i');
  var penRe = new RegExp('^Pen(etration)?:?' + INQFormula.regex() + '$', 'i');
  for(var i = 0; i < details.length; i++){
    var detail = details[i].trim();
    if(detail == '') continue;
    if(/^(melee|pistol|basic|heavy|psychic)$/i.test(detail)){
      this.parseClass(detail);
    } else if(rangeRe.test(detail)){
      this.parseRange(detail);
    } else if(rofRe.test(detail)){
      this.parseRoF(detail);
    } else if(damageRe.test(detail)) {
      this.parseDamage(detail);
    } else if(penRe.test(detail)){
      this.parsePenetration(detail);
    } else if(/^Clip\s*\d+$/i.test(detail)) {
      this.parseClip(detail);
    } else if(/^(?:Reload|Rld):?\s*(Free|Half|(\d*)\s*Full)$/i.test(detail)) {
      this.parseReload(detail);
    } else {
      this.Special.push(new INQLink(detail.trim().replace('[', '(').replace(']', ')')));
    }
  }
}
