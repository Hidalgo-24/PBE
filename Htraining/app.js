const express = require('express');
const path = require('path');
const app = express();

// 1. Configura o EJS como View Engine
app.set('view engine', 'ejs');
app.set('views', __dirname); 

// 2. Define a pasta de arquivos estáticos (CSS, JS, Imagens) - DEVE FICAR NO TOPO
app.use(express.static(path.join(__dirname, 'Public')));

// 3. Permite que o Express entenda dados de formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- 4. ROTAS DO SISTEMA (Principais) ---

// Rota raiz (redireciona para /landing ou renderiza direto)
app.get('/', (req, res) => {
    res.render('Paginas/landing');
});

// Rota específica da Landing Page (Para evitar o erro do botão sair)
app.get('/landing', (req, res) => {
    res.render('Paginas/landing');
});

// Rota de login
app.get('/login', (req, res) => {
    res.render('Paginas/login');
});

// Rota do Dashboard
app.get('/dashboard', (req, res) => {
    res.render('Paginas/dashboard');
});

// --- 5. ROTAS DOS MÓDULOS (Importadas) ---
const rotaAlunos = require('./Routes/rotaalunos');
const rotaPersonal = require('./Routes/rotapersonal');

app.use(rotaAlunos);
app.use(rotaPersonal);

// 6. Inicialização do Servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Servidor rodando com sucesso!`);
    console.log(`💻 Acesse em: http://localhost:${PORT}`);
    console.log(`=========================================`);
});