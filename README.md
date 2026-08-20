# 📄 PDF Tools

> 🚀 A modern collection of web-based PDF utilities for merging, splitting, converting, compressing, rotating, extracting, OCR, and managing PDF documents.

<p align="center">
  <a href="https://pdf.heyakashmaurya.com">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-pdf.heyakashmaurya.com-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://github.com/heyakashmaurya/pdf-tool">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

<p align="center">
  <strong>Simple PDF tools built for the modern web.</strong>
</p>

---

## 📑 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [✨ About the Project](#-about-the-project)
- [🛠️ Available PDF Tools](#️-available-pdf-tools)
- [🧰 Technology Stack](#-technology-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [⚙️ Getting Started](#️-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🔒 Privacy & File Processing](#-privacy--file-processing)
- [🎯 Project Goals](#-project-goals)
- [🌱 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [🐛 Issues & Feedback](#-issues--feedback)
- [🌐 Project Links](#-project-links)
- [👨‍💻 Author](#-author)
- [⭐ Support the Project](#-support-the-project)
- [📄 License](#-license)

---

## 🚀 Live Demo

### 👉 [Open PDF Tools](https://pdf.heyakashmaurya.com)

Use the online PDF tools directly from your browser.

🌐 **Website:**  
https://pdf.heyakashmaurya.com

---

## ✨ About the Project

**PDF Tools** is a web application that provides a collection of useful PDF utilities through a simple and modern interface.

The project is built with a **Next.js/React frontend** and a **Node.js backend** for PDF-related processing that requires server-side operations.

The goal is to make common PDF tasks easier without requiring users to install dedicated desktop PDF software for every operation.

### 💡 What You Can Do

- 📎 Merge multiple PDF files
- ✂️ Split PDF documents
- 🗜️ Compress PDF files
- 🖼️ Convert images to PDF
- 📷 Convert PDF pages to JPG
- 🖼️ Convert PDF pages to PNG
- 📝 Convert PDF documents to Word
- 📊 Convert PDF documents to Excel
- 🔍 OCR scanned PDF documents
- 🔄 Rotate PDF pages
- 🗑️ Delete PDF pages
- 📑 Extract selected PDF pages
- 🔢 Add page numbers
- 💧 Add watermarks

---

## 🛠️ Available PDF Tools

| Tool | Description |
| --- | --- |
| 📎 [Merge PDF](https://pdf.heyakashmaurya.com/merge-pdf) | Combine multiple PDF files into a single document. |
| ✂️ [Split PDF](https://pdf.heyakashmaurya.com/split-pdf) | Split a PDF into separate documents. |
| 🗜️ [Compress PDF](https://pdf.heyakashmaurya.com/compress-pdf) | Reduce PDF file size for easier storage and sharing. |
| 🖼️ [Image to PDF](https://pdf.heyakashmaurya.com/image-to-pdf) | Convert images into PDF documents. |
| 📷 [JPG to PDF](https://pdf.heyakashmaurya.com/jpg-to-pdf) | Convert JPG images into PDF files. |
| 🖼️ [PDF to JPG](https://pdf.heyakashmaurya.com/pdf-to-jpg) | Convert PDF pages into JPG images. |
| 🖼️ [PDF to PNG](https://pdf.heyakashmaurya.com/pdf-to-png) | Convert PDF pages into PNG images. |
| 📝 [PDF to Word](https://pdf.heyakashmaurya.com/pdf-to-word) | Convert PDF documents into editable Word files. |
| 📊 [PDF to Excel](https://pdf.heyakashmaurya.com/pdf-to-excel) | Convert PDF data into Excel spreadsheets. |
| 🔍 [OCR PDF](https://pdf.heyakashmaurya.com/ocr-pdf) | Extract text from scanned PDF documents using OCR. |
| 🔄 [Rotate PDF](https://pdf.heyakashmaurya.com/rotate-pdf) | Rotate PDF pages to the desired orientation. |
| 🗑️ [Delete PDF Pages](https://pdf.heyakashmaurya.com/delete-pdf-pages) | Remove unwanted pages from a PDF document. |
| 📑 [Extract PDF Pages](https://pdf.heyakashmaurya.com/extract-pdf-pages) | Extract selected pages from an existing PDF. |
| 🔢 [Add Page Numbers](https://pdf.heyakashmaurya.com/add-page-numbers) | Add page numbers to PDF documents. |
| 💧 [Watermark PDF](https://pdf.heyakashmaurya.com/watermark-pdf) | Add text watermarks to PDF pages. |

---

## 🧰 Technology Stack

### 🎨 Frontend

- ⚛️ **React**
- ▲ **Next.js**
- 🔷 **TypeScript**
- 🎨 **Tailwind CSS**

### ⚙️ Backend

- 🟢 **Node.js**
- 🚂 **Express**
- 📄 PDF processing libraries
- 🔍 OCR processing
- ⚙️ Server-side document processing

---

## 🏗️ Project Architecture

The project is organized into separate frontend and backend applications.

```text
pdf-tool/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── ...
│
├── .gitignore
└── README.md
```

> ℹ️ The exact internal structure may evolve as new PDF tools and features are added.

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/heyakashmaurya/pdf-tool.git
```

### 2️⃣ Enter the Project Directory

```bash
cd pdf-tool
```

### 3️⃣ Install Frontend Dependencies

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

### 4️⃣ Start the Frontend

Run the Next.js development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

### 5️⃣ Set Up the Backend

Open a **new terminal window**.

Navigate to the backend directory:

```bash
cd pdf-tool/backend
```

Install the backend dependencies:

```bash
npm install
```

Configure the required environment variables according to the backend configuration.

Then start the backend using the appropriate development script defined in the backend `package.json`.

> ⚠️ Some PDF processing features may require additional system dependencies or configuration depending on the tool and operating system.

---

## 🔐 Environment Variables

Some backend functionality may require environment variables.

Create your local environment configuration using the variables required by the project.

### ⚠️ Important Security Rule

**Never commit API keys, credentials, secrets, or private environment files to GitHub.**

For example:

```text
.env
.env.local
.env.production
```

should remain excluded through `.gitignore`.

### Example

A local environment file may contain configuration such as:

```env
PORT=5000
```

Only add variables that are actually required by your local project.

> 🔒 Never publish real API keys or secret credentials in this repository.

---

## 🔒 Privacy & File Processing

PDF processing behavior can differ between individual tools.

Some operations may be performed directly in the browser, while other operations may require processing through the backend.

The application is designed around providing PDF utilities through a web interface while using the appropriate processing architecture for each operation.

For details about how a particular tool handles files, refer to the corresponding tool implementation.

> ℹ️ Do not assume that every tool uses the same processing method. Processing behavior can vary depending on the functionality.

---

## 🎯 Project Goals

The main goals of this project are to:

- 🚀 Build practical PDF utilities using modern web technologies.
- 🌐 Explore browser-based PDF processing.
- ⚙️ Implement server-side PDF processing where required.
- 🔄 Experiment with document conversion workflows.
- 🔍 Explore OCR-based document processing.
- 🎨 Create a simple and accessible interface for common PDF tasks.
- 🧑‍💻 Provide useful examples for developers interested in PDF processing.
- 📚 Learn and experiment with modern full-stack web development.

---

## 🌱 Future Improvements

The project is actively evolving.

Planned improvements may include:

- 🚀 Additional PDF conversion tools
- 📄 More document manipulation features
- ⚡ Performance improvements
- 📱 Improved mobile experience
- 🔍 Better OCR workflows
- 🧩 Additional developer-friendly PDF utilities
- 🎨 UI and accessibility improvements
- 🛡️ Additional privacy and security improvements
- 🧪 Improved testing and reliability
- 📊 Better handling of complex documents

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

If you find a bug or have an idea for improving the project, you can contribute by following these steps.

### 🐛 Report a Bug

1. Open an **Issue**.
2. Clearly describe the problem.
3. Explain how to reproduce the issue.
4. Include relevant error messages or screenshots when possible.

### 💡 Suggest a Feature

1. Open an issue.
2. Describe the feature you'd like to see.
3. Explain why it would be useful.
4. Provide examples if applicable.

### 🔧 Submit Code

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes locally.
5. Commit your changes with a clear message.
6. Open a Pull Request.
7. Describe what you changed and why.

---

## 🐛 Issues & Feedback

Found a problem or have a feature request?

### 👉 [Open an Issue](https://github.com/heyakashmaurya/pdf-tool/issues)

When reporting an issue, please include as much relevant information as possible.

Helpful information includes:

- Operating system
- Browser
- PDF type
- Tool being used
- Steps to reproduce
- Error message
- Screenshots, if applicable

---

## 🌐 Project Links

| Resource | Link |
| --- | --- |
| 🌐 **Live Website** | [pdf.heyakashmaurya.com](https://pdf.heyakashmaurya.com) |
| 💻 **GitHub Repository** | [github.com/heyakashmaurya/pdf-tool](https://github.com/heyakashmaurya/pdf-tool) |
| 🐛 **Report an Issue** | [GitHub Issues](https://github.com/heyakashmaurya/pdf-tool/issues) |

---

## 👨‍💻 Author

### Akash Maurya

Full-stack developer building web applications, developer tools, and practical software solutions.

### 🔗 Connect

- 💻 **GitHub:** [@heyakashmaurya](https://github.com/heyakashmaurya)
- 📄 **PDF Tools:** [pdf.heyakashmaurya.com](https://pdf.heyakashmaurya.com)

---

## ⭐ Support the Project

If you find **PDF Tools** useful, there are several ways you can support the project:

- ⭐ **Star the repository**
- 🐛 **Report bugs**
- 💡 **Suggest improvements**
- 🤝 **Contribute to the project**
- 📢 **Share it with developers who may find it useful**

Every contribution and piece of feedback helps improve the project.

---

## 📄 License

Please refer to the repository's license information for the terms under which this project is distributed.

---

<p align="center">

### 📄 PDF Tools

**Simple PDF utilities for the modern web.**

<a href="https://pdf.heyakashmaurya.com">
  🌐 Visit PDF Tools
</a>

<br><br>

Built with ❤️ using **Next.js, React, TypeScript, and Node.js**

</p>
