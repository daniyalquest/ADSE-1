# Demo Project

This repository contains a full-stack demo application built as a class project in preparation for the upcoming final project. The project demonstrates the use of a modern JavaScript stack, including:

- **Backend:** Node.js, Express, MongoDB (with Mongoose)
- **Frontend:** React (with Vite), Tailwind CSS

---

## Features

- User registration and login (with validation and password hashing)
- User listing (fetches users from the backend)
- RESTful API with Express
- MongoDB database integration
- Responsive frontend styled with Tailwind CSS

---

## Folder Structure

```
demo_project/
│
├── server/         # Express backend
│   ├── Config/
│   ├── Models/
│   ├── Routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── client/         # React frontend
    ├── src/
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to the `server` folder:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `server` folder:
    ```
    PORT=5000
    DATABASE_URL=your_mongodb_connection_string
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `client` folder:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm run dev
    ```

---

## Usage

- Visit [http://localhost:5173](http://localhost:5173) to view the React frontend.
- The backend API runs on [http://localhost:5000](http://localhost:5000).
- Example API endpoints:
  - `POST /api/users/register` — Register a new user
  - `POST /api/users/login` — Login
  - `GET /api/users/` — List all users

---

## Notes

- This project is for educational purposes and serves as a foundation for the final project.
- Feel free to extend and modify the code as needed for your learning or future projects.

---

## License

This project is open source and available under the [MIT License](LICENSE).
