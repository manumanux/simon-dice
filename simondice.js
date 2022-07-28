const $contenedor = document.querySelector("#contenedor");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function colorearCuadrosJugadorPierde(cuadros) {
  for (i = 0; i < cuadros; i++) {
    (function (x) {
      setTimeout(function () {
        document.getElementById(x).classList.add("colorRojo");
      }, 1);
      setTimeout(function () {
        document.getElementById(x).classList.remove("colorRojo");
      }, 250);
    })(i);
  }
}

function colorearCuadroCorrecto(cuadro) {
  setTimeout(function () {
    document.getElementById(cuadro).classList.add("colorVerde");
  });
  setTimeout(function () {
    document.getElementById(cuadro).classList.remove("colorVerde");
  }, 250);
}

function perder() {
  cantidadDeCuadros = 3;
  for (i = 0; i < 3; i++) {
    setTimeout(function () {
      colorearCuadrosJugadorPierde(cantidadDeCuadros);
    }, (i + 1) * 500);
  }
}

function obtenerIdDeElementoClickeado(click) {
  click = event.srcElement.id;
  return click;
}

function compararSiArraysDeCuadrosSonIguales(a, b) {
  if (a == null || b == null) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function iniciarJuegoOTurnoSiguiente() {
  cuadroMaquina = String(getRandomInt(3));
  setTimeout(function () {
    colorearCuadroCorrecto(cuadroMaquina);
  }, 500);
  return cuadroMaquina;
}

document.querySelector("#iniciar").onclick = function () {
  cuadrosMaquina = [];
  cuadrosUsuario = [];
  cuadrosMaquina.push(iniciarJuegoOTurnoSiguiente());

  $contenedor.onclick = function () {
    if (/[0-2]/i.test(obtenerIdDeElementoClickeado())) {
      cuadrosUsuario.push(obtenerIdDeElementoClickeado());
      for (i = 0; i < cuadrosUsuario.length; i++) {
        if (cuadrosUsuario[i] != cuadrosMaquina[i]) {
          perder();
        }
      }
      if (compararSiArraysDeCuadrosSonIguales(cuadrosMaquina, cuadrosUsuario)) {
        for (i = 0; i < cuadrosMaquina.length; i++) {
          (function (x, array) {
            setTimeout(function () {
              colorearCuadroCorrecto(array[x]);
            }, (i + 1) * 750);
          })(i, cuadrosMaquina);
        }
        setTimeout(function () {
          cuadrosMaquina.push(iniciarJuegoOTurnoSiguiente());
        }, 750 * cuadrosMaquina.length);

        cuadrosUsuario = [];
      }
    }
  };
};
