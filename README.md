# SliceMaster – Mern Pizza App
A secure, scalable Node.js backend for pizza ordering – with JWT auth and email support.

SliceMaster is a full-stack pizza ordering and delivery web application built using the MERN stack: MongoDB, Express.js, React, and Node.js. The project features a fully functional RESTful API, secure user authentication, and a responsive frontend interface, providing users with a smooth experience from browsing the menu to placing and tracking their orders.

## Features

This application allows users to browse a menu of available pizzas, add items to a shopping cart, and place orders. User registration and login are implemented with JSON Web Tokens (JWT) to ensure secure authentication. An admin interface is also included, allowing management of pizzas and orders. The frontend is responsive, ensuring usability on both desktop and mobile devices.

## Tech Stack


- **MongoDB** – NoSQL database for storing users, pizzas, and orders
- **Express.js** – Web framework for building the API
- **Node.js** – JavaScript runtime environment
- **Mongoose** – ODM to interact with MongoDB
- **JWT** – For user authentication and access control
- **Swagger** – For documenting and testing the API
  
## Project Structure

The project is divided into two main folders: client for the React frontend and server for the Express backend. The backend contains models, routes, and controllers to handle business logic, while the frontend includes components and pages for the user interface.


---

## API Endpoints Overview

All endpoints follow REST conventions and are grouped by resource:

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/auth/register`   | Register a new user          |
| POST   | `/auth/login`      | Authenticate user & get token |
| GET    | `/pizza`           | Get list of pizzas           |
| POST   | `/pizza`           | Create a new pizza (admin)   |
| GET    | `/order`           | Get orders (user or admin)   |
| POST   | `/order`           | Place a new order            |
| GET    | `/topping`         | List all toppings            |
| POST   | `/topping`         | Add a new topping (admin)    |

More endpoints are available and documented in Swagger.

---

## Install dependencies

npm install

## Set up your .env file

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key

## Middleware & Utilities
Authentication – Middleware for JWT verification

Permissions – Role-based access (admin/user)

ErrorHandler – Centralized error formatting

Logger – Simple request logging for dev/debugging

## License

This project is open-source and available for use and modification.



---


