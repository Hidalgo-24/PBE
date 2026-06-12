const axios = require('axios');

const API_URL = 'http://localhost:3000';

async function testarAPI() {
  try {
    console.log('=== HEALTH ===');

    const health = await axios.get(
      `${API_URL}/api/health`
    );

    console.log(health.data);

    console.log('\n=== POST ===');

    const novaLeitura = await axios.post(
      `${API_URL}/api/leituras`,
      {
        station_id: 'EM-TESTE-01',
        timestamp: new Date().toISOString(),
        temperature_c: 25.5,
        humidity_pct: 70
      }
    );

    console.log(novaLeitura.data);

    const id = novaLeitura.data.data.id;

    console.log('\n=== GET POR ID ===');

    const leitura = await axios.get(
      `${API_URL}/api/leituras/${id}`
    );

    console.log(leitura.data);

    console.log('\n=== LISTAGEM ===');

    const lista = await axios.get(
      `${API_URL}/api/leituras`
    );

    console.log(lista.data);
  } catch (error) {
    console.error(
      'Erro ao testar API:',
      error.response?.data || error.message
    );
  }
}

testarAPI();