INQUse.prototype.applyOptions = function() {
  if(this.options.freeShot != undefined) this.freeShot = this.options.freeShot;
  if(this.options.autoHit != undefined) this.autoHit = this.options.autoHit;
  if(this.options.braced != undefined) this.braced = this.options.braced;
  if(this.options.jamsAt != undefined) this.jamsAt = this.options.jamsAt;
  if(this.options.gm != undefined) this.gm = this.options.gm;
}
