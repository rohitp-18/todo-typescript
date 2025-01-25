# MERN Stack Todo Website with TypeScript

This is a Todo website built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. The application includes drag-and-drop functionality and proper user validation.

## Features

- **User Authentication**: Secure user registration and login.
- **Create, Read, Update, Delete (CRUD)**: Manage your todos efficiently.
- **Drag-and-Drop**: Easily reorder your todos with drag-and-drop functionality.
- **Responsive Design**: Works on all devices expect mobile phone.
- **TypeScript**: Strongly typed code for better maintainability.

## Hosted URL

The application is hosted at: [https://todo-task-web.onrender.com](https://todo-task-web.onrender.com)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rohitp-18/todo-typescript.git
cd todo-typescript
```

2. Install server dependencies:

```bash
npm install
```

3. Install client dependencies:

```bash
cd ../front
npm install
```

4. Create a `.env` file in the `server` directory and add your MongoDB URI and other environment variables:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the server(backend):

```bash
npm run back
```

2. Start the client(frontend):

```bash
cd ../front
npm start
```

or

```bash
npm run front
```

## Usage

- Register a new account or log in with an existing account.
- Add new todos using the input field.
- Drag and drop todos to reorder them.
- Edit or delete existing todos.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For any inquiries, please contact [rohitpatil18@hotmail.com](mailto:rohitpatil18@hotmail.com).
