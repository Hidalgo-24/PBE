const Leitura = require('../models/Leitura');

class LeituraRepository {
  async create(data) {
    return Leitura.create(data);
  }

  async findById(id) {
    return Leitura.findByPk(id);
  }

  async findAll() {
    return Leitura.findAll();
  }

  async update(id, data) {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) return null;

    await leitura.update(data);

    return leitura;
  }

  async delete(id) {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) return null;

    await leitura.destroy();

    return true;
  }

  async deleteAll() {
    return Leitura.destroy({
      where: {},
      truncate: true,
      restartIdentity: true
    });
  }
}

module.exports = new LeituraRepository();