//the prototype for weapons
function INQWeapon(weapon, callback){
  //default weapon stats
  this.Class          = "Melee";
  this.Range          = 0;
  this.Single         = true;
  this.Semi           = 0;
  this.Full           = 0;
  this.DiceType       = 10;
  this.DiceNumber     = 0;
  this.DiceMultiplier = 1;
  this.DamageBase     = 0;
  this.DamageType     = new INQLink("I");
  this.Penetration    = 0;
  this.PenDiceNumber  = 0;
  this.PenDiceType    = 0;
  this.Clip           = 0;
  this.Reload         = -1;
  this.Special        = [];
  this.Weight         = 0;
  this.Requisition    = 0;
  this.Renown         = "";
  this.Availability   = "";
  this.FocusModifier  = 0;
  this.FocusStat      = "Wp";

  //allow the user to immediately parse a weapon in the constructor
  var inqweapon = this;
  var myPromise = new Promise(function(resolve){
    if(weapon != undefined){
      if(typeof weapon == "string"){
        Object.setPrototypeOf(inqweapon, new INQWeaponNoteParser());
        inqweapon.parse(weapon);
        resolve(inqweapon);
      } else {
        Object.setPrototypeOf(inqweapon, new INQWeaponParser());
        inqweapon.parse(weapon, graphic, function(){
          resolve(inqweapon);
        });
      }
    } else {
      resolve(inqweapon);
    }
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(inqweapon){
    if(typeof weapon != 'undefined'){
      Object.setPrototypeOf(inqweapon, new INQWeapon());
    }

    if(typeof callback == 'function'){
      callback(inqweapon);
    }
  });

  this.valueOf = this.toNote;
};

INQWeapon.prototype = new INQObject();
INQWeapon.prototype.constructor = INQWeapon;
