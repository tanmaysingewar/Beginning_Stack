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
    // Add supabase code here
    // 1. check email exists in the database
    // 2. if exists, get the user email
    // 3. if not exists, insert the user email
    // 4. store the user email in the local storage
    // 5. display the application interface to the user
  } else {
    return console.log("Email not found");
  }
});

// On click of the button, extract the code from the editor and generate the report

// 1. Extract the code from the editor
// 2. Get the question information [Q_No] from decription
// 3. Get the solution and dec form the DB
// 2. Generate the report by calling the Gorq API

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
