async function buscarCiudad(nombre) {
  var url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nombre) + "&count=1&language=es";
  var respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("Error HTTP " + respuesta.status + " en geocodificación");
  }
  var datos = await respuesta.json();
  if (!datos.results || datos.results.length == 0) {
    throw new Error("Ciudad no encontrada: " + nombre);
  }
  return datos.results[0];
}

async function obtenerClima(lat, lon) {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m";
  var respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("Error HTTP " + respuesta.status + " en clima");
  }
  var datos = await respuesta.json();
  return datos;
}

async function climaDeCiudad(nombre) {
  var ciudad = await buscarCiudad(nombre);
  var clima = await obtenerClima(ciudad.latitude, ciudad.longitude);
  return {
    nombre: ciudad.name,
    region: ciudad.admin1,
    temp: clima.current.temperature_2m,
    tempUnidad: clima.current_units.temperature_2m,
    viento: clima.current.wind_speed_10m,
    vientoUnidad: clima.current_units.wind_speed_10m
  };
}
