# RESTful API for app development (Backend)

Short description or introduction to the project.

## Table of Contents

-   [Project Description](#project-description)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Documentation](#api-documentation)
-   [Testing](#testing)
-   [Contributing](#contributing)
-   [License](#license)

## Project Description

Provide a detailed description of your RESTful API project. Explain its purpose, functionality, and any relevant background information.

## Features

-   User registration and authentication
-   CRUD operations for resources
-   Data validation and error handling
-   Store user information, container identification and movement of container
-   QR generating
-   Basic payment setup and information gathering

## Technologies Used

The major technologies, frameworks, and libraries used in your project are:
-   Node.js
-   Express.js
-   MongoDB and Mongoose
-   JSON Web Tokens (JWT)
-   Docker
-   Nginx
-   Jest and Supertest

## Installation

These are the steps required to install and set up your project locally. Include any dependencies that need to be installed and how to configure the environment:

1. Clone the repository: `git clone https://github.com/QuanNguyenDong/api-betizen.git`
2. Navigate to the project directory: `cd api-betizen`
3. Install dependencies: `npm install`
4. Configure environment variables:
    - Create new file named `.env` in the same directory
    - Update the necessary values in the `.env`:
    ```
    PORT=3000
    MONGO_URI=''
    JWT_SECRET=''
    NODE_ENV='development'
    STRIPE_SECRET_KEY=''
    ```
    - MONGO_URI is the Uri of your database, normally follow structure: `mongodb://${USER}:${PASSWORD}@{MONGO_IP}:${MONGO_PORT}` or `mongodb://${MONGO_IP}:${MONGO_PORT}`
    - JWT_SECRET is passing as an argument when creating token for users, can be any string, for example: `JWT_SECRET='secret'`
    - STRIPE_SECRET_KEY is taken from Stripe when you setup account at https://stripe.com/en-au
5. Start the application: `npm run server`

### Docker
Refer to Dockerfile, docker-compose.*.yml for docker configuration (potentially for deployment). Refer to script.sh for command to build image and run container (assume developer already has Docker engine in laptop)


## Usage
<!-- 
Explain how to use your API. Provide examples of API endpoints, request/response formats, and any authentication/authorization requirements. For example:

1. Start the application as described in the Installation section.
2. Make requests to the API endpoints using tools like cURL, Postman, or your preferred API client.
3. Include any required headers or parameters for authentication and authorization.
4. Provide code examples or sample requests to demonstrate how to interact with your API. -->

### Postman
<video controls width="100%" muted>
  <source src="./recordings/Postman24Jul.mp4" type="video/mp4">
</video>

### http in vs code
<video controls width="100%" muted>
  <source src="./recordings/httpVsCode.mp4" type="video/mp4">
</video>

## API Documentation
### User
```python
@desc Register a new user
@route POST /api/users
@access Public

@desc Sign in user & get token
@route POST /api/users/auth
@access Public

@desc Sign out user & clear cookie
@route POST /api/users/logout
@access Public

@desc Get user profile
@route POST /api/users/profile
@access Private

@desc Update user profile
@route PUT /api/users/profile
@access Private

@desc Get all users
@route GET /api/users
@access Private/Admin

@desc Delete user
@route DELETE /api/users/:id
@access Private/Admin

@desc Get user by ID
@route GET /api/users/:id
@access Private/Admin

@desc    Update user
@route   PUT /api/users/:id
@access  Private/Admin
```

### Container
```python
@desc Generate a new container
@route POST /api/containers
@access Admin

@desc Get container information
@route GET /api/containers/info
@access Private/Admin

@desc Get all containers currently connected to the user
@route GET /api/containers/:uid
@access Private

@desc Update container info
@route PUT /api/containers/info
@access Private

@desc Get all containers
@route GET /api/containers
@access Admin

@desc Delete container
@route DELETE /api/containers
@access Admin
```

### Activity
```python
@desc Create a new activity
@route POST /api/activity
@access Private

@desc Get activity information
@route GET /api/activity/:id
@access Private

@desc Get all activities from the user
@route GET /api/activity/from
@access Private

@desc Get all activities to the user
@route GET /api/activity/to
@access Private

@desc Update activity info
@route PUT /api/activity/info
@access Private

@desc activity container returned
@route PUT /api/activity/container
@access Private

@desc Get all activities
@route GET /api/activitiy
@access Admin

@desc Delete activitiy
@route DELETE /api/activitiy/:id
@access Admin
```

Refer to __requests-http__ directory or source code (controllers folder) for more details included in the body

## Testing
Testing is implemented using Jest and Supertest library. To run the testcase:
```
npm test
```
Refer to __./test__ folder for test setup and __./routes/\_\_test\_\___ for unit test.

## Contribution acknowledgement
Our develop team includes 4 members:
-   Daniel Abdelsayed
-   Dong Quan Nguyen
-   Jeremy Hoy
-   Reyvaldo Yung Chung Lay

## License
