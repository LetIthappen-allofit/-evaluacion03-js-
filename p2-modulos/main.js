import Pedido, { calcularTotal, marcarEntregado } from "./pedidos.js";
import { mostrarPedidos, mostrarTotal } from "./ui.js";

let pedidos = [
  new Pedido({ producto: "Café", precio: 6, cantidad: 2, cliente: { nombre: "Ana" } }),
  new Pedido({ producto: "Croissant", precio: 4.5, cantidad: 0 }),
  new Pedido({ producto: "Jugo", precio: 8 }),
];

const lista = document.querySelector("#lista-pedidos");
const total = document.querySelector("#total");

const pintar = () => {
  mostrarPedidos(pedidos, lista);
  mostrarTotal(calcularTotal(pedidos), total);
};

lista.addEventListener("click", (e) => {
  const indice = e.target.dataset.indice;
  if (indice === undefined) return;
  pedidos = marcarEntregado(pedidos, Number(indice));
  pintar();
});

pintar();