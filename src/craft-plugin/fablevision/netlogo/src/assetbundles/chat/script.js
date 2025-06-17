const startChatButton = document.getElementById('chat-start-chat');
const sendButton = document.getElementById('chat-send-btn');
const userNameInput = document.getElementById('chat-user-name');
const userInput = document.getElementById('chat-user-input');
const chatBox = document.getElementById('chat-box');
const chatBoxContainer = document.getElementById('chat-box-container');
const userIdentification = document.getElementById('chat-user-identification');

userNameInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      startChatButton.click();
    }
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}); 

userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendButton.click();
    }
}); 


// URL do Google Apps Script (mude para a URL gerada ao publicar o Apps Script)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxAcDb2nocWd29Gx8KDtRLTREoy-p-RberulhlgSuWNWwpPMkHa6daNlmDJJl8i4M0/exec';
const OPENAI_API_KEY = ''
let userName = "";
let conversationHistory = [];

// Ativa o chat quando o usuário clicar em "Iniciar Chat"
startChatButton.addEventListener('click', () => {
    userName = userNameInput.value.trim();
    if (userName) {
        userIdentification.style.display = 'none'; // Esconde a identificação do usuário
        chatBoxContainer.style.display = 'block'; // Exibe a área de chat
        displayMessage(`<b>MoDa</b>: HI, Student ${userName}. Let's get started!`);
        userInput.focus();
    } else {
        alert("Please enter your name.");
    }
});

// Envia a mensagem do usuário para o ChatGPT
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        displayMessage('---------------------------');
        displayMessage(`<b>Student ${userName}</b>: ${message}`);
        userInput.value = ''; // Limpar o campo de entrada
        getChatGptResponse(message);
    }
});

function displayMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = parseMarkdown(message);
    chatBox.appendChild(msgDiv);
    
    const messageElement = chatBox.lastElementChild;
    const scrollPosition = messageElement.offsetTop - chatBox.offsetTop;
    chatBox.scrollTop = scrollPosition;
    
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

// Interage com a API do ChatGPT
async function getChatGptResponse(userMessage) {

    conversationHistory.push({ role: 'user', content: userMessage });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: conversationHistory
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content.trim();

    conversationHistory.push({ role: 'assistant', content: botReply });

    // Exibir a resposta do ChatGPT
    displayMessage(`<b>ChatBot</b>: ${botReply}`);
    
    // Salvar a conversa na Planilha do Google via Google Apps Script
    saveConversationToGoogleSheets(userName, userMessage, botReply);
}

async function saveConversationToGoogleSheets(userName, userMessage, botReply) {
    const payload = {
        userName: userName,
        userMessage: userMessage,
        botReply: botReply,
        timeStamp: new Date().toISOString()
    };

    fetch(GOOGLE_APPS_SCRIPT_URL, { 
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {"Content-Type": "text/plain;charset=utf-8",}
    })
}

function parseMarkdown(markdown) {
    // Convertendo cabeçalhos
    markdown = markdown.replace(/^# (.*)$/gm, '<h1>$1</h1>'); // h1
    markdown = markdown.replace(/^## (.*)$/gm, '<h2>$1</h2>'); // h2
    markdown = markdown.replace(/^### (.*)$/gm, '<h3>$1</h3>'); // h3
    markdown = markdown.replace(/^#### (.*)$/gm, '<h4>$1</h4>'); // h4
    markdown = markdown.replace(/^##### (.*)$/gm, '<h5>$1</h5>'); // h5
    markdown = markdown.replace(/^###### (.*)$/gm, '<h6>$1</h6>'); // h6

    // Convertendo negrito (** ou __)
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // **negrito**
    markdown = markdown.replace(/__(.*?)__/g, '<strong>$1</strong>'); // __negrito__

    // Convertendo itálico (* ou _)
    // markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>'); // *itálico*
    // markdown = markdown.replace(/_(.*?)_/g, '<em>$1</em>'); // _itálico_

    // Convertendo listas não ordenadas
    markdown = markdown.replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>'); // * item
    markdown = markdown.replace(/^\+ (.*)$/gm, '<ul><li>$1</li></ul>'); // + item
    markdown = markdown.replace(/^\- (.*)$/gm, '<ul><li>$1</li></ul>'); // - item

    // Convertendo listas ordenadas
    // markdown = markdown.replace(/^\d+\. (.*)$/gm, '<ol><li>$1</li></ol>'); // 1. item

    // Convertendo links [link](url)
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'); // [link](url)

    // Convertendo imagens ![alt text](url)
    markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />'); // ![alt](url)

    // Convertendo quebras de linha (\n)
    markdown = markdown.replace(/\n/g, '<br>'); // \n para <br>

    // Convertendo parágrafos (texto simples em <p>)
    markdown = markdown.replace(/^(?!<.*>)(.*)$/gm, '<p>$1</p>'); // texto simples para <p>

    return markdown;
}

