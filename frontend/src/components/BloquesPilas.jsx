"use client"

import { useState, useEffect } from "react"
import { pilasService } from "../services/pilasService"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"

const BloquesPilas = () => {
  const [pilas, setPilas] = useState([])
  const [bloques, setBloques] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPilas = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await pilasService.getPilas()
      const pilasData = response.pilas || []
      setPilas(pilasData)

      // Agrupar pilas por bloque
      const bloquesAgrupados = pilasData.reduce((acc, pila) => {
        const bloque = pila.bloque
        if (!acc[bloque]) {
          acc[bloque] = []
        }
        acc[bloque].push(pila)
        return acc
      }, {})

      setBloques(bloquesAgrupados)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPilas()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Cargando bloques..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPilas} />
  }

  const bloquesOrdenados = Object.keys(bloques).sort()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🏗️</span>
          Organización por Bloques
        </h2>
        <span className="text-sm text-gray-500">
          {bloquesOrdenados.length} bloque(s) • {pilas.length} pila(s) total
        </span>
      </div>

      {bloquesOrdenados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <span className="text-6xl mb-4 block">🏗️</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay bloques configurados</h3>
          <p className="text-gray-600">Crea pilas para organizar automáticamente los bloques.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bloquesOrdenados.map((numeroBloque) => (
            <div key={numeroBloque} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-cacao-500 to-cacao-600 px-4 py-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">🏗️</span>
                  Bloque {numeroBloque}
                </h3>
                <p className="text-cacao-100 text-sm">{bloques[numeroBloque].length} pila(s)</p>
              </div>

              <div className="p-4 space-y-3">
                {bloques[numeroBloque].map((pila) => (
                  <div
                    key={pila.id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">📦</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{pila.nombre}</h4>
                          <p className="text-xs text-gray-500">ID: {pila.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Activa
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total en bloque:</span>
                  <span className="font-medium text-gray-900">{bloques[numeroBloque].length} pila(s)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BloquesPilas
