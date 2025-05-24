const express = require('express');
const router = express.Router();
const bultoController = require('../controllers/bulto.controller');

router.post('/bultos', bultoController.crearBulto);

module.exports = router;
