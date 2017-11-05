//the prototype for weapons
function INQWeapon(weapon, callback){
  //default weapon stats
  this.Class              = 'Melee';
  this.Range              = new INQFormula('0');

  this.Single             = true;
  this.Semi               = new INQFormula('0');
  this.Full               = new INQFormula('0');

  this.Damage             = new INQFormula('0');
  this.DamageType         = new INQLink('I');

  this.Penetration        = new INQFormula('0');

  this.Clip               = 0;
  this.Reload             = -1;
  this.Special            = [];
  this.Weight             = 0;

  this.Requisition        = 0;
  this.Renown             = '';
  this.Availability       = '';

  this.FocusModifier      = 0;
  this.FocusStat          = 'Wp';
  this.Opposed            = false;

  //allow the user to immediately parse a weapon in the constructor
  var inqweapon = this;
  var myPromise = new Promise(function(resolve){
    if(weapon != undefined){
      if(typeof weapon == 'string'){
        Object.setPrototypeOf(inqweapon, new INQWeaponNoteParser());
        inqweapon.parse(weapon);
        resolve(inqweapon);
      } else {
        Object.setPrototypeOf(inqweapon, new INQWeaponParser());
        inqweapon.parse(weapon, function(){
          resolve(inqweapon);
        });
      }
    } else {
      resolve(inqweapon);
    }
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(){
    if(weapon != undefined) Object.setPrototypeOf(inqweapon, new INQWeapon());
    if(typeof callback == 'function') callback(inqweapon);
  });

  this.valueOf = this.toNote;
};

INQWeapon.prototype = new INQObject();
INQWeapon.prototype.constructor = INQWeapon;
