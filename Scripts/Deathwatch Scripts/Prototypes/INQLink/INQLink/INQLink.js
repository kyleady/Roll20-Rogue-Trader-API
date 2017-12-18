//the prototype for Skills, Gear, Talents, etc anything that has a link
function INQLink(text){
  //the details of the skill
  this.Bonus = 0;
  this.Quantity = 0;
  this.Groups = [];

  //allow the user to immediately parse a link in the constructor
  if(text != undefined){
    Object.setPrototypeOf(this, new INQLinkParser());
    this.parse(text);
    Object.setPrototypeOf(this, new INQLink());
  }

  this.valueOf = this.toNote;
}

INQLink.prototype = new INQObject();
INQLink.prototype.constructor = INQLink;
