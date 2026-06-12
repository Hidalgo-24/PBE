const sequelize = require('../config/database');
const Leitura = require('../models/Leitura');

async function resetar() {
  try {
    await sequelize.authenticate();

    await Leitura.destroy({
      where: {},
      truncate: true,
      restartIdentity: true
    });

    console.log('Tabela leituras limpa com sucesso.');

    await sequelize.close();
  } catch (error) {
    console.error('Erro ao limpar tabela:', error);
  }
}

resetar();