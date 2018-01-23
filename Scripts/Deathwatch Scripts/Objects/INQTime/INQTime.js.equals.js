INQTime.equals = function(input) {
  var date = INQTime.toObj(input);
  for(var prop in INQTime.vars) INQTime[prop] = date[prop];
}
