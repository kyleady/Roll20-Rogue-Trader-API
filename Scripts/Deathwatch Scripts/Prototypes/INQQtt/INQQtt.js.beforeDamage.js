INQQtt.prototype.beforeDamage = function(){
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
  this.scatter();
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
    this.force();
    this.hammerBlow();
    this.legacy();
    this.mightyShot();
    this.tainted();
  }
}
