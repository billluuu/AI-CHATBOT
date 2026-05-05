// import {apikey} from "./config.js"

// const chatBox = document.getElementById("Chat-box");
// const userInput = document.getElementById("user-input");
// const sendBtn = document.getElementById("send-btn");

// window.onload = () => {
//    const savedchat = localstorage.getItem("chatHistory");
//    console.log({savedChat});
//    if (savedChat) chatBox.innerHTML = savedChat;
//    chatBox.scrollTop = chatBox.scrollHeight;
// }

// function addMessage(message, classNme) {
//    const msgDiv = document.createElement("div");
//    msgDiv.classList.add("message", className);
//    msgDiv.textContent = message;
//    chatBox.appendChild(msgDiv);
//    chatBox.scrollTop = chatBox.scrollHeight;
// }   
// function showTyping() {

//     const typingDiv = document.createElement("div");
//     typingDiv.classList.add("message", "bot-message");
//     typingDiv.textContent = "AI is typing...";
//     chatBox.appendChild(typingDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
//     return typingDiv;
// }   

// function getBotReplay(userMessage){
//     const usrl = "";

//     try {
//         const response = await fetch(URL,{
//             method:"post",
//             headers:{"content-type": "application/json"},
//             body: JSON.stringify({
//                 contents:[{parts: userMessage}]
//             })

//         })
//         const data = await response.json();
//         console.log({data});

//         if (!response.ok){
//             console.error("Api Error:", data);
//             return data?.error?.message || "Error Fetching response."
//         }


//         return(
//             data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I can't get that."
//         )

//     }catch (error){

//     }
// }

// sendBtn.onclick = async() =>{
//     const message = userInput.ariaValueMax.trim();
//     if (message === "") return;
//     addMessage(message, "user-message");
//     userInput.value = ""

//     const typingDiv = showTyping();
//     const botReplay = await getBotReplay();
//     typingDiv.remove();
//     addMessage(botReplay,"bot-message");
//     localStorage.setItem("chatHistory", chatBox.innerHTML);  
// }

// userInput.addEventListener("keypress", (e)=>{
//     if (e.key === "Enter") sendBtn.click();
// })


import { apikey } from "./config.js";

const chatBox = document.getElementById("Chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Load chat history
window.onload = () => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) chatBox.innerHTML = savedChat;
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Add message to UI
function addMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.textContent = "AI is typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}

// API call
async function getBotReply(userMessage) {

    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apikey}`;

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            return data.error?.message || "Error fetching response";
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text 
            || "No response from AI";

    } catch (error) {
        console.error(error);
        return "Network error";
    }
}

// Send button
sendBtn.onclick = async () => {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user-message");
    userInput.value = "";

    const typingDiv = showTyping();

    const botReply = await getBotReply(message);

    typingDiv.remove();
    addMessage(botReply, "bot-message");

    localStorage.setItem("chatHistory", chatBox.innerHTML);
};

// Enter key support
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});