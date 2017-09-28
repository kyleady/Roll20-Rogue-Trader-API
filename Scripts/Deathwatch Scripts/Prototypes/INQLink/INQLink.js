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

  //display the handout as a link with details
  this.toNote = function(justText){
    var output = "";
    //do we already know the link?
    if(this.ObjID != "" || justText){
      output += this.toLink();
    } else {
      output += getLink(this.Name);
    }
    _.each(this.Groups,function(group){
      output += "(" + group + ")";
    });
    if(this.Quantity > 0){
      output += "(x" + this.Quantity.toString() + ")";
    }
    if(this.Bonus > 0){
      output += "+" + this.Bonus.toString();
    } else if (this.Bonus < 0) {
      output += "–" + Math.abs(this.Bonus).toString();
    }
    return output;
  }

  this.valueOf = this.toNote;
}
