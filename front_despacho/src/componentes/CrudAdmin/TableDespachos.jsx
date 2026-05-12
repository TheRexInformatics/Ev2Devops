import { useState, useEffect } from "react";
import axios from "axios";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const obtenerDespachos = async () => {
    // Usamos la misma IP pública y el endpoint de despachos
    await axios.get("http://100.48.22.110:8080/api/v1/despachos", {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      setDespachos(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener despachos:", error);
    });
  };

  useEffect(() => {
    obtenerDespachos();
  }, []);

  return (
    <section className="grid text-center grid-cols-12 mb-8">
      <div className="col-span-12 flex justify-center">
        <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b text-gray-700">
                <th className="p-4">ID Despacho</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {despachos.length > 0 ? (
                despachos.map((d) => (
                  <tr key={d.idDespacho} className="border-b">
                    <td className="p-4">{d.idDespacho}</td>
                    <td className="p-4">{d.estadoDespacho}</td>
                    <td className="p-4">{d.fechaEntrega}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-10 text-gray-500">
                    No hay despachos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};