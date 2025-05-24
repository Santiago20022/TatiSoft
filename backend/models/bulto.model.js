// backend/models/bulto.model.js
const db = require('../config/db'); // Esto es la conexión directa

const Bulto = {
  create: (bulto, callback) => {
    const query = `
      INSERT INTO bultos (nombre, peso_kg, descripcion, pila_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [bulto.nombre, bulto.peso_kg, bulto.descripcion, bulto.pila_id];
    db.query(query, values, callback);
  },
};

module.exports = Bulto;
