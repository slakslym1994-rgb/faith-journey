const $ = (id) => document.getElementById(id);
const STORAGE = "faithJourney_v1";
const defaults = {
  day:0, habits:{}, prayers:[], journal:[], goal:"",
  quizBest:0
};
let state = loadState();
function loadState(){try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE)||"{}")}}catch{return {...defaults}}}
function saveState(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
const days=[
 {title:"Bly naby aan Jesus",ref:"Johannes 15:1–8",summary:"Lees die gedeelte in jou eie Afrikaans 2020-Bybel. Let op hoe Jesus die beeld van die wingerdstok gebruik om te verduidelik hoe belangrik dit is om in Hom te bly.",question:"Wat beteken dit vir jou om elke dag in Jesus te bly?",challenge:"Neem vyf rustige minute om met God te praat en vertel Hom wat op jou hart is."},
 {title:"God se liefde",ref:"Romeine 8:31–39",summary:"Lees oor die sekerheid van God se liefde. Dink na oor wat hierdie gedeelte jou leer wanneer jy onseker of moedeloos voel.",question:"Hoe beïnvloed die wete dat God jou liefhet jou daaglikse lewe?",challenge:"Herinner iemand vandag aan hulle waarde en wys vir hulle opregte liefde."},
 {title:"Vertrou op God",ref:"Spreuke 3:5–6",summary:"Lees die gedeelte en dink oor die verskil tussen om net op jou eie insig staat te maak en om God se leiding te soek.",question:"In watter deel van jou lewe het jy God se leiding nodig?",challenge:"Bid spesifiek oor een besluit of bekommernis en vra vir wysheid."},
 {title:"Leer om te vergewe",ref:"Efesiërs 4:25–32",summary:"Lees hoe gelowiges geroep word om vriendelik, deernisvol en vergewensgesind teenoor mekaar te leef.",question:"Hoe kan jy vandag genade aan iemand betoon?",challenge:"Kies om met geduld en vriendelikheid op iemand te reageer."},
 {title:"Gebed en vrede",ref:"Filippense 4:4–9",summary:"Lees hoe Paulus gelowiges aanmoedig om hulle bekommernisse in gebed na God te bring en op dit wat goed is te fokus.",question:"Wat wil jy vandag in gebed aan God oorgee?",challenge:"Maak 'n lys van drie dinge waarvoor jy dankbaar is."},
 {title:"Leef soos Jesus",ref:"Matteus 5:1–12",summary:"Lees die Saligsprekinge en let op die waardes wat Jesus beklemtoon.",question:"Watter eienskap wat Jesus beskryf, wil jy sterker uitleef?",challenge:"Doen iets goed vir iemand sonder om erkenning daarvoor te verwag."},
 {title:"Liefde in aksie",ref:"1 Korintiërs 13:1–13",summary:"Lees oor die aard van liefde. Dink hoe hierdie beskrywing in jou verhoudings sigbaar kan word.",question:"Hoe kan jy vandag liefde prakties wys?",challenge:"Luister met aandag na iemand en reageer met begrip."}
];
const habitNames=["Lees vandag se Bybelgedeelte","Bid en praat eerlik met God","Dink na oor die oordenking","Pas een lering van Jesus toe","Bedank God voor jy gaan slaap"];
function renderDay(){
 const d=days[state.day%7];$("dayTitle").textContent=d.title;$("dayReference").textContent=d.ref;$("daySummary").textContent=d.summary;$("dayQuestion").textContent=d.question;$("dayChallenge").textContent=d.challenge;$("dayCounter").textContent=`Dag ${state.day%7+1} van 7`;
 const key=String(state.day);const checked=state.habits[key]||[];
 $("habits").innerHTML=habitNames.map((name,i)=>`<label class="check-row ${checked[i]?"done":""}"><input type="checkbox" data-habit="${i}" ${checked[i]?"checked":""}><span>${name}</span></label>`).join("");
 updateHabitProgress();
}
function updateHabitProgress(){const arr=state.habits[String(state.day)]||[];const n=habitNames.filter((_,i)=>arr[i]).length;$("habitCount").textContent=`${n} / 5`;$("habitProgress").style.width=`${n/5*100}%`}
document.addEventListener("change",e=>{if(e.target.matches("[data-habit]")){const i=Number(e.target.dataset.habit),key=String(state.day);state.habits[key] ||= [];state.habits[key][i]=e.target.checked;saveState();e.target.closest(".check-row").classList.toggle("done",e.target.checked);updateHabitProgress()}});
$("resetHabits").onclick=()=>{state.habits[String(state.day)]=[];saveState();renderDay()};
$("prevDay").onclick=()=>{state.day=Math.max(0,state.day-1);saveState();renderDay()};
$("nextDay").onclick=()=>{state.day++;saveState();renderDay()};
function showTab(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===id));window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.go)));

let prayers=state.prayers;
function renderPrayers(){$("savedPrayers").innerHTML=prayers.length?prayers.slice().reverse().map((p,idx)=>`<div class="saved-item"><small>${new Date(p.date).toLocaleString("af-ZA")}</small><p>${escapeHtml(p.text)}</p><button class="delete-btn" data-delete-prayer="${prayers.length-1-idx}">Verwyder</button></div>`).join(""):'<p class="muted">Jou gestoorde gebede sal hier verskyn.</p>'}
$("savePrayer").onclick=()=>{const text=$("prayerText").value.trim();if(!text){$("prayerStatus").textContent="Skryf eers jou gebed.";return}prayers.push({text,date:Date.now()});state.prayers=prayers;saveState();$("prayerText").value="";$("prayerStatus").textContent="Jou gebed is op hierdie toestel gestoor.";renderPrayers()};
$("clearPrayer").onclick=()=>{$("prayerText").value="";$("prayerStatus").textContent=""};
$("savedPrayers").addEventListener("click",e=>{if(e.target.dataset.deletePrayer!==undefined){prayers.splice(Number(e.target.dataset.deletePrayer),1);state.prayers=prayers;saveState();renderPrayers()}});
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderJournal(){$("journalEntries").innerHTML=state.journal.length?state.journal.slice().reverse().map((j,idx)=>`<div class="saved-item"><small>${new Date(j.date).toLocaleString("af-ZA")}</small><strong>${escapeHtml(j.title||"My refleksie")}</strong><p>${escapeHtml(j.text)}</p><button class="delete-btn" data-delete-journal="${state.journal.length-1-idx}">Verwyder</button></div>`).join(""):'<p class="muted">Nog geen inskrywings nie.</p>'}
$("saveJournal").onclick=()=>{const text=$("journalText").value.trim();if(!text){$("journalStatus").textContent="Skryf eers jou refleksie.";return}state.journal.push({title:$("journalTitle").value.trim(),text,date:Date.now()});saveState();$("journalTitle").value="";$("journalText").value="";$("journalStatus").textContent="Joernaalinskrywing gestoor.";renderJournal()};
$("journalEntries").addEventListener("click",e=>{if(e.target.dataset.deleteJournal!==undefined){state.journal.splice(Number(e.target.dataset.deleteJournal),1);saveState();renderJournal()}});
$("saveGoal").onclick=()=>{state.goal=$("goalText").value.trim();saveState();$("goalStatus").textContent="Jou doelwit is gestoor."};

const questions=[
 {q:"Wat het Jesus die grootste gebod genoem?",o:["Om ryk te word","Om God met jou hele hart lief te hê","Om beroemd te word"],a:1,why:"Jesus leer dat ons God heelhartig moet liefhê en ons naaste soos onsself."},
 {q:"Wie het Jesus drie keer verloën?",o:["Petrus","Johannes","Tomas"],a:0,why:"Petrus het Jesus drie keer verloën voordat die haan gekraai het."},
 {q:"Waar vind ons die vrug van die Gees?",o:["Galasiërs 5:22–23","Genesis 1:1","Openbaring 1:1"],a:0,why:"Galasiërs 5:22–23 beskryf die vrug van die Gees."},
 {q:"In watter dorp is Jesus gebore?",o:["Nasaret","Betlehem","Jerusalem"],a:1,why:"Die Evangelies vertel dat Jesus in Betlehem gebore is."},
 {q:"Wat het Jesus vir sy dissipels geleer om te bid?",o:["Die Onse Vader","Die Tien Gebooie","Psalm 23"],a:0,why:"Jesus gee die Onse Vader as 'n voorbeeld van gebed in Matteus 6."}
];
let qIndex=0,answered=false;
function renderQuiz(){const q=questions[qIndex];$("quizQuestion").textContent=q.q;$("quizOptions").innerHTML=q.o.map((o,i)=>`<button class="quiz-option" data-answer="${i}">${o}</button>`).join("");$("quizFeedback").textContent="";$("nextQuiz").disabled=true;answered=false}
$("quizOptions").addEventListener("click",e=>{if(e.target.dataset.answer===undefined||answered)return;answered=true;const n=Number(e.target.dataset.answer),q=questions[qIndex];document.querySelectorAll(".quiz-option").forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("selected")});$("quizFeedback").textContent=(n===q.a?"Reg so! ":"Nie heeltemal nie. ")+q.why;if(n===q.a){state.quizBest=(state.quizBest||0)+1;saveState()}$("nextQuiz").disabled=false});
$("nextQuiz").onclick=()=>{qIndex=(qIndex+1)%questions.length;renderQuiz()};
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
let deferredPrompt=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").hidden=false});
$("installBtn").onclick=async()=>{if(!deferredPrompt){toast("Gebruik jou blaaier se Voeg by tuisskerm-opsie.");return}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").hidden=true};
renderDay();renderPrayers();renderJournal();$("goalText").value=state.goal||"";renderQuiz();
