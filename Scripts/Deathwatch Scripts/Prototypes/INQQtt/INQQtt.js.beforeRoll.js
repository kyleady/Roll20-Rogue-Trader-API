INQQtt.prototype.beforeRoll = function(){
  if(this.inquse.inqcharacter){
    this.autoStabilised();
    this.bulgingBiceps();
    this.deadeye();
    this.favouredByTheWarp();
    this.marksman();
    this.preciseBlow();
    this.sharpshooter();
    this.sureStrike();
  }

  if(this.inquse.inqtarget){
    this.size();
  }

  this.accurate();
  this.gyroStabilised();
  this.indirect();
  this.overcharge();
  this.spray();
  this.storm();
  this.toHit();
  this.twinLinked();
}
