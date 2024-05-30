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

document.getElementById("getUserEmail").addEventListener("click", () => {
  console.log("Button clicked!!");
  const email = document.querySelector("#userEmail");
  const groqAPI = document.querySelector("#groqAPI");
  if (email) {
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
                console.log("Value is set user to : ", email.value);
              });
              chrome.storage.local.set({ groqApi: groqAPI.value }).then(() => {
                console.log("Value is set user to : ", groqAPI.value);
              });
            });
        } else {
          chrome.storage.local.set({ user: email.value }).then(() => {
            console.log("Value is set user to : ", email.value);
          });
          chrome.storage.local.set({ groqApi: groqAPI.value }).then(() => {
            console.log("Value is set user to : ", groqAPI.value);
          });
        }
      });
    return console.log("Email : ", email.value);
    // Clear all current interface with the button with sync to cloud
  } else {
    // raise a warning that the email and groqAPI is required
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

chrome.storage.local.get(["user"]).then((result) => {
  console.log("Value is " + result.user);
});

document.getElementById("test").addEventListener("click", function () {
  chrome.tabs.create({ url: "https://exampleURL.com/" });
  console.log("Button clicked");
});
