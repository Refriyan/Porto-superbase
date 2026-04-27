# 🚀 Porto Superbase

Porto Superbase adalah aplikasi **portfolio fullstack modern** yang memungkinkan user menampilkan project dan sertifikat secara dinamis, lengkap dengan **admin dashboard** untuk manajemen konten.

Aplikasi ini mengintegrasikan **React (Vite) + Supabase** untuk realtime database serta arsitektur backend yang scalable.

---

## ✨ Features

* 🔐 Authentication (Admin Login)
* 📁 CRUD Projects
* 📜 CRUD Certificates
* ⚡ Realtime data (Supabase)
* 🎨 Responsive & modern UI
* 🌐 Public portfolio page
* 🛠 Admin dashboard

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

### Backend / Services

* Supabase (Database, Auth, Realtime)
* REST API (Golang - optional)

---

## 📂 Project Structure

```
porto-superbase/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── handlers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── project.ts
│   │   └── App.tsx
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Refriyan/Porto-superbase.git
cd Porto-superbase
```

---

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 3. Environment Setup

Buat file `.env` di folder `frontend`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🗄 Database Schema (Supabase)

### Table: projects

* id
* title
* description
* image_url

### Table: certificates

* id
* title
* issuer
* image_url

> Pastikan fitur **Realtime diaktifkan** pada Supabase.

---

## 📸 Screenshots

Tambahkan screenshot agar repo lebih menarik:

* Home Page
* Admin Dashboard
* Project List
* Certificate List

---

## 🚀 Deployment

### Frontend

* Vercel
* Netlify

### Backend (optional)

* VPS + Docker
* Railway / Render

---

## 🧠 Future Improvements

* Role-based access (Admin/User)
* Image upload (Supabase Storage)
* Dark mode
* Analytics dashboard

---

## 👨‍💻 Author

**Refriyan Adrianto**

* GitHub: https://github.com/Refriyan

---

## ⭐ Support

Jika project ini membantu atau menginspirasi, silakan beri ⭐ pada repository ini.

---

## 📌 Notes

* Pastikan environment variable sudah benar
* Gunakan Supabase project yang aktif
* Jika data tidak muncul di admin, cek:

  * API connection
  * Supabase policy (RLS)
  * Table permissions
