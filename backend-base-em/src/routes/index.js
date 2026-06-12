const express = require('express');
const router = express.Router();

const leituraRoutes = require('./leituraRoutes');

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API backend-base-em'
  });
});

router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok'
  });
});

router.use('/leituras', leituraRoutes);

module.exports = router;