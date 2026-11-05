/* Reglas y preguntas del juego. Sin servicios externos. */
(function(root){
  'use strict';
  const LIMIT=60000;
  const LEVELS=[
    {name:'Puente de cristal',icon:'◇',max:30,rule:'Elige el cristal con la respuesta correcta. Un error rompe el piso y termina este nivel.',questions:[
      {text:'¿Qué haces primero cuando un prototipo falla?',options:['Identificar qué está fallando','Cambiar código al azar'],correct:0,why:'Primero se detecta el problema. Después se reproduce, se diagnostica y se corrige.'},
      {text:'La alarma se activa con datos inválidos. ¿Qué arreglo ataca la causa?',options:['Esperar más tiempo entre lecturas','Validar la lectura del sensor'],correct:1,why:'Validar evita usar datos inválidos. Un retardo solo puede ocultar el síntoma.'},
      {text:'¿Qué ayuda a otra persona a repetir una corrección?',options:['Guardar la versión y las pruebas','Anotar solamente «ya funciona»'],correct:0,why:'La versión, el procedimiento y los resultados permiten repetir y comprobar la solución.'}
    ]},
    {name:'Tira de la cuerda',icon:'↔',max:40,rule:'Un acierto tira a tu favor; un error favorece al rival. Con dos puntos de ventaja ganas. Máximo 5 preguntas.',questions:[
      {text:'Verificar una alarma significa…',options:['Medir si cumple el requisito técnico','Elegir el color de la carcasa'],correct:0,why:'Verificar es comprobar requisitos técnicos con resultados medibles.'},
      {text:'Validar esa alarma significa…',options:['Revisar únicamente si compila','Comprobar que alerta al operador'],correct:1,why:'Validar comprueba que la solución sirve en su escenario real de uso.'},
      {text:'Si una prueba falla, ¿qué corresponde hacer?',options:['Volver al diagnóstico y corregir','Dar el prototipo por terminado'],correct:0,why:'El ciclo es iterativo: una prueba fallida lleva de nuevo al diagnóstico.'},
      {text:'¿Qué debe incluir una documentación útil?',options:['Solo una captura del programa','Requisitos, cambios y pruebas'],correct:1,why:'Una documentación útil conserva requisitos, decisiones, cambios y evidencia de prueba.'},
      {text:'¿Qué conecta la trazabilidad?',options:['Requisito, código, prueba y evidencia','Solo los nombres del equipo'],correct:0,why:'La trazabilidad muestra qué implementación y qué prueba demuestran cada requisito.'}
    ]},
    {name:'Luz roja, luz verde',icon:'○',max:30,rule:'Responde dos preguntas. Si aciertas, avanzas y sobrevives cuando la muñeca voltea. Si fallas, te elimina de este nivel.',questions:[
      {text:'El requisito dice T > 30 °C. A exactamente 30 °C, la alarma debe…',options:['Permanecer apagada','Encenderse'],correct:0,why:'El símbolo > significa mayor que. Exactamente 30 °C todavía no supera el umbral.'},
      {text:'El sensor se desconecta y llega un dato inválido. El firmware debe…',options:['Compararlo como si fuera válido','Descartarlo y mostrar ERROR'],correct:1,why:'Primero se comprueba la validez. Un dato inválido no debe activar una falsa alarma de temperatura.'}
    ]}
  ];
  function create(name,now=Date.now()){return {v:3,name:String(name).trim().replace(/\s+/g,' ').slice(0,40),level:0,index:0,status:'playing',started:now,deadline:now+LIMIT,finished:null,flash:null,rounds:LEVELS.map(()=>({correct:0,wrong:0,balance:0,won:false,finished:false,reason:'',path:[],last:null}))};}
  function end(s,won,reason){Object.assign(s.rounds[s.level],{won,finished:true,reason});s.status='round-end';s.flash=null;}
  function answer(s,choice,now=Date.now()){
    if(s.status!=='playing'||s.flash||![0,1].includes(choice))return false;
    if(now>=s.deadline){tick(s,now);return false;}
    const q=LEVELS[s.level].questions[s.index],r=s.rounds[s.level],correct=choice===q.correct;
    r[correct?'correct':'wrong']++;r.balance+=correct?1:-1;r.last={index:s.index,choice,correct};r.path.push({choice,correct});
    let finish=false,won=false,reason='';
    if(s.level===0){finish=!correct||r.correct===3;won=r.correct===3;reason=won?'Cruzaste los tres cristales.':'Elegiste el cristal incorrecto.';}
    if(s.level===1){finish=Math.abs(r.balance)>=2||s.index===4;won=r.balance>0;reason=won?'Tu equipo ganó el tirón.':'El equipo rival ganó el tirón.';}
    if(s.level===2){finish=!correct||r.correct===2;won=r.correct===2;reason=won?'Llegaste a la meta sin que la muñeca te eliminara.':'La muñeca volteó y te eliminó.';}
    s.flash={correct,until:now+1100,finish,won,reason};return true;
  }
  function tick(s,now=Date.now()){
    if(s.status!=='playing')return false;
    if(s.flash&&(now>=s.flash.until||now>=s.deadline)){
      const f=s.flash;s.flash=null;
      if(f.finish){end(s,f.won,f.reason);return true;}
      s.index++;
      if(now<s.deadline)return true;
    }
    if(now>=s.deadline){const won=s.level===1&&s.rounds[1].balance>0;end(s,won,won?'Se acabó el tiempo con la cuerda a tu favor.':'Se acabó el minuto de este nivel.');return true;}
    return false;
  }
  function next(s,now=Date.now()){
    if(s.status!=='round-end')return false;
    if(s.level===2){s.status='finished';s.finished=Math.max(now,s.started);return true;}
    s.level++;s.index=0;s.status='playing';s.flash=null;s.deadline=now+LIMIT;return true;
  }
  function points(s,i){const r=s.rounds[i];if(i===0)return r.correct*10;if(i===2)return r.correct*15;return r.won?Math.max(10,40-r.wrong*10):Math.min(20,r.correct*5);}
  function score(s){return LEVELS.reduce((n,_,i)=>n+points(s,i),0);}
  function valid(s){
    if(!s||s.v!==3||typeof s.name!=='string'||!s.name.trim()||s.name.length>40||!Number.isInteger(s.level)||s.level<0||s.level>2||!['playing','round-end','finished'].includes(s.status)||!Number.isFinite(s.started)||!Number.isFinite(s.deadline))return false;
    if(!Number.isInteger(s.index)||s.index<0||s.index>=LEVELS[s.level].questions.length||!Array.isArray(s.rounds)||s.rounds.length!==3)return false;
    if(!s.rounds.every((r,i)=>r&&Number.isInteger(r.correct)&&r.correct>=0&&Number.isInteger(r.wrong)&&r.wrong>=0&&r.correct+r.wrong<=LEVELS[i].questions.length&&Number.isInteger(r.balance)&&typeof r.won==='boolean'&&typeof r.finished==='boolean'&&typeof r.reason==='string'&&Array.isArray(r.path)&&r.path.length===r.correct+r.wrong&&r.path.every(p=>p&&[0,1].includes(p.choice)&&typeof p.correct==='boolean')&&(r.last===null||(Number.isInteger(r.last.index)&&r.last.index>=0&&r.last.index<LEVELS[i].questions.length&&[0,1].includes(r.last.choice)&&typeof r.last.correct==='boolean'))))return false;
    if(s.flash!==null&&(!s.flash||typeof s.flash.correct!=='boolean'||!Number.isFinite(s.flash.until)||typeof s.flash.finish!=='boolean'||typeof s.flash.won!=='boolean'||typeof s.flash.reason!=='string'))return false;
    if(s.status==='finished'&&(s.level!==2||!s.rounds.every(r=>r.finished)||!Number.isFinite(s.finished)))return false;
    return true;
  }
  root.Squid=Object.freeze({LIMIT,LEVELS,create,answer,tick,next,points,score,valid});
})(typeof window==='undefined'?globalThis:window);
