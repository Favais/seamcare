# SC — Patient/Doctor Appointment & Document Management Platform

A full-stack web application built with **Next.js (App Router)**, **MongoDB/Mongoose**, **NextAuth**, and **Resend** that enables patients and doctors to manage appointments, documents, messaging, and scheduling through a unified interface.

---

## Features

### Patient Features
- Create, upload, and view medical documents  
- Book appointments with doctors  
- Secure login & profile management  
- View appointment history & notifications  

### Doctor Features
- Manage schedules & availability  
- Review patient records  
- Handle appointment requests  
- Secure document access  

### System Features
- Secure authentication using **NextAuth Credentials Provider**
- MongoDB database using **Mongoose** models
- Email notifications powered by **Resend**
- Fully responsive UI built with Next.js

---

## Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS
- FullCalendar

**Backend**
- Next.js API Routes  
- MongoDB / Mongoose  

**Authentication**
- NextAuth (Credentials Provider)

**Email**
- Resend API

**Utilities**
- Axios
- Custom React hooks & contexts

---

## 📂 Project Structure
```bash
src/
├── app/ # Next.js routes (API + pages)
├── components/ # Reusable React components
├── context/ # Global state (Auth, Modals, etc.)
├── hooks/ # Custom React hooks
├── lib/ # DB, email, axios client, helpers
├── models/ # Mongoose schemas
└── styles/ # Global styles
```

---

## Prerequisites

Make sure you have installed:

- **Node.js ≥ 18**
- **MongoDB Atlas or local MongoDB**
- **Resend account**
- **NextAuth secret** (auto-generated via `openssl rand -base64 32`)

---

## ⚙️ Installation

```bash
git clone <repo-url>
cd <project-folder>
npm install
```

## Environment Variables
Create a .env.local file in the root directory.
Use the template from .env.example (provided below).
```bash
cp .env.example .env.local
```
Fill in your credentials.
## Running the Development Server
```bash
npm run dev
```
Server runs at:
```
http://localhost:3000
```
## 🛠 Build for Production
```
npm run build
npm start
```
## 🧪 Testing
(Add test suite here if you later implement Jest/RTL)
## 📬 Email Setup (Resend)
 - Create an API Key from Resend dashboard
- Add it to your .env.local as RESEND_API_KEY
- Update the “from” email address if needed in lib/email.js
## 🔐 Authentication Notes
- The app uses NextAuth with Credentials Provider
- Sessions stored using JWT
- Make sure NEXTAUTH_SECRET is set in .env.local
## 📈 Deployment
You can deploy using:
- Vercel
- Render
- DigitalOcean
- Any platform that supports Node + environment variables

Ensure you set production environment variables in the hosting platform.
## 🧹 Code Quality & Standards
This project follows:
- ESLint rules from eslint.config.mjs
- Prettier recommended formatting
- Modular folder structure
- API route separation of concerns
(You can request a Prettier config + Husky hooks if you'd like.)
## 🤝 Contributing
- Fork the repository
- Create a feature branch
- Commit with clear messages
- Open a pull request
Want a CONTRIBUTING.md file? Just ask.
## 📝 License
MIT License.
You are free to modify and use this project commercially.
👨‍💻 Author
Developed by 
Contributions welcome!