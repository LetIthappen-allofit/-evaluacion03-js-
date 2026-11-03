export const dom = {
  form: document.getElementById("form-pedido"),
  producto: document.getElementById("producto"),
  precio: document.getElementById("precio"),
  cantidad: document.getElementById("cantidad"),
  mensaje: document.getElementById("mensaje"),
  filtro: document.getElementById("filtro"),
  lista: document.getElementById("lista-pedidos"),
  total: document.getElementById("total"),
};

const crearBoton = (texto, accion, id) => {
  const b = document.createElement("button");
  b.textContent = texto;
  b.dataset.accion = accion;
  b.dataset.id = id;
  return b;
};

export const leerFormulario = () => ({
  producto: dom.producto.value.trim(),
  precio: dom.precio.value,
  cantidad: dom.cantidad.value,
});

export const limpiarFormulario = () => {
  dom.form.reset();
  dom.producto.focus();
};

export const mostrarMensaje = (texto) => {
  dom.mensaje.textContent = texto;
};

export const mostrarPedidos = (pedidos) => {
  dom.lista.textContent = "";
  pedidos.forEach((p) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${p.producto} | ${p.cantidad} x S/ ${p.precio.toFixed(2)} = S/ ${p.subtotal.toFixed(2)} | ${p.estado} `;
    li.appendChild(span);
    if (p.estado === "pendiente") {
      li.appendChild(crearBoton("Entregar", "entregar", p.id));
    }
    li.appendChild(crearBoton("Eliminar", "eliminar", p.id));
    dom.lista.appendChild(li);
  });
};

export const mostrarTotales = (subtotal, total) => {
  dom.total.textContent = `Subtotal: S/ ${subtotal.toFixed(2)} | IGV: S/ ${(total - subtotal).toFixed(2)} | Total a cobrar: S/ ${total.toFixed(2)}`;
};