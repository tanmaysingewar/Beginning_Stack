// Content script (content.js)

const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

const addButtonElement = `
  <div class="relative flex overflow-hidden rounded bg-fill-tertiary dark:bg-fill-tertiary mr-[6px] ml-2">
    <div class="group flex flex-none items-center justify-center hover:bg-fill-quaternary dark:hover:bg-fill-quaternary">
    <div data-state="closed">
      <div style="display: none;" id="generateReportLoading">
      <div class="flex felx-row px-3" >
        <img src="/_next/static/images/dark-pending-f313d6fe32951fb6b4d48ad3ee4f3821.gif" alt="Pending..." class="h-5 w-5 mr-2">
        <div class="text-xs leading-[20px] text-text-secondary dark:text-text-secondary">Analyzing</div>
      </div>
      </div>
      <div id="generateReportButton">
        <button
          data-e2e-locator="console-submit-button"
          class="font-medium items-center whitespace-nowrap focus:outline-none inline-flex relative select-none rounded-none px-3 py-1.5 bg-transparent dark:bg-transparent text-green-60 dark:text-blue-60">
          <div class="relative text-[16px] leading-[normal] p-0.5 before:block before:w-4 mr-2">
            <svg 
              fill="#037CFF"
              height="17px"
              width="17px"
              version="1.1"
              id="Layer_1"
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.087 231.087" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 231.087 231.087">
                <g>
                  <path d="m230.042,142.627c-1.871-2.744-5.612-3.452-8.355-1.581l-65.513,44.667-14.55-19.473c-1.526-2.036-4.241-2.977-6.788-2.129-3.185,1.06-4.908,4.501-3.848,7.686l11.908,35.785c0.45,1.33 1.184,2.645 2.18,3.757 3.94,4.401 10.702,4.776 15.104,0.836l.777-.695 68.129-60.985c2.216-1.981 2.676-5.346 0.956-7.868z"/>
                  <path d="m120.211,190.676h-108.211v-162.49h158.43v124.823c0,3.313 2.687,6 6,6s6-2.687 6-6v-130.823c0-3.313-2.687-6-6-6h-170.43c-3.313,0-6,2.687-6,6v174.49c0,3.313 2.687,6 6,6h114.211c3.313,0 6-2.687 6-6 0-3.314-2.687-6-6-6z"/>
                  <path d="m139.694,53.855h-96.959c-3.313,0-6,2.687-6,6s2.687,6 6,6h96.959c3.313,0 6-2.687 6-6s-2.686-6-6-6z"/>
                  <path d="m139.694,79.79h-96.959c-3.313,0-6,2.687-6,6s2.687,6 6,6h96.959c3.313,0 6-2.687 6-6s-2.686-6-6-6z"/>
                  <path d="m139.694,105.725h-96.959c-3.313,0-6,2.687-6,6s2.687,6 6,6h96.959c3.313,0 6-2.687 6-6s-2.686-6-6-6z"/>
                  <path d="m145.694,137.659c0-3.313-2.687-6-6-6h-96.959c-3.313,0-6,2.687-6,6s2.687,6 6,6h96.959c3.314,0 6-2.686 6-6z"/>
                  <path d="M42.735,156.329c-3.313,0-6,2.687-6,6s2.687,6,6,6h48.479c3.313,0,6-2.687,6-6s-2.687-6-6-6H42.735z"/>
                </g>
              </svg>
          </div>
          <span class="text-sm font-medium">Analyze</span>
        </button>
      </div>
      </div>
    </div>
  </div>
  `;

const popupMessageProvider = `<div id="messages-provider" class="fixed bottom-0 left-0 right-0 pointer-events-none z-message" style="top: 54px;"></div>`;

const newPopupNotification = (message) => {
  return `
  <div id="reportNotification" class="transition-opacity duration-500 ease-in-out z-message">
        <div class="transform scale-100 opacity-100">
            <div class="flex justify-center">
                <div class="px-4 py-1.5 bg-paper dark:bg-dark-paper text-label-1 dark:text-dark-label-1 shadow-level2 dark:shadow-dark-level2 pointer-events-auto my-2 flex items-center rounded-full">
                    <span>${message}</span>
                </div>
            </div>
        </div>
  </div>
  `;
};

const newDivElement = document.createElement("div");
newDivElement.innerHTML = popupMessageProvider;
document.body.appendChild(newDivElement.firstElementChild);

function addButton() {
  const targetContainer = document.getElementById("ide-top-btns");

  const newDiv = document.createElement("div");
  newDiv.innerHTML = addButtonElement;
  targetContainer.appendChild(newDiv.firstElementChild);

  document
    .getElementById("generateReportButton")
    .addEventListener("click", () => {
      document.querySelector("#generateReportButton").style.display = "none";
      document.querySelector("#generateReportLoading").style.display = "block";

      // getting slug
      const slugFromUrl = getSlug();

      if (!slugFromUrl) {
        createPopUpNotification(
          "Sorry, We are not able to get the problem slug"
        );
        document.querySelector("#generateReportButton").style.display = "block";
        document.querySelector("#generateReportLoading").style.display = "none";
        return;
      }

      // getting data from the DB
      const solution = getSolutionFromDB(slugFromUrl);

      if (!solution) {
        createPopUpNotification(
          "Sorry, We are not able to generate the report for this problem"
        );
        document.querySelector("#generateReportButton").style.display = "block";
        document.querySelector("#generateReportLoading").style.display = "none";
        return;
      }

      // Getting Users code
      const userCode = extractCodeFromDiv();

      if (!userCode) {
        createPopUpNotification(
          "Sorry, We are not able to get the code from the editor"
        );
        document.querySelector("#generateReportButton").style.display = "block";
        document.querySelector("#generateReportLoading").style.display = "none";
        return;
      }

      // Call Groq API
      createReport(solution, userCode);
    });
}

function createReport(solution, userCode) {
  const result = document.querySelector('[data-e2e-locator="console-result"]');
  const resultAccepted = result ? result.textContent : "Element not found";
  console.log(resultAccepted);

  if (!result?.textContent) {
    document.querySelector("#generateReportButton").style.display = "block";
    document.querySelector("#generateReportLoading").style.display = "none";
    return createPopUpNotification(
      "Please run the code before Generating the report"
    );
  }

  try {
    const userLanguageElement = document.querySelector(
      ".rounded.items-center.whitespace-nowrap.focus\\:outline-none.inline-flex.bg-transparent.dark\\:bg-dark-transparent.text-text-secondary.dark\\:text-text-secondary.active\\:bg-transparent.dark\\:active\\:bg-dark-transparent.hover\\:bg-fill-secondary.dark\\:hover\\:bg-fill-secondary.px-1\\.5.py-0\\.5.text-sm.font-normal.group"
    );
    const userLanguage = userLanguageElement
      ? userLanguageElement.textContent
      : "Element not found";
    console.log(userLanguage);

    chrome.storage.local.get(["groqApi"]).then((result) => {
      const GROQ_API_KEY = result.groqApi;

      if (!GROQ_API_KEY) {
        createPopUpNotification(
          "Please add the GROQ API Key!! 😓, by clicking on Extension icon"
        );
        document.querySelector("#generateReportButton").style.display = "block";
        document.querySelector("#generateReportLoading").style.display = "none";
        return;
      }

      const requestData = {
        messages: [
          {
            role: "user",
            content: `
          You are the Code Analyser.
          You have generate analysis user code based on
          1. Tell what they have done in solution.
          2. What improvement user can do enhance the Solution
          3. Comment on code and how he or she can solve the answer in better way.

          User code execution result is ${resultAccepted}

          Here is the problem description :
          ${solution.content}

          User written solution for the above problem :
          ${userCode}

          User language : ${userLanguage}

          And here is the optimal solution for the problem description
          ${
              userLanguage == "Java"
              ? solution.answer.java
              : userLanguage == "Python"
              ? solution.answer.python
              : userLanguage == "JavaScript"
              ? solution.answer.javascript
              : userLanguage == "C++"
              ? solution.answer.cpp
              : solution.answer.java
          }

          Explanation for the solution of the problem 
          ${solution.answer.explanation}. 

          Task:
          Please analyze the user's code based on the following aspects and provide a detailed evaluation:

          1. **Correctness:**
            - Does the user's code solve the problem correctly? Highlight any discrepancies or errors compared to the correct solution.
            - Mention if the users code passes all provided test cases.

          2. **Efficiency:**
            - Analyze the time complexity of the user's solution.
            - Analyze the space complexity of the user's solution.

          3. **Data Structure Usage:**
            - Evaluate the appropriateness and efficiency of the data structures used in the user's solution.

          4. **Algorithm Design:**
            - Assess whether the chosen algorithm is appropriate for solving the problem efficiently.
            - Discuss any alternative algorithms that could have been used.

          5. **Code Readability and Maintainability:**
            - Comment on the organization and structure of the code.
            - Evaluate the use of comments and naming conventions.

          6. **Optimization:**
            - Suggest any potential optimizations that could improve the performance of the user's code.

          7. **Testing and Validation:**
            - Review the comprehensiveness of the test cases considered by the user.
            - Discuss the robustness of the solution with respect to different input scenarios.
          
          Note : 
          Everything should be in point vise only
          Always include Optimal Solution code and User Code in response. 
          Always keep the Analysis as the first words of the response.
          Don't refer user as a user in report just use words like you and your for Personal Touch
          Give all the response in 2 to 3 points
          Avoid white space in the response
          Always starts point with number`
          },
        ],
        model: "llama3-70b-8192",
      };
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            createPopUpNotification(
              "Invalid API Key, Please change the you GORQ API Key"
            );
            document.querySelector("#generateReportButton").style.display =
              "block";
            document.querySelector("#generateReportLoading").style.display =
              "none";
            return;
          }
          console.log(data.choices[0].message.content);
          const targetContainer = document.querySelector(
            '[data-layout-path="/ts0/t0"]'
          );
          targetContainer.removeChild(targetContainer.lastChild);

          const newDiv = document.createElement("div");

          // Replace double asterisk words with <b> tags
          const boldRegex = /\*\*(.*?)\*\*/g;
          const formattedText = data.choices[0].message.content
            .replace(boldRegex, `<b>$1</b>`)
            .replace(
              /(Analysis:)/g,
              '<span style="font-size: 24px;"><b>Analysis</b></span>'
            )
            .replace(
              /(Analysis)/g,
              '<span style="font-size: 24px;"><b>$1</b></span>'
            );

            const modifiedText = formattedText.replace(/```([\s\S]*?)```/g, (match, p1) => {
              let words = p1.split(" ");
              words.shift(); // Remove the first word
              return "```" + words.join(" ") + "```";
            });

          const replacedText = modifiedText.replace(/^\*(.*$)/gm, `- $1`).trim();
          const displayAnalysis = replacedText.replace(
            /```([\s\S]*?)```/g,
            `<div class="mb-6 overflow-hidden rounded-lg text-sm mt-5"><div class="flex select-none bg-layer-2 dark:bg-dark-layer-2"><div class="font-menlo relative flex h-10 cursor-pointer items-center justify-center px-3 font-medium transition-all text-label-1 dark:text-dark-label-1 EoHqa">${userLanguage}</div></div><div class="px-3 py-2.5 bg-fill-3 dark:bg-dark-fill-3"><div class="group relative" translate="no"><pre style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none; padding: 0px; margin: 0px; overflow: auto; background: transparent;"><code class="language-java" style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, &quot;Courier New&quot;, monospace; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none;">$1</code></pre></div></div></div>`
          );

          newDiv.innerHTML = `<div style="white-space: pre-wrap; padding : 20px">${displayAnalysis}<p class="mt-5">If you feel the analysis is not good enough, regenerate the report by clicking analysis button.</p></div>`;

          targetContainer.appendChild(newDiv);
          createPopUpNotification("Analysis Report is been created 😁");

          document.querySelector("#generateReportButton").style.display =
            "block";
          document.querySelector("#generateReportLoading").style.display =
            "none";
        })
        .catch((error) => {
          document.querySelector("#generateReportButton").style.display =
            "block";
          document.querySelector("#generateReportLoading").style.display =
            "none";
          console.error("Error:", error);
        });
    });
  } catch (err) {
    createPopUpNotification(
      "Error in Generating the Report. Please! reload the page or try again"
    );
    document.querySelector("#generateReportButton").style.display = "block";
    document.querySelector("#generateReportLoading").style.display = "none";
  }
}

function createPopUpNotification(message) {
  const messageProviderElement = document.querySelector("#messages-provider");

  const newNotication = document.createElement("div");
  newNotication.innerHTML = newPopupNotification(message);
  messageProviderElement.appendChild(newNotication);

  setTimeout(() => {
    // remove the popup notification
    const getReportNotification = document.querySelector("#reportNotification");

    getReportNotification.className =
      "transition-opacity duration-500 ease-in-out z-message opacity-0";
  }, 2000);

  setTimeout(() => {
    // delete PopUp notification
    const getReportNotification = document.querySelector("#reportNotification");
    getReportNotification.remove();
  }, 2600);
}

function getSlug() {
  const baseUrl = "https://leetcode.com/problems/";
  const slug = window.location?.toString()?.substring(baseUrl.length)?.split("/")[0];
  if (slug) {
    return slug;
  } 
  return null;
}

function getSolutionFromDB(slugFromUrl) {
  for (var i = 0; i < AllProblems.length; i++) {
    if (AllProblems[i].slug == slugFromUrl) {
      console.log("Q:", AllProblems[i]);
      return AllProblems[i];
    }
  }
  return null;
}

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

let checkExist = setInterval(function () {
  if (document.getElementById("ide-top-btns")) {
    addButton();
    clearInterval(checkExist);
  }
}, 100); // check every 100ms
