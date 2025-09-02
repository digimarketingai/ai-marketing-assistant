# AI Marketing Assistant

This project is a teaching tool for the **digimarketingai** Multilingual Digital Marketing course.

It provides a simple, configurable AI chatbot that can be added to any website with minimal effort. The goal is to demonstrate a "low-code" approach, where marketers can customize and deploy an AI assistant by editing a simple configuration in an HTML file, without needing to know JavaScript.

---

# AI 行銷助理

本專案是 **digimarketingai** 多語言數位行銷課程的教學工具。

它提供了一個簡易、可配置的 AI 聊天機器人，只需極少操作即可添加到任何網站。其目標是展示一種「低程式碼」解決方案，讓行銷人員僅需編輯 HTML 中的簡單設定，無需了解 JavaScript，即可客製化並部署 AI 助理。

---

## Live Demo (線上預覽)

You can see a live demo of this project hosted on GitHub Pages:

**https://digimarketingai.github.io/ai-marketing-assistant/**

> **Note:** The demo is configured in Traditional Chinese to showcase its multilingual capabilities.
>
> **請注意：** 此預覽頁面已設定為繁體中文，以展示其多語言能力。

## Features (功能特色)

*   **Zero JS Knowledge Required:** Marketers only need to edit a simple list in an HTML file.
*   **Fully Configurable UI:** All user-facing text (titles, buttons, placeholders) can be changed.
*   **Knowledge-Base Driven:** The AI is restricted to only answer based on the information you provide, ensuring on-brand and accurate responses.
*   **Multilingual:** Easily configure the bot for any language by changing the text and knowledge base.
*   **Self-Contained:** The entire bot (logic, styles, HTML injection) is in a single `.js` file.

---

*   **無需 JS 知識：** 行銷人員只需編輯 HTML 中的一個簡單列表。
*   **介面完全客製化：** 所有面向使用者的文字 (標題、按鈕、提示) 均可修改。
*   **知識庫驅動：** AI 被嚴格限制，僅根據您提供的資訊回答，確保回覆內容符合品牌形象且準確無誤。
*   **多語言支援：** 只需更改文字和知識庫，即可輕鬆為任何語言配置機器人。
*   **獨立檔案：** 整個機器人 (邏輯、樣式、HTML 注入) 都在一個 `.js` 檔案中。

## Quick Start (快速開始)

1.  **Download the Files:** Download `MarketingAssistant.js` and the example `index.html` from this repository.
2.  **Customize `index.html`:** Open `index.html` in a text editor.
    *   Modify the `window.botConfig` object to change the UI text to your desired language.
    *   Update the `window.knowledgeBase` array with facts about your own product or service.
3.  **Upload to Your Website:** Upload both `index.html` and `MarketingAssistant.js` to your web server. That's it!

---

1.  **下載檔案：** 從此儲存庫下載 `MarketingAssistant.js` 和範例 `index.html`。
2.  **客製化 `index.html`：** 使用文字編輯器打開 `index.html`。
    *   修改 `window.botConfig` 物件，將介面文字更改為您想要的語言。
    *   更新 `window.knowledgeBase` 陣列，填入關於您自己產品或服務的資訊。
3.  **上傳到您的網站：** 將 `index.html` 和 `MarketingAssistant.js` 一同上傳到您的網路伺服器。就這麼簡單！