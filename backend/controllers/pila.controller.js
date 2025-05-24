// backend/controllers/pila.controller.js
const Pila = require('../models/pila.model');

exports.crearPila = (req, res) => {
  const { nombre, bloque } = req.body;

  if (!nombre || !bloque) {
    return res.status(400).json({ message: 'Nombre y bloque son requeridos' });
  }

  Pila.create({ nombre, bloque }, (err, insertId) => {
    if (err) {
      console.error('Error al crear pila:', err.message);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    res.status(201).json({ message: '✅ Pila creada exitosamente', pilaId: insertId });
  });
};
