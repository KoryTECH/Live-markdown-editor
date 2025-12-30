'use strict'

const editor = document.getElementById('editor');

const preview = document.getElementById('preview-page');

function updatePreview(){
    // get text from text area
    const markDownText = editor.value;
    console.log("Markdown text:", markDownText);
// convert the text from textarea to marked.js
    const output = marked.parse(markDownText);
    console.log("HTML output:", output);

    const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    color: white;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: #0d120d;
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
            </style>
        </head>
        <body>
            ${output}
        </body>
        </html>`;

    preview.srcdoc = previewContent;
}
editor.addEventListener("input",updatePreview)

updatePreview()