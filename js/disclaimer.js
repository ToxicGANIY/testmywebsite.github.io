/* ---------- РАНДОМНАЯ КАПЧА ---------- */

const captchaQuestion = document.getElementById("captchaQuestion");
const captchaInput = document.getElementById("captchaInput");
const captchaBtn = document.getElementById("captchaBtn");
const overlay = document.getElementById("disclaimerOverlay");

const captchas = [
  { q: "Сколько будет 6+7?", a: "13" },
  { q: "Сколько у тебя пальцев на руке?", a: "5" },
  { q: "Напишите слово 'Жопа'", a: "Жопа" },
];

// выбираем случайный вопрос
let currentCaptcha = captchas[Math.floor(Math.random() * captchas.length)];
captchaQuestion.textContent = currentCaptcha.q;

captchaBtn.onclick = () => {
  if (
    captchaInput.value.trim().toLowerCase() ===
    currentCaptcha.a.toLowerCase()
  ) {
    overlay.style.display = "none"; // пуск на сайт
  } else {
    captchaInput.value = "";
    alert("Неправильно! Попробуй ещё раз 😜😈");
  }
};

/* ---------- ЛОГИН (НЕ МЕШАЕТ КАПЧЕ) ---------- */

const loginBtn = document.getElementById("loginBtn");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");
const video = document.getElementById("secretVideo");
const loginError = document.getElementById("loginError");

loginBtn.onclick = () => {
  if (
    loginInput.value === "admin" &&
    passwordInput.value === "admin"
  ) {
    loginError.style.display = "none";

    video.style.display = "block";
    video.muted = false;
    video.play();

    video.onended = () => {
      window.location.href = "next.html";
    };
  } else {
    loginError.style.display = "block";
    passwordInput.value = "";
  }
};
