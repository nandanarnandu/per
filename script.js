/******** LETTER ********/
const letterText = `
Happy birthday to the sweetest, coolest, most chaotic alien currently stationed on Earth! You somehow manage to make every room feel louder, brighter, and more alive just by existing in it. You’re dangerously overconfident, hilariously judgmental, and weirdly capable of doing absolutely anything once you decide you can. Beneath all that chaos, humour, and unpredictability, you're one of the nicest humans to orbit around, and the universe is lucky you landed here. 🎉🛸💫
`;
document.getElementById("letter").innerHTML = letterText.replace(/\n/g,"<br>");

document.getElementById("openLetterBtn").onclick = () => {
  document.getElementById("letterModal").style.display="flex";
};
document.getElementById("closeLetterBtn").onclick = () => {
  document.getElementById("letterModal").style.display="none";
};

/******** POLAROID ZOOM ********/
document.querySelectorAll(".polaroid").forEach((p,i)=>{
  const r = (Math.random()*20 - 10).toFixed(1)+"deg"; // random tilt
  const d = (Math.random()*1.8).toFixed(2)+"s";       // random delay
  p.style.setProperty("--r", r);
  p.style.setProperty("--d", d);
});

const zoomModal=document.getElementById("zoomModal");
const zoomImg=document.getElementById("zoomImg");
const zoomClose=document.getElementById("zoomClose");

document.querySelectorAll(".polaroid img").forEach(img=>{
  img.addEventListener("click",()=>{
    zoomImg.src=img.src;
    zoomModal.style.display="flex";
  });
});

zoomClose.onclick=()=>zoomModal.style.display="none";
zoomModal.onclick=e=>{ if(e.target===zoomModal) zoomModal.style.display="none"; };

/******** DREAM CARDS ********/
document.querySelectorAll(".dream-card").forEach(card=>{
  card.addEventListener("click",()=>{
    if(card.classList.contains("revealed")) return;

    const type = card.dataset.type;
    const value = card.dataset.value;
    const back = card.querySelector(".card-back");

    if(type === "text"){
      back.innerText = value;
    } else if(type === "image"){
      back.innerHTML = `<img src="${value}" />`;
    }

    card.classList.add("flipped","revealed");
  });
});

/******** CAPSULES ********/
document.querySelectorAll(".capsule").forEach(c=>{
  c.onclick=()=>{
    document.querySelectorAll(".capsule.open").forEach(x=>x.classList.remove("open"));
    c.classList.add("open");
    c.textContent=c.dataset.msg;
  };
});

/******** STARS BG ********/
const layer1=document.getElementById("stars-layer-1").getContext("2d");
const layer2=document.getElementById("stars-layer-2").getContext("2d");
const layer3=document.getElementById("stars-layer-3").getContext("2d");
const shooting=document.getElementById("shooting-stars").getContext("2d");

const W=innerWidth,H=innerHeight;

let stars1=Array(70).fill().map(()=>({x:Math.random()*W,y:Math.random()*H,s:1+Math.random()*1}));
let stars2=Array(120).fill().map(()=>({x:Math.random()*W,y:Math.random()*H,s:0.6+Math.random()*0.9}));
let stars3=Array(180).fill().map(()=>({x:Math.random()*W,y:Math.random()*H,s:0.3+Math.random()*0.6}));

let shootingStars=[];

setInterval(()=>{
  shootingStars.push({
    x:Math.random()*W,
    y:Math.random()*H*0.4,
    vx:-6-Math.random()*4,
    vy:1+Math.random()*2,
    life:0
  })
},1200);

function draw(){
  function layer(ctx,arr,spd){
    ctx.clearRect(0,0,W,H);
    arr.forEach(s=>{
      ctx.fillStyle="rgba(220,240,255,0.8)";
      ctx.fillRect(s.x,s.y,s.s,s.s);
      s.x-=spd;if(s.x<0)s.x=W;
    });
  }
  layer(layer1,stars1,0.3);
  layer(layer2,stars2,0.6);
  layer(layer3,stars3,1.2);

  shooting.clearRect(0,0,W,H);
  shootingStars.forEach(s=>{
    shooting.fillStyle="rgba(255,255,255,0.8)";
    shooting.fillRect(s.x,s.y,4,2);
    s.x+=s.vx; s.y+=s.vy; s.life++;
  });
  shootingStars=shootingStars.filter(s=>s.life<90);

  requestAnimationFrame(draw);
}
draw();



// ===== SPAWN 24 CANDLES =====
const candleLayer = document.getElementById("candle-layer");
const total = 24;

for (let i = 0; i < total; i++) {
  const angle = (i / total) * Math.PI * 2;
  const radius = 80;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.35; // slight ellipse for perspective

  const c = document.createElement("div");
  c.className = "candle";
  c.style.left = `calc(50% + ${x}px)`;
  c.style.bottom = `calc(50% + ${y}px)`;

  const f = document.createElement("div");
  f.className = "flame";
  c.appendChild(f);
  candleLayer.appendChild(c);
}

// ===== BLOW ACTION =====
document.getElementById("blow-btn").onclick = () => {
  document.querySelectorAll(".flame").forEach(f => f.remove());
  showFireworks();
  showBirthdayMessage();
};

// ===== MESSAGE =====
function showBirthdayMessage() {
  document.getElementById("birthday-message").style.opacity = 1;
}

// ===== FIREWORKS =====
const fw = document.getElementById("cake-fireworks");
const ctx = fw.getContext("2d");
fw.width = innerWidth;
fw.height = innerHeight;

let sparks = [];

function showFireworks() {
  for (let i = 0; i < 6; i++) launchFirework();
  animateFW();
}

function launchFirework() {
  const colors = ["#ffdd57","#ff8f2d","#ff3d3d","#ffdca1"];
  const x = Math.random()*innerWidth;
  const y = Math.random()*innerHeight*0.4;

  const p = [];
  for (let i = 0; i < 45; i++) {
    p.push({
      x, y,
      vx:(Math.random()-0.5)*4,
      vy:(Math.random()-0.5)*4,
      life:60+Math.random()*40,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
  sparks.push(p);
}

function animateFW() {
  ctx.clearRect(0,0,fw.width,fw.height);
  sparks.forEach((p,i)=>{
    p.forEach(s=>{
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x, s.y, 3, 3);
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.03;
      s.life--;
    });
    sparks[i] = p.filter(s => s.life > 0);
  });

  sparks = sparks.filter(p => p.length > 0);
  if (sparks.length) requestAnimationFrame(animateFW);
}
