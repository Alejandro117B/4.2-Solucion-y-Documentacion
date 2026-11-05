/* Motor de la misión express. JavaScript estándar, sin red ni dependencias. */
(function (root) {
  'use strict';
  const PHASES = [
    {title:'Reparar',points:40,time:'45–60 s'},
    {title:'Comprobar',points:30,time:'45–60 s'},
    {title:'Documentar',points:30,time:'30–45 s'}
  ];
  const CASES = [
    {id:'normal',label:'Normal',temp:25,connected:true,expected:'NORMAL'},
    {id:'boundary',label:'Frontera',temp:30,connected:true,expected:'NORMAL'},
    {id:'high',label:'Temperatura alta',temp:31,connected:true,expected:'ALARMA'},
    {id:'offline',label:'Desconexión',temp:25,connected:false,expected:'ERROR'}
  ];
  const FIXES = [
    {id:'delay',code:'DLY',title:'Esperar 3 segundos',detail:'Añadir una pausa antes de comparar.'},
    {id:'validate',code:'CHK',title:'Validar la lectura',detail:'Si valid=false, emitir ERROR y no comparar.'},
    {id:'off',code:'OFF',title:'Apagar siempre la alarma',detail:'Evitar cualquier encendido de la salida.'}
  ];
  const EVIDENCE = [
    {id:'vague',code:'NOTA',title:'«Ya funciona»',detail:'Mensaje del equipo, sin mediciones.'},
    {id:'log',code:'CSV',title:'Registro de las 4 pruebas',detail:'Valores, estados y 120 ms en el caso de alarma.'},
    {id:'photo',code:'IMG',title:'Foto del LED encendido',detail:'Sin valor de entrada ni versión del firmware.'},
    {id:'version',code:'FW',title:'Firmware v1.1 + cambio',detail:'Validación del sensor antes de comparar T.'}
  ];
  function simulate(temp, connected, repaired) {
    const value=connected?Number(temp):85,valid=!!connected;
    const state=repaired&&!valid?'ERROR':value>30?'ALARMA':'NORMAL';
    return {value,valid,state,alarm:state==='ALARMA',latency:120};
  }
  function create(name,now=Date.now()) {
    return {v:2,name:String(name).trim().replace(/\s+/g,' ').slice(0,48),phase:0,started:now,finished:null,
      completed:[false,false,false],mistakes:[0,0,0],hints:[false,false,false],rejected:[],
      reproduced:false,source:null,fix:null,tests:[],light:false,sound:false,evidence:[]};
  }
  function points(phase,mistakes) { const max=PHASES[phase].points;return max-Math.min(max/2,Math.max(0,mistakes)*5); }
  function score(s) { return PHASES.reduce((sum,_,i)=>sum+points(i,s.mistakes[i]),0); }
  function ready(s) {
    if(s.phase===0)return s.reproduced&&s.source==='firmware'&&s.fix==='validate';
    if(s.phase===1)return s.tests.length===4&&s.light&&s.sound;
    if(s.phase===2)return s.evidence.includes('log')&&s.evidence.includes('version');
    return false;
  }
  function valid(s) {
    const bools=a=>Array.isArray(a)&&a.length===3&&a.every(x=>typeof x==='boolean');
    const unique=(a,allowed)=>Array.isArray(a)&&a.length<=allowed.length&&new Set(a).size===a.length&&a.every(x=>allowed.includes(x));
    if(!s||s.v!==2||typeof s.name!=='string'||!s.name.trim()||s.name.length>48||!Number.isInteger(s.phase)||s.phase<0||s.phase>3||!Number.isFinite(s.started)||s.started<=0)return false;
    if(!bools(s.completed)||!bools(s.hints)||!Array.isArray(s.mistakes)||s.mistakes.length!==3||!s.mistakes.every(n=>Number.isInteger(n)&&n>=0))return false;
    if(!Array.isArray(s.rejected)||s.rejected.length>10||!s.rejected.every(x=>typeof x==='string'))return false;
    if(!['reproduced','light','sound'].every(k=>typeof s[k]==='boolean')||![null,'firmware'].includes(s.source)||![null,'validate'].includes(s.fix))return false;
    if(!unique(s.tests,CASES.map(c=>c.id))||!unique(s.evidence,['log','version']))return false;
    if(!s.completed.every((done,i)=>done===(i<s.phase)))return false;
    if(s.phase>=1&&(!s.reproduced||s.source!=='firmware'||s.fix!=='validate'))return false;
    if(s.phase>=2&&(s.tests.length!==4||!s.light||!s.sound))return false;
    if(s.phase===3&&(s.evidence.length!==2||!Number.isFinite(s.finished)||s.finished<s.started))return false;
    return true;
  }
  function act(s,a,now=Date.now()) {
    if(s.phase===3)return {message:'La misión ya está completa.',kind:'info'};
    const message=(text,kind='info')=>({message:text,kind});
    const wrong=(key,text)=>{
      if(!s.rejected.includes(key)){s.rejected.push(key);s.mistakes[s.phase]++;}
      return message(text,'warning');
    };
    if(a.type==='hint'){s.hints[s.phase]=true;return message('Pista abierta. Consultarla no resta puntos.');}
    if(a.type==='advance'){
      if(!ready(s))return message('Completa las acciones resaltadas antes de continuar. No se descuentan puntos.','warning');
      s.completed[s.phase]=true;s.phase++;
      if(s.phase===3)s.finished=Math.max(now,s.started);
      return message('Estación recuperada.','success');
    }
    if(s.phase===0){
      if(a.type==='reproduce'){s.reproduced=true;return message('Fallo reproducido: el ambiente sigue a 25 °C, pero un dato inválido enciende la alarma.','success');}
      if(a.type==='source'){
        if(!s.reproduced)return message('Primero pulsa «Desconectar sensor».','warning');
        if(a.id==='firmware'){s.source='firmware';return message('Causa localizada: el firmware ignora valid=false y compara el 85 de sustitución.','success');}
        if(a.id==='sensor')return wrong('source-sensor','El sensor avisa valid=false. El fallo está en quien utiliza el valor sin comprobar esa bandera.');
        if(a.id==='output')return wrong('source-output','La salida cumple la orden que recibe. Sigue el dato hasta la lógica que decide encenderla.');
      }
      if(a.type==='fix'){
        if(s.source!=='firmware')return message('Localiza primero el componente que interpreta mal el dato.','warning');
        if(a.id==='validate'){s.fix='validate';return message('Corrección aplicada: el dato inválido produce ERROR y la alarma de temperatura se apaga.','success');}
        if(a.id==='delay')return wrong('fix-delay','El retardo solo retrasa el mismo error. La corrección debe comprobar si el dato es válido.');
        if(a.id==='off')return wrong('fix-off','Apagar siempre también impediría avisar ante calor real. Necesitas conservar la alarma para datos válidos.');
      }
    }
    if(s.phase===1){
      if(a.type==='test'){
        const c=CASES.find(c=>c.id===a.id);if(!c)return message('Caso desconocido.','warning');
        if(!s.tests.includes(c.id))s.tests.push(c.id);
        const r=simulate(c.temp,c.connected,true);
        return message(`${c.label}: ${r.state}. ${c.id==='high'?'120 ms, dentro del límite de 2 s.':c.id==='boundary'?'30 °C no supera el umbral.':c.id==='offline'?'Dato inválido descartado, alarma apagada.':'Temperatura normal, alarma apagada.'}`,'success');
      }
      if(a.type==='light')s.light=!s.light;
      else if(a.type==='sound')s.sound=!s.sound;
      else return message('Acción no disponible.');
      return message(s.light&&s.sound?'Validación registrada: el operador percibe el aviso combinado.':'Activa luz y sonido para avisar al operador en este escenario.',s.light&&s.sound?'success':'info');
    }
    if(s.phase===2&&a.type==='evidence'){
      if(['log','version'].includes(a.id)){
        if(!s.evidence.includes(a.id))s.evidence.push(a.id);
        return message(a.id==='log'?'Pruebas adjuntas: queda registrado cómo se comprobó el cambio.':'Versión adjunta: otra persona sabrá qué firmware repetir.','success');
      }
      if(a.id==='vague')return wrong('evidence-vague','«Ya funciona» no indica qué se probó ni qué resultado se obtuvo. Adjunta un registro medible.');
      if(a.id==='photo')return wrong('evidence-photo','La foto sola no demuestra el umbral ni permite repetir la corrección. Faltan condiciones y versión.');
    }
    return message('Acción no disponible en esta estación.');
  }
  root.Lab=Object.freeze({PHASES,CASES,FIXES,EVIDENCE,simulate,create,points,score,ready,valid,act});
})(typeof window!=='undefined'?window:globalThis);
