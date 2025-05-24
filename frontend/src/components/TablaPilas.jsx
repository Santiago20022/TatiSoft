"use client"

import { useState, useEffect } from "react"
import { pilasService } from "../services/pilasService"
import { bultosService } from "../services/bultosService"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"

const TablaPilas = () => {
  const [pilasConResumen, setPilasConResumen] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPilasReales = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await pilasService.getPilas()
      const pilasData = response.pilas || []

      // Obtener datos reales para cada pila
      const pilasConDatos = await Promise.all(
        pilasData.map(async (pila) => {
          try {
            const bultosResponse = await bultosService.getBultosByPila(pila.id)
            const bultos = bultosResponse.bultos || []

            const totalBultos = bultos.length
            const pesoTotal = bultos.reduce((sum, bulto) => sum + Number.parseFloat(bulto.peso_kg || 0), 0)

            return {
              ...pila,
              totalBultos,
              pesoTotal: pesoTotal.toFixed(1),
            }
          } catch (error) {
            return {
              ...pila,
              totalBultos: 0,
              pesoTotal: "0.0",
            }
          }
        }),
      )

      setPilasConResumen(pilasConDatos)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPilasReales()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Cargando datos reales de pilas..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPilasReales} />
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📊</span>
          Resumen de Pilas (Datos Reales)
        </h2>
      </div>

      {pilasConResumen.length === 0 ? (
        <div className="p-8 text-center">
          <span className="text-6xl mb-4 block">📦</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pilas registradas</h3>
          <p className="text-gray-600">Crea tu primera pila para comenzar a gestionar el cacao.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pila</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bloque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Bultos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peso Total (kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pilasConResumen.map((pila) => (
                <tr key={pila.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📦</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{pila.nombre}</div>
                        <div className="text-sm text-gray-500">ID: {pila.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Bloque {pila.bloque}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold">{pila.totalBultos}</span>
                      <span className="text-gray-500 ml-1">bultos</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-cacao-700">{pila.pesoTotal}</span>
                      <span className="text-gray-500 ml-1">kg</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pila.totalBultos > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Con carga
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        ⚪ Vacía
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TablaPilas
