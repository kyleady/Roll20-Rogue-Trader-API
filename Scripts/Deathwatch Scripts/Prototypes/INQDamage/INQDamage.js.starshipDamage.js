INQDamage.prototype.starshipDamage = function(graphic) {
  var population = graphic.get('bar1_value');
  var populationDef = attributeValue('Armour_Population', {graphicid: graphic.id, alert: false}) || 0;
  var populationDamage = this.damage - populationDef;
  if(populationDamage < 0) populationDamage = 0;
  population -= populationDamage;
  if(population < 0) population = 0;
  graphic.set('bar1_value', population);

  var morale = graphic.get('bar2_value');
  var moraleDef = attributeValue('Armour_Morale', {graphicid: graphic.id, alert: false}) || 0;
  var moraleDamage = this.damage - moraleDef;
  if(moraleDamage < 0) moraleDamage = 0;
  morale -= moraleDamage;
  if(morale < 0) morale = 0;
  graphic.set('bar2_value', morale);
}
