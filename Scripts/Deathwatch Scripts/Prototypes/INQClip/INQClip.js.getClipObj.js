INQClip.prototype.getClipObj = function(makeObj){
  if(makeObj == undefined) makeObj = true;
  var attributes = findObjs({
    _characterid: this.characterid,
    name: this.name
  });

  if (attributes && attributes.length) {
    this.clipObj = attributes[0];
  } else if(makeObj) {
    this.clipObj = createObj('attribute', {
      name: this.name,
      _characterid: this.characterid,
      current: Number(this.inqweapon.Clip),
      max: Number(this.inqweapon.Clip)
    });
  }
}
