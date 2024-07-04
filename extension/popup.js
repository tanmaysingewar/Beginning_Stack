// document.getElementById("extractButton").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tabs[0].id },
//         function: extractCodeFromDiv,
//       },
//       (results) => {
//         if (results && results[0]) {
//           document.getElementById("codeOutput").textContent = results[0].result;
//         }
//       },
//     );
//   });
// });
//

document.getElementById("getAPIKey").addEventListener("click", () => {
  const groqAPI = document.querySelector("#groqAPI");

  document.querySelector("#loadingSpinner").style.display = "block";
  document.querySelector("#buttontext").style.display = "none";

  if (!groqAPI.value) {
    document.querySelector("#errorMessage").style.display = "block";
    document.querySelector("#loadingSpinner").style.display = "none";
    document.querySelector("#buttontext").style.display = "block";
    return;
  }

  chrome.storage.local.set({ groqApi: groqAPI.value }).then(() => {
    document.querySelector("#logInScreen").style.display = "none";
    document.querySelector("#mainApplication").style.display = "block";
  });

  document.querySelector("#loadingSpinner").style.display = "none";
  document.querySelector("#buttontext").style.display = "block";
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

chrome.storage.local.get(["groqApi"]).then((result) => {
  console.log("Value is " + result.groqApi);
  const groqAPIId = result.groqApi;
  if (groqAPIId) {
    document.querySelector("#logInScreen").style.display = "none";
    document.querySelector("#mainApplication").style.display = "block";
  } else {
    document.querySelector("#logInScreen").style.display = "block";
    document.querySelector("#mainApplication").style.display = "none";
  }
});

document.querySelector("#clearScession").addEventListener("click", () => {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
    document.querySelector("#logInScreen").style.display = "block";
    document.querySelector("#mainApplication").style.display = "none";
  });
});

document.getElementById("test").addEventListener("click", function () {
  chrome.tabs.create({ url: "https://exampleURL.com/" });
  console.log("Button clicked");
});
