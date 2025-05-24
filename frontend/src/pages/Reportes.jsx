"use client"

import { useState } from "react"
import ResumenCarga from "../components/ResumenCarga"
import TablaPilas from "../components/TablaPilas"

const Reportes = () => {
  const [activeTab, setActiveTab] = useState("resumen")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes de Inventario</h1>
        <p className="text-gray-600 mt-1">Consulta y genera reportes detallados del inventario de cacao</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("resumen")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "resumen"
                ? "border-cacao-500 text-cacao-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            🚛 Resumen de Carga
          </button>
          <button
            onClick={() => setActiveTab("detalle")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "detalle"
                ? "border-cacao-500 text-cacao-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📊 Detalle por Pilas
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "resumen" ? <ResumenCarga /> : <TablaPilas />}
    </div>
  )
}

export default Reportes
