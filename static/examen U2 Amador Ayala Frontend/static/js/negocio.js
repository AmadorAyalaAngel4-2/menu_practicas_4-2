// ============================================================
// script.js - Funcionalidad general del sitio web responsivo
// ============================================================
// Comentario inicial que explica el proposito general del archivo: controla menu, audio y galeria modal.

// ?? Coloca automaticamente el ano actual en el footer
document.getElementById("year").textContent = new Date().getFullYear(); // Busca el elemento con id "year" y reemplaza su texto con el ano actual obtenido por new Date().getFullYear(); permite que el footer siempre muestre el ano vigente.

// ============================================================
// ?? MENU RESPONSIVO (boton hamburguesa)
// ============================================================

const btnToggle = document.querySelector(".menu-toggle"); // Selecciona el primer elemento del DOM con la clase .menu-toggle (el boton hamburguesa) y lo guarda en btnToggle.
const navMenu = document.querySelector(".menu"); // Selecciona la lista .menu (ul de navegacion) y la guarda en navMenu.

btnToggle.setAttribute("aria-expanded", "false"); // Asegura que el atributo aria-expanded este inicializado a "false" (indica que el menu esta cerrado para lectores de pantalla).
btnToggle.setAttribute("aria-label", "Abrir menu de navegacion"); // Establece un aria-label descriptivo para accesibilidad (lo que leera un lector de pantalla).

btnToggle.addEventListener("click", () => { // Anade un listener para el evento 'click' al boton hamburguesa.
  const open = navMenu.classList.toggle("active"); // Alterna la clase "active" en navMenu; retorna true si la clase quedo anadida (menu abierto), false si se removio (cerrado).
  btnToggle.setAttribute("aria-expanded", String(open)); // Actualiza aria-expanded en el boton con el nuevo estado (true/false) convertido a string para accesibilidad.
});

navMenu.querySelectorAll("a").forEach((a) => { // Selecciona todos los enlaces dentro de navMenu y itera sobre ellos.
  a.addEventListener("click", () => { // Para cada enlace anade un listener de 'click'.
    if (navMenu.classList.contains("active")) { // Si el menu tiene la clase "active" (esta abierto)...
      navMenu.classList.remove("active"); // ...remueve la clase "active" para cerrarlo.
      btnToggle.setAttribute("aria-expanded", "false"); // Actualiza aria-expanded a "false" en el boton (estado accesible coherente).
    }
  });
});

document.addEventListener("keydown", (e) => { // Anade un listener al documento para detectar teclas presionadas.
  if (e.key === "Escape" && navMenu.classList.contains("active")) { // Si la tecla es Escape y el menu esta abierto...
    navMenu.classList.remove("active"); // ...cierra el menu removiendo la clase "active".
    btnToggle.setAttribute("aria-expanded", "false"); // Actualiza aria-expanded del boton a "false".
  }
});

document.addEventListener("click", (e) => { // Anade listener global para clicks en el documento (permite cerrar menu al clicar fuera).
  const clickEnHeader = e.target.closest("header"); // Busca el ancestro mas cercano <header> desde el objetivo del click; si no existe devuelve null.
  if (!clickEnHeader && navMenu.classList.contains("active")) { // Si el click NO ocurrio dentro del header y el menu esta abierto...
    navMenu.classList.remove("active"); // ...remueve la clase "active" (cierra el menu).
    btnToggle.setAttribute("aria-expanded", "false"); // Actualiza aria-expanded a "false".
  }
});

// ============================================================
// ?? AUDIO CONTROL (testimonio con sonido real y compatibilidad)
// ============================================================

const audio = document.getElementById("bg-music"); // Obtiene el elemento <audio> por id "bg-music" y lo guarda en la variable audio.
const toggle = document.getElementById("toggleAudio"); // Obtiene el boton de control de audio por id "toggleAudio" y lo guarda en toggle.

if (audio && toggle) { // Comprueba que ambos elementos existen antes de anadir logica (evita errores si alguno no esta presente).
  audio.volume = 0.8; // Ajusta el volumen inicial del audio al 80% (valor entre 0.0 y 1.0).
  audio.muted = true; // Inicia silenciado (true) para respetar politicas del navegador que requieren interaccion del usuario para reproducir sonido.
  toggle.textContent = "?? Reproducir testimonio"; // Establece el texto visible del boton en estado inicial (indica reproducir).

  // ?? Funcion principal de alternancia
  const toggleAudio = async () => { // Declara una funcion asincrona para alternar reproduccion y manejar posibles promesas/rechazos del reproductor.
    try {
      if (audio.paused) { // Si el audio esta pausado (no se esta reproduciendo)...
        audio.muted = false; // ...quita el mute para que suene.
        await audio.play();  // Llama a play() que retorna una promesa; await espera a que el navegador permita reproduccion.
        toggle.textContent = "?? Pausar testimonio"; // Cambia texto del boton indicando la accion ahora es pausar.
        toggle.setAttribute("aria-pressed", "true"); // Actualiza aria-pressed a "true" (estado presionado) por accesibilidad.
      } else { // Si no esta pausado (es decir, se esta reproduciendo)...
        audio.pause(); // ...pausa la reproduccion.
        toggle.textContent = "?? Reproducir testimonio"; // Actualiza el texto del boton a reproducir.
        toggle.setAttribute("aria-pressed", "false"); // Actualiza aria-pressed a "false".
      }
    } catch (err) { // Captura errores (p. ej. bloqueo por politica del navegador).
      console.warn("?? El navegador bloqueo el audio. Requiere interaccion.", err); // Log en consola para depuracion.
      toggle.textContent = "?? Haz clic para activar sonido"; // Mensaje alternativo en el boton para indicar que el navegador bloqueo la reproduccion automatica.
    }
  };

  // Evento de clic manual
  toggle.addEventListener("click", toggleAudio); // Anade un listener para click en el boton que ejecuta toggleAudio.

  // En moviles: primer toque desbloquea audio
  document.body.addEventListener(
    "touchstart",
    async () => { // Listener ejecutado una sola vez por { once: true } al primer toque tactil en el body.
      if (audio.paused) { // Si el audio todavia esta pausado...
        try {
          audio.muted = false; // Quita mute.
          await audio.play(); // Intenta reproducir (puede fallar si navegador bloquea, por eso try/catch).
          toggle.textContent = "?? Pausar testimonio"; // Actualiza el texto del boton si la reproduccion fue exitosa.
        } catch (err) {
          console.warn("Audio bloqueado hasta interaccion tactil:", err); // Si falla, lo registramos en consola.
        }
      }
    },
    { once: true } // El listener se ejecuta solo en el primer evento touchstart y luego se elimina; util para desbloquear autoplay en moviles.
  );

  // ?? Reanuda si se vuelve a presionar play del sistema
  audio.addEventListener("play", () => { // Listener para evento 'play' del elemento audio.
    toggle.textContent = "?? Pausar testimonio"; // Si el audio comienza a reproducirse desde cualquier fuente, actualiza el texto del boton.
  });

  // ?? Pausa si el usuario presiona el boton de pausa del sistema
  audio.addEventListener("pause", () => { // Listener para evento 'pause' del audio.
    toggle.textContent = "?? Reproducir testimonio"; // Actualiza el texto del boton cuando el audio se pausa.
  });
}

// ============================================================
// ?? GALERiA (abrir imagen en modal ampliado)
// ============================================================

const modal = document.getElementById("modal"); // Obtiene el contenedor modal con id "modal".
const modalImg = document.getElementById("modal-img"); // Obtiene la etiqueta <img> dentro del modal donde se mostrara la imagen ampliada.
const modalCaption = document.getElementById("modal-caption"); // Obtiene el elemento para mostrar la leyenda/caption de la imagen.
const closeModal = document.querySelector(".modal-close"); // Selecciona el boton de cierre dentro del modal (.modal-close).

if (modal && modalImg && closeModal) { // Verifica que los elementos del modal existen antes de anadir listeners.
  document.querySelectorAll(".zoomable").forEach((img) => { // Selecciona todas las imagenes con clase .zoomable y itera sobre ellas.
    img.addEventListener("click", () => { // Anade un listener 'click' a cada imagen zoomable.
      modal.classList.add("open"); // Anade la clase "open" al modal para mostrarlo (CSS debe controlar visibilidad/animacion).
      modalImg.src = img.src; // Copia la ruta de la imagen clicada al src del modalImg (muestra la misma imagen ampliada).
      modalCaption.textContent = img.alt; // Copia el atributo alt de la imagen a modalCaption para mostrar la descripcion.
      modal.setAttribute("aria-hidden", "false"); // Actualiza aria-hidden a false indicando que el modal ahora esta visible (accesibilidad).
    });
  });

  closeModal.addEventListener("click", () => { // Listener para el boton de cerrar modal.
    modal.classList.remove("open"); // Remueve la clase "open" para ocultar el modal.
    modal.setAttribute("aria-hidden", "true"); // Restablece aria-hidden a true (modal oculto).
  });

  document.addEventListener("keydown", (e) => { // Listener global para teclas (permitir cerrar modal con Escape).
    if (e.key === "Escape" && modal.classList.contains("open")) { // Si la tecla es Escape y el modal esta abierto...
      modal.classList.remove("open"); // ...cierralo removiendo "open".
      modal.setAttribute("aria-hidden", "true"); // Actualiza aria-hidden a true.
    }
  });

  modal.addEventListener("click", (e) => { // Listener para clicks dentro del modal.
    if (e.target === modal) { // Si el click fue exactamente sobre el fondo del modal (no la imagen ni botones)...
      modal.classList.remove("open"); // ...cierralo removiendo "open".
      modal.setAttribute("aria-hidden", "true"); // Actualiza aria-hidden a true.
    }
  });
}

// ============================================================
// Fin del script
// ============================================================
// Comentario final que indica el fin del archivo JS.
