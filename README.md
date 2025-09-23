# 🎵 Nagiscape - Your Personal Soundscape

<p align="center">
  <img width="2501" height="1297" alt="image" src="https://github.com/user-attachments/assets/cfc4b0a0-b44d-45eb-bec7-5c1bf9ad2349" />
</p>

<p align="center">
  A web-based ambient sound mixer designed to enhance focus, relaxation, and sleep. Built with the MERN stack and deployed on Vercel.
  <br />
  <br />
  <a href="https://nagiscape.vercel.app/"><strong>View Live Demo »</strong></a>
  <br />
  <br />
</p>


## About The Project

Nagiscape is a full-stack web application that allows users to create their perfect sound environment. Whether for studying, working, or sleeping, you can mix and match high-quality music tracks with a variety of ambient sounds like rain, fireplaces, and ocean waves. Logged-in users can save their favorite combinations as custom "mixes" to easily access them later.

This project was built from scratch to demonstrate a complete full-stack development cycle, from backend API creation to a dynamic, interactive React frontend.


## Key Features

* **Dynamic Audio Player:** Play a curated list of music tracks and mix multiple ambient sounds simultaneously.
* **User Authentication:** Secure user registration with email verification, login, and session management using JSON Web Tokens (JWT).
* **Save & Load Mixes:** Logged-in users can save their custom sound configurations (active track, ambience volumes) and load them in future sessions.
* **User Account Management:** A dedicated settings page where users can change their password or securely delete their account.
* **Forgot/Reset Password:** Complete email-based password reset functionality.
* **Modern UI:** A responsive, glassmorphism-style interface with a looping video background for an immersive experience.


## Tech Stack

This project is built with the following technologies:

| Frontend | Backend | Database | Deployment |
| :--- | :--- | :--- | :--- |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) |
| ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) | |
| ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) | | |


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm
* MongoDB Atlas account or local MongoDB installation

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/jesslyntrixie/nagiscape.git](https://github.com/jesslyntrixie/nagiscape.git)
    cd nagiscape
    ```

2.  **Setup Backend (`/server`):**
    ```sh
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create a .env file in the /server directory and add the variables below
    touch .env

    # Start the server
    npm run server
    ```

3.  **Setup Frontend (`/client`):**
    ```sh
    # Navigate to the client directory from the root
    cd client

    # Install dependencies
    npm install

    # Create a .env file in the /client directory and add the variable below
    touch .env

    # Start the client
    npm run dev
    ```

### Environment Variables

You will need to create two `.env` files for this project to run locally.

* **`/server/.env`:**
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    BACKEND_URL=http://localhost:5000
    FRONTEND_URL=http://localhost:5173
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_gmail_app_password
    ```

* **`/client/.env`:**
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Jesslyn Trixie Edvilie - [LinkedIn](https://www.linkedin.com/in/jesslyn-trixie-edvilie) - [jesslynliyuexi@gmail.com](jesslynliyuexi@gmail.com)

Project Link: [https://github.com/jesslyntrixie/nagiscape](https://github.com/jesslyntrixie/nagiscape)
