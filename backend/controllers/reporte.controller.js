const Reporte = require('../models/reporte.model');

exports.generarReporte = (req, res) => {
  Reporte.obtenerResumenPilas((err, datos) => {
    if (err) {
      console.error('❌ Error generando el reporte:', err.message);
      return res.status(500).json({ message: 'Error generando el reporte' });
    }
    res.status(200).json({
      message: '📊 Reporte generado exitosamente',
      resumen: datos
    });
  });
};
