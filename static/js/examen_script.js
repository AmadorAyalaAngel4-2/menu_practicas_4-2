const btnToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".menu");
const audio = document.getElementById("bg-music");
const toggle = document.getElementById("toggleAudio");
toggle.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    audio.play();
    toggle.textContent = "🔊 Desactivar sonido";
  } else {
    audio.muted = true;
    toggle.textContent = "🔇 Activar sonido";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

btnToggle.setAttribute("aria-expanded", "false");
btnToggle.setAttribute("aria-label", "Abrir menú de navegación");

btnToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("active");
  btnToggle.classList.toggle("active");
  btnToggle.setAttribute("aria-expanded", String(open));
});

navMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      btnToggle.classList.remove("active");
      btnToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    btnToggle.classList.remove("active");
    btnToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (e) => {
  const clickEnNav = e.target.closest("header");
  if (!clickEnNav && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    btnToggle.classList.remove("active");
    btnToggle.setAttribute("aria-expanded", "false");
  }
});
