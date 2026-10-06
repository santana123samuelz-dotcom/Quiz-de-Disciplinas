// =======================
// ARRAY DE OBJETOS
// =======================

const perguntas = [

{
    pergunta: "Qual é a capital do Brasil?",
    opcoes: [
        "São Paulo",
        "Brasília",
        "Recife",
        "Salvador"
    ],
    resposta: "Brasília"
},

{
    pergunta: "Quanto é 8 x 7?",
    opcoes: [
        "54",
        "56",
        "64",
        "49"
    ],
    resposta: "56"
},

{
    pergunta: "Qual linguagem é usada para estilizar páginas?",
    opcoes: [
        "Python",
        "Java",
        "CSS",
        "PHP"
    ],
    resposta: "CSS"
},

{
    pergunta: "Qual planeta é conhecido como planeta vermelho?",
    opcoes: [
        "Marte",
        "Vênus",
        "Saturno",
        "Mercúrio"
    ],
    resposta: "Marte"
},

{
    pergunta: "HTML significa:",
    opcoes: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Main Language"
    ],
    resposta: "Hyper Text Markup Language"
}

];

// =======================
// VARIÁVEIS
// =======================

let indiceAtual = 0;
let pontuacao = 0;

// =======================
// ELEMENTOS
// =======================

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");
const feedback = document.getElementById("feedback");
const progresso = document.getElementById("progresso");
const numeroPergunta = document.getElementById("numero-pergunta");

const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const pontuacaoFinal =
document.getElementById("pontuacao-final");

const mensagem =
document.getElementById("mensagem");

const reiniciar =
document.getElementById("reiniciar");

// =======================
// CARREGAR PERGUNTA
// =======================

function carregarPergunta(){

    feedback.innerHTML = "";

    const atual = perguntas[indiceAtual];

    numeroPergunta.innerHTML =
    `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    pergunta.innerHTML =
    atual.pergunta;

    respostas.innerHTML = "";

    atual.opcoes.forEach(opcao => {

        const botao =
        document.createElement("button");

        botao.classList.add("opcao");

        botao.innerText = opcao;

        botao.addEventListener(
            "click",
            () => verificarResposta(opcao)
        );

        respostas.appendChild(botao);

    });

    atualizarProgresso();
}

// =======================
// VERIFICAR RESPOSTA
// =======================

function verificarResposta(escolha){

    const correta =
    perguntas[indiceAtual].resposta;

    const botoes =
    document.querySelectorAll(".opcao");

    botoes.forEach(botao => {

        botao.disabled = true;

        if(botao.innerText === correta){
            botao.classList.add("correta");
        }

        if(
            botao.innerText === escolha &&
            escolha !== correta
        ){
            botao.classList.add("errada");
        }

    });

    if(escolha === correta){

        pontuacao++;

        feedback.innerHTML =
        "✅ Resposta Correta!";

        feedback.style.color =
        "#00c853";

    }else{

        feedback.innerHTML =
        "❌ Resposta Errada!";

        feedback.style.color =
        "#ff1744";
    }

    setTimeout(() => {

        indiceAtual++;

        if(indiceAtual < perguntas.length){

            carregarPergunta();

        }else{

            mostrarResultado();

        }

    }, 1500);

}

// =======================
// BARRA DE PROGRESSO
// =======================

function atualizarProgresso(){

    const porcentagem =
    (indiceAtual / perguntas.length) * 100;

    progresso.style.width =
    porcentagem + "%";
}

// =======================
// RESULTADO FINAL
// =======================

function mostrarResultado(){

    quiz.classList.add("oculto");

    resultado.classList.remove("oculto");

    progresso.style.width = "100%";

    pontuacaoFinal.innerHTML =
    `${pontuacao} / ${perguntas.length}`;

    if(pontuacao === perguntas.length){

        mensagem.innerHTML =
        "🌟 Excelente! Você acertou tudo!";

    }
    else if(
        pontuacao >= perguntas.length * 0.7
    ){

        mensagem.innerHTML =
        "🔥 Muito bem! Ótimo desempenho!";

    }
    else if(
        pontuacao >= perguntas.length * 0.4
    ){

        mensagem.innerHTML =
        "👍 Bom trabalho! Continue estudando.";

    }
    else{

        mensagem.innerHTML =
        "📚 Continue praticando e tente novamente.";

    }

}

// =======================
// REINICIAR QUIZ
// =======================

reiniciar.addEventListener("click", () => {

    indiceAtual = 0;
    pontuacao = 0;

    resultado.classList.add("oculto");

    quiz.classList.remove("oculto");

    carregarPergunta();

});

// =======================
// INICIAR
// =======================

carregarPergunta();