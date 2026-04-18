# 📝 Notes App

A full-stack Notes Application that allows users to securely create, manage, and organize their notes with authentication and real-time interactions.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup with JWT)
* 📝 Create, Read, Update, Delete Notes (CRUD)
* 📌 Pin / Unpin Important Notes
* 🗑️ Soft Delete (Trash system)
* 🏷️ Tags for Notes
* 🔍 Search Functionality (optional if added)
* 📱 Fully Responsive UI

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Redux Toolkit
* Axios

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Project Structure

backend/

* models/
* controllers/
* routes/
* middleware/

frontend/

* components/
* pages/
* redux/
* services/

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/notes_app.git
cd notes_app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm start
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend deployed on Vercel
* Backend deployed on Railway

---

## 📸 Screenshots

(Add screenshots of your UI here)

---

## 📌 API Endpoints (Example)

* POST /api/auth/signup
* POST /api/auth/login
* GET /api/notes
* POST /api/notes
* PUT /api/notes/:id
* DELETE /api/notes/:id

---

## 👨‍💻 Author

* Mohit Sahu

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
