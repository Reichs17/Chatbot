const chat = document.getElementById("chat");           //pega o id do chat
const input = document.getElementById("input");         //pega o id do input
const send = document.getElementById("send");           //pega o id do botão enviar
const messages = document.getElementById("messages");   //pega o id da div messages

function sendMessage(){
    const text = input.value.trim();                    //pega o valor do input e remove espaços em branco
    if (!text) return;                                      // se o input estiver vazio, não faz nada

    chat.classList.add("active");                        //adiciona a classe active ao chat

    const userMsg = document.createElement("div");      //cria uma div para a mensagem do usuário
    userMsg.className = "message user";
    userMsg.innerText = text;                             //adiciona o texto do input à div
    messages.appendChild(userMsg);                        //adiciona a div à div messages

    input.value = "";                                     //limpa o input

    setTimeout(() => {                                    //função para simular o tempo de resposta do bot
        let BotResponse = "Desculpa, não entendi. 🤨";

        const userInput = text.toLowerCase(); // Converte a entrada do usuário para minúsculas

        // Respostas baseadas em palavras-chave
        if (userInput.includes("dor de cabeça")) {
            BotResponse = "Para dor de cabeça, tente descansar em um ambiente tranquilo e beber bastante água. Se a dor persistir, consulte um médico.";
        } else if (userInput.includes("engasgo")) {
            BotResponse = "Se alguém estiver engasgado, incentive a pessoa a tossir. Se não conseguir respirar, realize a manobra de Heimlich ou chame ajuda médica imediatamente.";
        } else if (userInput.includes("gripe")) {
            BotResponse = "Para sintomas de gripe, descanse bastante, mantenha-se hidratado e use medicamentos para aliviar os sintomas. Se os sintomas piorarem, procure um médico.";
        } else if (userInput.includes("covid-19")) {
            BotResponse = "Os sintomas comuns de COVID-19 incluem febre, tosse seca e cansaço. Se você suspeitar que está infectado, faça um teste e siga as orientações das autoridades de saúde.";
        } else if (userInput.includes("queimadura")) {
            BotResponse = "Para queimaduras leves, resfrie a área afetada com água fria por pelo menos 10 minutos. Evite usar gelo diretamente na pele. Procure atendimento médico para queimaduras graves.";
        } else if (userInput.includes("entorse")) {
            BotResponse = "Para tratar uma entorse, aplique gelo na área afetada, eleve o membro e descanse. Use uma bandagem de compressão se necessário. Procure um médico se a dor for intensa.";
        } else if (userInput.includes("pressão alta")) {
            BotResponse = "Pressão alta, ou hipertensão, é uma condição em que a pressão do sangue nas artérias está elevada. Para controlá-la, mantenha uma dieta saudável, pratique exercícios regularmente e evite o consumo excessivo de sal e álcool.";
        } else if (userInput.includes("diabetes")) {
            BotResponse = "Os sintomas comuns de diabetes incluem sede excessiva, fome constante, perda de peso inexplicada e fadiga. Se você apresentar esses sintomas, consulte um médico para avaliação e diagnóstico.";
        }

        const botMsg = document.createElement("div");     //cria uma div para a mensagem do bot
        botMsg.className = "message bot";
        botMsg.innerText = BotResponse;           //adiciona o texto da resposta à div
        messages.appendChild(botMsg);

        messages.scrollTop = messages.scrollHeight;           //faz a rolagem automática para a última mensagem
    }, 800);
}
send.addEventListener("click", sendMessage);                   //função de clique
input.addEventListener("keypress", (e) => {                   //função de tecla pressionada
    if (e.key === "Enter") {                                  //se a tecla for Enter
        sendMessage();
    }
});

const suggestions = [ 
    "Dor de cabeça forte, o que pode ser?", 
    "Engasgo com comida, o que fazer?",
    "Sintomas de gripe, o que devo fazer?",
    "Quais são os sintomas de COVID-19?",
    "O que fazer em caso de queimadura?",
    "Como tratar uma entorse?",
    "O que é pressão alta e como controlá-la?",
    "Quais são os sintomas de diabetes?",
];
const suggestionsContainer = document.querySelector(".suggestions");  
const suggestionBox = document.querySelector(".suggestion");
let currentSuggestionIndex = 0;                             //Índice da sugestão atual

function showNextSuggestion() {
    suggestionBox.innerText = suggestions[currentSuggestionIndex];
    currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
}
setInterval(showNextSuggestion, 3000);                      // Muda a sugestão a cada 3 segundos
showNextSuggestion();                                         // Mostra a primeira sugestão imediatamente
suggestionBox.addEventListener("click", () => {             //Ao clicar na sugestão, ela é copiada para o input
    input.value = suggestionBox.innerText;                  //Copia o texto da sugestão para o input
    input.focus();                                      //Foca no input 
});

input.addEventListener("input", () => {
    const query = input.value.toLowerCase();                        // Converte o texto do input para minúsculas    
    const filteredSuggestions = suggestions.filter(suggestion =>                          
        suggestion.toLowerCase().includes(query)                     // Filtra as sugestões que contêm o texto do input 
    );
    if (filteredSuggestions.length > 0) {
        suggestionBox.innerText = filteredSuggestions[0];           // Mostra a primeira sugestão filtrada
    } else {
        suggestionBox.innerText = "Nenhuma sugestão encontrada";    // Se nenhuma sugestão for encontrada
    }
    currentSuggestionIndex = suggestions.indexOf(suggestionBox.innerText);       // Atualiza o índice da sugestão atual
}); 

// Botão "..." abre/fecha a caixa flutuante
const toggleBtn = document.querySelector(".suggestion-button");
const floatingBox = document.createElement("div");
floatingBox.classList.add("floating-suggestions");
document.body.appendChild(floatingBox);

// Adiciona todas as sugestões no popup
suggestions.forEach(sug => {
    const sugDiv = document.createElement("div");
    sugDiv.classList.add("suggestion-item");
    sugDiv.innerText = sug;
    floatingBox.appendChild(sugDiv);

    // Se clicar em uma sugestão -> joga no input
    sugDiv.addEventListener("click", () => {
        input.value = sug;
        floatingBox.classList.remove("active");
        input.focus();
    });
});

// Alternar visibilidade ao clicar no botão
toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita conflito com o clique fora
    floatingBox.classList.toggle("active");
});

// Fechar se clicar fora
document.addEventListener("click", (e) => {
    if (!floatingBox.contains(e.target) && e.target !== toggleBtn) {
        floatingBox.classList.remove("active");
    }
});

const transcription = document.getElementById("input");
const speakButton = document.getElementById("speak");

speakButton.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        transcription.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error("Erro de reconhecimento de fala:", event.error);
    };
});
