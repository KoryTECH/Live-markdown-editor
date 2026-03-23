"use strict";
// to do
// Finish the ui refurbishing

// get elements for easy access
const homePage = document.getElementById("editorHomePage");
const markdownPage = document.getElementById("markdownInterface");
const inputFileName = document.getElementById("inputFileName");
const fileName = document.getElementById("fileName");
const newFileButtons = document.querySelectorAll("#newFileButton, #newFile");
const newFileName = document.getElementById("newFileName");
const saveButton = document.getElementById("saveButton");
const downloadButton = document.getElementById("downloadButton");
const editor = document.getElementById("editor");
const preview = document.getElementById("livePreview");
const toolbarButtons = document.querySelectorAll(".toolbar-btn");
const fileContainer = document.getElementById("files");
const fileCard = document.querySelectorAll("#fileCard");
const modal = document.getElementById("modal");
const searchInput = document.getElementById("searchInput");
const userNameInput = document.getElementById("userName");
const greetUser = document.getElementById("greetUser");
const getStarted = document.getElementById("getStarted");
const backButton = document.getElementById("backButton");
const clearAll = document.getElementById("clearAll")
const modalCloseBtn = document.getElementById("modalCloseBtn");
const notification = document.getElementById("notification");
let deleteButton;
let editButton;
let currentFileId = null;


markdownPage.classList.add("hidden");

// show notification that auto-hides after 5 seconds
function showNotification(message) {
  notification.innerText = message;
  notification.classList.remove("hidden");
  notification.classList.add("notification-slide");
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.add("hidden");
    notification.classList.remove("notification-slide");
  }, 5000);
}

// onload display loading welcome screen

// setTimeout(function () {
//   loadingPage.classList.add("hidden");
//   checkForUserName();
//   displayingFile(files);
// }, 1500);

// to create a new file
function createNewFilefunc() {
  currentFileId = null;  // Reset - this is a NEW file
  homePage.classList.add("hidden");
  markdownPage.classList.remove("hidden");
  //   make textarea blank for new file
  editor.value = "";
  showNotification("New file created!");
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
let files = JSON.parse(localStorage.getItem("files") || "[]");

// Save files to localStorage
function saveToLocalStorage() {
  if(currentFileId){
    const fileIndex = files.findIndex(f => f.id === currentFileId);
    files[fileIndex].content = editor.value;
    files[fileIndex].name = newFileName.value;
  }
  else {
  const File = {
    id: Date.now(),
    name: newFileName.value, // Use .value instead of .innerText
    content: editor.value,
    dateCreated: new Date().toDateString(),    
  };
files.push(File);
}
  // Add the new file to the files array
  console.log("pushing");
  // Update localStorage with the updated files array
  localStorage.setItem("files", JSON.stringify(files));
  displayingFile(files)
  showNotification("File saved successfully!");
}

// displays each file in the array passed
function displayingFile(array) {
  fileContainer.innerHTML = " "

  array.forEach((file) => {
    const newFile = `
    <div id="fileCard" class="flex flex-col gap-2">
    <span id="blankspace" class="bg-[#0f1a30] w-64 h-48 rounded-xl hover:bg-[#0f192e] flex justify-center items-center text-[2rem] transition-colors duration-300 relative group cursor-pointer">
      <i class="fa-solid fa-book text-gray-400 group-hover:hidden transition-all duration-300"></i>
      <div class="hidden group-hover:flex gap-4 transition-all duration-300">
        <span id="deleteButton" class="text-white bg-blue-700 p-3 rounded-2xl"><i class="fa-solid fa-trash"></i></span>
        <span id="editButton" class="text-white bg-blue-700 p-3 rounded-2xl"><i class="fa-solid fa-pencil"></i></span>
      </div>
    </span>
    <span id="savedFileName" class="text-[1.5rem] text-white font-bold">${file.name}</span>
    <span class="text-[.9rem] text-white font-bold">${file.dateCreated}</span>
</div>
    `;
    deleteButton = document.querySelectorAll("deleteButton")
    editButton = document.querySelectorAll("editButton")
    fileContainer.innerHTML += newFile;
  });
}

// opening old file for update or anything 
function reaccessingFiles(event) {
  const fileCard = event.target.closest("#fileCard");
  if (!fileCard) return; // Ensure the clicked element is a file card

  const fileNameElement = fileCard.querySelector("#savedFileName");
  const fileName = fileNameElement.textContent;

  const file = files.find((f) => f.name === fileName);
  // Store the current file ID for future reference (e.g., updating or deleting)
  currentFileId = file.id; 
  if (file) {
    editor.value = file.content;
    newFileName.value = file.name;
    markdownPage.classList.remove("hidden");
    homePage.classList.add("hidden");
  }
  updatePreview()
  showNotification("File opened for editing!");
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


function checkForUserName(){
  const storedUserName = localStorage.getItem("username");
  greetUser.innerText = `Welcome Back ${storedUserName}!`;
  if(localStorage.getItem("username")){
    homePage.classList.remove("hidden")
    modal.classList.add("hidden")
  }
  else {
    homePage.classList.remove("hidden");
    markdownPage.classList.add("hidden")
    modal.classList.remove("hidden");
  }
}

modalCloseBtn.addEventListener("click", function(){
  modal.classList.add("hidden")
  homePage.classList.remove("hidden")
})

userNameInput.addEventListener("keypress", function(event){
if(event.key === "Enter"){
  const userName = document.getElementById("userName").value;
  localStorage.setItem("username", userName)
  modal.classList.add("hidden")
  homePage.classList.remove("hidden")
  greetUser.innerText = `Welcome Back ${userName}!`;
  homePage.classList.remove("hidden")
  showNotification("Welcome to MarkdownStudio!");
}})

getStarted.addEventListener("click", function (){
  const userName = document.getElementById("userName").value;
  localStorage.setItem("username", userName)
  modal.classList.add("hidden")
  homePage.classList.remove("hidden")
  greetUser.innerText = `Welcome Back ${userName}!`;
  homePage.classList.remove("hidden")
  showNotification("Welcome to MarkdownStudio!");
})

checkForUserName();
displayingFile(files);

searchInput.addEventListener("input", function(){
  const searchTerm = searchInput.value.toLowerCase();
  
  if(searchTerm === ""){
    displayingFile(files)
    return
  }
  const filteredFiles = files.filter(file => file.name.toLowerCase().includes(searchTerm));

  displayingFile(filteredFiles);
})

newFileButtons.forEach((btn) =>
  btn.addEventListener("click", () => createNewFilefunc())
);

clearAll.addEventListener("click", function(){
  files = [];
  displayingFile(files);
  showNotification("All files cleared!");
})

backButton.addEventListener("click",function(){
  homePage.classList.remove("hidden");
  markdownPage.classList.add("hidden")
})

editor.addEventListener("input", () => updatePreview());

saveButton.addEventListener("click", () => {
  saveToLocalStorage();
  console.log("pushed new file to localstorage");
});

toolbarButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const action = this.getAttribute("data-action");
    insertFormatting(action);
  });
});


// Edit button and delete button - open file for editing and delete file respectively
fileContainer.addEventListener("click", (event) => {
  if (event.target.closest("#editButton")) {
    const fileCard = event.target.closest("#fileCard");
    reaccessingFiles({ target: fileCard });
  }
  if(event.target.closest('#deleteButton')){
    const fileNameToDelete = event.target.closest("#fileCard").querySelector("#savedFileName").textContent;
    const fileToDelete = files.find(f => f.name === fileNameToDelete);
    files = files.filter(f => f.id !== fileToDelete.id);
    
    localStorage.setItem("files", JSON.stringify(files));
    displayingFile(files);
    showNotification("File deleted successfully!");
  }
});

localStorage.getItem("files");
