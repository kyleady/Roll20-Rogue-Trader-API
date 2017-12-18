INQWeapon.prototype.set = function(properties){
  for(var prop in properties){
    if(this[prop] != undefined){
      if(Array.isArray(this[prop])){
        var items = properties[prop].split(',');
        for(var item of items){
          if(/^\s*$/.test(item)) continue;
          this[prop].push(new INQLink(item.trim()));
        }
      } else if(typeof this[prop] == 'object'){
        this[prop] = new this[prop].constructor(properties[prop]);
      } else {
        this[prop] = properties[prop];
      }
    }
  }
}
