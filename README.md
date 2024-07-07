# COMMENTING-API


# Installation

## Install Dependencies
```bash
pnpm install
```

## Set Environment Variables

Configure your environment variables. Typically, this involves setting up a .env file in the root of your project. 

```env
MONGODB_URI="mongodb+srv://admin:irUkni8AIXl3HJCp@commenting-cluster.rjjqfvz.mongodb.net/?retryWrites=true&w=majority&appName=commenting-cluster"
JWT_SECRET="SECRET12345"
```


## Start the project

```
npm run start:dev
```

# Available Endpoints


### GET /users

Description: Retrieve all users.

Example: http://localhost:3000/users



### GET /users/comments

Description: Retrieve comments associated with users.

Example: http://localhost:3000/users/comments

### POST /auth/register

Description: Register a new user.

Body: 
```
{ "username": "your_username", "password": "your_password" }
```

Example: http://localhost:3000/auth/register


### POST /auth/login

Description: Login and receive a JWT token.

Body: 
```
{ "username": "your_username", "password": "your_password" }
```

Example: http://localhost:3000/auth/login

### POST /comments

Description: Create a new comment.

Headers: `Authorization: Bearer <token>`

Body: 
```
{ "content": "comment_content" }
```

Example: http://localhost:3000/comments


### GET /comments

Description: Retrieve all comments.

Example: http://localhost:3000/comments


### PATCH /comments/:id

Description: Update a specific comment by ID.

Headers: `Authorization: Bearer <token>`

Parameters: id - Comment ID

```
Body: { "content": "updated_comment_content" }
```

Example: http://localhost:3000/comments/123


### DELETE /comments/:id

Description: Delete a specific comment by ID.


### GET /users/comments

Description: Get all comments of a authenticated user