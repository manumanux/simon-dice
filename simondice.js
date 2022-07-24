const $contenedor = document.querySelector("#contenedor");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function colorearRojo(id) {
  setTimeout(function () {
    document.getElementById(id).className = "shape3";
  }, 250);
  setTimeout(function () {
    document.getElementById(id).className = "shape1";
  }, 500);
}

function colorear(id) {
  setTimeout(function () {
    document.getElementById(id).className = "shape2";
  });
  setTimeout(function () {
    document.getElementById(id).className = "shape1";
  }, 250);
}

function jugadorPierde() {
  idCuadros = [0, 1, 2];
  idCuadros.forEach(function (cuadro) {
    {
      colorearRojo(cuadro);
    }
  });
  setTimeout(function () {
    idCuadros.forEach(function (cuadro) {
      {
        colorearRojo(cuadro);
      }
    });
  }, 500);
  setTimeout(function () {
    idCuadros.forEach(function (cuadro) {
      {
        colorearRojo(cuadro);
      }
    });
  }, 1000);
}

function agarrarClick(click) {
  click = event.srcElement.id;
  return click;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function iniciarJuego() {
  numeroRandom = String(getRandomInt(3));
  setTimeout(function () {
    document.getElementById(numeroRandom).className = "shape2";
  }, 500);
  setTimeout(function () {
    document.getElementById(numeroRandom).className = "shape1";
  }, 750);

  return numeroRandom;
}

document.querySelector("#iniciar").onclick = function () {
  cuadrosAClickear = [];
  clicksUsuario = [];
  botonIniciar = iniciarJuego();
  cuadrosAClickear.push(botonIniciar);

  $contenedor.onclick = function () {
    clickDeUsuario = agarrarClick();
    if (/[0-2]/i.test(clickDeUsuario)) {
      clicksUsuario.push(clickDeUsuario);

      for (i = 0; i < clicksUsuario.length; i++) {
        if (clicksUsuario[i] != cuadrosAClickear[i]) {
          jugadorPierde();
        }
      }
      if (arraysEqual(cuadrosAClickear, clicksUsuario)) {
        for (i = 0; i < cuadrosAClickear.length; i++) {
          (function (x, array) {
            setTimeout(function () {
              colorear(array[x]);
            }, (i + 1) * 750);
          })(i, cuadrosAClickear);
        }
        setTimeout(function () {
          turnoSiguiente = iniciarJuego();
          cuadrosAClickear.push(turnoSiguiente);
        }, 750 * cuadrosAClickear.length);

        clicksUsuario = [];
      }
    }
  };
};
