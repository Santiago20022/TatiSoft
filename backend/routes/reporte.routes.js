const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.post('/reportes', reporteController.generarReporte); // ya existente
router.get('/reportes', reporteController.obtenerReportes); // 👈 NUEVO

module.exports = router;
