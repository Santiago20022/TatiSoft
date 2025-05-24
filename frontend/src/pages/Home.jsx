"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const Home = () => {
  const [stats, setStats] = useState({
    totalPilas: 0,
    totalBultos: 0,
    pesoTotal: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulamos datos por ahora para que funcione
    setStats({
      totalPilas: 5,
      totalBultos: 25,
      pesoTotal: 1250.5,
    })
  }, [])

  const StatCard = ({ title, value, unit, icon, color, description }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">
            {value}
            <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
          </p>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )

  const QuickActionCard = ({ title, description, icon, color, to }) => (
    <Link
      to={to}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  )

  if (loading) {
    return <LoadingSpinner text="Cargando estadísticas..." />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🍫 Sistema de Gestión de Cacao</h1>
        <p className="text-lg text-gray-600">Control y seguimiento completo de tu inventario de cacao</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Pilas"
          value={stats.totalPilas}
          unit="pilas"
          icon="📦"
          color="bg-blue-100"
          description="Pilas activas en el sistema"
        />
        <StatCard
          title="Total de Bultos"
          value={stats.totalBultos}
          unit="bultos"
          icon="🎒"
          color="bg-green-100"
          description="Bultos registrados en todas las pilas"
        />
        <StatCard
          title="Peso Total"
          value={stats.pesoTotal}
          unit="kg"
          icon="⚖️"
          color="bg-yellow-100"
          description="Peso total de cacao almacenado"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActionCard
            title="Gestionar Pilas"
            description="Ver, crear y administrar pilas de cacao"
            icon="📦"
            color="bg-blue-100"
            to="/pilas"
          />
          <QuickActionCard
            title="Ver Reportes"
            description="Generar y consultar reportes de inventario"
            icon="📋"
            color="bg-purple-100"
            to="/reportes"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
            <span className="mr-2">🎯</span>
            Objetivo del Sistema
          </h3>
          <p className="text-yellow-700 text-sm leading-relaxed">
            Optimizar el almacenamiento, apilamiento y transporte del cacao en la finca productora. A través de un
            control eficiente de bultos, pilas y cargas, facilitamos el proceso de envío y mejoramos la trazabilidad de
            la producción.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <span className="mr-2">✨</span>
            Características Principales
          </h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Ingreso manual de cantidad de cacao por bulto</li>
            <li>• Organización en pilas por bloques</li>
            <li>• Control automático del total por pila</li>
            <li>• Reportes de carga para transporte</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
