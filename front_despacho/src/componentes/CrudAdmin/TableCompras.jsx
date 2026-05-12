import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    // Usamos la IP Pública que el navegador puede alcanzar y el puerto 8080 de Spring Boot
    await axios.get("http://100.48.22.110:8080/api/v1/ventas", {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      setVentas(response.data);
    })
    .catch((error) => {
      console.error("Error al conectar con el Backend:", error);
    });
  };

  useEffect(() => {
    compras();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Orden de compra</th>
                  <th className="p-4">Dirección</th>
                  <th className="p-4">Fecha de compra</th>
                  <th className="p-4">Valor total</th>
                  <th className="p-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length > 0 ? (
                  ventas
                    .filter((venta) => !venta.despachoGenerado)
                    .map((venta) => (
                      <tr key={venta.idVenta} className="border-b hover:bg-gray-50">
                        <td className="p-4">{venta.idVenta}</td>
                        <td className="p-4">{venta.direccionCompra}</td>
                        <td className="p-4">{venta.fechaCompra}</td>
                        <td className="p-4">${venta.valorCompra}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleAbrirModal(venta)}
                            className="py-2 bg-orange-200 px-6 rounded-xl shadow-sm hover:bg-orange-300 transition-colors"
                          >
                            Generar Despacho
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-10 text-gray-500">
                      No se encontraron órdenes pendientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        {ventaSeleccionada && (
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              setOpenModal(false);
              compras();
            }}
          />
        )}
      </Modal>
    </>
  );
};