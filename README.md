# Blog App

A beautifully designed blog app with CRUD functionality using **Node js** and **MongoDB** as back-end and **React js** for front-end with all authentication and authorization handled in the back-end using **Node.js** (JWT, Validation, bcrypt).


### CRUD functionality

* Create blog
* Read blog
* Update blog
* Delete blog
* Update Account
* Create Account

### Other Features

* Register functionality
* Login and logout functionality
* User authentication control
* Password protection
* Only Admin functionality (create and delete categories, delete users, delete posts)

**Note:** to get admin functionality on specific account you should edit the property isAdmin directly from the database using mongodb compass and then you can go to http://localhost:5000/admin page from the edited account

### Prerequisites for locally deployment

* Node v16.10.0

* npm v8.11.0

* MongoDB  

### Prerequisites for docker deployment

* Docker

* Docker Compose

### First time configurations

* git clone 

-- **Back-End Side:**

* cd blog-app/backend
* touch .env ==> add the following environment variables:

		PORT=5000 (5000 is an example)
		MONGO_URL=mongodb://localhost:27017
		jwtPrivateKey=secret (this key will be used for hashing passwords)

-- **Front-End Side:**

* cd ../frontend/
* touch .env ==> add the following environment variables:

		REACT_APP_API_ENDPOINT=http://localhost:5000 (the same port 5000 as used above)

### Deployment locally

* Go to backend folder and execute these commands:

		npm install
		npm run seed (optional to populate the database)
		npm start

* Go to frontend folder and execute these commands:

		npm install
		npm start

* Open the app on http://localhost:3000

### Deployment with docker

* Go to blog-app folder and execute these commands:

		docker-compose build
		docker-compose up

* Open the app on http://localhost:3000
