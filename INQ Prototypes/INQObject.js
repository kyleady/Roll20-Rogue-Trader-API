//the prototype for characters
function INQObject(){

  //Object details
  this.ObjType = "handout";
  this.ObjID = "";
  this.Name = "";

  //turns the prototype into an html hyperlink
  this.toLink = function(){
    //only return a link if it will go somewhere
    if(this.ObjID != ""){
      return "<a href=\"http://journal.roll20.net/" + this.ObjType + "/" + this.ObjID + "\">" + this.Name + "</a>";
    } else {
      return this.Name;
    }
  }
}
