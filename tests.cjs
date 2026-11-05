'use strict';
const assert=require('node:assert/strict');
require('./core.js');
const G=globalThis.Squid,s=G.create('Prueba',1000);
let now=1000;
for(let level=0;level<3;level++){
  while(s.status==='playing'){
    G.answer(s,G.LEVELS[level].questions[s.index].correct,now+=100);
    G.tick(s,now+=1200);
  }
  G.next(s,now+=100);
}
assert.equal(s.status,'finished');
assert.equal(G.score(s),100);
assert.ok(G.valid(s));
const wrong=G.create('Error',1000);G.answer(wrong,1,1100);G.tick(wrong,2300);
assert.equal(wrong.status,'round-end');
assert.equal(wrong.rounds[0].won,false);
const timeout=G.create('Tiempo',1000);G.tick(timeout,61000);
assert.equal(timeout.status,'round-end');
console.log('PASS: revisión breve de partida completa, eliminación y límite de un minuto.');
