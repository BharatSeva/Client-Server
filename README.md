# Bharat Seva+ Client Portal [![Deploy to AzureVM](https://github.com/BharatSeva/User-Server/actions/workflows/deploy.yaml/badge.svg)](https://github.com/BharatSeva/User-Server/actions/workflows/deploy.yaml)
> Patient, Client, and User names are used interchangeably

This repository hosts the **Client Portal Service** for the Bharat Seva+ project. This service manages Client-related functionalities, including **authentication, profile management, and permission handling**, all built with **Express.js**. It integrates with other Bharat Seva+ services, such as healthcare records and notifications, to provide a seamless experience for client.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Configure Environment Variables](#configure-environment-variables)
  - [Run the Server](#run-the-server)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Client authentication and authorization
- Appointment scheduling and management
- Healthcare preferences management
- Integration with RabbitMQ for appointment processing
- Rate limiting and caching for API requests
- MongoDB and PostgreSQL for Records and Appointment storage

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for user data
- **MongoDB**: NoSQL database for appointment records
- **RabbitMQ**: Message broker for handling appointment creation
- **Redis**: In-memory data structure store for rate limiting
- **JWT**: JSON Web Tokens for secure user authentication

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

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

### Docker Setup
You can run the User Service with Docker for easier setup and deployment.

Build the Docker Image:

```bash
docker build -t client .
```
Run the Docker Container:
```bash
docker run -d -p 3001:3001 --name client --env-file .env client
```
This command will start the service on http://localhost:3001, reading environment variables from the .env file.

## API Endpoints
Detailed API documentation and request examples are available in the Postman Collection. Download it [here](./patient_server.postman_collection.json).

## Usage
To use the API, include the JWT token in the Authorization header for protected routes:

```bash
Authorization: Bearer <your_jwt_token>
```

## Contributing
Contributions are welcome! Please create a pull request or open an issue for any feature requests or bug reports.

## License
This project is licensed - see the [LICENSE](./LICENSE) file for details.
