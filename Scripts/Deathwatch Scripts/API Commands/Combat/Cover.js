function applyCover(matches,msg){
  var details = damDetails();
  if(details == undefined){return;}
  var cover = Number(matches[1]) || 0;
  var primitiveCover = matches[2] != '' || false;
  var dam = Number(details.Dam.get('current'));
  var pen = Number(details.Pen.get('current'));
  var primitiveAttack = Number(details.Prim.get('current'));

  var coverMultiplier = 1;
  if(primitiveCover) coverMultiplier /= 2;
  if(primitiveAttack) coverMultiplier *= 2;
  pen -= ( cover * coverMultiplier / 2);
  if (pen <= 0) {
    dam += pen * 2;
    pen = 0;
    if(dam <= 0) dam = 0;
  }

  details.Dam.set('current', Math.floor(dam));
  details.Pen.set('current', Math.floor(pen));
  whisper('Dam: ' + details.Dam.get('current') + ', Pen: ' + details.Pen.get('current'));
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*cover\s*(\d+)\s*(|p|prim|primitive)\s*$/i, applyCover);
});
