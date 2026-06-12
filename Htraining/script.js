// ================= BASE DE DADOS LOCAL =================
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];
let evolucoes = JSON.parse(localStorage.getItem("evolucoes")) || [];
let treinos = JSON.parse(localStorage.getItem("treinos")) || [];

let usuarioLogado = ""; 

const horariosPadrao = [
    "06:00", "07:00", "08:00", "09:00",
    "17:00", "18:00", "19:00", "20:00"
];

// ================= NAVEGAÇÃO E LOGIN =================

function abrirLogin() {
    document.getElementById("landingPage").style.display = "none";
    const loginP = document.getElementById("loginPage");
    loginP.classList.remove("hidden");
    loginP.style.display = "flex";
    window.scrollTo(0, 0);
}

function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const erro = document.getElementById("loginError");

    if (user === "admin" && pass === "123") {
        usuarioLogado = "admin";
        iniciarSistema("admin");
    } else if (user === "aluno" && pass === "123") {
        usuarioLogado = "aluno";
        iniciarSistema("aluno");
    } else {
        if (erro) erro.innerText = "Usuário ou senha inválidos.";
    }
}

function iniciarSistema(tipo) {
    document.getElementById("loginPage").style.display = "none";
    const main = document.getElementById("mainSystem");
    main.classList.remove("hidden");
    main.style.display = "block";

    const btnAgenda = document.getElementById("nav-agendamento");
    const btnMeusTreinos = document.getElementById("nav-meus-treinos");
    const btnAdminAlunos = document.getElementById("nav-admin-alunos");
    const btnAdminPainel = document.getElementById("nav-admin-painel");
    
    const visaoPersonal = document.getElementById("visaoPersonalEvolucao");
    const visaoAluno = document.getElementById("visaoAlunoEvolucao");
    const cadastroServico = document.getElementById("cadastroServicoAdmin");

    if (tipo === "admin") {
        btnAgenda.classList.add("hidden");
        btnMeusTreinos.classList.add("hidden");
        btnAdminAlunos.classList.remove("hidden");
        btnAdminPainel.classList.remove("hidden");
        
        if (visaoPersonal) visaoPersonal.classList.remove("hidden");
        if (visaoAluno) visaoAluno.classList.add("hidden");
        if (cadastroServico) cadastroServico.classList.remove("hidden");
        
        showTab("admin");
    } else {
        btnAgenda.classList.remove("hidden");
        btnMeusTreinos.classList.remove("hidden");
        btnAdminAlunos.classList.add("hidden");
        btnAdminPainel.classList.add("hidden");
        
        if (visaoPersonal) visaoPersonal.classList.add("hidden");
        if (visaoAluno) visaoAluno.classList.remove("hidden");
        if (cadastroServico) cadastroServico.classList.add("hidden");
        
        showTab("agendamento");
    }

    atualizarTudo();
}

function logout() {
    salvarTudo();
    location.reload();
}

function showTab(tabId) {
    const tabs = document.querySelectorAll("#mainSystem .tab");
    tabs.forEach(tab => {
        tab.classList.add("hidden");
        tab.style.display = "none";
    });

    const abaAtiva = document.getElementById(tabId);
    if (abaAtiva) {
        abaAtiva.classList.remove("hidden");
        abaAtiva.style.display = "block";
    }

    document.querySelectorAll(".system-nav .nav-link").forEach(btn => btn.classList.remove("active"));
    const btnAtivo = document.querySelector(`.system-nav button[onclick*="'${tabId}'"]`);
    if (btnAtivo) btnAtivo.classList.add("active");
}

// ================= GESTÃO DE DADOS =================

function salvarTudo() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("servicos", JSON.stringify(servicos));
    localStorage.setItem("evolucoes", JSON.stringify(evolucoes));
    localStorage.setItem("treinos", JSON.stringify(treinos));
}

function cadastrarAluno() {
    const nome = document.getElementById("alunoNome").value;
    const idade = document.getElementById("alunoIdade").value;
    const objetivo = document.getElementById("alunoObjetivo").value;
    if (!nome || !idade || !objetivo) return alert("Preencha todos os campos!");
    alunos.push({ nome, idade, objetivo });
    salvarTudo();
    atualizarListaAlunos();
}

function atualizarListaAlunos() {
    const lista = document.getElementById("listaAlunos");
    if (!lista) return;
    lista.innerHTML = "";
    alunos.forEach((a, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<div><strong>${a.nome}</strong> - ${a.objetivo}</div>
            <button class="btn-logout" style="padding: 5px 10px; font-size: 11px;" onclick="excluirAluno(${index})">Remover</button>`;
        lista.appendChild(li);
    });
}

function excluirAluno(index) {
    if (confirm("Remover este aluno?")) {
        alunos.splice(index, 1);
        salvarTudo();
        atualizarListaAlunos();
    }
}

function cadastrarServico() {
    const nome = document.getElementById("nomeServico").value;
    const valor = document.getElementById("valorServico").value;
    if (!nome || !valor) return alert("Preencha os campos!");
    servicos.push({ nome, valor });
    salvarTudo();
    atualizarListaServicos();
}

function atualizarListaServicos() {
    const lista = document.getElementById("listaServicos");
    if (!lista) return;
    lista.innerHTML = "";
    servicos.forEach(s => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${s.nome}</span> <strong>R$ ${s.valor}</strong>`;
        lista.appendChild(li);
    });
}

// NOVA FUNÇÃO DE EVOLUÇÃO (HÍBRIDA)
function registrarEvolucao(quem) {
    let novaEvolucao = {
        data: new Date().toLocaleDateString('pt-BR'),
        tipo: quem
    };

    if (quem === 'personal') {
        const aluno = document.getElementById("evolucaoAluno").value;
        const peso = document.getElementById("pesoAtual").value;
        const obs = document.getElementById("observacoes").value;
        if (!aluno || !peso) return alert("Preencha o nome do aluno e o peso!");
        
        novaEvolucao.nome = aluno;
        novaEvolucao.info = `Peso: ${peso}kg`;
        novaEvolucao.detalhes = obs;
    } else {
        const cintura = document.getElementById("medidaCintura").value;
        const braco = document.getElementById("medidaBraco").value;
        const energia = document.getElementById("nivelEnergia").value;
        
        if (!cintura && !braco) return alert("Preencha suas medidas!");
        
        novaEvolucao.nome = "Meu Registro";
        novaEvolucao.info = `Cintura: ${cintura}cm | Braço: ${braco}cm`;
        novaEvolucao.detalhes = `Energia: ${energia || 'Normal'}`;
    }

    evolucoes.unshift(novaEvolucao);
    salvarTudo();
    atualizarListaEvolucoes();
    
    // Limpeza
    if(quem === 'aluno') {
        document.getElementById("medidaCintura").value = "";
        document.getElementById("medidaBraco").value = "";
    } else {
        document.getElementById("evolucaoAluno").value = "";
        document.getElementById("pesoAtual").value = "";
    }
}

function atualizarListaEvolucoes() {
    const lista = document.getElementById("listaEvolucoes");
    if (!lista) return;
    lista.innerHTML = "";
    evolucoes.forEach(e => {
        const li = document.createElement("li");
        const cor = e.tipo === 'personal' ? '#0ea5e9' : '#38d39f';
        li.innerHTML = `<div style="width:100%">
            <small style="color: ${cor}; font-weight: bold;">${e.tipo.toUpperCase()} - ${e.data}</small><br>
            <strong>${e.nome}</strong>: ${e.info}<br>
            <small style="color: #94a3b8">${e.detalhes || ""}</small>
        </div>`;
        lista.appendChild(li);
    });
}

// ================= AGENDAMENTO E REAGENDAMENTO =================

function mostrarHorarios() {
    const data = document.getElementById("dataSelecionada").value;
    const container = document.getElementById("horariosContainer");
    if (!data || !container) return;
    container.innerHTML = "";
    horariosPadrao.forEach(horario => {
        const ocupado = treinos.some(t => t.data === data && t.hora === horario);
        const btn = document.createElement("button");
        btn.innerText = horario;
        btn.className = ocupado ? "btn-hora ocupado" : "btn-hora livre";
        if (!ocupado) btn.onclick = () => agendarTreino(data, horario);
        else btn.disabled = true;
        container.appendChild(btn);
    });
}

function agendarTreino(data, hora) {
    const nome = document.getElementById("nomeCompleto").value;
    const tipo = document.getElementById("tipoTreino").value;
    if (!nome || !tipo) return alert("Preencha seu nome e o tipo de treino!");
    treinos.push({ nome, tipoTreino: tipo, data, hora });
    salvarTudo();
    alert("Treino agendado com sucesso!");
    mostrarHorarios();
    atualizarTudo();
}

function atualizarMeusTreinos() {
    const lista = document.getElementById("listaMeusTreinos");
    if (!lista) return;
    lista.innerHTML = "";
    treinos.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<div style="width:100%">
            <strong>${t.data} às ${t.hora}</strong> - ${t.tipoTreino}<br>
            <small>${t.nome}</small>
        </div>
        <button class="btn-logout" style="padding: 5px 10px; font-size: 11px; color: #38d39f; border-color: #38d39f" onclick="cancelarTreino(${index}, true)">Reagendar</button>`;
        lista.appendChild(li);
    });
}

function atualizarPainelAdmin() {
    const lista = document.getElementById("listaTreinosAdmin");
    if (!lista) return;
    lista.innerHTML = "";
    treinos.forEach((t, index) => {
        const item = document.createElement("li");
        item.innerHTML = `<div style="width:100%">
            <strong>${t.data} - ${t.hora}</strong><br>
            <span>${t.nome} - ${t.tipoTreino}</span>
        </div> 
        <button class="btn-logout" style="padding: 2px 8px;" onclick="cancelarTreino(${index}, false)">X</button>`;
        lista.appendChild(item);
    });
}

function cancelarTreino(index, isReagendamento) {
    const msg = isReagendamento ? "Deseja cancelar este horário para escolher outro?" : "Remover este agendamento?";
    if (confirm(msg)) {
        treinos.splice(index, 1);
        salvarTudo();
        atualizarTudo();
        if (isReagendamento) showTab('agendamento');
    }
}

function atualizarTudo() {
    atualizarListaAlunos();
    atualizarListaServicos();
    atualizarListaEvolucoes();
    atualizarPainelAdmin();
    atualizarMeusTreinos();a
}