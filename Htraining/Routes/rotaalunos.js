const express = require('express');
const router = express.Router();

// Renderiza a página principal do aluno (Dashboard padrão se estiver logado como Aluno)
router.get('/dashboard', (req, res) => {
    res.render('Paginas/dashboard');
});

module.exports = router;