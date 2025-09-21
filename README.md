# 📸 Insta-My-Gram - A Minimalistic Social Media API

A full-stack-ready backend for a social media platform similar to Instagram. This project includes user authentication, following/followers, post creation with tags and slugs, liking/unliking, and commenting functionality — built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

Backend - live server : https://social-media-backend-g27f.onrender.com

Back-end 

## 🚀 Features

- 🔐 JWT-based User Authentication (Login/Register)
- 👥 User roles: `USER`, `ADMIN`
- ✍️ Create, Read, Update, Delete (CRUD) for Posts
- 💬 Commenting system (supports nesting)
- ❤️ Like/Unlike Posts
- ➕ Follow/Unfollow Users
- 🔍 Slug generation for SEO-friendly URLs
- 📁 Clean MVC structure with middleware support

---

## 🛠 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Language   | TypeScript (Node.js)     |
| Framework  | Express.js               |
| Database   | MongoDB with Mongoose    |
| Auth       | JSON Web Tokens (JWT)    |
| Hashing    | bcrypt                   |
| Utils      | dotenv, slugify          |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Lankala-Kumar-19/insta-my-gram.git

cd insta-my-gram
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Run the Server
```
npm run dev

```


🧪 API Endpoints
🔐 Auth

POST /users/register – Register a user

POST /users/login – Login and receive JWT

👤 Users

GET /users/ – Get all users

GET /users/:id – Get single user

PUT /users/:userId – Update user

DELETE /users/:userId – Delete user

POST /users/:id/follow – Follow a user

POST /users/:id/unfollow – Unfollow a user

GET /users/:id/followers – Get followers

GET /users/:id/following – Get following

📝 Posts

GET /posts/ – Get all posts

GET /posts/:slug – Get a post by slug

POST /posts/ – Create a post

PUT /posts/:slug – Update post

DELETE /posts/:slug – Delete post

POST /posts/:slug/like – Like a post

POST /posts/:slug/unlike – Unlike a post

GET /posts/:slug/likes – Get all likes

GET /posts/liked – Get all liked posts by user


















