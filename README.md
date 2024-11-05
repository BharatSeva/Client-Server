# Bharat Seva+ User Service

This repository hosts the **User Service** for the Bharat Seva+ project. This service manages user-related functionality, including authentication, profile management, and permission handling, built with **Express.js**. It integrates with other Bharat Seva+ services, such as healthcare records and notifications, to provide a seamless user experience.  




## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Appointment scheduling and management
- Healthcare preferences management
- Integration with RabbitMQ for appointment processing
- Rate limiting and caching for API requests
- MongoDB and Postgres for Records and Appointment storage

## Technologies Used
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for user data
- **MongoDB**: NoSQL database for appointment records
- **RabbitMQ**: Message broker for handling appointment creation
- **Redis**: In-memory data structure store for rate limiting
- **JWT**: JSON Web Tokens for secure user authentication

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (version >= 16)
- PostgreSQL
- MongoDB
- RabbitMQ
- Redis
- Docker
- Python

### Clone the Repository
```bash
git clone https://github.com/BharatSeva/User-Server.git
cd User-Server
```
### Install Dependencies
```bash
npm install
```
### Configure Environment Variables
Create a .env file in the root directory and add the following variables:
```bash
PORT=3001   # THIS IS USER PORT
MONGOURL=mongodb://rootuser:rootuser@localhost:27017/db?authSource=admin 
Patient_JWT_LIFETIME=30d
Patient_JWT_SECRET_KEY=VaibhavYadav

POSTGRES_HOST=localhost
POSTGRES_USER=rootuser
POSTGRES_PASS=rootuser
POSTGRES_PORT=5432
POSTGRES_DIALECT=postgres

MAX_REQUESTS=100
WINDOW_SIZE_IN_SECONDS=60

REDIS_HOST=localhost
REDIS_PORT=6379

RABBITMQ_URL=amqp://rootuser:rootuser@localhost:5672/

```
### Run the Server
```bash
npm start
```
The server will start at http://localhost:3001.

## API Endpoints  
Please find Postman Collection [here](./User_Server.postman_collection.json)   

## Usage
To use the API, include the JWT token in the Authorization header for protected routes:
```bash
Authorization: Bearer <your_jwt_token>
```

## Contributing  
Contributions are welcome! Please create a pull request or open an issue for any feature requests or bug reports.  

## License  
This project is licensed - see the LICENSE file for details.  
