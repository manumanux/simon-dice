const $contenedor = document.querySelector("#contenedor");
const $demostradorDeTurnos = document.getElementById("turnos");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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

function colorearCuadroCorrecto(cuadro) {
  document.getElementById(cuadro).classList.add("colorVerde");
  setTimeout(function () {
    document.getElementById(cuadro).classList.remove("colorVerde");
  }, 250);
}

function habilitarEventoClickUsuario() {
  $contenedor.classList.remove("desabilitarClick");
}

function deshabilitarClickUsuario() {
  $contenedor.classList.add("desabilitarClick");
}

function habilitarCuadros() {
  cantidadDeCuadros = 3;
  for (i = 0; i < cantidadDeCuadros; i++) {
    {
      document.getElementById(i).classList.remove("desabilitarClick");
    }
  }
}

function manejarTurnoMaquina() {
  setTimeout(function () {
    deshabilitarClickUsuario();
    $demostradorDeTurnos.classList.add("turnoMaquina");
    $demostradorDeTurnos.classList.remove("turnoUsuario");
    $demostradorDeTurnos.innerText = "Turno PC";
  }, 250);
}

function manejarTurnoUsuario() {
  setTimeout(function () {
    habilitarEventoClickUsuario();
    $demostradorDeTurnos.classList.add("turnoUsuario");
    $demostradorDeTurnos.classList.remove("turnoMaquina");
    $demostradorDeTurnos.innerText = "Tu turno";
  }, 500);
}

function manejarUsuarioPierde(cuadros) {
  for (i = 0; i < cuadros; i++) {
    (function (x) {
      document.getElementById(x).classList.add("desabilitarClick");
      document.getElementById(x).classList.add("colorRojo");
      setTimeout(function () {
        document.getElementById(x).classList.remove("colorRojo");
      }, 250);
    })(i);
  }
}

function perder() {
  cantidadDeCuadros = 3;
  for (i = 0; i < 3; i++) {
    setTimeout(function () {
      manejarUsuarioPierde(cantidadDeCuadros);
    }, (i + 1) * 500);
  }
  $demostradorDeTurnos.classList.remove("turnoUsuario");
  $demostradorDeTurnos.classList.add("turnoUsuarioPierde");
  $demostradorDeTurnos.innerText = "Perdiste! comenza denuevo";

  deshabilitarClickUsuario();
  setTimeout(function () {
    habilitarEventoClickUsuario();
  }, 1500);
}

function colorearCuadroCorrecto(cuadro) {
  document.getElementById(cuadro).classList.add("colorVerde");
  setTimeout(function () {
    document.getElementById(cuadro).classList.remove("colorVerde");
  }, 250);
}

function iniciarJuegoOTurnoSiguiente() {
  cuadroMaquina = String(getRandomInt(3));
  setTimeout(function () {
    colorearCuadroCorrecto(cuadroMaquina);
  }, 500);
  return cuadroMaquina;
}

function manejarBotonIniciar() {
  habilitarCuadros();
  $demostradorDeTurnos.classList.remove("invisible");
  $demostradorDeTurnos.classList.remove("turnoUsuarioPierde");
  $demostradorDeTurnos.innerText = "";
}

document.querySelector("#iniciar").onclick = function () {
  manejarBotonIniciar();
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
        manejarTurnoMaquina();
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
        setTimeout(function () {
          manejarTurnoUsuario();
        }, 1000 * cuadrosMaquina.length);
        cuadrosUsuario = [];
      }
    }
  };
};
