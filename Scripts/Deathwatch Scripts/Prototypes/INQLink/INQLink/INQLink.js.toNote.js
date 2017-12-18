//display the handout as a link with details
INQLink.prototype.toNote = function(justText){
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
