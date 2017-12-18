function damageFx(graphic, damageType){
  if(graphic == undefined || graphic.get("_type") != "graphic"){return;}
  var x = graphic.get("left");
  var y = graphic.get("top");
  var pageid = graphic.get("_pageid");
  var size = 0.5;
  switch(damageType){
    case "X": case "S":
      var fx = {
        "maxParticles": 100,
      	"size": 35,
      	"sizeRandom": 15,
      	"lifeSpan": 10,
      	"lifeSpanRandom": 3,
      	"speed": 3,
      	"angle": 0,
      	"emissionRate": 12,
        "duration": 5,
        "startColour":		[220, 35, 0, 1],
        "startColourRandom":	[62, 0, 0, 0.25],
        "endColour":		[220, 35, 0, 0],
        "endColourRandom":	[60, 60, 60, 0]
      }
    break;
    case "E":
      var fx = {
        "maxParticles": 100,
        "size": 35,
        "sizeRandom": 15,
        "lifeSpan": 10,
        "lifeSpanRandom": 3,
        "speed": 3,
        "angle": 0,
        "emissionRate": 12,
        "duration": 5,
        "startColour":		[90, 90, 175, 1],
        "startColourRandom":	[0, 0, 0, 0.25],
        "endColour":		[125, 125, 255, 0],
        "endColourRandom":	[0, 0, 0, 0]
      }
    break;
    default:
      var fx = {
        "maxParticles": 750,
      	"size": 15,
      	"sizeRandom": 7,
      	"lifeSpan": 20,
      	"lifeSpanRandom": 5,
      	"emissionRate": 3,
      	"speed": 7,
      	"speedRandom": 2,
      	"gravity": { "x": 0.01, "y": 0.5 },
      	"angle": randomInteger(360)-1,
      	"angleRandom": 20,
      	"duration": 10,
        "startColour":		[175, 0, 0, 1],
        "startColourRandom":	[20, 0, 0, 0],
        "endColour":		[175, 0, 0, 0],
        "endColourRandom":	[20, 0, 0, 0]
      }
    break;
  }
  spawnFxWithDefinition(x, y, fx, pageid);
}
