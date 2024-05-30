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

document.getElementById("getUserEmail").addEventListener("click", () => {
  const email = document.querySelector("#userEmail");
  const groqAPI = document.querySelector("#groqAPI");
  if (!email.value || !groqAPI.value) {
    document.querySelector("#errorMessage").style.display = "block";
    return;
  }

  document.querySelector("#loadingSpinner").style.display = "block";
  document.querySelector("#buttontext").style.display = "none";

  _supabase
    .from("users")
    .select()
    .eq("email_id", `${email.value}`)
    .then((data) => {
      console.log("Users: ", data.data);
      if (!data.data[0]) {
        _supabase
          .from("users")
          .insert([{ email_id: email.value }])
          .select()
          .then((data) => {
            console.log(data);
            chrome.storage.local.set({ user: email.value }).then(() => {
              chrome.storage.local.set({ groqApi: groqAPI.value }).then(() => {
                document.querySelector("#logInScreen").style.display = "none";
                document.querySelector("#mainApplication").style.display =
                  "block";
              });
            });
          });
      } else {
        chrome.storage.local.set({ user: email.value }).then(() => {
          chrome.storage.local.set({ groqApi: groqAPI.value }).then(() => {
            document.querySelector("#logInScreen").style.display = "none";
            document.querySelector("#mainApplication").style.display = "block";
          });
        });
      }
    });
  console.log("Email : ", email.value);
  // Clear all current interface with the button with sync to cloud
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

chrome.storage.local.get(["user"]).then((result) => {
  console.log("Value is " + result.user);
  const userID = result.user;
  chrome.storage.local.get(["groqApi"]).then((result) => {
    console.log("Value is " + result.groqApi);
    const groqAPIId = result.groqApi;
    if (userID && groqAPIId) {
      document.querySelector("#logInScreen").style.display = "none";
      document.querySelector("#mainApplication").style.display = "block";
    } else {
      document.querySelector("#logInScreen").style.display = "block";
      document.querySelector("#mainApplication").style.display = "none";
    }
  });
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
