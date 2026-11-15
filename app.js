/* ---------- STORAGE SHIM (localStorage, works fully offline as standalone PWA) ---------- */
window.storage = {
  async get(key){
    const raw = localStorage.getItem(key);
    if(raw === null) return null;
    return {key, value: raw, shared:false};
  },
  async set(key, value){
    localStorage.setItem(key, value);
    return {key, value, shared:false};
  },
  async delete(key){
    localStorage.removeItem(key);
    return {key, deleted:true, shared:false};
  },
  async list(prefix){
    const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
    return {keys, prefix, shared:false};
  }
};

/* ---------- DATA ---------- */
const HOW = url => ` <a href="${url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Jak to zrobić →</a>`;
const YT = q => 'https://www.youtube.com/results?search_query=' + q;

const WARMUP = p => [
  {id:p+"-w1", name:"Rowerek stacjonarny", sets:"7–8 min", badge:"warm", note:"Lekkie tempo, przy którym da się rozmawiać. Rozgrzewa kolano bez obciążenia."},
  {id:p+"-w2", name:"Krążenia bioder + wymachy nóg", sets:"10 / strona", badge:"warm", note:"Trzymaj się drążka. Wymachy w przód i w bok, spokojnie, bez szarpania."},
  {id:p+"-w3", name:"Krążenia ramion + zwisy na drążku", sets:"2–3 × 10 s", badge:"warm", note:"Swobodny zwis, barki rozluźnione. Przed pierwszym ćwiczeniem zrób jedną serię na połowie ciężaru."}
];
const STRETCH = p => [
  {id:p+"-s1", name:"Rozciąganie pod pachą przy framudze", sets:"2 × 30 s / strona", badge:"pull", note:"Chwyć framugę ręką wysoko nad głową i odchyl biodra w bok. Rozluźnia mięśnie, które łapały skurcz przy ławce."},
  {id:p+"-s2", name:"Rozciąganie przedramion", sets:"2 × 30 s / ręka", badge:"climb", note:"Ręka prosta przed sobą, dłonią do góry. Drugą ręką odciągnij palce w dół. Rób też po ściance."}
];

const DAYS = {
  a: {
    label: "Dzień A — pełne nogi",
    warmup: WARMUP("a"),
    main: [
      {id:"a-m1", name:"Uginanie nóg na maszynie", sets:"3 × 10–12", badge:"legs", note:"Wałek jest ZA kostkami, zginasz kolana i ciągniesz pięty do pośladków. Nie myl z maszyną z wałkiem przed piszczelami (prostowanie nóg — wstrzymane do decyzji fizjo)." + HOW("https://www.corahealth.app/pl/exercises/lever-lying-leg-curl")},
      {id:"a-m2", name:"Wyprosty tułowia na ławce rzymskiej 45°", sets:"3 × 10–12", badge:"legs", note:"Biodra na poduszce, nogi proste. Schodź, zginając się w biodrach, i wracaj, ściskając pośladki do linii prostej. Nie przeprostowuj lędźwi. Gdy 3 × 12 jest łatwe: talerz 5 kg przy klatce." + HOW(YT("45+degree+back+extension+glutes"))},
      {id:"a-m3", name:"Wyciskanie hantli na ławce", sets:"3 × 10–12", badge:"push", note:"Łopatki ściągnij w dół i lekko do tyłu na ok. 50% siły, nie do oporu. Łokcie ok. 45° od tułowia. Wdech w dół, wydech w górę. Między seriami 20–30 s zwisu. Jeśli łapie skurcz między łopatkami lub pod pachą: maszyna do wyciskania siedząc." + HOW("https://planfit.ai/exercise/2002")},
      {id:"a-m4", name:"Podciąganie z asystą", sets:"3 × 6–10", badge:"pull", note:"Większy ciężar na maszynie = łatwiej. Ustaw tak, żeby ostatnie 2 powtórzenia były trudne, ale czyste. Przerwa 2 min." + HOW("https://planfit.ai/exercise/assisted-pull-up")},
      {id:"a-m5", name:"Unoszenie prostej nogi leżąc", sets:"3 × 10 / noga", badge:"knee", note:"Leżysz na plecach, druga noga zgięta. Napnij przód uda, unieś prostą nogę do wysokości drugiego kolana, 2 s pauzy, powoli w dół. Gdy 3 × 12 jest łatwe: obciążnik na kostkę 0,5–1 kg." + HOW(YT("straight+leg+raise+knee+exercise"))},
      {id:"a-m6", name:"Unoszenie nóg w zwisie", sets:"3 × 8–10", badge:"core", note:"Na start z ugiętymi kolanami. Bez bujania — podwiń miednicę, nie tylko unoś nogi." + HOW("https://www.strengthlog.com/hanging-leg-raise/")}
    ],
    stretch: STRETCH("a")
  },
  b: {
    label: "Dzień B — lekkie nogi",
    warmup: WARMUP("b"),
    main: [
      {id:"b-m1", name:"Wyciskanie hantli nad głowę, siedząc", sets:"3 × 10–12", badge:"push", note:"Plecy oparte, brzuch napięty, nie wyginaj lędźwi. Hantle prowadź nad głowę, prawie się stykają na górze." + HOW("https://planfit.ai/exercise/3002")},
      {id:"b-m2", name:"Wiosłowanie hantlem", sets:"3 × 10–12 / strona", badge:"pull", note:"Kolano i ręka na ławce. Ciągnij hantel do biodra, łokieć blisko ciała, bez skręcania tułowia." + HOW("https://planfit.ai/exercise/1008")},
      {id:"b-m3", name:"Odwodzenie bioder na maszynie", sets:"3 × 12–15", badge:"legs", note:"Rozsuwaj nogi w kontrolowany sposób, wracaj powoli. Wzmacnia pośladek średni, który stabilizuje kolano." + HOW("https://www.strengthlog.com/hip-abduction-machine/")},
      {id:"b-m4", name:"Wspięcia na palce siedząc", sets:"3 × 15", badge:"legs", note:"Pełny zakres: pięty nisko, potem wysoko na palce, krótka pauza na górze." + HOW("https://planfit.ai/exercise/seated-calf-raise-machine")},
      {id:"b-m5", name:"Unoszenie prostej nogi leżąc", sets:"3 × 10 / noga", badge:"knee", note:"Jak w Dniu A: napnij przód uda, unieś prostą nogę do wysokości drugiego kolana, 2 s pauzy." + HOW(YT("straight+leg+raise+knee+exercise"))},
      {id:"b-m6", name:"Face pull na wyciągu", sets:"3 × 15", badge:"pull", note:"Lina na wysokości twarzy, ciągnij do czoła, łokcie wysoko. Ćwiczenia 6–9 możesz robić w parach: seria jednego, od razu drugiego, potem przerwa." + HOW("https://www.strengthlog.com/face-pull/")},
      {id:"b-m7", name:"Prostowniki nadgarstka z hantlem", sets:"2 × 15–20 / ręka", badge:"climb", note:"Przedramię na udzie, dłoń w dół, ruch tylko w nadgarstku. Przeciwwaga dla palców — chroni łokcie przed przeciążeniem." + HOW("https://planfit.ai/exercise/reverse-dumbbell-wrist-curl")},
      {id:"b-m8", name:"Dead bug", sets:"2 × 8 / strona", badge:"core", note:"Na plecach, kolana pod kątem 90°. Opuszczaj przeciwną rękę i nogę, lędźwie dociśnięte do podłogi." + HOW("https://www.strengthlog.com/dead-bugs/")},
      {id:"b-m9", name:"Pallof press", sets:"2 × 10 / strona", badge:"core", note:"Bokiem do wyciągu, wypchnij uchwyt przed klatkę i nie daj się skręcić. 2 s pauzy z wyprostowanymi rękami." + HOW("https://www.strengthlog.com/pallof-press/")}
    ],
    stretch: STRETCH("b")
  }
};

const CORRECTIVE = [
  {id:"kol1", name:"Ocena kolana rano", sets:"0 / 1 / 2", badge:"knee", note:"Wpisz w polu: 0 = ok, 1 = ból większy niż zwykle, 2 = obrzęk. Przy 1 lub 2 kolejny trening nóg na połowie ciężaru i z 1 serią mniej, albo tylko góra ciała."}
];

const BADGE_LABEL = {warm:"rozgrzewka", legs:"nogi", push:"pchanie", pull:"przyciąganie", core:"core", knee:"kolano", climb:"wspinanie"};
const CLIMB_TYPE = {bouldering:"Bouldering", wedka:"Wędka", panel:"Panel / trening"};

// weekday index from getDay(): 0=Nd,1=Pon,2=Wt,3=Śr,4=Czw,5=Pt,6=Sob
const SCHEDULE = {
  1: {type:"gym", key:"a", label:"Dzień A — pełne nogi"},
  2: {type:"rest", label:"Odpoczynek"},
  3: {type:"gym", key:"b", label:"Dzień B — lekkie nogi"},
  4: {type:"run", key:"any", label:"Ścianka"},
  5: {type:"gym", key:"a", label:"Dzień A — pełne nogi"},
  6: {type:"rest", label:"Odpoczynek"},
  0: {type:"rest", label:"Odpoczynek (albo ścianka)"}
};
const DAY_SHORT = ["Nd","Pon","Wt","Śr","Czw","Pt","Sob"];

/* ---------- STATE ---------- */
let STATE = {sessions:{}};
let STORAGE_OK = true;

function isoDate(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function todayISO(){ return isoDate(new Date()); }

async function loadState(){
  try{
    const res = await window.storage.get('training-log', false);
    if(res && res.value){ STATE = JSON.parse(res.value); }
  }catch(e){
    STATE = {sessions:{}};
  }
  if(!STATE.sessions) STATE.sessions = {};
  if(!STATE.overrides) STATE.overrides = {};
}
let saveTimer=null;
function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      await window.storage.set('training-log', JSON.stringify(STATE), false);
      STORAGE_OK = true;
    }catch(e){ STORAGE_OK = false; }
  }, 250);
}

function getSession(dateISO){
  if(!STATE.sessions[dateISO]){
    STATE.sessions[dateISO] = {exercises:{}, corrective:{}, runs:[]};
  }
  const s = STATE.sessions[dateISO];
  if(!s.exercises) s.exercises = {};
  if(!s.corrective) s.corrective = {};
  if(!s.custom) s.custom = {};
  if(!s.runs) s.runs = [];
  return s;
}

/* ---------- ZAMIANA DNI ---------- */
function effectiveSched(dateISO, wd){
  const ov = (STATE.overrides||{})[dateISO];
  if(ov){
    if(DAYS[ov]) return {type:'gym', key:ov, label:DAYS[ov].label, overridden:true};
    if(ov==='run') return {type:'run', key:'any', label:'Ścianka', overridden:true};
    if(ov==='rest') return {type:'rest', label:'Odpoczynek', overridden:true};
  }
  return SCHEDULE[wd];
}
function setOverride(val){
  if(!STATE.overrides) STATE.overrides = {};
  const iso = (typeof VIEW_DATE !== 'undefined') ? VIEW_DATE : todayISO();
  if(val === 'plan'){ delete STATE.overrides[iso]; }
  else { STATE.overrides[iso] = val; }
  saveState();
  renderAll();
}

/* ---------- RENDER: exercise cards ---------- */
/* ---------- OSTATNI CIĘŻAR + NOTATKA PRZED ODHACZENIEM ---------- */
const OPEN_LOGS = new Set();
function toggleLog(id, kind, dateISO){
  const key = id + '|' + dateISO;
  if(OPEN_LOGS.has(key)) OPEN_LOGS.delete(key); else OPEN_LOGS.add(key);
  renderAll();
}
function lastEntryInfo(exId, kind, beforeISO){
  const dates = Object.keys(STATE.sessions).filter(d => d < beforeISO).sort().reverse();
  for(const d of dates){
    const s = STATE.sessions[d];
    const store = kind === 'corrective' ? (s.corrective||{}) : (s.exercises||{});
    const e = store[exId];
    if(e && e.weight && e.weight.trim()){
      return {date: d, weight: e.weight.trim()};
    }
  }
  return null;
}

function exCardHTML(ex, dateISO, kind){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : (kind === 'custom' ? s.custom : s.exercises);
  const entry = store[ex.id] || {done:false, weight:""};
  const doneClass = entry.done ? "done" : "";
  const struckClass = entry.done ? "struck" : "";
  const logOpen = entry.done || (entry.weight && entry.weight.trim()) || OPEN_LOGS.has(ex.id + '|' + dateISO);
  const showLog = logOpen ? "show" : "";
  const last = (kind === 'custom') ? null : lastEntryInfo(ex.id, kind, dateISO);
  const lastHTML = last ? `<div class="ex-last">Ostatnio: <b>${last.weight.replace(/</g,'&lt;')}</b> · ${fmtDate(last.date)}</div>` : '';
  return `
  <div class="ex-card" data-exid="${ex.id}" data-kind="${kind}" data-date="${dateISO}">
    <div class="ex-top">
      <div class="checkbox ${doneClass}" onclick="toggleEx('${ex.id}','${kind}','${dateISO}')">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="ex-body" onclick="if(event.target.tagName!=='INPUT') toggleLog('${ex.id}','${kind}','${dateISO}')">
        <div class="ex-header">
          <span class="ex-name ${struckClass}">${ex.name}</span>
          <span class="ex-sets">${ex.sets}</span>
        </div>
        ${lastHTML}
        <span class="badge b-${ex.badge}">${BADGE_LABEL[ex.badge]}</span>
        <div class="ex-note">${ex.note}</div>
        <div class="ex-log ${showLog}">
          <input type="text" placeholder="ciężar / notatka (np. 20kg × 10)" value="${entry.weight ? entry.weight.replace(/"/g,'&quot;') : ''}" oninput="updateWeight('${ex.id}','${kind}','${dateISO}', this.value)">
        </div>
      </div>
    </div>
  </div>`;
}

function toggleEx(id, kind, dateISO){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : (kind === 'custom' ? s.custom : s.exercises);
  const entry = store[id] || {done:false, weight:""};
  entry.done = !entry.done;
  store[id] = entry;
  saveState();
  renderAll();
}
function updateWeight(id, kind, dateISO, val){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : (kind === 'custom' ? s.custom : s.exercises);
  const entry = store[id] || {done:false, weight:""};
  entry.weight = val;
  store[id] = entry;
  saveState();
}

/* ---------- RENDER: day panels ---------- */
function renderDayPanel(key){
  const d = DAYS[key];
  const dateISO = todayISO();
  document.getElementById(`list-${key}-warmup`).innerHTML = d.warmup.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  document.getElementById(`list-${key}-main`).innerHTML = d.main.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  document.getElementById(`list-${key}-stretch`).innerHTML = d.stretch.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  const corrEl = document.getElementById(`list-${key}-corrective`);
  if(corrEl) corrEl.innerHTML = CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');
  const custEl = document.getElementById(`list-${key}-custom`);
  if(custEl) custEl.innerHTML = customSectionHTML(dateISO,'p'+key);
}

function renderCorrective(){
  const dateISO = todayISO();
  document.getElementById('list-corrective').innerHTML = CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');
  const custEl = document.getElementById('list-corrective-custom');
  if(custEl) custEl.innerHTML = customSectionHTML(todayISO(),'kor');
}

/* ---------- RENDER: dziś ---------- */
let VIEW_DATE = todayISO();
function shiftViewDate(delta){
  const d = new Date(VIEW_DATE + 'T12:00:00');
  d.setDate(d.getDate() + delta);
  const iso = isoDate(d);
  if(iso > todayISO()) return;
  VIEW_DATE = iso;
  renderAll();
}
function resetViewDate(){ VIEW_DATE = todayISO(); renderAll(); }

function renderDzis(){
  const isToday = VIEW_DATE === todayISO();
  const vd = new Date(VIEW_DATE + 'T12:00:00');
  const wd = vd.getDay();
  const dateISO = VIEW_DATE;
  const sched = effectiveSched(dateISO, wd);
  const ov = (STATE.overrides||{})[dateISO] || 'plan';
  let html = '';

  const navLbl = isToday ? 'Dziś' : vd.toLocaleDateString('pl-PL',{weekday:'long', day:'numeric', month:'short'});
  html += `<div class="date-nav">
    <button class="date-arrow" onclick="shiftViewDate(-1)">‹</button>
    <div class="date-nav-lbl">${navLbl.charAt(0).toUpperCase()+navLbl.slice(1)}${isToday ? '' : ' <button class="date-today-btn" onclick="resetViewDate()">wróć do dziś</button>'}</div>
    <button class="date-arrow" ${isToday ? 'disabled' : ''} onclick="shiftViewDate(1)">›</button>
  </div>`;
  if(!isToday){
    html += `<div class="info-card" style="margin-bottom:10px"><p>Przeglądasz wpis archiwalny — odhaczenia i ciężary zapiszą się pod tą datą.</p></div>`;
  }

  const planSched = SCHEDULE[wd];
  const planShort = planSched.type==='gym' ? ('Dzień '+planSched.key.toUpperCase()) : (planSched.type==='run' ? 'Ścianka' : 'Odpoczynek');
  const chip = (val, lbl) => `<button class="swap-chip ${ov===val?'active':''}" onclick="setOverride('${val}')">${lbl}</button>`;
  html += `<div class="swap-row">
    <span class="swap-lbl">${isToday ? 'Dzisiejszy trening' : 'Trening tego dnia'}:</span>
    ${chip('plan','Wg planu ('+planShort+')')}
    ${chip('a','Dzień A')}
    ${chip('b','Dzień B')}
    ${chip('run','Ścianka')}
    ${chip('rest','Odpoczynek')}
  </div>`;
  if(ov !== 'plan'){
    html += `<div class="info-card" style="margin-bottom:10px"><p>Zamiana dotyczy tylko tego dnia — reszta tygodnia zostaje wg planu. Pamiętaj, żeby oddać zamieniony dzień w innym terminie (np. dziś B zamiast A → w środę zrób A). Nie rób ciężkich nóg dzień przed ścianką..</p></div>`;
  }

  if(sched.type === 'gym'){
    const d = DAYS[sched.key];
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: ${d.label}</div>`;
    html += `<div class="section-label" style="margin-top:14px">Rozgrzewka</div>` + d.warmup.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
    html += `<div class="section-label">Trening właściwy</div>` + d.main.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
    html += `<div class="section-label">Rozciąganie na koniec</div>` + d.stretch.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  } else if(sched.type === 'run'){
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: ${sched.label}</div>`;
    const dayRuns = (getSession(dateISO).runs || []);
    if(!dayRuns.length){
      html += isToday
        ? `<div class="info-card">Przejdź do zakładki <b>Ścianka</b>, żeby zapisać dzisiejszą sesję. Z boulderów schodź po chwytach, nie zeskakuj. W gorszy dzień dla kolana wybierz wędkę.</div>`
        : `<div class="info-card">Brak zapisanej sesji tego dnia. Możesz ją dodać w zakładce <b>Ścianka</b>, wybierając tę datę w polu „Data sesji".</div>`;
    }
  } else {
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: Odpoczynek</div>`;
    html += `<div class="info-card">Dzień bez siłowni. Regeneracja — spacer albo luźny rowerek są ok. Oceń kolano poniżej.</div>`;
  }

  // zapisane biegi danego dnia — widoczne niezależnie od typu dnia
  const runsOfDay = (STATE.sessions[dateISO] && STATE.sessions[dateISO].runs) || [];
  if(runsOfDay.length){
    html += `<div class="section-label">${runsOfDay.length===1 ? 'Zapisana sesja na ściance' : 'Zapisane sesje na ściance'}</div>`;
    html += runsOfDay.map(r=>{
      const detail = [r.distance ? 'max '+r.distance : null, r.duration || null].filter(Boolean).join(' · ');
      return `<div class="run-entry">
        <div class="re-dot" style="background:var(--run)"></div>
        <div class="re-body">
          <div class="re-date">${CLIMB_TYPE[r.type] || r.type}</div>
          <div class="re-detail">${detail || '—'}</div>
          ${r.note ? `<div class="re-note">${r.note}</div>` : ''}
        </div>
        <button class="re-del" onclick="deleteRun('${dateISO}', ${r.ts||0})" aria-label="Usuń sesję">✕</button>
      </div>`;
    }).join('');
  }

  html += `<div class="section-label">Kolano — ocena dnia</div>`;
  html += CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');
  html += customSectionHTML(dateISO,'dzis');

  document.getElementById('dzisContent').innerHTML = html;
}

/* ---------- RENDER: today chip ---------- */
function renderTodayChip(){
  const wd = new Date().getDay();
  const sched = effectiveSched(todayISO(), wd);
  const dot = document.getElementById('todayDot');
  const txt = document.getElementById('todayTxt');
  const colorMap = {gym:'var(--posture)', run:'var(--run)', rest:'var(--ink-soft)'};
  dot.style.background = colorMap[sched.type];
  const dateStr = new Date().toLocaleDateString('pl-PL', {weekday:'long', day:'numeric', month:'long'});
  txt.innerHTML = `<b>${sched.label}</b>${sched.overridden ? ' <span style="color:var(--ink-soft)">(zamienione)</span>' : ''} · ${dateStr}`;
}
function goToday(){ switchTab('dzis'); }

/* ---------- RENDER: schedule grid (info tab) ---------- */
function renderScheduleGrid(){
  const wd = new Date().getDay();
  let html = '';
  for(const i of [1,2,3,4,5,6,0]){
    const s = SCHEDULE[i];
    const cls = s.type === 'rest' ? 'rest' : s.type;
    const todayCls = i===wd ? 'today' : '';
    const shortLbl = s.type==='gym' ? ('Dzień '+s.key.toUpperCase()) : (s.type==='run' ? 'Ścianka' : 'Odp.');
    html += `<div class="day-box ${cls} ${todayCls}">${DAY_SHORT[i]}<span class="lbl">${shortLbl}</span></div>`;
  }
  document.getElementById('scheduleGrid').innerHTML = html;
}

/* ---------- RUNNING ---------- */
function logRun(){
  const type = document.getElementById('runType').value;
  const distance = document.getElementById('runDistance').value.trim();
  const duration = document.getElementById('runDuration').value.trim();
  const note = document.getElementById('runNote').value.trim();
  if(!distance && !duration){
    alert('Podaj przynajmniej wycenę lub czas.');
    return;
  }
  const dateInput = document.getElementById('runDate');
  let dateISO = (dateInput && dateInput.value) ? dateInput.value : todayISO();
  if(dateISO > todayISO()){
    alert('Nie można zapisać sesji z przyszłą datą.');
    return;
  }
  const s = getSession(dateISO);
  s.runs.push({type, distance, duration, note, ts: Date.now()});
  saveState();
  document.getElementById('runDistance').value='';
  document.getElementById('runDuration').value='';
  document.getElementById('runNote').value='';
  renderRunHistory();
  renderProgress();
}

function renderRunHistory(){
  const rows = [];
  const dates = Object.keys(STATE.sessions).sort().reverse();
  for(const date of dates){
    const s = STATE.sessions[date];
    if(s.runs && s.runs.length){
      for(const r of s.runs){
        rows.push({date, ...r});
      }
    }
  }
  const el = document.getElementById('runHistory');
  if(!rows.length){ el.innerHTML = '<div class="empty">Brak zapisanych sesji. Dodaj pierwszą powyżej.</div>'; return; }
  rows.sort((a,b)=> (b.ts||0)-(a.ts||0));
  el.innerHTML = rows.slice(0,20).map(r=>{
    const typeLabel = CLIMB_TYPE[r.type] || r.type;
    const detail = [r.distance ? 'max '+r.distance : null, r.duration || null].filter(Boolean).join(' · ');
    return `<div class="run-entry">
      <div class="re-dot"></div>
      <div class="re-body">
        <div class="re-date">${fmtDate(r.date)} · ${typeLabel}</div>
        <div class="re-detail">${detail || '—'}</div>
        ${r.note ? `<div class="re-note">${r.note}</div>` : ''}
      </div>
      <button class="re-del" onclick="deleteRun('${r.date}', ${r.ts||0})" aria-label="Usuń sesję">✕</button>
    </div>`;
  }).join('');
}

function deleteRun(date, ts){
  const s = STATE.sessions[date];
  if(!s || !s.runs) return;
  const idx = s.runs.findIndex(r => (r.ts||0) === ts);
  if(idx === -1) return;
  const r = s.runs[idx];
  if(!confirm('Usunąć sesję z ' + fmtDate(date) + (r.distance ? ' (max ' + r.distance + ')' : '') + '?')) return;
  s.runs.splice(idx, 1);
  saveState();
  renderAll();
}

function fmtDate(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString('pl-PL', {day:'numeric', month:'short'});
}

/* ---------- PROGRESS ---------- */
function dayHasGym(s){
  return s && ((s.exercises && Object.values(s.exercises).some(e=>e.done)) || (s.custom && Object.values(s.custom).some(e=>e.done)));
}
function dayHasCorrective(s){
  return s && s.corrective && Object.values(s.corrective).some(e=>e.done);
}
function dayHasRun(s){
  return s && s.runs && s.runs.length>0;
}
function dayActive(s){
  return dayHasGym(s) || dayHasCorrective(s) || dayHasRun(s);
}

function renderProgress(){
  // streak: consecutive days (from today backwards) with any activity
  let streak = 0;
  let d = new Date();
  while(true){
    const iso = isoDate(d);
    const s = STATE.sessions[iso];
    if(dayActive(s)){ streak++; d.setDate(d.getDate()-1); }
    else break;
  }
  document.getElementById('statStreak').textContent = streak;

  // this week (Mon-Sun) count of active days
  const now = new Date();
  const wd = now.getDay();
  const mondayOffset = wd===0 ? -6 : 1-wd;
  const monday = new Date(now); monday.setDate(now.getDate()+mondayOffset);
  let weekCount = 0;
  for(let i=0;i<7;i++){
    const dd = new Date(monday); dd.setDate(monday.getDate()+i);
    if(dd > now) continue;
    const iso = isoDate(dd);
    if(dayActive(STATE.sessions[iso])) weekCount++;
  }
  document.getElementById('statWeek').textContent = weekCount+'/7';

  // total runs
  let totalRuns = 0;
  Object.values(STATE.sessions).forEach(s=>{ if(s.runs) totalRuns += s.runs.length; });
  document.getElementById('statRuns').textContent = totalRuns;

  // dot grid: bieżący tydzień + 3 pełne wstecz, wyrównane do poniedziałku
  const cells = [];
  const today = new Date();
  const todayWd = today.getDay();
  const daysBack = 21 + ((todayWd+6)%7);
  const start = new Date(today); start.setDate(today.getDate()-daysBack);
  const totalCells = Math.ceil((daysBack+1)/7)*7;
  for(let i=0;i<totalCells;i++){
    const dd = new Date(start); dd.setDate(start.getDate()+i);
    if(dd > today){ cells.push(null); continue; }
    cells.push(isoDate(dd));
  }
  const grid = document.getElementById('dotgrid');
  grid.innerHTML = cells.map(iso=>{
    if(!iso) return '<div class="dotcell" style="opacity:0"></div>';
    const s = STATE.sessions[iso];
    const bands = [];
    if(dayHasGym(s)) bands.push('var(--posture)');
    if(dayHasRun(s)) bands.push('var(--run)');
    const corr = dayHasCorrective(s);
    // dzień odpoczynku = tylko korekcja, bez siłowni i biegu → wypełnij kolorem odpoczynku
    if(!bands.length && corr) bands.push('var(--rest)');
    let inner = '';
    if(bands.length) inner += `<div class="marks">${bands.map(c=>`<span class="mini" style="background:${c}"></span>`).join('')}</div>`;
    if(corr) inner += `<div class="corr-dot"></div>`;
    return `<div class="dotcell clickable" onclick="openDay('${iso}')">${inner}</div>`;
  }).join('');

  // session log list
  const dates = Object.keys(STATE.sessions).filter(iso=>dayActive(STATE.sessions[iso])).sort().reverse().slice(0,3);
  const logEl = document.getElementById('sessionLog');
  if(!dates.length){ logEl.innerHTML = '<div class="empty">Brak wpisów. Zaznacz ćwiczenia w planie, żeby zaczęły się tu pojawiać.</div>'; return; }
  logEl.innerHTML = dates.map(iso=>{
    const s = STATE.sessions[iso];
    const exDone = Object.values(s.exercises||{}).filter(e=>e.done).length + Object.values(s.custom||{}).filter(e=>e.done).length;
    const corDone = Object.values(s.corrective||{}).filter(e=>e.done).length;
    const runCount = (s.runs||[]).length;
    const parts = [];
    const pl = (n, one, few, many) => n===1 ? one : ((n%10>=2 && n%10<=4 && (n%100<12 || n%100>14)) ? few : many);
    if(exDone) parts.push(exDone+' '+pl(exDone,'ćwiczenie','ćwiczenia','ćwiczeń'));
    if(corDone) parts.push('kolano oceniane');
    if(runCount) parts.push(runCount+' '+pl(runCount,'sesja na ściance','sesje na ściance','sesji na ściance'));
    return `<div class="run-entry clickable" onclick="openDay('${iso}')">
      <div class="re-dot" style="background:var(--posture)"></div>
      <div class="re-body">
        <div class="re-date">${fmtDate(iso)}</div>
        <div class="re-detail">${parts.join(' · ') || '—'}</div>
      </div>
      <span class="re-chev">›</span>
    </div>`;
  }).join('');
}

/* ---------- EKSPORT TYGODNIA ---------- */
function exNameMap(){
  const map = {};
  for(const key of Object.keys(DAYS)){
    const d = DAYS[key];
    [...d.warmup, ...d.main, ...d.stretch].forEach(ex => map[ex.id] = ex.name);
  }
  CORRECTIVE.forEach(ex => map[ex.id] = ex.name);
  return map;
}

function buildWeekExport(){
  const names = exNameMap();
  const now = new Date();
  const wd = now.getDay();
  const mondayOffset = wd===0 ? -6 : 1-wd;
  const monday = new Date(now); monday.setDate(now.getDate()+mondayOffset);

  let lines = [];
  lines.push('PRZEGLĄD TYGODNIA — ' + monday.toLocaleDateString('pl-PL',{day:'numeric',month:'short'}) + ' do ' + now.toLocaleDateString('pl-PL',{day:'numeric',month:'short',year:'numeric'}));
  lines.push('');

  let climbCount = 0, gymCount = 0;
  const knee = [];

  for(let i=0;i<7;i++){
    const dd = new Date(monday); dd.setDate(monday.getDate()+i);
    if(dd > now) break;
    const iso = isoDate(dd);
    const s = STATE.sessions[iso];
    if(!s || !dayActive(s)) continue;
    const dayName = dd.toLocaleDateString('pl-PL',{weekday:'long', day:'numeric', month:'short'});
    lines.push('— ' + dayName.charAt(0).toUpperCase() + dayName.slice(1) + ' —');

    const doneEx = Object.entries(s.exercises||{}).filter(([id,e])=>e.done)
      .concat(Object.entries(s.custom||{}).filter(([id,e])=>e.done).map(([id,e])=>[id,{...e, _customName:(e.name||id)+' (poza planem)'+(e.sets?' '+e.sets:'')}]));
    if(doneEx.length){
      gymCount++;
      const sched = effectiveSched(iso, dd.getDay());
      if(sched && sched.type==='gym') lines.push('Siłownia: ' + sched.label + (sched.overridden ? ' (zamiana)' : ''));
      for(const [id,e] of doneEx){
        const nm = e._customName || names[id] || id;
        lines.push('  • ' + nm + (e.weight ? ' — ' + e.weight : ''));
      }
    }
    if(s.runs && s.runs.length){
      for(const r of s.runs){
        climbCount++;
        lines.push('Ścianka (' + (CLIMB_TYPE[r.type]||r.type) + '): ' + [r.distance?'max '+r.distance:null, r.duration||null].filter(Boolean).join(', ') + (r.note ? ' — ' + r.note : ''));
      }
    }
    const k = (s.corrective||{}).kol1;
    if(k && (k.done || (k.weight && k.weight.trim()))){
      const v = (k.weight||'').trim() || '?';
      knee.push(v);
      lines.push('Kolano: ' + v);
    }
    lines.push('');
  }

  lines.push('PODSUMOWANIE:');
  lines.push('Siłownia: ' + gymCount + ' | Ścianka: ' + climbCount + ' | Oceny kolana: ' + (knee.length ? knee.join(', ') : 'brak'));
  lines.push('');
  lines.push('Samopoczucie 1–5: sen ___, energia ___, palce/łokcie ___, plecy ___');
  return lines.join('\n');
}

async function exportWeek(){
  const text = buildWeekExport();
  const btn = document.getElementById('exportBtn');
  const ok = ()=>{ btn.textContent = 'Skopiowano ✓'; setTimeout(()=>{ btn.textContent = 'Eksport tygodnia 📋'; }, 2000); };
  try{
    await navigator.clipboard.writeText(text);
    ok();
    return;
  }catch(e){ /* fallback poniżej */ }
  try{
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const done = document.execCommand('copy');
    document.body.removeChild(ta);
    if(done){ ok(); return; }
  }catch(e){ /* fallback poniżej */ }
  if(navigator.share){
    try{ await navigator.share({text}); return; }catch(e){}
  }
  alert(text);
}

/* ---------- KOPIA ZAPASOWA ---------- */
function downloadBackup(){
  const payload = {
    app: 'plan-trening',
    format: 1,
    exportedAt: new Date().toISOString(),
    data: STATE
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = todayISO() + '-plan-silownia-kopia.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 5000);
  const btn = document.getElementById('backupBtn');
  if(btn){ btn.textContent = 'Kopia pobrana ✓'; setTimeout(()=>{ btn.textContent = 'Pobierz kopię danych 💾'; }, 2000); }
}

function importBackup(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try{ parsed = JSON.parse(reader.result); }
    catch(e){ alert('To nie jest poprawny plik kopii (błąd odczytu JSON).'); return; }
    const data = (parsed && parsed.app === 'plan-trening' && parsed.data) ? parsed.data : parsed;
    if(!data || typeof data !== 'object' || typeof data.sessions !== 'object' || data.sessions === null){
      alert('To nie wygląda na kopię danych tej aplikacji — brak zapisanych sesji.');
      return;
    }
    const days = Object.keys(data.sessions).length;
    const when = (parsed && parsed.exportedAt) ? new Date(parsed.exportedAt).toLocaleDateString('pl-PL') : 'nieznana data';
    if(!confirm('Wczytać kopię z ' + when + ' (' + days + ' dni z wpisami)?\n\nUWAGA: obecne dane w aplikacji zostaną ZASTĄPIONE danymi z kopii.')) return;
    if(!data.overrides) data.overrides = {};
    STATE = data;
    saveState();
    renderAll();
    alert('Kopia wczytana — przywrócono ' + days + ' dni z wpisami.');
  };
  reader.onerror = () => alert('Nie udało się odczytać pliku.');
  reader.readAsText(file);
}

/* ---------- ĆWICZENIA WŁASNE (poza planem) ---------- */
function customCardHTML(id, entry, dateISO){
  const doneClass = entry.done ? "done" : "";
  const struckClass = entry.done ? "struck" : "";
  const showLog = entry.done ? "show" : "";
  return `
  <div class="ex-card" data-exid="${id}" data-kind="custom" data-date="${dateISO}">
    <div class="ex-top">
      <div class="checkbox ${doneClass}" onclick="toggleEx('${id}','custom','${dateISO}')">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="ex-body">
        <div class="ex-header">
          <span class="ex-name ${struckClass}">${entry.name}</span>
          ${entry.sets ? `<span class="ex-sets">${entry.sets}</span>` : ''}
        </div>
        <div class="ex-log ${showLog}">
          <input type="text" placeholder="ciężar / notatka (np. 20kg × 10)" value="${entry.weight ? entry.weight.replace(/"/g,'&quot;') : ''}" oninput="updateWeight('${id}','custom','${dateISO}', this.value)">
        </div>
      </div>
      <button class="re-del" onclick="deleteCustom('${id}','${dateISO}')" aria-label="Usuń ćwiczenie">✕</button>
    </div>
  </div>`;
}

function customSectionHTML(dateISO, ctx){
  const s = getSession(dateISO);
  const entries = Object.entries(s.custom||{});
  const cards = entries.map(([id,e])=>customCardHTML(id,e,dateISO)).join('');
  return `<div class="section-label">Poza planem — dodaj własne</div>
  ${cards}
  <div class="custom-add">
    <input type="text" id="cname-${ctx}" placeholder="nazwa ćwiczenia (np. wiosłowanie hantlą)">
    <input type="text" id="csets-${ctx}" placeholder="serie × powt. (opcjonalnie)">
    <button class="btn btn-small" onclick="addCustom('${ctx}','${dateISO}')">Dodaj ćwiczenie</button>
  </div>`;
}

function addCustom(ctx, dateISO){
  const nameEl = document.getElementById('cname-'+ctx);
  const setsEl = document.getElementById('csets-'+ctx);
  const name = (nameEl && nameEl.value || '').trim();
  if(!name){ alert('Wpisz nazwę ćwiczenia.'); return; }
  const s = getSession(dateISO);
  const id = 'cst-' + Date.now();
  s.custom[id] = {name: name, sets: (setsEl && setsEl.value || '').trim(), done: true, weight: ''};
  saveState();
  renderAll();
}

function deleteCustom(id, dateISO){
  const s = getSession(dateISO);
  if(!s.custom || !s.custom[id]) return;
  if(!confirm('Usunąć ćwiczenie „' + s.custom[id].name + '"?')) return;
  delete s.custom[id];
  saveState();
  renderAll();
}

/* ---------- OTWIERANIE DNIA Z KALENDARZA ---------- */
function openDay(iso){
  if(iso > todayISO()) return;
  VIEW_DATE = iso;
  renderAll();
  switchTab('dzis');
}

/* ---------- TABS ---------- */
function switchTab(name){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
  document.querySelector(`.tab[data-tab="${name}"]`).classList.add('active');
  window.scrollTo({top:0, behavior:'instant'});
}

function renderAll(){
  renderTodayChip();
  renderDzis();
  renderDayPanel('a');
  renderDayPanel('b');
  renderCorrective();
  renderRunHistory();
  renderProgress();
  renderScheduleGrid();
}

/* ---------- SERVICE WORKER (offline support) ---------- */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

/* ---------- ODŚWIEŻANIE DNIA ---------- */
let LAST_RENDER_DAY = todayISO();
function refreshDayIfChanged(){
  const now = todayISO();
  if(now === LAST_RENDER_DAY) return;
  // nowy dzień: przestaw widok i pole daty biegu na dziś
  LAST_RENDER_DAY = now;
  VIEW_DATE = now;
  const rd = document.getElementById('runDate');
  if(rd){ rd.value = now; rd.max = now; }
  renderAll();
}
document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) refreshDayIfChanged(); });
window.addEventListener('pageshow', refreshDayIfChanged);
window.addEventListener('focus', refreshDayIfChanged);
setInterval(refreshDayIfChanged, 60000);

/* ---------- INIT ---------- */
(async function init(){
  await loadState();
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click', ()=>switchTab(t.dataset.tab));
  });
  const rd = document.getElementById('runDate');
  if(rd){ rd.value = todayISO(); rd.max = todayISO(); }
  LAST_RENDER_DAY = todayISO();
  renderAll();
  switchTab('dzis');
})();
