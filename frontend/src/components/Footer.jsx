const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">🍫</span>
              <span className="text-lg font-semibold text-cacao-700">TatiSoft</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">© 2024 TatiSoft - Sistema de Gestión de Cacao</p>
              <p className="text-gray-500 text-xs mt-1">Optimizando el almacenamiento y distribución de cacao</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  