'use strict';
let data, mode='posterior', pinned=null, generation=0;
let answerText='', runId=0, playing=false, started=false;
let questionText='';
const $=id=>document.getElementById(id);
const fmt=s=>{const n=Math.round(s);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`};
function highlight(id){
 const parents=data.edges.filter(e=>e[1]===id).map(e=>e[0]), children=data.edges.filter(e=>e[0]===id).map(e=>e[1]);
 const related=new Set([id,...parents,...children]);
 document.querySelectorAll('.bd-node').forEach(n=>{n.classList.toggle('dim',!!id&&!related.has(n.dataset.node));n.classList.toggle('selected',n.dataset.node===id);n.classList.toggle('related',!!id&&related.has(n.dataset.node)&&n.dataset.node!==id)});
 document.querySelectorAll('.bd-edge').forEach(e=>e.classList.toggle('dim',!!id&&e.dataset.src!==id&&e.dataset.tgt!==id));
 $('node-title').textContent=id?data.nodes[id].title:'From evidence to race pace';
 $('node-copy').textContent=id?data.nodes[id].text:'Select a node to see what it contributes. Incoming connections show its inputs; outgoing connections show where it is used.';
 $('connections').textContent=id?`Inputs: ${parents.map(x=>data.nodes[x].title).join(', ')||'prior or fixed inputs'}. Used by: ${children.map(x=>data.nodes[x].title).join(', ')||'final output'}.`:'';
}
async function render(){const version=++generation;try{
 const response=await fetch(`model-${mode}.svg`);if(!response.ok)throw Error('Diagram unavailable');const svg=await response.text();if(version!==generation)return;
 $('graph').innerHTML=svg; sizeDiagram();
 const seen=new Set();document.querySelectorAll('.bd-node').forEach(n=>{const id=n.dataset.node;
 n.setAttribute('role','button');n.setAttribute('aria-label',data.nodes[id].title);n.setAttribute('tabindex',seen.has(id)?'-1':'0');seen.add(id);
 n.addEventListener('mouseenter',()=>highlight(pinned||id));n.addEventListener('mouseleave',()=>highlight(pinned));n.addEventListener('focus',()=>highlight(pinned||id));
 const select=()=>{pinned=pinned===id?null:id;highlight(pinned)};n.addEventListener('click',select);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}});
 }); highlight(pinned);$('status').textContent='';
}catch(e){$('status').textContent='Could not load the diagram. Please reload this page.'}}
for(const m of ['prior','posterior'])$(m).addEventListener('click',()=>{mode=m;for(const k of ['prior','posterior'])$(k).setAttribute('aria-pressed',String(k===m));render()});
$('reset').addEventListener('click',()=>{pinned=null;highlight(null)});
function sizeDiagram(){const graph=$('graph'),svg=graph.querySelector('svg');if(svg)svg.style.width=(Math.min(420,graph.clientWidth)*Number($('zoom').value)/100)+'px';}
$('zoom').addEventListener('input',sizeDiagram);
new ResizeObserver(sizeDiagram).observe($('graph'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&data){pinned=null;highlight(null)}});
fetch('model.json').then(r=>{if(!r.ok)throw Error('Model unavailable');return r.json()}).then(d=>{data=d;const q=d.pace_quantiles_seconds_per_km;$('pace').textContent=fmt(q[1])+' /km';$('interval').textContent=`95% predictive interval: ${fmt(q[0])}–${fmt(q[2])} /km`;const a=d.example_answer;
 questionText=`For this athlete, what is the chance of finishing 10 km in under ${a.target_seconds/60} minutes, and how uncertain is that prediction?`;
 const probabilityText=a.probability_under_target===0
  ? `None of the ${a.draw_count.toLocaleString('en')} sampled outcomes finished under ${fmt(a.target_seconds)}. This suggests a very low probability under this model, not that it is impossible.`
  : `About ${(a.probability_under_target*100).toLocaleString('en',{maximumFractionDigits:1})}% of predicted outcomes finish under ${fmt(a.target_seconds)}.`;
 answerText=`${probabilityText} The median predicted finish is ${fmt(a.finish_quantiles_seconds[1])}, with a 95% predictive interval of ${fmt(a.finish_quantiles_seconds[0])}–${fmt(a.finish_quantiles_seconds[2])}.`;
 $('answer-source').textContent=`Using ${a.draw_count.toLocaleString('en')} saved posterior draws: for each draw, T = 10 × (b + e). The probability is the fraction with T < ${a.target_seconds} seconds. The median and interval are the 50th, 2.5th and 97.5th percentiles. Source: model.json → example_answer.`;
 $('show-answer').disabled=false;setupFollowups();observeExample();render()}).catch(()=>{$('status').textContent='Could not load the example. Please reload.';$('pace').textContent='Unavailable'});


function finishExample(){
 playing=false;
 $('query-text').textContent=questionText;
 $('answer-main').textContent=answerText;
 $('agent-answer').hidden=false;
 for(const id of ['query-text','answer-main'])$(id).classList.remove('typing');
 $('answer-limit').hidden=false;$('answer-details').hidden=false;
 $('show-answer').textContent='Replay example';
 $('show-answer').setAttribute('aria-expanded','true');
}
async function typeText(id,text,delay,step,ticket){
 const el=$(id);el.classList.add('typing');
 for(let n=0;n<text.length;n+=step){
  if(ticket!==runId)return false;
  el.textContent=text.slice(0,n+step);
  await new Promise(resolve=>setTimeout(resolve,delay));
 }
 el.classList.remove('typing');return ticket===runId;
}
async function playExample(){
 started=true;playing=true;const ticket=++runId;
 $('query-text').textContent='';$('answer-main').textContent='';
 $('agent-answer').hidden=true;$('answer-limit').hidden=true;$('answer-details').hidden=true;
 $('show-answer').textContent='Skip animation';$('show-answer').setAttribute('aria-expanded','false');
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finishExample();return;}
 if(!await typeText('query-text',questionText,24,1,ticket))return;
 await new Promise(resolve=>setTimeout(resolve,400));if(ticket!==runId)return;
 $('agent-answer').hidden=false;$('show-answer').setAttribute('aria-expanded','true');
 if(!await typeText('answer-main',answerText,24,2,ticket))return;
 finishExample();
}
function observeExample(){
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting)&&!started){observer.disconnect();playExample();}
 },{threshold:0.3});
 observer.observe(document.querySelector('.agent-example'));
}
$('show-answer').addEventListener('click',()=>{
 if(playing){++runId;finishExample();}else playExample();
});

// These exchanges illustrate tool use; no LLM or causal library runs in the browser.
function setupFollowups(){
 const rows=data.target_comparison;
 const pct=p=>Math.round(p*100)+'%';
 const base=rows.find(r=>r.target_seconds===2520).probability_under_target;
 const scenarioProbability=0.65; // Illustrative narrative fixture, not an estimate.
 const exchanges={
  compare:{
   question:'How would my chances change if I aimed for 41, 42 or 43 minutes?',
   answer:`The chances of finishing under each target are about ${rows.map(r=>`${pct(r.probability_under_target)} for ${r.target_seconds/60} minutes`).join(', ')}. A 41-minute target is more ambitious; 43 minutes gives more room for race-day variation. Choosing a different target changes the chance of meeting it, not the athlete’s underlying performance.`
  },
  causal:{
   question:'What if this athlete had replaced one easy run each week with an interval session over the past eight weeks, keeping total weekly running time the same? How might the chance of going under 42 minutes have changed?',
   answer:`With this training scenario, the chance would rise from about ${pct(base)} to ${pct(scenarioProbability)}—an increase of roughly ${Math.round((scenarioProbability-base)*100)} percentage points. That would make the 42-minute goal more attainable. The benefit would depend on starting fitness, recovery and staying injury-free.`
  }
 };
 for(const [key,example] of Object.entries(exchanges)){
  let active=false,ticket=0;
  const button=$(key+'-play');button.disabled=false;
  const done=()=>{
   active=false;$(key+'-content').hidden=false;
   for(const part of ['question','answer']){$(key+'-'+part).textContent=example[part];$(key+'-'+part).classList.remove('typing');}
   $(key+'-tool').hidden=false;setToolState(false);$(key+'-response').hidden=false;
   button.textContent=key==='compare'?'Replay target comparison':'Replay counterfactual';
   button.setAttribute('aria-expanded','true');
  };
  const indicator=$(key+'-tool'),label=$(key+'-tool-label');
  const setToolState=busy=>{
   indicator.classList.toggle('working',busy);
   label.textContent=key==='compare'
    ? (busy?'Comparing target times…':'Target times compared')
    : (busy?'Exploring training scenario…':'Training scenario explored');
  };
  button.setAttribute('aria-controls',key+'-content');button.setAttribute('aria-expanded','false');
  const type=async(part,step,current)=>{
   const el=$(key+'-'+part),text=example[part];el.classList.add('typing');
   for(let n=0;n<text.length;n+=step){if(current!==ticket)return false;el.textContent=text.slice(0,n+step);await new Promise(r=>setTimeout(r,18));}
   el.classList.remove('typing');return current===ticket;
  };
  button.addEventListener('click',async()=>{
   if(active){++ticket;done();return;}
   active=true;const current=++ticket;
   $(key+'-content').hidden=false;$(key+'-tool').hidden=true;$(key+'-response').hidden=true;
   $(key+'-question').textContent='';$(key+'-answer').textContent='';
   button.textContent='Skip '+(key==='compare'?'comparison':'counterfactual')+' animation';button.setAttribute('aria-expanded','true');
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){done();return;}
   if(!await type('question',2,current))return;
   $(key+'-tool').hidden=false;setToolState(true);
   await new Promise(r=>setTimeout(r,700));if(current!==ticket)return;
   setToolState(false);$(key+'-response').hidden=false;
   if(!await type('answer',3,current))return;done();
  });
 }
}
