const Bulto = require('../models/bulto.model');

exports.crearBulto = (req, res) => {
  const { nombre, peso, descripcion } = req.body;

  if (!nombre || !peso) {
    return res.status(400).json({ error: 'Nombre y peso son obligatorios' });
  }

  Bulto.create({ nombre, peso, descripcion }, (err, result) => {
    if (err) {
      console.error('❌ Error al crear bulto:', err.message);
      return res.status(500).json({ error: 'Error al crear bulto' });
    }

    res.status(201).json({
      message: '✅ Bulto registrado exitosamente',
      bultoId: result.insertId,
    });
  });
};
