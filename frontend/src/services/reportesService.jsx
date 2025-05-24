import api from "./api"

export const reportesService = {
  // Generar reporte
  generarReporte: async () => {
    try {
      const response = await api.post("/reportes")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al generar reporte")
    }
  },

  // Obtener reportes existentes
  obtenerReportes: async () => {
    try {
      const response = await api.get("/reportes")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener reportes")
    }
  },
}
