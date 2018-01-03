//the prototype for characters
function INQObject(){

  //Object details
  this.ObjType = 'handout';
  this.ObjID = '';
  this.Name = '';

  //turns the prototype into an html hyperlink
  this.toLink = function(quantity){
    var output = '';
    //only return a link if it will go somewhere
    if(this.ObjID != ''){
      output = getLink(this.Name, 'http://journal.roll20.net/' + this.ObjType + '/' + this.ObjID);
    } else {
      output = this.Name;
    }
    if(quantity != undefined){
      output += '(x' + quantity + ')';
    }
    return output;
  }
}
