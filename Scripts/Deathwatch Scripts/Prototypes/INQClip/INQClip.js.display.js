INQClip.prototype.display = function(){
  if(!this.clipObj) return '';
  var output = '';
  output += '<strong>Clip</strong>: ';
  output += this.clipObj.get('current');
  output += '/';
  output += this.clipObj.get('max');
  return output;
}
