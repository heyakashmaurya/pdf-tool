# 📄 PDF Tools

> A modern collection of web-based PDF utilities for merging, splitting, converting, compressing, rotating, extracting, OCR, and managing PDF documents.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-pdf.heyakashmaurya.com-blue?style=for-the-badge)](https://pdf.heyakashmaurya.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/heyakashmaurya/pdf-tool)

---

## 🚀 Live Demo

### 👉 [Open PDF Tools](https://pdf.heyakashmaurya.com)

Use the online PDF tools directly from your browser.

---

## ✨ About the Project

**PDF Tools** is a web application that provides a collection of useful PDF utilities through a simple and modern interface.

The project is built with a **Next.js/React frontend** and a **Node.js backend** for PDF-related processing that requires server-side operations.

The goal is to make common PDF tasks easier without requiring users to install dedicated desktop PDF software for every operation.

### What you can do

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

### Frontend

- ⚛️ **React**
- ▲ **Next.js**
- 🔷 **TypeScript**
- 🎨 **Tailwind CSS**

### Backend

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
