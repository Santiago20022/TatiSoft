"use client"

import { useState, useEffect } from "react"
import { pilasService } from "../services/pilasService"
import FormularioIngresoBulto from "../components/FormularioIngresoBulto"
import TablaPilas from "../components/TablaPilas"
import BloquesPilas from "../components/BloquesPilas"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

const Pilas = () => {
  const [pilas, setPilas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewPilaForm, setShowNewPilaForm] = useState(false)
  const [newPilaData, setNewPilaData] = useState({
    nombre: "",
    bloque: "",
  })
  const [creatingPila, setCreatingPila] = useState(false)
  const [activeTab, setActiveTab] = useState("tabla")

  const fetchPilas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await pilasService.getPilas()
      setPilas(response.pilas || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPilas()
  }, [])

  const handleCreatePila = async (e) => {
    e.preventDefault()

    if (!newPilaData.nombre.trim() || !newPilaData.bloque.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    try {
      setCreatingPila(true)
      await pilasService.createPila(newPilaData)

      setNewPilaData({ nombre: "", bloque: "" })
      setShowNewPilaForm(false)
      fetchPilas() // Recargar la lista

      alert("¡Pila creada exitosamente!")
    } catch (error) {
      alert(`Error al crear pila: ${error.message}`)
    } finally {
      setCreatingPila(false)
    }
  }

  const handleBultoCreated = () => {
    // Recargar datos cuando se crea un nuevo bulto
    fetchPilas()
  }

  if (loading) {
    return <LoadingSpinner text="Cargando pilas..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPilas} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pilas</h1>
          <p className="text-gray-600 mt-1">Administra las pilas y bultos de cacao</p>
        </div>
        <button
          onClick={() => setShowNewPilaForm(!showNewPilaForm)}
          className="bg-cacao-600 hover:bg-cacao-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">➕</span>
          Nueva Pila
        </button>
      </div>

      {/* Formulario Nueva Pila */}
      {showNewPilaForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Crear Nueva Pila</h2>
          <form onSubmit={handleCreatePila} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Pila</label>
                <input
                  type="text"
                  value={newPilaData.nombre}
                  onChange={(e) => setNewPilaData((prev) => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500"
                  placeholder="Ej: Pila Norte A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bloque</label>
                <input
                  type="text"
                  value={newPilaData.bloque}
                  onChange={(e) => setNewPilaData((prev) => ({ ...prev, bloque: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500"
                  placeholder="Ej: A, B, C, 1, 2, 3"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={creatingPila}
                className="bg-cacao-600 hover:bg-cacao-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                {creatingPila ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  <>
                    <span className="mr-2">💾</span>
                    Crear Pila
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowNewPilaForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario Ingreso Bulto */}
      {pilas.length > 0 && <FormularioIngresoBulto pilas={pilas} onBultoCreated={handleBultoCreated} />}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("tabla")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tabla"
                ? "border-cacao-500 text-cacao-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📊 Tabla de Pilas
          </button>
          <button
            onClick={() => setActiveTab("bloques")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "bloques"
                ? "border-cacao-500 text-cacao-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            🏗️ Vista por Bloques
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "tabla" ? <TablaPilas /> : <BloquesPilas />}
    </div>
  )
}

export default Pilas
