// Content script (content.js)

function addButton() {
  const element = document.createElement("button");
  element.innerHTML = "Generate Report";
  element.style.cssText =
    "background-color: #222222; color: #007CFF; padding: 5px 10px; text-align: center; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 14px; margin: 0px 5px; cursor: pointer; font-weight: 600;";
  document.getElementById("ide-top-btns").appendChild(element);
  console.log("Button appended");
}

console.log("Content script loaded");
chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value is client " + result.key);
});

// Wait for the DOM to be fully loaded before adding the button
// add do while loop to check if the element is loaded

let checkExist = setInterval(function () {
  if (document.getElementById("ide-top-btns")) {
    addButton();
    clearInterval(checkExist);
  }
}, 100); // check every 100ms
