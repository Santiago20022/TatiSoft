const db = require('../config/db'); // Esto es la conexión directa

const Bulto = {
  create: (bulto, callback) => {
    const query = 'INSERT INTO bultos (nombre, peso_kg, descripcion) VALUES (?, ?, ?)';
    const values = [bulto.nombre, bulto.peso, bulto.descripcion];
    db.query(query, values, callback);
  },
};

module.exports = Bulto;
