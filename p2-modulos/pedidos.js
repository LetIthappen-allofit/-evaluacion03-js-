export const IGV = 0.18;

export default class Pedido {
  constructor({ id, producto, precio, cantidad = 1, estado = "pendiente" }) {
    this.id = id;
    this.producto = producto;
    this.precio = precio;
    this.cantidad = cantidad;
    this.estado = estado;
  }

  get subtotal() {
    return this.precio * this.cantidad;
  }
}

export const validarPedido = ({ producto, precio, cantidad }) => {
  const errores = [];
  if (producto === "") {
    errores.push("El producto no puede estar vacío.");
  }
  if (precio === "" || Number(precio) <= 0) {
    errores.push("El precio debe ser mayor a 0.");
  }
  if (cantidad === "" || Number(cantidad) < 0) {
    errores.push("La cantidad no puede estar vacía ni ser negativa.");
  }
  return errores;
};

export const calcularSubtotal = (pedidos) =>
  pedidos.reduce((acum, p) => acum + p.subtotal, 0);

export const calcularTotal = (pedidos) =>
  calcularSubtotal(pedidos) * (1 + IGV);

export const filtrarPedidos = (pedidos, estado) =>
  estado === "todos" ? pedidos : pedidos.filter((p) => p.estado === estado);

export const agregarPedido = (pedidos, nuevo) => [...pedidos, nuevo];

export const marcarEntregado = (pedidos, id) =>
  pedidos.map((p) =>
    p.id === id ? new Pedido({ ...p, estado: "entregado" }) : p
  );

export const eliminarPedido = (pedidos, id) =>
  pedidos.filter((p) => p.id !== id);