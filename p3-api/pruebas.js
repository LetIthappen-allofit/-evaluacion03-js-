var ciudades = ["Lima", "Cusco", "Arequipa"];

async function secuencial() {
  var inicio = performance.now();
  var a = await climaDeCiudad(ciudades[0]);
  var b = await climaDeCiudad(ciudades[1]);
  var c = await climaDeCiudad(ciudades[2]);
  return performance.now() - inicio;
}

async function paralelo() {
  var inicio = performance.now();
  var r = await Promise.all([
    climaDeCiudad(ciudades[0]),
    climaDeCiudad(ciudades[1]),
    climaDeCiudad(ciudades[2])
  ]);
  return performance.now() - inicio;
}

async function medirTiempos() {
  var filas = [];
  await secuencial(); 
  for (var i = 1; i <= 3; i++) {
    var ts = await secuencial();
    var tp = await paralelo();
    filas.push({ medicion: i, secuencial_ms: Math.round(ts), paralelo_ms: Math.round(tp) });
  }
  console.table(filas);
}

async function probarAllSettled() {
  var lista = ["Lima", "Xyzabc", "Arequipa"];
  var promesas = lista.map(function (c) { return climaDeCiudad(c); });
  var resultados = await Promise.allSettled(promesas);
  for (var i = 0; i < resultados.length; i++) {
    if (resultados[i].status == "fulfilled") {
      console.log(lista[i], "OK", resultados[i].value);
    } else {
      console.log(lista[i], "FALLÓ", resultados[i].reason.message);
    }
  }
}

async function probarAll() {
  try {
    await Promise.all(["Lima", "Xyzabc", "Arequipa"].map(function (c) { return climaDeCiudad(c); }));
  } catch (error) {
    console.log("Promise.all rechazó con:", error.message);
  }
}
