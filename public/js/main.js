const slides = document.querySelectorAll(".hero-slide");
const cards = document.querySelectorAll(".promo-card");
const dots = document.querySelectorAll(".dot");
let index = 0;
let timer;

function goTo(next) {
  if (!slides.length) return;
  index = (next + slides.length) % slides.length;
  slides.forEach((el, i) => el.classList.toggle("is-active", i === index));
  cards.forEach((el, i) => el.classList.toggle("is-active", i === index));
  dots.forEach((el, i) => el.classList.toggle("is-active", i === index));
}

function start() {
  stop();
  if (slides.length < 2) return;
  timer = setInterval(() => goTo(index + 1), 6500);
}

function stop() {
  clearInterval(timer);
}

document.querySelectorAll(".hero-arrow").forEach((btn) => {
  btn.addEventListener("click", () => {
    goTo(index + Number(btn.dataset.dir));
    start();
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goTo(Number(dot.dataset.go));
    start();
  });
});

const toggle = document.querySelector(".menu-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const modal = document.getElementById("comunicado");
if (modal && !document.body.classList.contains("banca-page") && !sessionStorage.getItem("bmsc-demo-comunicado")) {
  modal.hidden = false;
}

document.querySelector(".modal-close")?.addEventListener("click", () => {
  if (!modal) return;
  modal.hidden = true;
  sessionStorage.setItem("bmsc-demo-comunicado", "1");
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.hidden = true;
    sessionStorage.setItem("bmsc-demo-comunicado", "1");
  }
});

const live = (el) =>
  el.classList.contains("js-live") ||
  el.classList.contains("hero-arrow") ||
  el.classList.contains("dot") ||
  el.classList.contains("modal-close") ||
  el.classList.contains("menu-toggle");

document.addEventListener("click", (event) => {
  const el = event.target.closest("a, button");
  if (!el || live(el)) return;
  event.preventDefault();
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});

start();
