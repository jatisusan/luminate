# 📰 Luminate – Full Stack Blog Platform

![Luminate Banner](./frontend/public/images/banner.png)

**Luminate** is a modern full-stack blogging platform built with the MERN Stack that allows users to create, edit, and share their thoughts effortlessly. It offers a clean interface, seamless media management, and a complete set of features for readers, writers, and administrators.

## ✨ Features

- 📝 **Post Management:** Create, edit, delete, and view blog posts with a rich text editor (React-Quill).
- ❤️ **Engagement Tools:** Like, comment, and reply to posts for interactive discussions.
- 🔍 **Smart Search & Filters:** Browse posts by categories or search by keywords.
- 🧑‍💻 **User Profiles:** Customize user profiles and view other authors’ posts.
- 🖼️ **Media Uploads:** Upload and manage images easily with Cloudinary integration.
- 🛡️ **Authentication:** Secure login, registration, and protected routes for users and admins.
- ⚙️ **Admin Controls:** Manage users and posts with elevated permissions.
- 📱 **Responsive Design:** Built with React-Bootstrap for a smooth experience across devices.

## 🧩 Tech Stack

**Frontend:** React, Redux Toolkit, Bootstrap  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Cloud Services:** Cloudinary (for media uploads)  
**Editor:** React-Quill (for rich text editing)

## 🚀 Getting Started

### 1️⃣ Clone the repository and install dependencies

```bash
git clone https://github.com/jatisusan/luminate.git
cd luminate
```

Root dependencies:

```bash
npm install
```

Frontend dependencies:

```bash
cd frontend
npm install
```

### 2️⃣ Add a .env file in the root of the project with the following:

```env
MONGODB_URI=YOUR_MONGODB_URI_HERE
PORT=YOUR_PORT_HERE
JWT_SECRET=YOUR_JWT_SECRET
```

### 3️⃣ Run your project:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the project.
