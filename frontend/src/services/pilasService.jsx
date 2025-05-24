import api from "./api"

export const pilasService = {
  // Crear una nueva pila
  createPila: async (pilaData) => {
    try {
      const response = await api.post("/pilas", pilaData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al crear pila")
    }
  },

  // Obtener todas las pilas
  getPilas: async () => {
    try {
      const response = await api.get("/pilas")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener pilas")
    }
  },
}
