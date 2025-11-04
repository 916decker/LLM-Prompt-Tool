# 🚀 LLM Prompt Manager

<div align="center">

![Version](https://img.shields.io/badge/version-2.9-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-yellow.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-orange.svg)

**Your ultimate companion for managing and accessing LLM prompts with lightning speed ⚡**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation) • [Contributing](#-contributing)

---

</div>

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Why LLM Prompt Manager?](#-why-llm-prompt-manager)
- [💾 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🎨 Usage](#-usage)
- [🔧 Advanced Features](#-advanced-features)
- [📸 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📜 License](#-license)
- [💬 Support](#-support)

---

## ✨ Features

### 🎯 Core Functionality

| Feature | Description |
|---------|-------------|
| 📝 **Prompt Management** | Create, edit, and organize unlimited prompts |
| 📁 **Smart Folders** | Categorize prompts with custom folder structure |
| 🖱️ **Right-Click Menu** | Instant access via context menu on any webpage |
| 📋 **One-Click Copy** | Copy prompts to clipboard instantly |
| 🎯 **Auto-Insert** | Automatically insert into text fields on AI websites |
| ⌨️ **Keyboard Shortcuts** | Quick save with Alt+Shift+S (Cmd+Shift+S on Mac) |

### 🔥 Advanced Features

<table>
<tr>
<td width="50%">

**🔍 Smart Search**
- Real-time search across names and content
- Filter by folders
- Instant results as you type

**⭐ Favorites System**
- Star your most-used prompts
- Quick access section
- Priority in context menu

**🔤 Variable Substitution**
- Dynamic templates with `{{variables}}`
- Interactive variable input
- Reusable prompt templates

</td>
<td width="50%">

**📊 Usage Analytics**
- Track usage count per prompt
- Recently used section (last 5)
- Time since last use
- Optimize your library

**🕐 Version History**
- Auto-save every edit
- View previous versions
- Restore old versions
- Track prompt evolution

**☑️ Bulk Operations**
- Multi-select prompts
- Bulk move to folders
- Bulk delete
- Mass reorganization

</td>
</tr>
</table>

### 🛡️ Data Management

- **🗑️ Soft Delete** - Trash with restore capability
- **📥 Export/Import** - JSON backup and restore
- **🔄 Auto-Backup** - Automatic backup to Downloads folder
- **🔗 Share Prompts** - Generate share codes for team collaboration
- **☁️ Cloud Sync** - Optional Chrome sync across devices
- **🔒 Privacy First** - All data stored locally, no external servers

---

## 🎯 Why LLM Prompt Manager?

<div align="center">

| Before ❌ | After ✅ |
|-----------|----------|
| 😩 Searching through chat history | ⚡ Instant access via right-click |
| 📝 Copying prompts from scattered notes | 🗂️ Organized library with folders |
| 🔄 Retyping similar prompts repeatedly | 🔤 Variable templates for reusability |
| 😰 Losing your best prompts | 💾 Automatic backups and version history |
| 👥 Can't share prompts with team | 🔗 One-click share codes |
| 🤷 Don't know which prompts work best | 📊 Usage analytics and tracking |

</div>

---

## 💾 Installation

### Method 1: Chrome Web Store *(Coming Soon)*

1. Visit the Chrome Web Store
2. Click "Add to Chrome"
3. Start using immediately!

### Method 2: Manual Installation (Developer Mode)

1. **Download or Clone** this repository
   ```bash
   git clone https://github.com/yourusername/LLM-Prompt-Tool.git
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Or click Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `LLM-Prompt-Tool` folder

5. **Pin to Toolbar** *(Optional)*
   - Click the puzzle icon in Chrome toolbar
   - Pin "LLM Prompt Manager" for quick access

### Compatible Browsers

- ✅ Google Chrome (v88+)
- ✅ Microsoft Edge (Chromium-based)
- ✅ Brave Browser
- ✅ Opera
- ⚠️ Firefox (requires porting)

---

## 🚀 Quick Start

### Your First 3 Minutes

**1️⃣ Create Your First Prompt** (30 seconds)

```
Click extension icon → Enter prompt details → Click "Add Prompt"
```

**2️⃣ Use It Anywhere** (30 seconds)

```
Go to ChatGPT/Claude → Right-click → LLM Prompts → Select your prompt
```

**3️⃣ Organize with Folders** (30 seconds)

```
Create folders → Assign prompts → Filter by folder
```

### Pro Tips 🎯

- **Star your favorites** for instant access
- **Use variables** like `{{topic}}` for reusable templates
- **Enable auto-backup** to never lose your prompts
- **Use bulk operations** to organize quickly

---

## 🎨 Usage

### Adding Prompts

**Method 1: From Extension Popup**
```
1. Click extension icon
2. Fill in: Name, Folder, Prompt Text
3. Press Enter or click "Add Prompt"
```

**Method 2: Save from Webpage**
```
1. Select text on any webpage
2. Press Alt+Shift+S (Cmd+Shift+S on Mac)
3. Prompt automatically saved
```

### Using Prompts

**Method 1: Right-Click Menu** ⭐ *Recommended*
```
Right-click anywhere → Hover "LLM Prompts" → Select prompt
✨ Auto-inserts if you're in a text field!
```

**Method 2: Copy from Popup**
```
Click extension icon → Click 📋 copy button → Paste anywhere
```

### Variable Substitution

Create dynamic templates:

```
Template:
Review this {{language}} code for {{focus_area}}.
Provide feedback for a {{experience_level}} developer.

Usage:
1. Select prompt with variables
2. Fill in the modal: language=Python, focus_area=security, experience_level=junior
3. Final prompt automatically generated and copied!
```

---

## 🔧 Advanced Features

### 📁 Smart Organization

- **Folders**: Unlimited custom folders
- **Drag & Drop**: Reorder prompts visually
- **Search**: Real-time search across all content
- **Filter**: View specific folders
- **Bulk Operations**: Move/delete multiple prompts

### 📊 Analytics & Tracking

- **Usage Count**: See how many times you've used each prompt
- **Recently Used**: Quick access to last 5 prompts
- **Last Used Time**: Track when you last used a prompt
- **Favorites**: Star your best prompts

### 🔄 Backup & Sync

**Auto-Backup**
- Automatic JSON backups to `Downloads/LLM-Prompts-Backup/`
- Triggers on every add/edit/delete
- Sync with Dropbox/Google Drive/OneDrive

**Manual Export/Import**
- Export: JSON file with all data
- Import: Merge or replace existing prompts
- Share: Generate encoded share codes

### 🕐 Version Control

- Every edit creates a new version
- View full version history
- Compare previous versions
- Restore any previous version

---

## 📸 Screenshots

<div align="center">

### Main Popup Interface
*Beautiful, intuitive interface with all features at your fingertips*

### Right-Click Context Menu
*Lightning-fast access to all your prompts from anywhere*

### Variable Substitution Modal
*Dynamic prompts with custom variable inputs*

### Version History View
*Track and restore previous versions of your prompts*

</div>

---

## 🛠️ Tech Stack

- **Manifest**: V3 (Latest Chrome Extension standard)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Chrome Storage API (Sync & Local)
- **Architecture**: Service Worker (background.js)
- **UI/UX**: Custom CSS with smooth animations
- **Data Format**: JSON for export/import

---

## 📚 Documentation

### Quick Links

- 📖 [Complete User Guide](USER_GUIDE.md) - 700+ lines of comprehensive documentation
- 🎯 [Installation Guide](#-installation)
- 💡 [Usage Examples](#-usage)
- 🐛 [Troubleshooting](#-troubleshooting)

### Key Concepts

- **Prompts**: Your saved text templates
- **Folders**: Categories for organizing prompts
- **Variables**: Dynamic placeholders like `{{name}}`
- **Favorites**: Starred prompts for quick access
- **Trash**: Soft-deleted prompts (restorable)
- **Version History**: Auto-saved edits

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Open an issue with details
- 💡 **Request Features** - Share your ideas
- 🔧 **Submit PRs** - Fix bugs or add features
- 📖 **Improve Docs** - Help others understand
- ⭐ **Star the Repo** - Show your support

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/LLM-Prompt-Tool.git

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the project folder

# Make your changes
# Test thoroughly
# Submit a PR!
```

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>Extension not loading</b></summary>

**Solution:**
1. Go to `chrome://extensions/`
2. Find "LLM Prompt Manager"
3. Click refresh icon (🔄)
4. Check for errors and report if issues persist
</details>

<details>
<summary><b>Right-click menu not showing</b></summary>

**Solution:**
1. Refresh the webpage after installing
2. Verify extension is enabled
3. Try a different website
4. Reload the extension
</details>

<details>
<summary><b>Prompts not syncing across devices</b></summary>

**Solution:**
1. Sign into Chrome on all devices
2. Enable sync in Chrome settings
3. Check `chrome://settings/syncSetup`
4. Ensure "Extensions" is checked
</details>

<details>
<summary><b>Variables not working</b></summary>

**Solution:**
- Use correct syntax: `{{variable}}` not `{variable}` or `$variable`
- No spaces in variable names: `{{firstName}}` not `{{first name}}`
- Only use letters, numbers, and underscores
</details>

For more help, see the [Complete User Guide](USER_GUIDE.md) or [open an issue](https://github.com/yourusername/LLM-Prompt-Tool/issues).

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

---

## 💬 Support

### Get Help

- 📖 [User Guide](USER_GUIDE.md) - Comprehensive documentation
- 🐛 [Issue Tracker](https://github.com/yourusername/LLM-Prompt-Tool/issues) - Report bugs
- 💡 [Discussions](https://github.com/yourusername/LLM-Prompt-Tool/discussions) - Ask questions
- ⭐ [Star the Project](https://github.com/yourusername/LLM-Prompt-Tool) - Show support

### Stay Updated

- Watch this repository for updates
- Follow releases for new versions
- Join discussions for feature requests

---

<div align="center">

## 🌟 Show Your Support

If this project helped you, please consider:

⭐ **Starring the repository**
🐛 **Reporting bugs**
💡 **Suggesting features**
🔗 **Sharing with others**

---

### Made with ❤️ for the LLM Community

**Stop searching for prompts. Start managing them like a pro.**

[⬆ Back to Top](#-llm-prompt-manager)

---

*Happy Prompting! 🚀*

</div>
