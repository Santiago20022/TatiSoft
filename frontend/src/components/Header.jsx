import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/pilas", label: "Pilas", icon: "📦" },
    { path: "/reportes", label: "Reportes", icon: "📋" },
  ]

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-3xl">🍫</span>
            <div>
              <h1 className="text-xl font-bold text-cacao-700">TatiSoft</h1>
              <p className="text-xs text-gray-500">Gestión de Cacao</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-cacao-100 text-cacao-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
