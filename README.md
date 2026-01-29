# Live Markdown Editor

A real-time, browser-based markdown editor with live preview functionality. Write markdown on the left and see the rendered output instantly on the right.

🔗 **[Live Demo](https://korytech.github.io/Live-markdown-editor/)**

## Features

- ✨ **Live Preview** - See your markdown rendered in real-time as you type
- 📝 **Split View** - Side-by-side editor and preview panels
- 💾 **Export Options** - Export your work as HTML or Markdown files
- 🎨 **Clean Interface** - Minimalist design focused on writing
- 🔆 **Dark/Light Mode** - Toggle between themes for comfortable editing
- 📱 **Responsive** - Works on desktop and mobile devices
- ⚡ **Fast & Lightweight** - No backend required, runs entirely in the browser
- 🎯 **Formatting Shortcuts** - Quick buttons for H1, H2, and other common formatting

## Getting Started

### Using the Live Demo

Simply visit [https://korytech.github.io/Live-markdown-editor/](https://korytech.github.io/Live-markdown-editor/) to start using the editor immediately.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/KoryTECH/Live-markdown-editor.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Live-markdown-editor
   ```

3. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

Or simply use a local development server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. **Write Markdown** - Type or paste markdown content in the left editor panel
2. **See Preview** - The right panel updates in real-time showing the rendered HTML
3. **Use Shortcuts** - Click the H1, H2, or other formatting buttons for quick formatting
4. **Toggle Theme** - Click the theme toggle (🔆) to switch between light and dark modes
5. **Export** - Use the "Export HTML" or "Export MD" buttons to download your content

## Supported Markdown Syntax

The editor supports standard markdown syntax including:

- Headers (`#`, `##`, `###`, etc.)
- Bold (`**text**` or `__text__`)
- Italic (`*text*` or `_text_`)
- Links (`[text](url)`)
- Images (`![alt](url)`)
- Lists (ordered and unordered)
- Code blocks (inline and fenced)
- Blockquotes (`>`)
- Horizontal rules (`---`)
- Tables
- And more!

## Project Structure

```
Live-markdown-editor/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── script.js       # Editor functionality and markdown parsing
└── README.md       # Project documentation
```

## Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and responsive design
- **JavaScript** - Editor functionality and markdown rendering
- **Markdown Parser** - For converting markdown to HTML (likely marked.js or similar library)

## Contributing

Contributions are welcome! If you'd like to improve the Live Markdown Editor:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## Future Enhancements

Potential features for future releases:

- [ ] Syntax highlighting in code blocks
- [ ] PDF export option
- [ ] Local storage to save work automatically
- [ ] Markdown templates
- [ ] Full-screen mode
- [ ] Keyboard shortcuts
- [ ] Copy to clipboard button
- [ ] Multiple themes

## License

This project is open source and available under the MIT License.

## Author

**KoryTECH**
- GitHub: [@KoryTECH](https://github.com/KoryTECH)

## Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

For issues, feature requests, or questions, please [open an issue](https://github.com/KoryTECH/Live-markdown-editor/issues).

---

Made with ❤️ by KoryTECH
