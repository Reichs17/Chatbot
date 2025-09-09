const chat = document.getElementById("chat"); //pega o id do chat
const input = document.getElementById("input"); //pega o id do input
const send = document.getElementById("send"); //pega o id do botão enviar
const messages = document.getElementById("messages"); //pega o id da div messages

// evento de clique no botão enviar
send.addEventListener("click", () => {  //função de clique
    const text = input.value.trim();   //pega o valor do input e remove espaços em branco
if (!text) return; // se o input estiver vazio, não faz nada


    chat.classList.add("active");  //adiciona a classe active ao chat

        const userMsg = document.createElement("div"); //cria uma div para a mensagem do usuário
        userMsg.className = "message user"; //adiciona a classe message e user à div
        userMsg.innerText = text; //adiciona o texto do input à div
        messages.appendChild(userMsg); //adiciona a div à div messages

        input.value = ""; //limpa o input

setTimeout(() => { //função para simular o tempo de resposta do bot
    const botMsg = document.createElement("div"); //cria uma div para a mensagem do bot
    botMsg.className = "message bot"; //adiciona a classe message e bot à div
    botMsg.innerText = "Resposta do Kojima 🤖"; //adiciona o texto da resposta à div
    messages.appendChild(botMsg); 

    messages.scrollTop = messages.scrollHeight; //faz a rolagem automática para a última mensagem
      }, 800);
    });

var enter = document.getElementById("input");
enter.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("send").click();
    }
});
