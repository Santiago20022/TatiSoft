"use client"

import { useState } from "react"
import { bultosService } from "../services/bultosService"
import LoadingSpinner from "./LoadingSpinner"

const FormularioIngresoBulto = ({ pilas, onBultoCreated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    peso_kg: "",
    descripcion: "",
    pila_id: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.peso_kg || formData.peso_kg <= 0) {
      newErrors.peso_kg = "El peso debe ser mayor a 0"
    }

    if (!formData.pila_id) {
      newErrors.pila_id = "Debe seleccionar una pila"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setSuccess(false)

    try {
      await bultosService.createBulto({
        ...formData,
        peso_kg: Number.parseFloat(formData.peso_kg),
        pila_id: Number.parseInt(formData.pila_id),
      })

      setSuccess(true)
      setFormData({
        nombre: "",
        peso_kg: "",
        descripcion: "",
        pila_id: "",
      })
      setErrors({})

      if (onBultoCreated) {
        onBultoCreated()
      }

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="mr-2">📦</span>
        Registrar Nuevo Bulto
      </h2>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-green-500 text-xl mr-3">✅</span>
            <p className="text-green-800 font-medium">¡Bulto registrado exitosamente!</p>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <p className="text-red-800">{errors.submit}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Bulto *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500 ${
                errors.nombre ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Ej: Bulto A1"
            />
            {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="peso_kg" className="block text-sm font-medium text-gray-700 mb-1">
              Peso (kg) *
            </label>
            <input
              type="number"
              id="peso_kg"
              name="peso_kg"
              value={formData.peso_kg}
              onChange={handleChange}
              step="0.1"
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500 ${
                errors.peso_kg ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Ej: 25.5"
            />
            {errors.peso_kg && <p className="text-red-600 text-sm mt-1">{errors.peso_kg}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="pila_id" className="block text-sm font-medium text-gray-700 mb-1">
            Pila de Destino *
          </label>
          <select
            id="pila_id"
            name="pila_id"
            value={formData.pila_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500 ${
              errors.pila_id ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Seleccionar pila...</option>
            {pilas.map((pila) => (
              <option key={pila.id} value={pila.id}>
                {pila.nombre} - Bloque {pila.bloque}
              </option>
            ))}
          </select>
          {errors.pila_id && <p className="text-red-600 text-sm mt-1">{errors.pila_id}</p>}
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (Opcional)
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cacao-500 focus:border-cacao-500"
            placeholder="Descripción adicional del bulto..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cacao-600 hover:bg-cacao-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <LoadingSpinner size="sm" text="" />
          ) : (
            <>
              <span className="mr-2">💾</span>
              Registrar Bulto
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormularioIngresoBulto
