'use strict';
const assert=require('node:assert/strict');
require('./core.js');
const L=globalThis.Lab;
let assertions=0;
const check=(condition,message)=>{assert.ok(condition,message);assertions++;};
function action(s,type,id){const r=L.act(s,{type,id},s.started+90000);check(L.valid(s),'estado válido después de '+type);return r;}
const s=L.create('  Ana   Pérez  ',1000);
check(s.name==='Ana Pérez','nombre normalizado');
check(L.valid(s),'estado inicial válido');
check(L.simulate(25,false,false).state==='ALARMA','reproducir incidente');
action(s,'advance');check(s.phase===0&&L.score(s)===100,'no saltar ni penalizar por estado incompleto');
action(s,'fix','validate');check(s.fix===null,'no reparar sin diagnosticar');
action(s,'reproduce');action(s,'source','firmware');action(s,'fix','validate');
check(L.ready(s),'reparación lista');action(s,'advance');
action(s,'test','boundary');action(s,'test','boundary');check(s.tests.length===1,'pruebas sin duplicados');
action(s,'advance');check(s.phase===1,'no avanzar sin cobertura completa');
for(const c of L.CASES){
  const r=L.simulate(c.temp,c.connected,true);
  check(r.state===c.expected,c.label);check(r.latency<2000,'latencia');
  if(!c.connected)check(!r.alarm,'ERROR sin alarma de temperatura');
  action(s,'test',c.id);
}
action(s,'light');check(!L.ready(s),'falta sonido para validar');
action(s,'sound');check(L.ready(s),'uso validado');
action(s,'sound');check(!L.ready(s),'revocar validación si se apaga un aviso');
action(s,'sound');action(s,'advance');
action(s,'evidence','log');action(s,'evidence','log');check(s.evidence.length===1,'adjuntos sin duplicados');
action(s,'advance');check(s.phase===2,'falta versión');
action(s,'evidence','version');action(s,'advance');
check(s.phase===3&&s.finished===91000&&L.score(s)===100,'misión completa y 100 puntos');
const frozen=JSON.stringify(s);L.act(s,{type:'reproduce'});check(JSON.stringify(s)===frozen,'resultado inmutable');
const errors=L.create('<img src=x onerror=alert(1)>',1000);
action(errors,'reproduce');action(errors,'source','sensor');action(errors,'source','sensor');
check(errors.mistakes[0]===1,'misma decisión incorrecta resta solo una vez');
action(errors,'hint');check(L.score(errors)===95,'pista gratuita');
action(errors,'source','firmware');action(errors,'fix','delay');action(errors,'fix','off');
check(L.score(errors)===85,'tres decisiones corregidas');
action(errors,'fix','validate');action(errors,'advance');
for(const c of L.CASES)action(errors,'test',c.id);
action(errors,'light');action(errors,'sound');action(errors,'advance');
action(errors,'evidence','vague');action(errors,'evidence','photo');action(errors,'evidence','log');action(errors,'evidence','version');action(errors,'advance');
check(L.score(errors)===75,'penalización independiente de cada reto');
check(L.points(0,99)===20&&L.points(1,99)===15&&L.points(2,99)===15,'límite de descuento');
for(let t=20;t<=40;t++){
  check(L.simulate(t,true,true).alarm===(t>30),'umbral estricto '+t);
  check(L.simulate(t,false,true).state==='ERROR','dato inválido '+t);
}
for(const mutate of [x=>{x.phase=9;},x=>{x.tests=['normal','normal'];},x=>{x.name='';},x=>{x.completed=[true,true,true];},x=>{x.evidence=['photo'];},x=>{x.started=null;}]){
  const bad=L.create('Prueba',1000);mutate(bad);check(!L.valid(bad),'rechazar guardado inválido');
}
check(!L.valid(null)&&!L.valid({v:1}),'rechazar otra versión');
console.log(`PASS: ${assertions} comprobaciones; misión completa, recuperación de errores, guardado, umbral, pruebas y puntuación.`);
