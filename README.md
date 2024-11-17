# Bharat Seva+ Client Portal 🚀  
[![Deploy to AzureVM](https://github.com/BharatSeva/User-Server/actions/workflows/deploy.yaml/badge.svg)](https://github.com/BharatSeva/User-Server/actions/workflows/deploy.yaml)  

> **Note:** The terms *Patient*, *Client*, and *User* are used interchangeably throughout this organisation.  

Welcome to the **Bharat Seva+ Client Portal Service**! This service is the backbone of **Client Management** in the Bharat Seva+ project. From **authentication** and **profile management** to **permission handling**, the Client Portal integrates seamlessly with other services like healthcare records and notifications to deliver a unified, smooth experience for users.  

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

- **Secure Client Authentication and Authorization**:  
  Enables users to securely log in and manage access to protected routes.  

- **Profile Management**:  
  Allows users to update their profiles and preferences effortlessly.  

- **Appointment Scheduling and Management**:  
  Handles the complete lifecycle of appointments, from booking to completion.  

- **Integration with RabbitMQ**:  
  Asynchronous processing of appointments and tasks for enhanced performance.  

- **Rate Limiting with Redis**:  
  Protects against excessive API requests with efficient rate limiting and caching.  

- **Data Persistence**:  
  - **PostgreSQL** for user data and sensitive information.  
  - **MongoDB** for appointment and activity records.  

---

## Technologies Used  

- **Node.js**: Server-side JavaScript runtime  
- **Express.js**: Lightweight, flexible web framework  
- **PostgreSQL**: Relational database for structured data  
- **MongoDB**: NoSQL database for unstructured appointment records  
- **RabbitMQ**: Message broker for task queuing  
- **Redis**: In-memory datastore for caching and rate limiting  
- **JWT (JSON Web Tokens)**: Secure authentication for users  

---

## Getting Started   

Follow the steps below to set up the Client Portal on your local system.  

### Prerequisites  
Ensure the following dependencies are installed:  
- **Node.js** (v16 or higher)  
- **PostgreSQL**  
- **MongoDB**  
- **RabbitMQ**  
- **Redis**  
- **Docker**  
- **Python**  

---

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
Create a .env file in the project root directory and populate it with the following:

```bash
PORT=3001  # Port for the Client Portal  
MONGOURL=mongodb://rootuser:rootuser@localhost:27017/db?authSource=admin  

Patient_JWT_LIFETIME=30d  
Patient_JWT_SECRET_KEY=VaibhavYadavSECRET_KEY

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
To start the server locally:

```bash
npm start
```
The server will start at http://localhost:3001.

## Docker Setup
Build the Docker Image
```bash
docker build -t client .
```

Run the Docker Container
```bash
docker run -d -p 3001:3001 --name client --env-file .env client
```
This will start the service at http://localhost:3001 using environment variables from your .env file.

## API Endpoints
Detailed documentation for all API endpoints, including request and response formats, is available in the Postman collection.
Download the collection [here](./client.postman_collection.json).

## Usage 
For secured routes, ensure to include the JWT token in the Authorization header of your API requests:

```bash
Authorization: Bearer <your_jwt_token>
```
## Contributing 
Contributions are welcome! If you have ideas for new features or encounter bugs, feel free to:

- Create a pull request  
- Open an issue  
Let’s build something amazing together!  

## License 
This project is licensed under the AGPL-3.0 License. For more details, see the [LICENSE](./LICENSE) file.
