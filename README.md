# Graytm Wallet
Graytm Wallet.

## MERN Project

This is a MERN stack project with separate folders for the frontend and backend. The frontend runs on one port, and the backend on another.

## Requirements

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/mern-project.git
    cd mern-project
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` folder with the following content:

    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your_mongodb_uri` with your MongoDB connection URI and `your_jwt_secret` with your JWT secret key.

4. Start the development servers:
    ```sh
    cd backend
    npm run dev
    cd ../frontend
    npm start
    ```

## Usage

- The frontend will be running on `http://localhost:5172`.
- The backend API will be available at `http://localhost:8000`.

## Features

- User Authentication
- CRUD Operations
- Responsive Design

## To-Do

- [ ] Implement more advanced features.
- [ ] Improve error handling.
- [ ] Add more unit tests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
