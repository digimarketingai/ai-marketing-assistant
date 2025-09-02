// =================================================================================================
//
//   ** MarketingAssistant.js **
//
//   Project: digimarketingai - Multilingual Digital Marketing
//   Author: digimarketingai
//
//   Description:
//   This script creates a configurable marketing assistant (chatbot) for any webpage. It's designed
//   as a teaching tool to demonstrate how digital marketers can deploy a multilingual AI assistant
//   with zero JavaScript knowledge by simply editing the HTML file.
//
//   How it Works for Marketers:
//   1. Define `window.botConfig` in your HTML to customize the bot's language and appearance.
//   2. Define `window.knowledgeBase` in your HTML with a list of facts about your product/service.
//   3. Include this script. The bot is now live.
//
// =================================================================================================
//
//   ** MarketingAssistant.js (行銷助理機器人) **
//
//   專案：digimarketingai - 多語言數位行銷
//   作者：digimarketingai
//
//   描述：
//   此腳本可在任何網頁上創建一個可配置的行銷助理 (聊天機器人)。它被設計為一個教學工具，
//   旨在展示數位行銷人員如何在不懂 JavaScript 的情況下，僅透過編輯 HTML 檔案，
//   就能部署一個多語言 AI 助理。
//
//   行銷人員如何使用：
//   1. 在您的 HTML 中定義 `window.botConfig`，以自訂機器人的語言和外觀。
//   2. 在您的 HTML 中定義 `window.knowledgeBase`，提供關於您的產品/服務的資訊列表。
//   3. 引入此腳本。機器人即可上線。
//
// =================================================================================================
//
//   ** MarketingAssistant.js (营销助理机器人) **
//
//   项目：digimarketingai - 多语言数字营销
//   作者：digimarketingai
//
//   描述：
//   此脚本可在任何网页上创建一个可配置的营销助理 (聊天机器人)。它被设计为一个教学工具，
//   旨在展示数字营销人员如何在不懂 JavaScript 的情况下，仅通过编辑 HTML 文件，
//   就能部署一个多语言 AI 助理。
//
//   营销人员如何使用：
//   1. 在您的 HTML 中定义 `window.botConfig`，以自定义机器人的语言和外观。
//   2. 在您的 HTML 中定义 `window.knowledgeBase`，提供关于您的产品/服务的信息列表。
//   3. 引入此脚本。机器人即可上线。
//
// =================================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    //   Part 1: Read Marketer's Configuration from HTML
    //   第一部分：從 HTML 讀取行銷人員的設定
    //   第一部分：从 HTML 读取营销人员的设置
    // ===================================================================

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
    //   Part 2: Dynamically Build the Page
    //   第二部分：動態建構頁面
    //   第二部分：动态构建页面
    // ===================================================================

    document.title = config.pageTitle;

    document.head.innerHTML += `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    `;

    const botHtmlStructure = `
        <div class="chat-container">
            <h1>${config.headerTitle}</h1>
            <input type="text" id="userInput" placeholder="${config.inputPlaceholder}">
            <button id="askButton">${config.submitButtonText}</button>
            <div id="answerDiv">${config.initialAnswerText}</div>
        </div>
    `;

    const cssStyles = `
        body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background-color:#f0f2f5;display:flex;justify-content:center;align-items:flex-start;padding-top:50px;height:100vh;margin:0}.chat-container{background-color:white;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.08);width:90%;max-width:600px;padding:25px 30px;box-sizing:border-box}h1{font-size:26px;color:#1c1e21;text-align:center;margin-top:0;margin-bottom:20px}#userInput{width:100%;padding:12px 15px;font-size:16px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;margin-bottom:15px;transition:border-color .2s}#userInput:focus{outline:none;border-color:#007bff}#askButton{width:100%;padding:12px;background-color:#007bff;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;font-weight:bold;transition:background-color .2s}#askButton:hover{background-color:#0056b3}#answerDiv{margin-top:25px;padding:15px;background-color:#f7f7f9;border:1px solid #e9e9eb;border-radius:8px;min-height:60px;font-size:16px;line-height:1.6;color:#333;white-space:pre-wrap}
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = cssStyles;
    document.head.appendChild(styleElement);
    document.body.innerHTML = botHtmlStructure;

    // ===================================================================
    //   Part 3: Activate the Chatbot Logic
    //   第三部分：啟動聊天機器人邏輯
    //   第三部分：启动聊天机器人逻辑
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

        // --- Thinking Animation ---
        clearInterval(thinkingInterval);
        let dotCount = 1;
        answerDiv.innerText = "請稍候，正在查找問題答案.";
        thinkingInterval = setInterval(() => {
            dotCount = (dotCount % 3) + 1;
            answerDiv.innerText = `請稍候，正在查找問題答案${".".repeat(dotCount)}`;
        }, 500);

        const prompt = `You are a helpful assistant on a company's website. Answer the user's question strictly based on the "Known Information" provided below. Do not use any external knowledge. If the answer is not in the "Known Information", you must reply with "I'm sorry, I don't have information about that."\n\n[Known Information]\n- ${knowledge.join('\n- ')}\n\n[User's Question]\n${userQuestion}`;
        
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