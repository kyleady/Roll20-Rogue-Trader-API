INQQtt.prototype.beforeDamage = function(){
  this.blast();
  this.claws();
  this.damage();
  this.damageType();
  this.devastating();
  this.hordeDmg();
  this.lance();
  this.melta();
  this.penetration();
  this.powerField();
  this.proven();
  this.razorSharp();
  this.scatter();
  this.tearingFleshRender();

  if(this.inquse.inqcharacter){
    this.crushingBlow();
    this.fist();
    this.force();
    this.hammerBlow();
    this.legacy();
    this.mightyShot();
    this.tainted();
  }
}
