// Content script (content.js)
// This script runs on web pages to interact with the DOM and extract code.

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extractCode") {
    const code = extractCodeFromDiv();
    sendResponse({ code: code });
  }
});

function extractCodeFromDiv() {
  const codeDiv = document.querySelector(".view-lines");
  if (!codeDiv) {
    return null;
  }
  let code = "";
  const lines = codeDiv.querySelectorAll(".view-line");
  lines.forEach((line) => {
    const text = line.textContent.trim();
    code += text + "\n";
  });
  return code.trim();
}
