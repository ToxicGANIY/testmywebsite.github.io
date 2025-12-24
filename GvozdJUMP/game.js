const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ------------------ СЦЕНЫ ------------------
const SCENE = {
    MENU: 0,
    DIALOG: 1,
    GAME: 2,
    WIN: 3,
    DEATH: 4,
    FINAL: 5
};

let finalStep = 0;
let scene = SCENE.MENU;

// ------------------ УРОВНИ ------------------
let currentLevel = 1;
const MAX_LEVELS = 3;

// ------------------ КНОПКИ ------------------
const jumpBtn = document.getElementById("jumpBtn");
const cheatBtn = document.getElementById("cheatBtn");

// ------------------ СОСТОЯНИЯ ------------------
let godMode = false;
let passedSpikes = 0;
const SPIKES_COUNT = 67;
let levelFinished = false;
let dialogStep = 0;

// ------------------ КАРТИНКИ ------------------
function img(src) {
    const i = new Image();
    i.src = src;
    return i;
}

const images = {
    menuBg: img("assets/menu_bg.png"),
    btnStart: img("assets/btn_start.png"),
    btnSoon: img("assets/btn_soon.png"),

    bg1: img("assets/bg_lvl1.png"),
    bg2: img("assets/bg_lvl2.png"),
    bg3: img("assets/bg_lvl3.png"),

    dialog1: img("assets/dialog_lvl1.png"),
    dialog2: img("assets/dialog_lvl2.png"),
    dialog3: img("assets/dialog_lvl3.png"),
	death: img("assets/death.png"),

	final1: img("assets/cutscene1.png"),
	final2: img("assets/cutscene2.png"),

    player: img("assets/player.png"),
    spike: img("assets/spike.png"),
    win: img("assets/win.png"),
    btnNext: img("assets/btn_next.png")
};

// ------------------ КНОПКИ НА CANVAS ------------------
const startBtn = { x: 0, y: 0, w: 300, h: 100 };
const soonBtn  = { x: 0, y: 0, w: 300, h: 100 };
const nextBtn  = { x: 0, y: 0, w: 300, h: 100 };

// ------------------ ИГРОК ------------------
const player = {
    x: 120,
    y: 0,
    w: 60,
    h: 60,
    vy: 0,
    onGround: false
};

const gravity = 0.8;
const speed = 6;
const groundY = canvas.height - 120;

// ------------------ ШИПЫ ------------------
let spikes = [];

// ------------------ УТИЛИТЫ ------------------
function hit(a, x, y) {
    return x >= a.x && x <= a.x + a.w && y >= a.y && y <= a.y + a.h;
}

function rectHit(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// ------------------ МЕНЮ ------------------
function drawMenu() {
    ctx.drawImage(images.menuBg, 0, 0, canvas.width, canvas.height);

    startBtn.x = canvas.width / 2 - 150;
    startBtn.y = canvas.height / 2 - 120;
    soonBtn.x  = canvas.width / 2 - 150;
    soonBtn.y  = canvas.height / 2 + 20;

    ctx.drawImage(images.btnStart, startBtn.x, startBtn.y, startBtn.w, startBtn.h);
    ctx.drawImage(images.btnSoon, soonBtn.x, soonBtn.y, soonBtn.w, soonBtn.h);
}

// ------------------ ДИАЛОГ ------------------
function drawDialog() {
    const dialog =
        currentLevel === 1 ? images.dialog1 :
        currentLevel === 2 ? images.dialog2 :
        images.dialog3;

    ctx.drawImage(dialog, 0, 0, canvas.width, canvas.height);
}

// ------------------ СТАРТ УРОВНЯ ------------------
function startGame() {
    scene = SCENE.GAME;
    levelFinished = false;
    passedSpikes = 0;

    jumpBtn.style.display = "block";
    cheatBtn.style.display = "block";

    player.y = groundY - player.h;
    player.vy = 0;
    player.onGround = true;

    spikes = [];
    let x = canvas.width + 400;
    for (let i = 0; i < SPIKES_COUNT; i++) {
        spikes.push({
            x,
            y: groundY - 50,
            w: 50,
            h: 50,
            passed: false
        });
        x += 180;
    }
}

// ------------------ ИГРА ------------------
function drawGame() {
    const bg =
        currentLevel === 1 ? images.bg1 :
        currentLevel === 2 ? images.bg2 :
        images.bg3;

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    player.vy += gravity;
    player.y += player.vy;

    if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.onGround = true;
    }

    ctx.drawImage(images.player, player.x, player.y, player.w, player.h);

    for (let s of spikes) {
        s.x -= speed;
        ctx.drawImage(images.spike, s.x, s.y, s.w, s.h);

    if (rectHit(player, s) && !godMode) {
        scene = SCENE.DEATH;
        jumpBtn.style.display = "none";
        cheatBtn.style.display = "none";
    }


        if (!s.passed && s.x + s.w < 0) {
            s.passed = true;
            passedSpikes++;
        }
    }

    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText(`Попкэты: ${passedSpikes}/${SPIKES_COUNT}`, 20, 40);

if (passedSpikes === SPIKES_COUNT && !levelFinished) {
    levelFinished = true;
    jumpBtn.style.display = "none";
    cheatBtn.style.display = "none";

    // если это НЕ 3 уровень — обычная победа
    if (currentLevel < 3) {
        scene = SCENE.WIN;
    } 
    // если 3 уровень — запускаем финальные картинки
    else {
        scene = SCENE.FINAL;
        finalStep = 0;
    }
}

}

// ------------------ ПОБЕДА ------------------
function drawWin() {
    ctx.drawImage(images.win, 0, 0, canvas.width, canvas.height);

    nextBtn.x = canvas.width / 2 - 150;
    nextBtn.y = canvas.height / 2 + 120;

    ctx.drawImage(images.btnNext, nextBtn.x, nextBtn.y, nextBtn.w, nextBtn.h);
}

function drawDeath() {
    ctx.drawImage(images.death, 0, 0, canvas.width, canvas.height);
}

function drawFinal() {
    if (finalStep === 0) {
        ctx.drawImage(images.final1, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(images.final2, 0, 0, canvas.width, canvas.height);
    }
}

function playMusic(src) {
    if (currentMusic === src) return;

    music.pause();
    music.src = src;
    music.currentTime = 0;
    music.play();

    currentMusic = src;
}

// ------------------ УПРАВЛЕНИЕ ------------------
jumpBtn.onclick = () => {
    if (player.onGround) {
        player.vy = -15;
        player.onGround = false;
    }
};

cheatBtn.onclick = () => {
    godMode = !godMode;
    cheatBtn.classList.toggle("active");
};

// ------------------ МУЗЫКА ------------------
const music = new Audio();
music.loop = true;
music.volume = 0.5;

let currentMusic = "";


canvas.addEventListener("click", e => {
    const x = e.clientX;
    const y = e.clientY;

    if (scene === SCENE.MENU) {
        if (hit(startBtn, x, y)) scene = SCENE.DIALOG;
        if (hit(soonBtn, x, y)) alert("Скоро");
    }

    else if (scene === SCENE.DIALOG) {
        startGame();
    }

    else if (scene === SCENE.WIN) {
        if (hit(nextBtn, x, y)) {
            currentLevel++;

            if (currentLevel <= MAX_LEVELS) {
                scene = SCENE.DIALOG;
            } else {
                finalStep = 0;
                scene = SCENE.FINAL;
            }
        }
    }

    else if (scene === SCENE.DEATH) {
        startGame();
    }

    else if (scene === SCENE.FINAL) {
        finalStep++;

        if (finalStep > 1) {
            currentLevel = 1;
            scene = SCENE.MENU;
        }
    }
});


// ------------------ ЦИКЛ ------------------
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ---- МУЗЫКА ПО СЦЕНАМ ----
    if (scene === SCENE.MENU) {
        playMusic("assets/music_menu.mp3");
    }

    if (scene === SCENE.DIALOG) {
        playMusic("assets/music_dialog.mp3");
    }

    if (scene === SCENE.GAME) {
        if (currentLevel === 1) playMusic("assets/music_lvl1.mp3");
        if (currentLevel === 2) playMusic("assets/music_lvl2.mp3");
        if (currentLevel === 3) playMusic("assets/music_lvl3.mp3");
    }

    if (scene === SCENE.WIN) {
        playMusic("assets/music_win.mp3");
    }

    if (scene === SCENE.DEATH) {
        playMusic("assets/music_death.mp3");
    }

    if (scene === SCENE.FINAL) {
        playMusic("assets/music_final.mp3");
    }

    // ---- ОТРИСОВКА ----
    if (scene === SCENE.MENU) drawMenu();
    if (scene === SCENE.DIALOG) drawDialog();
    if (scene === SCENE.GAME) drawGame();
    if (scene === SCENE.FINAL) drawFinal();
    if (scene === SCENE.WIN) drawWin();
    if (scene === SCENE.DEATH) drawDeath();

    requestAnimationFrame(loop);
}


loop();