# Shelf - Book Sharing API

A RESTful API for a book sharing platform built with Express.js, Prisma, and PostgreSQL.

## 📋 Features

- **User Authentication:** Sign up, sign in, and logout functionality
- **Role-Based Authorization:** Admin and regular user roles
- **Book Management:** CRUD operations for books
- **User Profile:** Retrieve user information

## 🔧 Tech Stack

- **Runtime:** Bun
- **Framework:** Express.js
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.2.5 or higher
- PostgreSQL database (a Neon database is configured by default)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables by creating a `.env` file:

```bash
DATABASE_URL='your-postgresql-connection-string'
JWT_SECRET='your-secret-key'
```

4. Run Prisma migrations to create your database schema:

```bash
bunx prisma migrate dev
```

### Running the Application

For development:

```bash
bun run dev
```

For production:

```bash
bun run start
```

The server will start on port 3001.

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Log in a user
- `POST /api/auth/logout` - Log out a user

### Users

- `GET /api/users/me` - Get current user information (requires authentication)
- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get user by ID (requires authentication)

### Books

- `GET /api/books` - Get all books (requires authentication)
- `GET /api/books/:id` - Get book by ID (requires authentication)
- `POST /api/books` - Create a new book (requires admin role)
- `PUT /api/books/:id` - Update book (requires admin role)
- `DELETE /api/books/:id` - Delete book (requires admin role)

## 📦 Database Schema

### Users

- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `password`: String
- `mobile`: String
- `role`: Enum (ADMIN, USER)

### Books

- `id`: UUID (Primary Key)
- `title`: String
- `author`: String
- `genre`: String (Optional)
- `location`: String (Optional)
- `ownerId`: UUID (Foreign Key to Users)
- `contact`: String
- `status`: Enum (AVAILABLE, UNAVAILABLE)

## 📝 License

This project is licensed under the MIT License.
