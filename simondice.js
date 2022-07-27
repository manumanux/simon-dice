const $contenedor = document.querySelector("#contenedor");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function colorearCuadroIncorrecto(id) {
  setTimeout(function () {
    document.getElementById(id).classList.add("colorRojo");
  }, 250);
  setTimeout(function () {
    document.getElementById(id).classList.remove("colorRojo");
  }, 500);
}

function colorearCuadroCorrecto(id) {
  setTimeout(function () {
    document.getElementById(id).classList.add("colorVerde");
  });
  setTimeout(function () {
    document.getElementById(id).classList.remove("colorVerde");
  }, 250);
}

function pierdeJugador() {
  idCuadros = [0, 1, 2];
  idCuadros.forEach(function (cuadro) {
    {
      colorearCuadroIncorrecto(cuadro);
    }
  });
  setTimeout(function () {
    idCuadros.forEach(function (cuadro) {
      {
        colorearCuadroIncorrecto(cuadro);
      }
    });
  }, 500);
  setTimeout(function () {
    idCuadros.forEach(function (cuadro) {
      {
        colorearCuadroIncorrecto(cuadro);
      }
    });
  }, 1000);
}

function obtenerIdDeClick(click) {
  click = event.srcElement.id;
  return click;
}

function compararListas(a, b) {
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
    document.getElementById(numeroRandom).classList.add("colorVerde");
  }, 500);
  setTimeout(function () {
    document.getElementById(numeroRandom).classList.remove("colorVerde");
  }, 750);

  return numeroRandom;
}

document.querySelector("#iniciar").onclick = function () {
  cuadrosAClickear = [];
  clicksUsuario = [];
  cuadrosAClickear.push(iniciarJuego());

  $contenedor.onclick = function () {
    if (/[0-2]/i.test(obtenerIdDeClick())) {
      clicksUsuario.push(obtenerIdDeClick());

      for (i = 0; i < clicksUsuario.length; i++) {
        if (clicksUsuario[i] != cuadrosAClickear[i]) {
          pierdeJugador();
        }
      }
      if (compararListas(cuadrosAClickear, clicksUsuario)) {
        for (i = 0; i < cuadrosAClickear.length; i++) {
          (function (x, array) {
            setTimeout(function () {
              colorearCuadroCorrecto(array[x]);
            }, (i + 1) * 750);
          })(i, cuadrosAClickear);
        }
        setTimeout(function () {
          cuadrosAClickear.push(iniciarJuego());
        }, 750 * cuadrosAClickear.length);

        clicksUsuario = [];
      }
    }
  };
};
