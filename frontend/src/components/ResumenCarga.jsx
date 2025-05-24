"use client"

import { useState, useEffect } from "react"
import { pilasService } from "../services/pilasService"
import { bultosService } from "../services/bultosService"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import PDFReport from "./PDFReport"

const ResumenCarga = () => {
  const [resumen, setResumen] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchResumenReal = async () => {
    try {
      setLoading(true)
      setError(null)

      // Obtener todas las pilas
      const pilasResponse = await pilasService.getPilas()
      const pilas = pilasResponse.pilas || []

      // Para cada pila, obtener sus bultos y calcular totales
      const resumenCompleto = await Promise.all(
        pilas.map(async (pila) => {
          try {
            const bultosResponse = await bultosService.getBultosByPila(pila.id)
            const bultos = bultosResponse.bultos || []

            const totalBultos = bultos.length
            const pesoTotal = bultos.reduce((sum, bulto) => {
              return sum + Number.parseFloat(bulto.peso_kg || 0)
            }, 0)

            return {
              ...pila,
              total_bultos: totalBultos,
              peso_total: pesoTotal.toFixed(1),
              bultos: bultos,
            }
          } catch (error) {
            return {
              ...pila,
              total_bultos: 0,
              peso_total: "0.0",
              bultos: [],
            }
          }
        }),
      )

      setResumen(resumenCompleto)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumenReal()
  }, [])

  const calcularTotales = () => {
    const totalBultos = resumen.reduce((sum, pila) => sum + (pila.total_bultos || 0), 0)
    const pesoTotal = resumen.reduce((sum, pila) => sum + Number.parseFloat(pila.peso_total || 0), 0)
    const totalPilas = resumen.length
    return {
      totalBultos,
      pesoTotal: pesoTotal.toFixed(1),
      totalPilas,
    }
  }

  if (loading) {
    return <LoadingSpinner text="Cargando datos reales de la base de datos..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchResumenReal} />
  }

  const totales = calcularTotales()

  return (
    <div className="space-y-6">
      {/* Header con totales */}
      <div className="bg-gradient-to-r from-cacao-500 to-cacao-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3">🚛</span>
              Resumen de Carga para Transporte
            </h2>
          </div>
          <div className="flex-shrink-0">
            <PDFReport data={resumen} totales={totales} fileName="resumen-carga" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-cacao-100 text-sm">Total de Pilas</p>
            <p className="text-3xl font-bold">{totales.totalPilas}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-cacao-100 text-sm">Total de Bultos</p>
            <p className="text-3xl font-bold">{totales.totalBultos}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-cacao-100 text-sm">Peso Total</p>
            <p className="text-3xl font-bold">{totales.pesoTotal} kg</p>
          </div>
        </div>
      </div>

      {/* Tabla de resumen */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detalle por Pilas</h3>
        </div>

        {resumen.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
            <p className="text-gray-600">No se encontraron pilas registradas en el sistema.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pila
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bloque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bultos
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
                {resumen.map((pila) => (
                  <tr key={pila.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">📦</span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {pila.total_bultos || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cacao-700">
                      {pila.peso_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(pila.total_bultos || 0) > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ Listo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          ⚪ Vacío
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
    </div>
  )
}

export default ResumenCarga
