# Authentication Website

Welcome to the Authentication Website! This project is built using HTML, CSS, JavaScript, Express.js, MongoDB, Mongoose, and Nodemailer.

## Overview

The Authentication Website provides secure user authentication and management functionalities, allowing users to register, log in, and reset their passwords.

## Features

- User registration with email verification
- Secure user authentication with sessions
- Password reset functionality via email
- User profile management
- Responsive design for optimal viewing on all devices

## Tech Stack

- HTML
- CSS
- JavaScript
- Express.js
- MongoDB
- Mongoose
- Nodemailer

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/authentication-website.git`
2. Navigate to the project directory: `cd authentication-website`
3. Install dependencies: `npm install`
4. Set up environment variables:
    - Create a `.env` file in the root directory
    - Define the following variables:
        - `PORT`: Port number for the Express server
        - `MONGODB_URI`: MongoDB connection URI
        - `SESSION_SECRET`: Secret key for session management
        - `EMAIL_USER`: Email address for sending password reset emails
        - `EMAIL_PASS`: Password for the email account
5. Start the server: `npm start`
6. Open your browser and visit `http://localhost:3000` to view the website.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
