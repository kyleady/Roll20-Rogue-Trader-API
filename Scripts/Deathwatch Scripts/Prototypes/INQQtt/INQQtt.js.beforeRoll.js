INQQtt.prototype.beforeRoll = function(){
  log('===QTT Before Roll===')
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
  this.horde();
  this.indirect();
  this.overcharge();
  this.scatter();
  this.spray();
  this.storm();
  this.toHit();
  this.twinLinked();
  this.overheats();
  this.reliable();
  this.unreliable();
  log('=');
}
