/* =====================================================================
   EDIT EVERYTHING HERE  (nothing below the CONFIG block needs changing)
   ===================================================================== */
const CONFIG = {
  NICKNAME: "Rasmalai",
  ANNIVERSARY_DATE: "1 November 2026",
  MUSIC_FILE: "assets/music/our-song.mp3",

  TOGETHER_MESSAGE:
    "Two months of laughing, learning each other, and making little memories. Here's to the journey so far — and everything still ahead.",

  /* Gallery + final slideshow use this list. Add/remove photos freely. */
  PHOTOS: [
    { file: "photo1.png", caption: "One of my favourite little memories ❤️",           alt: "Us standing together in front of a building" },
    { file: "photo2.png", caption: "A moment worth keeping.",                           alt: "Us standing together outdoors" },
    { file: "photo3.png", caption: "A little piece of our story.",                      alt: "Us together at night" },
    { file: "photo4.png", caption: "Some moments deserve their own little place in the world.", alt: "Us together at night, close" },
    { file: "photo5.png", caption: "More memories to make together.",                   alt: "Us posing together outdoors" }
  ],

  QUIZ: [
    { q: "Who is more dramatic?",
      a: [ { t: "Me 😭",           r: "Self-awareness. Impressive. 👏" },
           { t: "You 💅",          r: "Brave answer. She's reading this. 👀" },
           { t: "Both of us 💀",   r: "Correct. A dramatic duo. 🎭" } ] },
    { q: "What are we?",
      a: [ { t: "A normal couple.", r: "Normal? In this economy? Doubtful. 😌" },
           { t: "A cute couple.",   r: "Obviously. Next question. 💗" },
           { t: "Two idiots who somehow found each other ❤️", r: "The only correct answer. 🥹" } ] },
    { q: "What should our next two months contain?",
      a: [ { t: "More laughs.",     r: "Yes please. 😂" },
           { t: "More memories.",   r: "Camera roll: ready. 📸" },
           { t: "Fewer arguments and better communication.", r: "Wise. Very mature. 🧠✨" },
           { t: "All of the above ❤️", r: "Greedy, but correct. 🏆" } ] }
  ],
  QUIZ_WIN:    "Congratulations! You've survived two months of tolerating me. 🏆",
  QUIZ_HONEST: "But honestly, I'm really happy it's you. ❤️",

  LOVE_CARDS: [
    "You make ordinary moments feel special.",
    "I love the little things that make you uniquely you.",
    "I'm happy that we get to create memories together.",
    "I hope we keep learning to understand each other.",
    "You have a special place in my story."
  ],

  GIFT_HEADLINE: "Happy two months, Rasmalai! ❤️",
  GIFT_TEXT: "Here's to more smiles, more memories, and more little moments that belong to us.",

  /* Each array item is one paragraph. Replace the whole thing with your own words. */
  LETTER: [
    "Hey, Rasmalai. ❤️",
    "Happy two months to us.",
    "Two months ago, we started this little journey together, and I'm genuinely happy that you're part of my life.",
    "I know every day won't be perfect. We'll have silly moments, misunderstandings, random conversations, and probably plenty of reasons to annoy each other. 😂",
    "But I hope we keep learning to understand each other, communicate honestly, and make each other feel appreciated.",
    "Thank you for being part of my story and for the memories we've made so far. I hope we get to create many more together.",
    "I want this little website to remind you that you matter to me and that I'm happy we're writing this story together.",
    "Two months down, and so many memories still waiting to happen.",
    "Happy two-month anniversary, Rasmalai. ❤️",
    "— Your favourite idiot, probably. 😭❤️"
  ],

  FINALE_A: "Two months. One little story. So many memories still waiting to happen. ❤️",
  FINALE_B: "Happy 2 Months, Rasmalai! 💗",
  SLIDE_SECONDS: 5
};

/* ===================== ENGINE (no need to edit) ===================== */
const $ = s => document.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PHOTO_DIR = "assets/photos/";
const sub = t => t.replaceAll("Rasmalai", CONFIG.NICKNAME);
let showToken = 0;

/* ---- Scenes ---- */
function go(id){
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  $("#"+id).classList.add("active");
  window.scrollTo(0,0);
  if (id === "memories") revealPhotos();
  if (id === "quiz") startQuiz();
  if (id === "together") celebrate(0.5,0.3,40);
  if (id === "gift") resetGift();
  if (id === "cinema") runCinema();
  if (id === "letter") runLetter();
  if (id === "show") runShow();
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-next]");
  if (b) go(b.dataset.next);
});

/* ---- Floating hearts ---- */
const GLYPHS = ["❤️","💗","✨","💖","💫"];
setInterval(() => {
  if (document.hidden) return;
  const h = document.createElement("span");
  h.className = "fh";
  h.textContent = document.body.classList.contains("night") ? (Math.random()<.6?"✨":"💗") : GLYPHS[Math.random()*GLYPHS.length|0];
  h.style.left = Math.random()*100 + "%";
  h.style.fontSize = (12 + Math.random()*20) + "px";
  h.style.animationDuration = (9 + Math.random()*9) + "s";
  $("#floaters").appendChild(h);
  setTimeout(() => h.remove(), 19000);
}, 1100);

/* ---- Stars / particles canvas ---- */
const sc = $("#stars"), sx = sc.getContext("2d");
let stars = [];
function sizeCanvas(c){ c.width = innerWidth; c.height = innerHeight; }
function initStars(){
  sizeCanvas(sc);
  stars = Array.from({length: Math.min(160, innerWidth/4)}, () => ({
    x: Math.random()*sc.width, y: Math.random()*sc.height,
    r: Math.random()*1.5+.3, p: Math.random()*6, v: Math.random()*.3+.05
  }));
}
addEventListener("resize", () => { initStars(); sizeCanvas(cf); });
(function drawStars(t=0){
  sx.clearRect(0,0,sc.width,sc.height);
  const night = document.body.classList.contains("night");
  for (const s of stars){
    s.y -= s.v * (night ? .6 : .2);
    if (s.y < -5) { s.y = sc.height+5; s.x = Math.random()*sc.width; }
    const a = (night ? .35 : .15) + .5*Math.abs(Math.sin(t/900 + s.p))*(night ? 1 : .5);
    sx.beginPath(); sx.arc(s.x, s.y, s.r, 0, 7);
    sx.fillStyle = `rgba(255,${230+(s.p*5|0)},255,${a})`;
    sx.shadowColor = "#ffd9f0"; sx.shadowBlur = night ? 8 : 3;
    sx.fill();
  }
  requestAnimationFrame(drawStars);
})();

/* ---- Confetti / sparkle bursts ---- */
const cf = $("#confetti"), cx = cf.getContext("2d");
let bits = [], running = false;
function celebrate(px=.5, py=.4, n=90){
  const cols = ["#ff7aa8","#ffd9a0","#b69cff","#ffc2d6","#fff"];
  const glyphs = ["❤","✦","💗","✨"];
  for (let i=0;i<n;i++){
    const a = Math.random()*Math.PI*2, sp = 3+Math.random()*7;
    bits.push({ x:innerWidth*px, y:innerHeight*py, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp-4,
      c:cols[i%cols.length], g:Math.random()<.35?glyphs[Math.random()*4|0]:null,
      s:6+Math.random()*8, life:1, rot:Math.random()*6 });
  }
  if (!running){ running = true; stepConfetti(); }
}
function stepConfetti(){
  cx.clearRect(0,0,cf.width,cf.height);
  bits = bits.filter(b => b.life > 0);
  for (const b of bits){
    b.x += b.vx; b.y += b.vy; b.vy += .18; b.vx *= .99; b.life -= .008; b.rot += .1;
    cx.globalAlpha = Math.max(b.life,0); cx.fillStyle = b.c;
    if (b.g){ cx.font = b.s*2+"px serif"; cx.fillText(b.g, b.x, b.y); }
    else { cx.save(); cx.translate(b.x,b.y); cx.rotate(b.rot); cx.fillRect(-b.s/2,-b.s/4,b.s,b.s/2); cx.restore(); }
  }
  cx.globalAlpha = 1;
  if (bits.length) requestAnimationFrame(stepConfetti); else running = false;
}

/* ---- 1. Intro ---- */
async function typeInto(el, text, speed=70){
  el.textContent = ""; el.classList.remove("done");
  for (const ch of text){ el.textContent += ch; await sleep(speed); }
  el.classList.add("done");
}
async function runIntro(){
  document.body.classList.remove("night");
  ["#introQ","#introBtns","#introReact","#introReveal","#openWorld"].forEach(s => $(s).classList.add("hidden"));
  go("intro");
  await typeInto($("#introTitle"), `Hey, ${CONFIG.NICKNAME}! ❤️`);
  await sleep(500); $("#introQ").classList.remove("hidden");
  await sleep(700); $("#introBtns").classList.remove("hidden");
}
async function introAnswer(msg){
  $("#introBtns").classList.add("hidden");
  const r = $("#introReact"); r.textContent = msg; r.classList.remove("hidden");
  await sleep(1700);
  r.classList.add("hidden"); $("#introQ").classList.add("hidden");
  $("#introReveal").classList.remove("hidden");
  celebrate(.5,.45,140);
  await sleep(900); celebrate(.2,.5,60); celebrate(.8,.5,60);
  await sleep(700); $("#openWorld").classList.remove("hidden");
}
$("#knowBtn").onclick = () => introAnswer("Of course you do. Smartest girl I know. 😌");
$("#tellBtn").onclick = () => introAnswer("Okay okay, calm down, I'm telling you! 😭");
$("#openWorld").onclick = () => go("memories");

/* ---- 2. Gallery + lightbox ---- */
const photoSrc = p => PHOTO_DIR + p.file;
function buildGallery(){
  const g = $("#gallery");
  CONFIG.PHOTOS.forEach((p,i) => {
    const b = document.createElement("button");
    b.className = "photo"; b.style.setProperty("--tilt", ((i%3)-1)*1.2+"deg");
    b.innerHTML = `<img src="${photoSrc(p)}" alt="${p.alt}" loading="lazy"><span></span>`;
    b.querySelector("span").textContent = sub(p.caption);
    b.onclick = () => openLB(i);
    g.appendChild(b);
  });
}
function revealPhotos(){
  document.querySelectorAll(".photo").forEach((el,i) => { el.classList.remove("in"); setTimeout(() => el.classList.add("in"), 250 + i*220); });
}
let lbIndex = 0;
function showLB(i){
  const n = CONFIG.PHOTOS.length; lbIndex = (i+n)%n;
  const p = CONFIG.PHOTOS[lbIndex], img = $("#lbImg");
  img.style.opacity = 0;
  setTimeout(() => { img.src = photoSrc(p); img.alt = p.alt; $("#lbCap").textContent = sub(p.caption); img.style.opacity = 1; }, 150);
}
function openLB(i){ $("#lightbox").classList.remove("hidden"); showLB(i); }
const closeLB = () => $("#lightbox").classList.add("hidden");
$("#lbClose").onclick = closeLB;
$("#lbPrev").onclick = () => showLB(lbIndex-1);
$("#lbNext").onclick = () => showLB(lbIndex+1);
$("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLB(); });
addEventListener("keydown", e => {
  if ($("#lightbox").classList.contains("hidden")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") showLB(lbIndex-1);
  if (e.key === "ArrowRight") showLB(lbIndex+1);
});
let tx = 0;
$("#lightbox").addEventListener("touchstart", e => tx = e.touches[0].clientX, {passive:true});
$("#lightbox").addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) showLB(lbIndex + (d<0?1:-1)); });

/* ---- 3. Quiz ---- */
let qi = 0;
function startQuiz(){ qi = 0; $("#quizEnd").classList.add("hidden"); document.querySelector(".quizcard").classList.remove("hidden"); renderQ(); }
function renderQ(){
  const q = CONFIG.QUIZ[qi];
  $("#qCount").textContent = `Question ${qi+1} of ${CONFIG.QUIZ.length}`;
  $("#qText").textContent = sub(q.q);
  $("#qReact").textContent = ""; $("#qNext").classList.add("hidden");
  const box = $("#qAnswers"); box.innerHTML = "";
  q.a.forEach(opt => {
    const b = document.createElement("button"); b.className = "ans"; b.textContent = opt.t;
    b.onclick = () => {
      box.querySelectorAll(".ans").forEach(x => x.disabled = true);
      b.classList.add("picked");
      $("#qReact").textContent = opt.r;
      const r = b.getBoundingClientRect(); celebrate((r.left+r.width/2)/innerWidth, r.top/innerHeight, 22);
      $("#qNext").textContent = qi < CONFIG.QUIZ.length-1 ? "Next question" : "See my result 🏆";
      $("#qNext").classList.remove("hidden");
    };
    box.appendChild(b);
  });
}
$("#qNext").onclick = async () => {
  if (++qi < CONFIG.QUIZ.length) return renderQ();
  document.querySelector(".quizcard").classList.add("hidden");
  $("#quizEnd").classList.remove("hidden");
  $("#quizWin").textContent = CONFIG.QUIZ_WIN; celebrate(.5,.4,120);
  await sleep(1800); $("#quizHonest").textContent = sub(CONFIG.QUIZ_HONEST); $("#quizHonest").classList.remove("hidden");
  await sleep(1200); $("#quizDone").classList.remove("hidden");
};

/* ---- 5. Love cards ---- */
function buildCards(){
  const box = $("#loveCards"); let opened = 0;
  CONFIG.LOVE_CARDS.forEach(msg => {
    const c = document.createElement("button"); c.className = "flip";
    c.innerHTML = `<div><span class="face front">💌</span><span class="face back"></span></div>`;
    c.querySelector(".back").textContent = sub(msg);
    c.onclick = () => {
      if (c.classList.contains("open")) return;
      c.classList.add("open"); const r = c.getBoundingClientRect();
      celebrate(.5, r.top/innerHeight, 16);
      if (++opened >= 1) $("#thingsNext").classList.remove("hidden");
    };
    box.appendChild(c);
  });
}

/* ---- 4. Together ---- */
function fillTogether(){ $("#dateText").textContent = CONFIG.ANNIVERSARY_DATE; $("#togetherMsg").textContent = sub(CONFIG.TOGETHER_MESSAGE); }

/* ---- 6. Gift ---- */
function resetGift(){
  $("#giftBox").classList.remove("open"); $("#giftMsg").classList.add("hidden"); $("#giftPrompt").classList.remove("hidden");
  $("#giftH").textContent = sub(CONFIG.GIFT_HEADLINE); $("#giftP").textContent = CONFIG.GIFT_TEXT;
}
$("#giftBox").onclick = async () => {
  const g = $("#giftBox"); if (g.classList.contains("open")) return;
  g.classList.add("open"); celebrate(.5,.4,160);
  await sleep(500); celebrate(.35,.35,60); celebrate(.65,.35,60);
  await sleep(900);
  $("#giftPrompt").classList.add("hidden"); $("#giftMsg").classList.remove("hidden");
};

/* ---- 7. Cinematic ---- */
async function runCinema(){
  document.body.classList.add("night");
  ["#cine1","#cine2","#tellMe"].forEach(s => $(s).classList.add("hidden"));
  await sleep(2200); $("#cine1").classList.remove("hidden");
  await sleep(3600); $("#cine2").classList.remove("hidden");
  await sleep(2800); $("#tellMe").classList.remove("hidden");
}
$("#tellMe").onclick = () => go("letter");

/* ---- 8. Letter ---- */
async function runLetter(){
  const body = $("#letterBody"); body.innerHTML = ""; $("#letterNext").classList.add("hidden");
  CONFIG.LETTER.forEach(line => { const p = document.createElement("p"); p.textContent = sub(line); body.appendChild(p); });
  await sleep(900);
  for (const p of body.children){
    p.classList.add("show"); p.scrollIntoView({behavior:"smooth", block:"center"});
    await sleep(1400 + p.textContent.length * 38);
  }
  $("#letterNext").classList.remove("hidden"); $("#letterNext").scrollIntoView({behavior:"smooth", block:"center"});
}
$("#letterNext").onclick = () => go("show");

/* ---- 9. Slideshow ---- */
async function runShow(){
  const token = ++showToken, stage = $("#stage");
  $("#finale").classList.add("hidden"); $("#showCap").style.opacity = 0;
  stage.innerHTML = "";
  CONFIG.PHOTOS.forEach(p => {
    const s = document.createElement("div"); s.className = "slide";
    s.innerHTML = `<img class="bgblur" src="${photoSrc(p)}" alt=""><img class="main" src="${photoSrc(p)}" alt="${p.alt}">`;
    stage.appendChild(s);
  });
  const slides = [...stage.children];
  for (let i=0;i<slides.length;i++){
    if (token !== showToken) return;
    slides.forEach(s => s.classList.remove("on")); slides[i].classList.add("on");
    $("#showCap").style.opacity = 0;
    await sleep(900); $("#showCap").textContent = sub(CONFIG.PHOTOS[i].caption); $("#showCap").style.opacity = 1;
    await sleep(CONFIG.SLIDE_SECONDS*1000);
  }
  if (token !== showToken) return;
  slides.forEach(s => s.classList.remove("on")); $("#showCap").style.opacity = 0;
  $("#finaleA").textContent = CONFIG.FINALE_A; $("#finaleB").textContent = sub(CONFIG.FINALE_B);
  $("#finale").classList.remove("hidden"); celebrate(.5,.35,150);
  setTimeout(() => { if (token === showToken) celebrate(.3,.5,60), celebrate(.7,.5,60); }, 1500);
}
$("#restart").onclick = () => { showToken++; runIntro(); };

/* ---- 12. Music (user-initiated only; site works with no file) ---- */
const audio = new Audio(); audio.loop = true; audio.preload = "none";
let audioOK = true;
function toast(t){ const el = $("#toast"); el.textContent = t; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 3200); }
audio.addEventListener("error", () => { audioOK = false; });
$("#playBtn").onclick = async () => {
  if (!audio.src) audio.src = CONFIG.MUSIC_FILE;
  if (audio.paused){
    try { await audio.play(); $("#playBtn").classList.add("on"); $("#playBtn").setAttribute("aria-label","Pause music"); }
    catch { toast("No song found yet. Add " + CONFIG.MUSIC_FILE + " to enable music 🎵"); }
  } else { audio.pause(); $("#playBtn").classList.remove("on"); $("#playBtn").setAttribute("aria-label","Play music"); }
};
$("#muteBtn").onclick = () => { audio.muted = !audio.muted; $("#muteBtn").textContent = audio.muted ? "🔇" : "🔊"; $("#muteBtn").setAttribute("aria-label", audio.muted ? "Unmute" : "Mute"); };

/* ---- Boot ---- */
document.title = `Us ❤️ ${CONFIG.NICKNAME}`;
initStars(); sizeCanvas(cf);
buildGallery(); buildCards(); fillTogether();
runIntro();
