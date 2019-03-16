# Roll20-Rogue-Trader-API
Javascript API for a FFG Rogue Trader Campaign (can work with Deathwatch, Black Crusade, etc)

Please see the [wiki](https://github.com/kyleady/Roll20-Rogue-Trader-API/wiki) for more information.

Run in node interactive shell with
```
const test_fs = require('fs');
require('mock20');
Campaign().MOCK20reset();
const MyScript = test_fs.readFileSync('./INQTotal.js', 'utf8');
eval(MyScript);
MOCK20endOfLastScript();
```

Can run API commands with the following
```
const test_p = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
test_p.MOCK20chat('!api command');
```
