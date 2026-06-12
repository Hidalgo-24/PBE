Pular para o conteúdo principal
Google Sala de Aula
Sala de Aula
I2BDEV-MIR-1/25_PBE2
Início
Agenda
Minhas inscrições
Pendentes
I
I2BDEV-MIR-1/25_PPDM
I
I2BDEV-MIR-1/25_PSOF2
I
I2BDEV-MIR-1/25_PBE2
I
I2BDEV-MIR-1/25_PEND
Turmas arquivadas
Configurações
Mural
Atividades
Pessoas
I2BDEV-MIR-1/25_PBE2Mural
I2BDEV-MIR-1/25_PBE2
Próximas atividades
Nenhuma atividade para a próxima semana!

Postada por MARCELO CORREA
MARCELO CORREA
Criado em: 24 de mar.24 de mar.
Última versão do server.js
server.js
JavaScript


Postada por MARCELO CORREA
MARCELO CORREA
Criado em: 10 de mar.10 de mar.
Código-fonte atualizado.
server.js
JavaScript

Material: "Material para aula de Back-end "
MARCELO CORREA postou um novo material: Material para aula de Back-end
Criado em: 6 de mar.6 de mar. (editado: 17 de mar.)

Postada por VINICIUS RODRIGUES CAMARGO
VINICIUS RODRIGUES CAMARGO
Criado em: 24 de fev.24 de fev.
Atenção!
As notas que constam aqui no Classroom correspondem a seus resultados parciais. Os resultados finais serão disponibilizados em seu boletim e no histórico escolar, quando for o caso. Consulte a secretaria da Escola caso tenha alguma dúvida sobre suas notas. Atenciosamente. SENAI.
// [F1] Carregar dependências (módulos do projeto)
// Express: cria servidor e rotas
const express = require("express");
// Axios: faz requisições HTTP para APIs externas
const axios = require("axios");
// CORS: libera o front-end (outras origens) acessarem este back-end
const cors = require("cors");

// [F2] Criar a aplicação (instância do servidor)
const app = express();

// [F3] Configurar middlewares globais (valem para todas as rotas)
// Habilitar CORS (evita bloqueio do navegador por Same-Origin Policy)
app.use(cors());
// Habilitar JSON no body (permite ler req.body em requisições com JSON)
app.use(express.json());

// [F4] Definir configurações/constantes do projeto
// BASE_URL = endereço da API externa que este servidor vai "proxiar"
const BASE_URL = "https://dummyjson.com";

// -------------------------------------------------------
// [F5] Rotas básicas (raiz e status)
// -------------------------------------------------------

// Rota de status (healthcheck)
// Objetivo: teste rápido para saber se o servidor está no ar
// GET /health -> { ok: true }
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Rota raiz (home)
// Objetivo: mensagem amigável + lista das rotas disponíveis
// GET / -> HTML simples
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Minha API está no ar \u2705</h1>
    <p>Rotas disponíveis:</p>
    <ul>
      <li><a href="/health">/health</a></li>
      <li><a href="/api/posts">/api/posts</a></li>
    </ul>
  `);
});

// -------------------------------------------------------
// [F6] Rota principal (proxy de posts)
// -------------------------------------------------------

// [F6.1] Receber requisição do cliente
// GET /api/posts -> busca posts na API externa e devolve em formato padronizado
app.get("/api/posts", async (req, res) => {
  try {
    // [F6.2] Consumir API externa (chamar BASE_URL/posts)
    const response = await axios.get(`${BASE_URL}/posts`);

    // [F6.3] Montar resposta de sucesso (envelope padronizado)
    // source: identifica a origem dos dados
    // count: quantidade de itens recebidos
    // data: lista de posts
    res.status(200).json({
      source: "dummyjson",
      count: response.data.length,
      data: response.data
    });
  } catch (err) {
    // [F6.4] Tratamento de falha ao consultar API externa
    // 502 Bad Gateway = "meu servidor não conseguiu obter resposta válida do servidor externo"
    res.status(502).json({

      message: "Falha ao consultar API externa",
      detail: err.message
    });
  }
});

// -------------------------------------------------------
// [F7] Iniciar servidor (listen)
// -------------------------------------------------------
// Sobe o servidor na porta 3000 e imprime uma mensagem no terminal
app.listen(3000, () => console.log("API proxy rodando em http://localhost:3000"));
server.js
Exibindo server.js…