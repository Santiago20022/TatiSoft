"use client"

import { useState, useEffect } from "react"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPilas: 0,
    totalBultos: 0,
    pesoTotal: 0,
  })

  useEffect(() => {
    // Aquí harás las llamadas a tu API
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Simulando datos por ahora
      setStats({
        totalPilas: 12,
        totalBultos: 156,
        pesoTotal: 2340,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const StatCard = ({ title, value, unit, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {value}
            <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard de Gestión de Cacao</h1>
        <p className="text-lg text-gray-600">Control y seguimiento de tu inventario de cacao</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total de Pilas" value={stats.totalPilas} unit="pilas" icon="📦" color="bg-blue-100" />
        <StatCard title="Total de Bultos" value={stats.totalBultos} unit="bultos" icon="🎒" color="bg-green-100" />
        <StatCard title="Peso Total" value={stats.pesoTotal} unit="kg" icon="⚖️" color="bg-cacao-100" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
            <span className="text-2xl">➕</span>
            <span className="font-medium text-blue-700">Nueva Pila</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
            <span className="text-2xl">📦</span>
            <span className="font-medium text-green-700">Agregar Bulto</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
            <span className="text-2xl">📊</span>
            <span className="font-medium text-purple-700">Ver Reportes</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
            <span className="text-2xl">🚛</span>
            <span className="font-medium text-orange-700">Preparar Envío</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
