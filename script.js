let quotes = [];
let screens = [];

const container = document.querySelector(".screens");

fetch("quotes.json")
  .then(r => r.json())
  .then(data => {
    quotes = data;
    spawnScreens();
  });

document.getElementById("next").onclick = spawnScreens;

function spawnScreens() {
  container.innerHTML = "";
  screens = [];

  // Берём 15 случайных цитат
  const shuffled = [...quotes].sort(() => 0.5 - Math.random()).slice(0, 15);

const screamers = [
  { img: "images/scream1.png", audio: "sounds/scream1.mp3" },
  { img: "images/scream2.png", audio: "sounds/scream2.mp3" }
];

let lastScreamer = 0;

function triggerScreamer() {
  const s = screamers[lastScreamer];
  lastScreamer = (lastScreamer + 1) % screamers.length;

  const screamerDiv = document.getElementById("screamer");
  const screamerImg = document.getElementById("screamerImg");
  const screamerAudio = document.getElementById("screamerAudio");

  screamerImg.src = s.img;
  screamerAudio.src = s.audio;
  screamerDiv.style.display = "flex";
  screamerAudio.play();

  // закрыть через 1.5 секунды
  setTimeout(() => {
    screamerDiv.style.display = "none";
  }, 1500);
}

// случайный скример каждые 15–30 секунд
setInterval(() => {
  if (Math.random() < 0.25) { // 25% шанс
    triggerScreamer();
  }
}, 15000 + Math.random()*15000);

// скример по кнопке
document.getElementById("screamerBtn").onclick = triggerScreamer;


  shuffled.forEach(q => {
    const img = document.createElement("img");
    img.className = "screen";
    img.src = q.image;

    // Стартовая позиция около центра с небольшим разбросом
    const x = window.innerWidth / 2 - 140 + (Math.random() - 0.5) * 200; // +-100px
    const y = window.innerHeight / 2 - 90 + (Math.random() - 0.5) * 200;  // +-100px

    // Скорость медленная и случайная
    const vx = (Math.random() * 0.6 + 0.4) * (Math.random() < 0.5 ? -1 : 1);
    const vy = (Math.random() * 0.6 + 0.4) * (Math.random() < 0.5 ? -1 : 1);

    container.appendChild(img);

    screens.push({ img, x, y, vx, vy, paused: false });

    // Hover: увеличение и пауза
    img.addEventListener("mouseenter", () => {
      const s = screens.find(sc => sc.img === img);
      if (!s) return;
      s.paused = true;
      img.style.transform += " scale(1.4)";
      img.style.zIndex = 10;
    });

    img.addEventListener("mouseleave", () => {
      const s = screens.find(sc => sc.img === img);
      if (!s) return;
      s.paused = false;
      img.style.zIndex = 1;
    });
  });
}

function animate() {
  screens.forEach((s, i) => {
    if (s.paused) return;

    s.x += s.vx;
    s.y += s.vy;

    // Ограничение движения по границам
    if (s.x <= 0) { s.vx = Math.abs(s.vx); s.x = 0; }
    if (s.x + 280 >= window.innerWidth) { s.vx = -Math.abs(s.vx); s.x = window.innerWidth - 280; }
    if (s.y <= 0) { s.vy = Math.abs(s.vy); s.y = 0; }
    if (s.y + 180 >= window.innerHeight) { s.vy = -Math.abs(s.vy); s.y = window.innerHeight - 180; }

    // Коллизии между скринами
    for (let j = i + 1; j < screens.length; j++) {
      const b = screens[j];

      const ax = s.x + 140, ay = s.y + 90;
      const bx = b.x + 140, by = b.y + 90;

      const dx = bx - ax;
      const dy = by - ay;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = 140 + 140; // половины ширин суммарно

      if (dist < minDist) {
        // простое отражение
        s.vx *= -1; s.vy *= -1;
        b.vx *= -1; b.vy *= -1;

        // немного раздвигаем, чтобы не застряли
        const overlap = minDist - dist;
        s.x -= (dx / dist) * (overlap / 2);
        s.y -= (dy / dist) * (overlap / 2);
        b.x += (dx / dist) * (overlap / 2);
        b.y += (dy / dist) * (overlap / 2);
      }
    }

    s.img.style.transform = `translate(${s.x}px, ${s.y}px)`;
  });

  requestAnimationFrame(animate);
}

animate();

const bgTracks = [
  "sounds/track1.mp3",
  "sounds/track2.mp3",
  "sounds/track3.mp3",
  "sounds/track4.mp3",
  "sounds/track5.mp3",
  "sounds/track6.mp3",
  "sounds/track7.mp3"
];

const bgMusic = document.getElementById("bgMusic");
let lastTrack = -1;

// Функция для выбора случайного трека
function playRandomTrack() {
  let idx;
  do {
    idx = Math.floor(Math.random() * bgTracks.length);
  } while (idx === lastTrack && bgTracks.length > 1);

  lastTrack = idx;
  bgMusic.src = bgTracks[idx];
  bgMusic.volume = 0.4;
  bgMusic.play();
}

// Автопереключение после окончания трека
bgMusic.addEventListener("ended", playRandomTrack);

// Кнопка для включения музыки
document.getElementById("musicBtn").addEventListener("click", () => {
  playRandomTrack();
  document.getElementById("musicBtn").style.display = "none"; // скрываем кнопку
});

// Кнопка ФИКСИКИ
const fixikiBtn = document.getElementById("fixikiBtn");
const fixikiLog = document.getElementById("fixikiLog");

fixikiBtn.addEventListener("click", () => {
  if (fixikiLog.style.display === "none") {
    fixikiLog.style.display = "block";
  } else {
    fixikiLog.style.display = "none";
  }
});

document.getElementById("PrufBtn").onclick = () => {
  window.location.href = "Allquotes/index.html"; // здесь путь на нужный HTML
};
const Prufshow = document.getElementById("Prufshow");

PrufBtn.addEventListener("click", () => {
  if (Prufshow.style.display === "none") {
    Prufshow.style.display = "block";
  } else {
    Prufshow.style.display = "none";
  }
});

const bottomGif = document.getElementById("bottomGif");

bottomGif.onclick = () => {
  window.location.href = "./GvozdJUMP/index.html"; // ← сюда ссылка на нужную страницу
};

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numFlakes = 100;
const flakes = [];

for(let i = 0; i < numFlakes; i++){
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1, // радиус
    d: Math.random() * 1 + 0.5 // скорость
  });
}

function drawFlakes() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for(let i = 0; i < numFlakes; i++){
    const f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  moveFlakes();
}

function moveFlakes() {
  for(let i = 0; i < numFlakes; i++){
    const f = flakes[i];
    f.y += f.d;
    f.x += Math.sin(f.y * 0.01) * 2; // лёгкое колебание

    if(f.y > canvas.height){
      f.y = 0;
      f.x = Math.random() * canvas.width;
    }
  }
}

// Подстраиваемся под ресайз
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

