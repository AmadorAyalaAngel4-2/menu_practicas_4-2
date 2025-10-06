const header = document.querySelector(".site-header .nav");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

const visor = document.getElementById('visor');
const visorImg = document.getElementById('visorImg');
const btnClose = document.getElementById('closeVisor');

document.querySelectorAll('.galeria img').forEach((img, idx) => {
  img.addEventListener('click', () => {
    visorImg.src = img.src;
    visor.classList.add('open');
  });
});

btnClose.addEventListener('click', () => visor.classList.remove('open'));

document.getElementById('year').textContent = new Date().getFullYear()