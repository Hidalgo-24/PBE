const LeituraService = require('../services/LeituraService');

class LeituraController {
  async listar(req, res, next) {
    try {
      const dados = await LeituraService.findAll();

      res.json({
        success: true,
        data: dados
      });
    } catch (error) {
      next(error);
    }
  }

  async buscar(req, res, next) {
    try {
      const leitura = await LeituraService.findById(req.params.id);

      res.json({
        success: true,
        data: leitura
      });
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const leitura = await LeituraService.create(req.body);

      res.status(201).json({
        success: true,
        data: leitura
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LeituraController();