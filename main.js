"use strict";
// debugger

// get elements for easy access
const loadingPage = document.getElementById("welcomePage");
const homePage = document.getElementById("editorHomePage");
const markdownPage = document.getElementById("markdownInterface");
const inputFileName = document.getElementById("inputFileName");
const fileName = document.getElementById("fileName");
const newFileButtons = document.querySelectorAll("#newFileButton, #newFile");
const newFileNameInput = document.getElementById("newFileNameInput");
const saveButton = document.getElementById("saveButton");
const downloadButton = document.getElementById("downloadButton");
const editor = document.getElementById("editor");
const preview = document.getElementById("livePreview");
const toolbarButtons = document.querySelectorAll(".toolbar-btn");
const fileContainer = document.getElementById("files");
const fileCard = document.querySelectorAll("#fileCard");
const getUserName = document.getElementById("getUserName");
const userName = document.getElementById("userName");
const greetUser = document.getElementById("greetUser")

homePage.classList.add("hidden");
markdownPage.classList.add("hidden");

// onload display loading welcome screen

setTimeout(function () {
  loadingPage.classList.add("hidden");
  homePage.classList.remove("hidden");
}, 5000);

// to create a new file
function createNewFilefunc() {
  loadingPage.classList.add("hidden");
  homePage.classList.add("hidden");
  markdownPage.classList.remove("hidden");
  //   make textarea blank for new file
  editor.value = "";
}

// to convert the inputted text to markdown format
function updatePreview() {
  const markDownText = editor.value;
  const output = marked.parse(markDownText);

  console.log("HTML output:", output);

  const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    background: white;
                    color: black;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    margin: 0;
                    line-height: 1.6;
                }
                h1 { font-size: 32px; margin-top: 0; }
                h2 { font-size: 24px; margin-top: 30px; }
                h3 { font-size: 20px; }
                strong { font-weight: bold; }
                em { font-style: italic; }
                ul, ol { margin: 15px 0; padding-left: 25px; }
                li { margin: 8px 0; }
                a { color: #3dd68c; text-decoration: none; }
                a:hover { text-decoration: underline; }
                code {
                    color: #7ec699;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Courier New', monospace;
                }
                pre {
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
                pre code {
                    background: none;
                    padding: 0;
                }
                blockquote {
                    border-left: 4px solid #3dd68c;
                    padding-left: 15px;
                    margin-left: 0;
                    color: #b8d4b8;
                }
                body.light-theme {
                    background: rgb(233, 233, 233);
                    color: brown;
                }
            </style>
        </head>
        <body>
            ${output}
        </body>
        </html>`;
  preview.srcdoc = previewContent;
  console.log("Markdown text:", markDownText);
}

// Retrieve files from localStorage or initialize an empty array
const files = JSON.parse(localStorage.getItem("files") || "[]");

// Save files to localStorage
function saveToLocalStorage() {
  const File = {
    id: Date.now(),
    name: newFileNameInput.value, // Use .value instead of .innerText
    content: editor.value,
    dateCreated: new Date().toDateString(),

    
  };

  // Add the new file to the files array
  files.push(File);
  console.log("pushing");
  // Update localStorage with the updated files array
  localStorage.setItem("files", JSON.stringify(files));
  console.log("saved to localstorage");
  markdownPage.classList.add("hidden");
  homePage.classList.remove("hidden");

  // to display each file in local storage

  files.forEach((file) => {
    const newFile = `
    <div id="fileCard" class="flex flex-col gap-2">
            <span class="bg-[#0f1a30] w-64 h-48 rounded-xl hover:bg-[#0f192e]"></span>
            <span id="savedFileName" class="text-[1.5rem] text-white font-bold">${file.name}</span>
            <span class="text-[.9rem] text-white font-bold">${file.dateCreated}</span>
        </div>
    `;
    fileContainer.innerHTML += newFile;
  });
}

// displaya each file saved to local storage
function displayingFile() {
  
}

// opening old file for update or anything 

  function reaccessingFiles(event) {
  const fileCard = event.target.closest("#fileCard");
  if (!fileCard) return; // Ensure the clicked element is a file card

  const fileNameElement = fileCard.querySelector("#savedFileName");
  const fileName = fileNameElement.textContent;

  const file = files.find((f) => f.name === fileName);
  if (file) {
    editor.value = file.content;
    newFileNameInput.value = file.name;
    markdownPage.classList.remove("hidden");
    homePage.classList.add("hidden");
  }
}


// toolbar functionality
function insertFormatting(action) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selectedText = editor.value.substring(start, end);
  const beforeText = editor.value.substring(0, start);
  const afterText = editor.value.substring(end);

  let formattedText = "";
  let cursorOffset = 0;

  switch (action) {
    case "bold":
      formattedText = `**${selectedText}**`;
      cursorOffset = selectedText ? formattedText.length : 2;
      break;

    case "italic":
      formattedText = `*${selectedText}*`;
      cursorOffset = selectedText ? formattedText.length : 1;
      break;

    case "h1":
      formattedText = `# ${selectedText}`;
      cursorOffset = selectedText ? formattedText.length : 2;
      break;

    case "h2":
      formattedText = `## ${selectedText}`;
      cursorOffset = selectedText ? formattedText.length : 3;
      break;

    case "ul":
      formattedText = `* ${selectedText}`;
      cursorOffset = selectedText ? formattedText.length : 2;
      break;

    case "ol":
      formattedText = `1. ${selectedText}`;
      cursorOffset = selectedText ? formattedText.length : 3;
      break;

    case "code":
      formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
      cursorOffset = selectedText ? formattedText.length : 4;
      break;

    case "link":
      formattedText = `[${selectedText || "link text"}](url)`;
      cursorOffset = selectedText ? formattedText.length - 5 : 1;
      break;

    case "img":
      formattedText = `![${selectedText || "alt text"}](image-url)`;
      cursorOffset = selectedText ? formattedText.length - 12 : 2;
      break;
  }

  // Insert the formatted text
  editor.value = beforeText + formattedText + afterText;

  // Set cursor position
  const newCursorPos = start + cursorOffset;
  editor.focus();
  editor.setSelectionRange(newCursorPos, newCursorPos);

  // Update preview
  updatePreview();
}

newFileButtons.forEach((btn) =>
  btn.addEventListener("click", () => createNewFilefunc())
);

editor.addEventListener("input", () => updatePreview());

saveButton.addEventListener("click", () => {
  saveToLocalStorage();
  console.log("pushed new file to localstorage");
  displayingFile();
});

toolbarButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const action = this.getAttribute("data-action");
    insertFormatting(action);
  });
});

fileContainer.addEventListener("click", (event) => {
  const fileCard = event.target.closest("#fileCard");
  if (fileCard) {
    reaccessingFiles(event); // Pass the event object
  }
});


localStorage.getItem("files");
