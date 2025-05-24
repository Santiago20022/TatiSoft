// backend/routes/bulto.routes.js
const express = require('express');
const router = express.Router();
const bultoController = require('../controllers/bulto.controller');

router.post('/bultos', bultoController.crearBulto);
router.get('/bultos/:pilaId', bultoController.obtenerBultosPorPila); // NUEVO

module.exports = router;
