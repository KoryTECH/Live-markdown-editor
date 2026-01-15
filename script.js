'use strict'

const editor = document.getElementById('editor');
const preview = document.getElementById('preview-page');

function updatePreview(){
    // get text from text area
    const markDownText = editor.value;
    const output = marked.parse(markDownText);

    console.log("HTML output:", output);
    // check if iframe classList is light-theme
    const isLightTheme = document.body.classList.contains("light-theme");
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
                body.light-theme {
                    background: rgb(233, 233, 233);
                    color: brown;
                }
            </style>
        </head>
        <body class="${isLightTheme ? 'light-theme' : ''}">
            ${output}
        </body>
        </html>`;
    preview.srcdoc = previewContent;
    console.log("Markdown text:", markDownText);
    // save to Local storage
    localStorage.setItem('editorContent', markDownText);
}

editor.addEventListener("input", updatePreview)

//  to upload the saved content from local storage
console.log("checking for saved content.....")
let savedContent = localStorage.getItem('editorContent');
if(savedContent) {
    editor.value = savedContent;
    updatePreview();
}
updatePreview()

// light theme toggle 
const themeToggle = document.querySelector(".theme");

themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("light-theme");
    updatePreview()
})

// TOOLBAR BUTTON FUNCTIONS
const toolbarButtons = document.querySelectorAll('.toolbar-btn');

toolbarButtons.forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        insertFormatting(action);
    });
});

function insertFormatting(action) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    const beforeText = editor.value.substring(0, start);
    const afterText = editor.value.substring(end);
    
    let formattedText = '';
    let cursorOffset = 0;
    
    switch(action) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            cursorOffset = selectedText ? formattedText.length : 2;
            break;
            
        case 'italic':
            formattedText = `*${selectedText}*`;
            cursorOffset = selectedText ? formattedText.length : 1;
            break;
            
        case 'h1':
            formattedText = `# ${selectedText}`;
            cursorOffset = selectedText ? formattedText.length : 2;
            break;
            
        case 'h2':
            formattedText = `## ${selectedText}`;
            cursorOffset = selectedText ? formattedText.length : 3;
            break;
            
        case 'ul':
            formattedText = `* ${selectedText}`;
            cursorOffset = selectedText ? formattedText.length : 2;
            break;
            
        case 'ol':
            formattedText = `1. ${selectedText}`;
            cursorOffset = selectedText ? formattedText.length : 3;
            break;
            
        case 'code':
            formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
            cursorOffset = selectedText ? formattedText.length : 4;
            break;
            
        case 'link':
            formattedText = `[${selectedText || 'link text'}](url)`;
            cursorOffset = selectedText ? formattedText.length - 5 : 1;
            break;
            
        case 'img':
            formattedText = `![${selectedText || 'alt text'}](image-url)`;
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

// EXPORT HTML BUTTON
const exportHtmlBtn = document.getElementById('html');

exportHtmlBtn.addEventListener('click', function() {
    const markdownText = editor.value;
    const htmlOutput = marked.parse(markdownText);
    
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 { font-size: 32px; margin-top: 0; }
        h2 { font-size: 24px; margin-top: 30px; }
        h3 { font-size: 20px; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #f4f4f4;
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
            color: #666;
        }
        a { color: #3dd68c; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
${htmlOutput}
</body>
</html>`;
    
    // Create blob and download
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// EXPORT MARKDOWN BUTTON
const exportMdBtn = document.getElementById('md');

exportMdBtn.addEventListener('click', function() {
    const markdownText = editor.value;
    
    // Create blob and download
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
onst url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});