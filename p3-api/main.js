var inputCiudad = document.getElementById("ciudad");
var boton = document.getElementById("btnBuscar");
var salida = document.getElementById("resultado");

async function mostrarClima() {
  var nombre = inputCiudad.value.trim();
  if (nombre == "") {
    salida.textContent = "Escriba el nombre de una ciudad.";
    return;
  }
  salida.textContent = "Cargando…";
  boton.disabled = true;
  try {
    var c = await climaDeCiudad(nombre);
    salida.innerHTML = "<p>Ciudad: " + c.nombre + "</p>" +
      "<p>Región: " + c.region + "</p>" +
      "<p>Temperatura: " + c.temp + " " + c.tempUnidad + "</p>" +
      "<p>Viento: " + c.viento + " " + c.vientoUnidad + "</p>";
  } catch (error) {
    if (error instanceof TypeError) {
      salida.textContent = "Sin conexión. Revise su internet e intente de nuevo.";
    } else {
      salida.textContent = "No se pudo obtener el clima: " + error.message;
    }
  } finally {
    boton.disabled = false;
  }
}

boton.addEventListener("click", mostrarClima);
