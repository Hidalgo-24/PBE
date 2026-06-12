require('dotenv').config();

const app = require('./app');
const ensureDatabase = require('./config/ensureDatabase');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verifica/cria o banco de dados
    await ensureDatabase();

    // Conecta ao PostgreSQL
    await sequelize.authenticate();
    console.log('Banco de dados conectado com sucesso.');

    // Cria as tabelas se não existirem
    await sequelize.sync();
    console.log('Modelos sincronizados.');

    // Inicia a API
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

startServer();