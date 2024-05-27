// Content script (content.js)
//
const element = `
<div
    data-layout-path="/ts0/tb0"
    class="flexlayout__tab_button flexlayout__tab_button_top flexlayout__tab_button--selected"
>
    <div class="flexlayout__tab_button_content">
        <div
            class="relative flex items-center gap-1 overflow-hidden text-sm capitalize"
            id="description_tab"
            style="max-width: 150px"
        >
            <div
                class="relative text-[14px] leading-[normal] p-[1px] before:block  before:w-3.5 text-sd-blue-500"
            >
                <svg
                    fill="#037CFF"
                    height="15px"
                    width="15px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 297.001 297.001"
                    xml:space="preserve"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <g>
                                    <path
                                        d="M178.138,152.609c-29.565,0-53.617,24.052-53.617,53.617s24.052,53.617,53.617,53.617s53.618-24.052,53.618-53.617 S207.701,152.609,178.138,152.609z M178.138,240.193c-18.729,0-33.967-15.238-33.967-33.967c0-5.797,1.463-11.258,4.034-16.037 l22.985,22.985c1.843,1.842,4.342,2.878,6.948,2.878h32.513C206.425,230.004,193.451,240.193,178.138,240.193z M182.208,196.401 L162.1,176.293c4.78-2.571,10.241-4.034,16.037-4.034c15.315,0,28.289,10.189,32.514,24.142H182.208z"
                                    ></path>
                                    <path
                                        d="M235.993,29.194h-28.268c-3.455-8.548-11.835-14.598-21.606-14.598H170.86C167.071,6.009,158.475,0,148.501,0 s-18.57,6.009-22.359,14.597h-15.259c-9.771,0-18.152,6.05-21.606,14.598H61.009c-13.517,0-24.515,10.998-24.515,24.515v218.777 c0,13.517,10.998,24.514,24.515,24.514h174.984c13.517,0,24.515-10.997,24.515-24.514V53.709 C260.508,40.192,249.51,29.194,235.993,29.194z M107.234,37.895L107.234,37.895c0.001-2.011,1.638-3.648,3.649-3.648h23.02 c5.426,0,9.825-4.399,9.825-9.825c0-2.631,2.141-4.772,4.772-4.772s4.772,2.141,4.772,4.772c0,5.426,4.399,9.825,9.825,9.825 h23.02c2.011,0,3.648,1.637,3.648,3.648v16.847c0,2.011-1.637,3.648-3.648,3.648h-75.235c-2.011,0-3.648-1.637-3.648-3.648 V37.895z M235.993,277.35H61.009c-2.683,0-4.865-2.182-4.865-4.864V53.709c0-2.683,2.182-4.865,4.865-4.865h26.576v5.897 c0,12.847,10.452,23.298,23.298,23.298h75.235c12.847,0,23.298-10.452,23.298-23.298v-5.897h26.576 c2.683,0,4.865,2.182,4.865,4.865v218.777h0.001C240.857,275.168,238.675,277.35,235.993,277.35z"
                                    ></path>
                                    <path
                                        d="M75.514,113.869h72.987c5.426,0,9.825-4.399,9.825-9.825c0-5.426-4.399-9.825-9.825-9.825H75.514 c-5.426,0-9.825,4.399-9.825,9.825C65.688,109.47,70.087,113.869,75.514,113.869z"
                                    ></path>
                                    <path
                                        d="M75.514,143.064h43.793c5.426,0,9.825-4.399,9.825-9.825c0-5.426-4.399-9.825-9.825-9.825H75.514 c-5.426,0-9.825,4.399-9.825,9.825C65.688,138.665,70.087,143.064,75.514,143.064z"
                                    ></path>
                                    <path
                                        d="M129.131,162.434c0-5.426-4.399-9.825-9.825-9.825H75.514c-5.426,0-9.825,4.399-9.825,9.825 c0,5.426,4.399,9.825,9.825,9.825h43.793C124.733,172.259,129.131,167.86,129.131,162.434z"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="relative">
                <div class="medium whitespace-nowrap font-medium">
                    Reports
                </div>
                <div
                    class="normal absolute left-0 top-0 whitespace-nowrap font-normal"
                >
                    Description
                </div>
            </div>
        </div>
    </div>
</div>
`;

const addButtonElement = `
  <div class="relative flex overflow-hidden rounded bg-fill-tertiary dark:bg-fill-tertiary mr-[6px] ml-2">
  <div class="group flex flex-none items-center justify-center hover:bg-fill-quaternary dark:hover:bg-fill-quaternary">
  <div data-state="closed">
  <button
    data-e2e-locator="console-submit-button"
    class="font-medium items-center whitespace-nowrap focus:outline-none inline-flex relative select-none rounded-none px-3 py-1.5 bg-transparent dark:bg-transparent text-green-60 dark:text-blue-60"
  >
    <div class="relative text-[16px] leading-[normal] p-0.5 before:block before:w-4 mr-2">
      <svg
        fill="#037CFF"
        height="17px"
        width="17px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 297.001 297.001"
        xml:space="preserve"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <g>
                <path d="M178.138,152.609c-29.565,0-53.617,24.052-53.617,53.617s24.052,53.617,53.617,53.617s53.618-24.052,53.618-53.617 S207.701,152.609,178.138,152.609z M178.138,240.193c-18.729,0-33.967-15.238-33.967-33.967c0-5.797,1.463-11.258,4.034-16.037 l22.985,22.985c1.843,1.842,4.342,2.878,6.948,2.878h32.513C206.425,230.004,193.451,240.193,178.138,240.193z M182.208,196.401 L162.1,176.293c4.78-2.571,10.241-4.034,16.037-4.034c15.315,0,28.289,10.189,32.514,24.142H182.208z"></path>
                <path d="M235.993,29.194h-28.268c-3.455-8.548-11.835-14.598-21.606-14.598H170.86C167.071,6.009,158.475,0,148.501,0 s-18.57,6.009-22.359,14.597h-15.259c-9.771,0-18.152,6.05-21.606,14.598H61.009c-13.517,0-24.515,10.998-24.515,24.515v218.777 c0,13.517,10.998,24.514,24.515,24.514h174.984c13.517,0,24.515-10.997,24.515-24.514V53.709 C260.508,40.192,249.51,29.194,235.993,29.194z M107.234,37.895L107.234,37.895c0.001-2.011,1.638-3.648,3.649-3.648h23.02 c5.426,0,9.825-4.399,9.825-9.825c0-2.631,2.141-4.772,4.772-4.772s4.772,2.141,4.772,4.772c0,5.426,4.399,9.825,9.825,9.825 h23.02c2.011,0,3.648,1.637,3.648,3.648v16.847c0,2.011-1.637,3.648-3.648,3.648h-75.235c-2.011,0-3.648-1.637-3.648-3.648 V37.895z M235.993,277.35H61.009c-2.683,0-4.865-2.182-4.865-4.864V53.709c0-2.683,2.182-4.865,4.865-4.865h26.576v5.897 c0,12.847,10.452,23.298,23.298,23.298h75.235c12.847,0,23.298-10.452,23.298-23.298v-5.897h26.576 c2.683,0,4.865,2.182,4.865,4.865v218.777h0.001C240.857,275.168,238.675,277.35,235.993,277.35z"></path>
                <path d="M75.514,113.869h72.987c5.426,0,9.825-4.399,9.825-9.825c0-5.426-4.399-9.825-9.825-9.825H75.514 c-5.426,0-9.825,4.399-9.825,9.825C65.688,109.47,70.087,113.869,75.514,113.869z"></path>
                <path d="M75.514,143.064h43.793c5.426,0,9.825-4.399,9.825-9.825c0-5.426-4.399-9.825-9.825-9.825H75.514 c-5.426,0-9.825,4.399-9.825,9.825C65.688,138.665,70.087,143.064,75.514,143.064z"></path>
                <path d="M129.131,162.434c0-5.426-4.399-9.825-9.825-9.825H75.514c-5.426,0-9.825,4.399-9.825,9.825 c0,5.426,4.399,9.825,9.825,9.825h43.793C124.733,172.259,129.131,167.86,129.131,162.434z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <span class="text-sm font-medium">Generate Report</span>
  </button>
  </div>
  </div>
  </div>
  `;

function addButton() {
  const targetContainer = document.getElementById("ide-top-btns");

  const newDiv = document.createElement("div");
  newDiv.innerHTML = addButtonElement;

  if (targetContainer) {
    targetContainer.appendChild(newDiv.firstElementChild);
  } else {
    console.error("Target container not found");
  }
}

function addTabButton() {
  // Step 1: Find the target container div
  const targetContainer = document.querySelector(
    ".flexlayout__tabset_tabbar_inner_tab_container_top",
  );
  console.log(targetContainer);

  // Step 2: Create a new div element and set its inner HTML
  const newDiv = document.createElement("div");
  newDiv.innerHTML = element;

  // Step 3: Append the new div to the target container
  if (targetContainer) {
    targetContainer.appendChild(newDiv.firstElementChild);
  } else {
    console.error("Target container not found");
  }
}

console.log("Content script loaded");
chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value is client " + result.key);
});

// Wait for the DOM to be fully loaded before adding the button

let checkExist = setInterval(function () {
  if (document.getElementById("ide-top-btns")) {
    addButton();
    clearInterval(checkExist);
  }
}, 100); // check every 100ms

let checkExistTwo = setInterval(function () {
  if (
    document.querySelector(".flexlayout__tabset_tabbar_inner_tab_container_top")
  ) {
    addTabButton();
    clearInterval(checkExistTwo);
  }
}, 100); // check every 100ms
