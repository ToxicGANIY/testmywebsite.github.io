const disclaimerOverlay = document.getElementById("disclaimerOverlay");
const continueBtn = document.getElementById("continueBtn");
const captchaBox = document.getElementById("captchaBox");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaInput = document.getElementById("captchaInput");
const captchaBtn = document.getElementById("captchaBtn");

// Юморная капча
const jokes = [
  { q: "Сколько будет 6+7?", a: "13" },
  { q: "Сколько у тебя пальцев на руке?", a: "5" },
  { q: "Напишите слово 'Жопа'", a: "Жопа" },
  { q: "Страна в которой вы живёте?", a: "Россия" }
];

let selected;

// Показ капчи после нажатия Continue
continueBtn.addEventListener("click", () => {
  continueBtn.style.display = "none";
  captchaBox.style.display = "block";

  // Выбираем случайный вопрос
  selected = jokes[Math.floor(Math.random() * jokes.length)];
  captchaQuestion.textContent = selected.q;
});

// Проверка капчи
captchaBtn.addEventListener("click", () => {
  if (captchaInput.value.trim().toLowerCase() === selected.a.toLowerCase()) {
    disclaimerOverlay.style.display = "none"; // скрываем всё
  } else {
    alert("Неверно! Попробуй ещё раз 😜");
    captchaInput.value = "";
  }
});
