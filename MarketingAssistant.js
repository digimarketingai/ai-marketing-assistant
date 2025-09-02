// =================================================================================================
//
//   ** MarketingAssistant.js **
//
//   Project: digimarketingai - Multilingual Digital Marketing
//   Author: digimarketingai
//
//   Description:
//   This script finds a <div> with the ID "marketing-assistant-container" on a webpage and
//   injects a configurable AI assistant into it. It is designed as a teaching tool for digital
//   marketers to deploy an AI assistant by editing the HTML file.
//
//   How it Works for Marketers:
//   1. Place `<div id="marketing-assistant-container"></div>` in your HTML where you want the bot to appear.
//   2. Define `window.botConfig` to customize the bot's language and appearance.
//   3. Define `window.knowledgeBase` with a list of facts about your product/service.
//   4. Include this script using a working path (like jsDelivr or GitHub Pages).
//
// =================================================================================================
//
//   ** MarketingAssistant.js (行銷助理機器人) **
//
//   專案：digimarketingai - 多語言數位行銷
//   作者：digimarketingai
//
//   描述：
//   此腳本會在網頁上尋找一個 ID 為 "marketing-assistant-container" 的 <div>，
//   並將一個可配置的 AI 助理注入其中。它被設計為一個教學工具，旨在讓數位行銷人員
//   透過編輯 HTML 檔案即可部署 AI 助理。
//
//   行銷人員如何使用：
//   1. 在您的 HTML 中，將 `<div id="marketing-assistant-container"></div>` 放置在您希望機器人出現的位置。
//   2. 定義 `window.botConfig` 以自訂機器人的語言和外觀。
//   3. 定義 `window.knowledgeBase` 提供關於您的產品/服務的資訊列表。
//   4. 使用有效的路徑 (例如 jsDelivr 或 GitHub Pages) 引入此腳本。
//
// =================================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    //   Part 1: Find Target and Read Configuration
    // ===================================================================

    // @en Find the placeholder <div> where the chatbot will be injected.
    // @zh_TW 尋找將要注入聊天機器人的預留位置 <div>。
    const targetContainer = document.getElementById('marketing-assistant-container');

    if (!targetContainer) {
        console.error("Execution Error: A div with the ID 'marketing-assistant-container' was not found on the page. The assistant could not be loaded.");
        return;
    }

    const defaults = {
        pageTitle: "Website Assistant",
        headerTitle: "How can I help you?",
        inputPlaceholder: "Ask about our products or services...",
        submitButtonText: "Send",
        initialAnswerText: "Hello! I can answer questions based on the information I have. How can I assist you today?"
    };

    const config = { ...defaults, ...window.botConfig };
    const knowledge = window.knowledgeBase;

    // ===================================================================
    //   Part 2: Build and Inject the Chatbot
    // ===================================================================

    // Note: We no longer set document.title, as this script should not alter the host page's title.
    
    // @en Add meta tags if they don't already exist. A simple check for the viewport meta.
    // @zh_TW 如果 meta 標籤不存在，則添加它。這裡只做一個簡單的 viewport meta 檢查。
    if (!document.querySelector('meta[name="viewport"]')) {
        document.head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
    }

    const botHtmlStructure = `
        <div class="chat-container">
            <h1>${config.headerTitle}</h1>
            <input type="text" id="userInput" placeholder="${config.inputPlaceholder}">
            <button id="askButton">${config.submitButtonText}</button>
            <div id="answerDiv">${config.initialAnswerText}</div>
        </div>
    `;

    const cssStyles = `
        .chat-container{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background-color:white;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.08);width:100%;max-width:600px;padding:25px 30px;box-sizing:border-box;margin:auto} .chat-container h1{font-size:26px;color:#1c1e21;text-align:center;margin-top:0;margin-bottom:20px} .chat-container #userInput{width:100%;padding:12px 15px;font-size:16px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;margin-bottom:15px;transition:border-color .2s} .chat-container #userInput:focus{outline:none;border-color:#007bff} .chat-container #askButton{width:100%;padding:12px;background-color:#007bff;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;font-weight:bold;transition:background-color .2s} .chat-container #askButton:hover{background-color:#0056b3} .chat-container #answerDiv{margin-top:25px;padding:15px;background-color:#f7f7f9;border:1px solid #e9e9eb;border-radius:8px;min-height:60px;font-size:16px;line-height:1.6;color:#333;white-space:pre-wrap}
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = cssStyles;
    document.head.appendChild(styleElement);

    // @en Inject the chatbot HTML into the target container, not the whole body.
    // @zh_TW 將聊天機器人的 HTML 注入到目標容器中，而不是整個 body。
    targetContainer.innerHTML = botHtmlStructure;

    // ===================================================================
    //   Part 3: Activate the Chatbot Logic
    // ===================================================================

    const userInput = document.getElementById('userInput');
    const askButton = document.getElementById('askButton');
    const answerDiv = document.getElementById('answerDiv');
    let thinkingInterval = null;

    if (typeof knowledge === 'undefined' || knowledge.length === 0) {
        answerDiv.innerHTML = "<b>Configuration Error:</b> The 'knowledgeBase' is missing. Please define it in your HTML file.";
        return;
    }

    async function getAnswer() {
        const userQuestion = userInput.value;
        if (!userQuestion) {
            answerDiv.innerText = "Please enter your question first.";
            return;
        }

        clearInterval(thinkingInterval);
        let dotCount = 1;
        answerDiv.innerText = "請稍候，正在查找問題答案.";
        thinkingInterval = setInterval(() => {
            dotCount = (dotCount % 3) + 1;
            answerDiv.innerText = `請稍候，正在查找問題答案${".".repeat(dotCount)}`;
        }, 500);

        const prompt = `You are a helpful assistant on a company's website. Answer the user's question strictly based on the "Known Information" provided below. Do not use any external knowledge. If the answer is not in the "Known Information", you must reply with "I'm sorry, I don't have information about that." in the language that the user uses.\n\n[Known Information]\n- ${knowledge.join('\n- ')}\n\n[User's Question]\n${userQuestion}`;
        
        try {
            const response = await puter.ai.chat(prompt);
            clearInterval(thinkingInterval);
            answerDiv.innerText = response;
        } catch (error) {
            clearInterval(thinkingInterval);
            answerDiv.innerText = "An error occurred while connecting to the AI service.";
            console.error("AI Service Error:", error);
        }
    }

    askButton.addEventListener('click', getAnswer);
    userInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') getAnswer();
    });
});
