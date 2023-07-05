# CRUDTELUS

## User API
This is a simple Node.js application that provides an API for managing users. It uses Express.js as the web framework and stores user data in an in-memory data structure.

## Prerequisites
Node.js
npm
## Getting Started

## Clone the repository:
cd CRUDTELUS
npm install

## Start the server:
npm start
The server will start on http://localhost:3000.

## API Endpoints
GET /users: Retrieves all users.
GET /users/:id: Retrieves a specific user by ID.
POST /users: Creates a new user.
PUT /users/:id: Updates an existing user by ID.
DELETE /users/:id: Deletes a user by ID.

## Testing
To run the tests, use the following command:
npm test
The tests are implemented using the Jest testing framework and the Supertest library for making HTTP requests to the API endpoints.
