INQQtt.prototype.beforeDamage = function(){
  log('===QTT Before Damage===');
  this.blast();
  this.damage();
  this.damageType();
  this.devastating();
  this.horde();
  this.hordeDmg();
  this.melta();
  this.penetration();
  this.powerField();
  this.proven();
  this.tearingFleshRender();

  if(this.inquse.inqtest) {
    this.accurate();
    this.claws();
    this.lance();
    this.razorSharp();
  }

  if(this.inquse.inqcharacter) {
    this.crushingBlow();
    this.fist();
    this.independent();
    this.force();
    this.hammerBlow();
    this.legacy();
    this.mightyShot();
    this.tainted();
  }
  log('=');
}
