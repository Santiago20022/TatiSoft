const Reporte = require('../models/reporte.model');

// POST /reportes => genera el resumen
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

// GET /reportes => obtener reportes existentes
exports.obtenerReportes = (req, res) => {
  Reporte.obtenerResumenPilas((err, datos) => {
    if (err) {
      console.error('❌ Error obteniendo reportes:', err.message);
      return res.status(500).json({ message: 'Error obteniendo reportes' });
    }
    res.status(200).json({
      message: '📄 Reportes obtenidos exitosamente',
      resumen: datos
    });
  });
};
