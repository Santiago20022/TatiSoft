// backend/routes/pila.routes.js
const express = require('express');
const router = express.Router();
const pilaController = require('../controllers/pila.controller');

router.post('/pilas', pilaController.crearPila);
router.get('/pilas', pilaController.obtenerPilas);

module.exports = router;
