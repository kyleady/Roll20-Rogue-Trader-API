//the prototype for characters
function INQCharacter(character, graphic, callback, options){
  options = options || {};
  options.CHARACTER_SHEET = options.CHARACTER_SHEET || INQ_VARIABLES.CHARACTER_SHEET;
  //object details
  this.controlledby = "";
  this.ObjType = "character";

  //default character movement
  this.Movement = {};
  this.Movement.Half = 1;
  this.Movement.Full = 2;
  this.Movement.Charge = 3;
  this.Movement.Run = 6;

  //default character skills and items
  this.List = {};
  this.List["Psychic Powers"] = [];
  this.List.Weapons           = [];
  this.List.Gear              = [];
  this.List.Talents           = [];
  this.List.Traits            = [];
  this.List.Skills            = [];

  //any rules that aren't listed elsewhere
  this.SpecialRules  = [];

  //default character sheet attributes
  this.Attributes = {};

  this.Attributes.WS = 0;
  this.Attributes.BS = 0;
  this.Attributes.S =  0;
  this.Attributes.T = 0;
  this.Attributes.Ag = 0;
  this.Attributes.Wp = 0;
  this.Attributes.It = 0;
  this.Attributes.Per = 0;
  this.Attributes.Fe = 0;

  this.Attributes["Unnatural WS"] = 0;
  this.Attributes["Unnatural BS"] = 0;
  this.Attributes["Unnatural S"] =  0;
  this.Attributes["Unnatural T"] = 0;
  this.Attributes["Unnatural Ag"] = 0;
  this.Attributes["Unnatural Wp"] = 0;
  this.Attributes["Unnatural It"] = 0;
  this.Attributes["Unnatural Per"] = 0;
  this.Attributes["Unnatural Fe"] = 0;

  this.Attributes.Wounds = 1;
  this.Attributes["Unnatural Wounds"] = 0;
  this.Attributes.Fatigue = 0;

  this.Attributes.Armour_H = 0;
  this.Attributes.Armour_RA = 0;
  this.Attributes.Armour_LA = 0;
  this.Attributes.Armour_B  = 0;
  this.Attributes.Armour_RL = 0;
  this.Attributes.Armour_LL = 0;

  this.Attributes.PR = 0;

  this.Attributes.Fate = 0;
  this.Attributes.Corruption = 0;
  this.Attributes["Unnatural Corruption"] = 0;
  this.Attributes.Insanity = 0;
  this.Attributes.Renown = 0;

  var inqcharacter = this;
  if(typeof character == "object"
  && options.CHARACTER_SHEET == 'DH2e') {
    Object.setPrototypeOf(inqcharacter, new INQCharacterSheet());
    inqcharacter.parse(character, graphic);
    callback(inqcharacter);
    return;
  }

  //allow the user to immediately parse a character in the constructor

  var myPromise = new Promise(function(resolve){
    if(character != undefined){
      if(typeof character == "string"){
        Object.setPrototypeOf(inqcharacter, new INQCharacterImportParser());
        inqcharacter.parse(character);
        resolve(inqcharacter);
      } else {
        Object.setPrototypeOf(inqcharacter, new INQCharacterParser());
        inqcharacter.parse(character, graphic, (inqcharacter) => {
          resolve(inqcharacter);
        });
      }
    } else {
      resolve(inqcharacter);
    }
  });

  myPromise.catch(function(e){
    log('INQCharacter Error');
    log(character)
    log(graphic)
    log(e);
  });
  myPromise.then(function(inqcharacter){
    if(character != undefined){
      Object.setPrototypeOf(inqcharacter, new INQCharacter());
    }

    if(typeof callback == 'function'){
      callback(inqcharacter);
    }
  });
}

INQCharacter.prototype = new INQObject();
INQCharacter.prototype.constructor = INQCharacter;
