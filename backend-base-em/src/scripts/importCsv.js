const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const sequelize = require('../config/database');
const Leitura = require('../models/Leitura');

async function importarCSV() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const csvPath = path.resolve(__dirname, '../../data/em.csv');

    const leituras = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        leituras.push({
          station_id: row.station_id,
          timestamp: row.timestamp,
          temperature_c: Number(
            String(row.temperature_c).replace(',', '.')
          ),
          humidity_pct: Number(
            String(row.humidity_pct).replace(',', '.')
          )
        });
      })
      .on('end', async () => {
        await Leitura.bulkCreate(leituras);

        console.log(
          `${leituras.length} registros importados com sucesso.`
        );

        await sequelize.close();
      });
  } catch (error) {
    console.error('Erro ao importar CSV:', error);
  }
}

importarCSV();