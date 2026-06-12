const ApiError = require('../utils/ApiError');
const LeituraRepository = require('../repositories/LeituraRepository');

class LeituraService {
  async create(data) {
    if (!data.station_id) {
      throw new ApiError('station_id é obrigatório', 400);
    }

    return LeituraRepository.create(data);
  }

  async findAll() {
    return LeituraRepository.findAll();
  }

  async findById(id) {
    const leitura = await LeituraRepository.findById(id);

    if (!leitura) {
      throw new ApiError('Leitura não encontrada', 404);
    }

    return leitura;
  }

  async update(id, data) {
    return LeituraRepository.update(id, data);
  }

  async delete(id) {
    return LeituraRepository.delete(id);
  }

  async deleteAll() {
    return LeituraRepository.deleteAll();
  }
}

module.exports = new LeituraService();