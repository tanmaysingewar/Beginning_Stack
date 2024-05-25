document.getElementById("extractButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractCodeFromDiv,
      },
      (results) => {
        if (results && results[0]) {
          document.getElementById("codeOutput").textContent = results[0].result;
        }
      },
    );
  });
});

document.getElementById("getUserEmail").addEventListener("click", () => {
  const emailElement = document.querySelector(".inputEmail");
  if (emailElement) {
    return console.log("Email : ", emailElement.value);
  } else {
    return console.log("Email not found");
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

chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value is " + result.key);
});
