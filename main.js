"use strict";
// debugger

// get elements for easy access
const loadingPage = document.getElementById("welcomePage");
const homePage = document.getElementById("editorHomePage");
const markdownPage = document.getElementById("markdownInterface");
const inputFileName = document.getElementById("inputFileName");
const fileName = document.getElementById("#fileName");
const newFileButtons = document.querySelectorAll("#newFileButton, #newFile");
const newFileNameInput = document.getElementById("newFileNameIput");
const saveButton = document.getElementById("saveButton");
const downloadButton = document.getElementById("downloadButton");
const editor = document.getElementById("editor");
const preview = document.getElementById("livePreview");
const toolbarButtons = document.querySelectorAll(".toolbar-btn");

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
        <body">
            ${output}
        </body>
        </html>`;
  preview.srcdoc = previewContent;
  console.log("Markdown text:", markDownText);
}

// added files to local storage
const files = [];
localStorage.setItem("files", files);

function saveToLocalStorage() {
  //   create new file details for the new file created
  const File = new Object();
  File.id = Date.now();
  File.name = newFileNameInput.innerText;
  File.Content = editor.value;
  File.dateCreated = new Date().toDateString();
    // push File to the array files in localStorage
  files.push(File);
}

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

saveButton.addEventListener("click", ()=> {
    saveToLocalStorage()

});


toolbarButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const action = this.getAttribute("data-action");
    insertFormatting(action);
  })
);

// const files = [];
// localStorage.setItem("files", files);

// const file1 = {
//   id: Date.now(),
//   name: newFileNameInput.value,
//   content: previewContent,
//   dateCreated: new Date().toDateString(),
// };
// files.push(file1);

localStorage.getItem("files");
