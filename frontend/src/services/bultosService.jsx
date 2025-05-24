import api from "./api"

export const bultosService = {
  // Crear un nuevo bulto
  createBulto: async (bultoData) => {
    try {
      const response = await api.post("/bultos", bultoData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error al crear bulto")
    }
  },

  // Obtener bultos por pila
  getBultosByPila: async (pilaId) => {
    try {
      const response = await api.get(`/bultos/${pilaId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener bultos")
    }
  },
}
