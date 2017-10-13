function getLink (Name, Link){
  Link = Link || '';
  if(typeof Name == 'object' && Name.get) {
    return '<a href=\"http://journal.roll20.net/' + Name.get('_type') + '/' + Name.id + '\">' + Name.get('name') + '</a>';
  }
  if(Link == ''){
    var Handouts = findObjs({ _type: 'handout', name: Name });
    var objs = filterObjs(function(obj) {
      if(obj.get('_type') == 'handout' || obj.get('_type') == 'character'){
        var regex = Name;
        regex = regex.replace(/[\.\+\*\[\]\(\)\{\}\^\$\?]/g, function(match){return '\\' + match});
        regex = regex.replace(/\s*(-|–|\s)\s*/, '\\s*(-|–|\\s)\\s*');
        regex = regex.replace(/s?$/, 's?');
        regex = '^' + regex + '$';
        var re = RegExp(regex, 'i');
        return re.test(obj.get('name'));
      } else {
        return false;
      }
    });
    objs = trimToPerfectMatches(objs, Name);
    if(objs.length > 0){
      return '<a href=\"http://journal.roll20.net/' + objs[0].get('_type') + '/' + objs[0].id + '\">' + objs[0].get('name') + '</a>';
    } else {
        return Name;
    }
  } else {
    return '<a href=\"' + Link + '\">' + Name + '</a>';
  }
}
