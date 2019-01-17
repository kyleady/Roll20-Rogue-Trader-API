INQWeapon.prototype.toHandoutObj = function() {
  var notes = 'Description';
  notes += '<br><br>';
  var properties = {
    Class: this.Class,
    Range: this.Range.toNote() + ' m',
    'Rate of Fire': '',
    Damage: this.Damage.toNote() + ' ' + this.DamageType.toNote(),
    Penetration: this.Penetration.toNote(),
    Clip: this.Clip,
    Reload: '',
    Special: '',
    Weight: this.Weight + 'kg',
    Requisition: this.Requisition,
    Renown: this.Renown,
    Availability: this.Availability,
    Action: '',
    'Focus Power': '',
    Opposed: 'No',
    Sustained: 'No'
  };

  for(var prop in properties) {
    notes += '<strong>' + prop + '</strong>: ';
    notes += properties[prop].toString();
    notes += '<br>'
  }

  var weapon = createObj('handout', {name: 'New Weapon', inplayerjournal: 'all'});
  weapon.set('notes', notes);
  this.Name = 'New Weapon';
  this.ObjID = weapon.id;
}
