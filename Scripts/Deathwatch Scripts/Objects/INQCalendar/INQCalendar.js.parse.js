INQCalendar.parse = function(callback) {
  var text = {};
  var promises = [];
  for(var time of this.times) {
    text[time] = {};
    for(var note of this.notes) {
      promises.push(
        new Promise(function(resolve) {
          var saveTheTime = time;
          var saveTheNote = note;
          INQCalendar[saveTheTime + 'Obj'].get(saveTheNote, function(str) {
            text[saveTheTime][saveTheNote] = str;
            resolve();
          });
        })
      );
    }
  }

  Promise.all(promises).catch(function(e){log(e)});
  Promise.all(promises).then(function() {
    for(var time of INQCalendar.times) {
      INQCalendar[time] = {};
      for(var note of INQCalendar.notes) {
        INQCalendar[time][note] = [];
        if(!text[time][note]) continue;
        var lines = text[time][note].split('<br>');
        for(var line of lines) {
          if(typeof line == 'string' && line.length > 0) {
            var matches = line.match(/^<strong>(\d+\.M\d+)(?:%(\d+))?<\/strong>:(.+)$/);
          } else {
            var matches = null;
          }

          if(matches) {

            INQCalendar[time][note].push({
              Date: matches[1],
              Repeat: Number(matches[2]) || undefined,
              Content: [matches[3]]
            });
          } else if(INQCalendar[time][note].length) {
            var last = INQCalendar[time][note].length-1;
            INQCalendar[time][note][last].Content.push(line);
          } else {
            INQCalendar[time][note].push({
              Content: [line]
            });
          }
        }
      }
    }


    if(typeof callback == 'function') callback();
  });
}
