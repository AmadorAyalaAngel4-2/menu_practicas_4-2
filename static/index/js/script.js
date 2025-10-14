function mostrarTareas(mes) {
  const tareas = {
    septiembre: [
      { texto: "HTML - CSS - JS - Audio", url: "static/audio/audio.html" },
      { texto: "HTML - CSS - JS - Video", url: "static/video/video.html" },
    ],
    octubre: [
      {
        texto: "Practica fotografias varios - Amador Ayala",
        url: "/imagenes/imagenes.html",
      },
      {
        texto: "Practica General Examen - Amador Ayala",
        url: "/examen/examen.html",
      },
      {
        texto: "Examen U2 - Amador Ayala",
        url: "../examen/examen.html",
      },
    ],
    noviembre: [
      {
        texto: "HTML - CSS - JS - Responsivos",
        url: "https://misitio.com/ej-5",
      },
      {
        texto: "HTML - CSS - JS - Animaciones",
        url: "https://misitio.com/ej-6",
      },
    ],
  };

  const lista = document.querySelector("#lista-tareas");
  lista.innerHTML = "";
  lista.classList.add("oculto");

  tareas[mes].forEach((tarea) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${tarea.url}" target="_blank">${tarea.texto}</a>`;
    lista.appendChild(li);
  });

  lista.classList.remove("oculto");
}

function mostrarMensaje() {
  const comentario = document.querySelector("#comentario").value;
  if (comentario.replace(/ /g, "") === "") {
    alert("Pofavor escribe un comentario antes de enviar!!!");
  } else {
    alert(`Gracias por tu retroalimentación :)`);
  }
  document.querySelector("#comentario").value = "";
}

function ocultarLista() {
  const lista = document.querySelector("#lista-tareas");
  lista.classList.add("oculto");
  lista.innerHTML = "";
}
