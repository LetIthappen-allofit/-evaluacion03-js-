import Pedido, {
  calcularSubtotal,
  calcularTotal,
  filtrarPedidos,
  agregarPedido,
  marcarEntregado,
  eliminarPedido,
  validarPedido,
} from "./pedidos.js";
import {
  dom,
  leerFormulario,
  limpiarFormulario,
  mostrarMensaje,
  mostrarPedidos,
  mostrarTotales,
} from "./ui.js";

let pedidos = [];
let sigId = 1;

const render = () => {
  mostrarPedidos(filtrarPedidos(pedidos, dom.filtro.value));
  mostrarTotales(calcularSubtotal(pedidos), calcularTotal(pedidos));
};

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = leerFormulario();
  const errores = validarPedido(datos);

  if (errores.length > 0) {
    mostrarMensaje(errores.join(" "));
    return;
  }

  const nuevo = new Pedido({
    id: sigId,
    producto: datos.producto,
    precio: Number(datos.precio),
    cantidad: Number(datos.cantidad),
  });
  sigId += 1;
  pedidos = agregarPedido(pedidos, nuevo);
  mostrarMensaje("Pedido agregado.");
  limpiarFormulario();
  render();
});

dom.filtro.addEventListener("change", render);

dom.lista.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (btn === null) {
    return;
  }
  const id = Number(btn.dataset.id);
  const { accion } = btn.dataset;

  if (accion === "entregar") {
    pedidos = marcarEntregado(pedidos, id);
  } else if (accion === "eliminar") {
    pedidos = eliminarPedido(pedidos, id);
  }
  render();
});

render();