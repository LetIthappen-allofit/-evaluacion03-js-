const IGV = 0.18;

const calcularTotal = (pedidos) => {
  const subtotal = pedidos.reduce(
    (acum, { precio, cantidad = 1 }) => acum + precio * cantidad,
    0
  );
  return subtotal * (1 + IGV);
};

const resumen = ({ producto, cantidad = 1, cliente }) => {
  const nombre = cliente?.nombre ?? "Anónimo";
  return `Pedido de ${nombre}: ${producto} x${cantidad}`;
};

const pedidos = [
  { producto: "Café", precio: 6, cantidad: 2, cliente: { nombre: "Ana" } },
  { producto: "Croissant", precio: 4.5, cantidad: 0 },
  { producto: "Jugo", precio: 8 },
];

console.log(calcularTotal(pedidos).toFixed(2)); 
pedidos.forEach((p) => console.log(resumen(p)));
