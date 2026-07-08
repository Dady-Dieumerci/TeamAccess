# TeamAccess - Role-Based Access Control (RBAC) Dashboard

A modern full-stack Role-Based Access Control (RBAC) dashboard built with **Next.js**, **Typescript**, **Prisma**, and **PostgleSQL**. The application demonstrates secure authentication, authorization, and role-based access management for teams.

## Features

* 🔐 JWT Authentication
* 👥 Role-Based Access Control (RBAC)
* 🛡️ Protected Routes
* 👤 User Registration & Login
* 🏢 Team Management
* ✏️ Create, Update, and Delete Users
* 🔑 Permission-Based Authorization
* 🍪 Secure Cookie Authentication
* 📱 Responsive Dashboard
* ⚡ Built with the Next.js App Router

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon Database)
* JWT Authentication
* bcrypt

## Project Structure

app/
components/
lib/
prisma/
public/
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Dady-Dieumerci/TeamAccess.git
```

Navigate into the project:

```bash
cd TeamAccess
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Push the database schema:

```bash
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

## Future Improvements

* Email verification
* Password reset
* User profile management
* Audit logs
* Dark/Light mode
* Unit and integration tests
* Docker deployment

## What I Learned

While building this project, I gained practical experience with:

* Building secure authentication systems
* Implementing Role-Based Access Control (RBAC)
* Protecting API routes
* Working with Prisma ORM
* Integrating PostgreSQL using Neon
* Managing authentication using JWT and cookies
* Structuring scalable Next.js applications

## Author

**Dady Dieumerci**

GitHub: https://github.com/Dady-Dieumerci
