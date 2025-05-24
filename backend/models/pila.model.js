// backend/models/pila.model.js
const db = require('../config/db');

const Pila = {
  create: (data, callback) => {
    const { nombre, bloque } = data;
    const query = 'INSERT INTO pilas (nombre, bloque) VALUES (?, ?)';
    db.query(query, [nombre, bloque], (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  }
};

module.exports = Pila;
