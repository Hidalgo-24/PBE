const express = require('express');
const router = express.Router();

const controller = require('../controllers/LeituraController');

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);

module.exports = router;