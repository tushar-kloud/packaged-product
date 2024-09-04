# SaaS Backend

## Table of Contents
- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction
This node js application serve as the backend for the Saas product.

## Folder Structure
project-root/ <br>
├── config/ # Configuration files <br>
├── controller/ # Controllers for handling requests <br>
├── middleware/ # Middleware functions <br>
├── models/ # Database models <br>
├── routers/ # Route definitions <br>
├── utils/ # Utility functions <br>
├── .env # Environment variables <br>
├── .gitignore # Git ignore file <br>
├── package.json # Node.js package file <br>
├── README.md # Project documentation  <br> 
└── server.js # Main server file <br>

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. Install dependencies:
   ```bash
    npm install  
## Configuration
1. Create a .env file in the root directory and add the necessary environment variables:
   ```bash
    PORT=3000
    DATABASE_URL=your-database-url
    FIREBASE_API_KEY=your-secret-key     
2. Update the configuration files in the config/ directory as needed.
## Usage
1. Start the development server:
   ```bash
   npm run dev
2. Start the production server:
   ```bash
   npm start
## API Endpoints
Provide a list of available API endpoints and their descriptions.  
`GET /api/auth/get-user-data` - Retrieve a user by firebase access token    
`POST /api/auth/create-user` - Create a new user  
`POST /api/training//create-lab` - Create a new LAB  
`GET /api/training//labs` - Get all the lab assign to the user  
`GET /api/training//labs/:labId` - Get a specific lab by ID  