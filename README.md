# MarkdownStudio

A lightweight, browser-based markdown editor with live preview and local file management. Write, edit, and format markdown documents all in one place with an intuitive split-screen interface.

---

## Features

- **Live Preview** — Real-time markdown preview that updates as you type
- **Split-Screen Interface** — Editor on the left, rendered preview on the right
- **Document Management** — Create, save, edit, and delete markdown files
- **Search Functionality** — Search through saved files by name with instant filtering
- **Formatting Toolbar** — Quick-access buttons for bold, italic, headings, lists, code blocks, links, and images
- **Local Storage** — All files persist in browser storage across sessions
- **User Personalization** — Welcome screen stores and displays your name
- **Toast Notifications** — Real-time feedback for all user actions
- **File Export** — Download markdown files for external use
- **Responsive Design** — Optimized for both mobile and desktop viewing
- **UTF-8 Support** — Full Unicode character support

---

## Getting Started

### How to Use

1. Open the application in your web browser
2. Enter your name in the welcome modal to set up your workspace
3. Click "New document" to create a markdown file
4. Write markdown syntax in the editor pane on the left
5. View the live-rendered preview on the right side in real time
6. Use the formatting toolbar buttons for quick text formatting
7. Enter a filename and click "Save" to store your document in local storage
8. Return to the home page to view all your saved documents
9. Search files by name using the search bar
10. Click on any file card to edit it, or use the delete button to remove files

---

## Formatting Toolbar

The toolbar provides quick access to common markdown formatting:

- **Bold** — `**text**`
- **Italic** — `*text*`
- **Heading 1** — `# text`
- **Heading 2** — `## text`
- **Unordered List** — `* item`
- **Ordered List** — `1. item`
- **Code Block** — Triple backticks with code inside
- **Link** — `[text](url)`
- **Image** — `![alt text](image-url)`

---

## Tech Stack

- **Frontend:** HTML5, CSS3 (with Tailwind CSS), Vanilla JavaScript
- **Markdown Parser:** Marked.js library
- **Icons:** Font Awesome 6.5.1
- **Storage:** Browser `localStorage` API
- **Build Tool:** MSBuild

---

## Project Structure

```
live-markdown/
├── index.html              # Main HTML structure
├── script.js               # Application logic and interactivity
├── style.css               # Additional styling
├── output.css              # Compiled Tailwind CSS
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

---

## Local Storage

- Files are stored in browser localStorage under the key "files"
- Username is stored under the key "username"
- Each file object contains: id, name, content, and date created
- Data persists across browser sessions
- Clearing browser cache/cookies will remove all saved documents

---

## Live Preview Styling

The preview pane applies custom styling to markdown elements:

- Color-coded syntax for code blocks
- Styled blockquotes with left border
- Responsive typography for headers
- Link styling with hover effects
- Support for both light and dark theme rendering

---

## Browser Compatibility

Works in all modern browsers that support:

- ES6 JavaScript
- HTML5 `localStorage` API
- CSS Grid and Flexbox
- Modern DOM APIs (querySelector, classList, etc.)

---

## Features Roadmap

- Delete validation feature
- Additional markdown formatting options
- Theme customization
- Export to multiple file formats
- Cloud storage integration
