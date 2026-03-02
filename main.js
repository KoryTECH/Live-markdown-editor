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

homePage.classList.add("hidden");
markdownPage.classList.add("hidden");

// onload display loading welcome screen

setTimeout(function () {
  loadingPage.classList.add("hidden");
  homePage.classList.remove("hidden");
}, 5000);

function createNewFilefunc() {
  loadingPage.classList.add("hidden");
  homePage.classList.add("hidden");
  markdownPage.classList.remove("hidden");
  editor.value = "";
//   updatePreview()
}

newFileButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    createNewFilefunc();
  });
});

function updatePreview () {
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
        preview.srcdoc = previewContent
        console.log("Markdown text:", markDownText);
}

editor.addEventListener("input", () => {
    updatePreview()
})




const files = [];
localStorage.setItem("files", files);


const file1 = {
  id: 7323329,
  name: "delete",
  dateCreated: 17 - 3 - 2026,
};
files.push(file1);


localStorage.getItem("files");
