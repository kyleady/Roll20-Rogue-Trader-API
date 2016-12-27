//the prototype for Skills, Gear, Talents, etc anything that has a link
function INQLink(){
  //the details of the skill
  this.Bonus = 0;
  this.Quantity = 1;
  this.Groups = [];

  //display the handout as a link with details
  this.toNote = function(){
    var output = "";
    //do we already know the link?
    if(this.ObjID != ""){
      output += this.toLink();
    } else {
      output += GetLink(this.Name);
    }
    _.each(this.Groups,function(group){
      output += "(" + group + ")";
    });
    if(this.Bonus != 0){
      output += "+" + this.Bonus.toString();
    }
    if(this.Quantity != 1){
      output += "(x" + this.Quantity.toString() + ")";
    }

    return output;
  }
}
