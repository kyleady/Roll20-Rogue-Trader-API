INQWeaponParser.prototype.parseFocusPower = function(content){
  var regex = '^\\s*'
  regex += '(Opposed|)\\s*'
  regex += '\\((\\+|-|–|—)\\s*(\\d+)\\)\\s*';
  regex += '(\\D+)';
  regex += '\\s+Test\\s*$'
  var re = RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    this.Class = 'Psychic';
    if(matches[1]){
      this.Opposed = true;
    }
    this.FocusModifier = Number(matches[2].replace(/–|—/,'-') + matches[3]);
    this.FocusTest = matches[4].trim().replace(/\s+/g, ' ').toTitleCase();
  } else {
    whisper('Invalid Focus Power');
    log('Invalid Focus Power');
    log(content);
  }
}
