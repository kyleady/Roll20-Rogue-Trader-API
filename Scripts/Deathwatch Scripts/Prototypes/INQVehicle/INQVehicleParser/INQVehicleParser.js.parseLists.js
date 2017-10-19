//take apart this.Text to find all of the lists
//currently it assumes that weapons will be in the form of a link
INQVehicleParser.prototype.parseLists = function(){
  //empty the previous lists
  var Lists = {};
  //work through the parsed lists
  _.each(this.Content.Lists, function(list){
    var name = list.Name;
    //be sure the list name is recognized and in the standard format
    if(/weapon/i.test(name)){
      name = "Weapons";
    } else if(/trait/i.test(name)){
      name = "Vehicle Traits";
    } else {
      //quit if the name is not approved
      return false;
    }
    //save the name of the list
    Lists[name] = Lists[name] || [];
    _.each(list.Content, function(item){
      //make the assumption that each item is a link (or just a simple phrase)
      var inqitem = new INQLink(item);
      //only add the item if it was succesfully parsed
      if(inqitem.Name && inqitem.Name != ""){
        Lists[name].push(inqitem);
      }
    });
  });
  this.List = Lists;
}
