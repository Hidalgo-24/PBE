const express = require('express');
const router = express.Router();

// Rotas exclusivas do ambiente do Administrador/Personal
router.get('/admin', (req, res) => {
    res.render('Paginas/dashboard');
});

module.exports = router;