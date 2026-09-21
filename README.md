
# Freelancing Hiring Platform

## Project Overview

The Freelancing Hiring Platform is a full-stack web application designed to connect clients and freelancers.

The platform provides features for user registration, login, user management, project management, and freelancer-related activities.

The application consists of a React frontend and a Spring Boot backend.

## Features

- User Registration
- User Login
- User Management
- Freelancer Management
- Project Management
- Authentication
- Frontend and Backend Integration
- API Testing using Postman

## Tech Stack

### Frontend
- React
- JavaScript
- HTML
- CSS
- Node.js
- npm
- Create React App

### Backend
- Java
- Spring Boot
- Maven

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- Draw.io

## Project Structure

```text
FreelancingHiringPlatform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── skillbridge/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/skillbridge/
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │           ├── static/
│   │           ├── templates/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── Problem_Statement.md
│
├── docs/
│   └── diagram/
│       ├── Class Diagram.drawio.png
│       ├── ER diagram.draw.io.png
│       └── System Architecture.drawio.jpeg
│
└── README.md

## How to Run Locally

### Prerequisites

Make sure the following are installed:

- Java
- Node.js
- npm
- Git
- Visual Studio Code

### 1. Clone the Repository

Open a terminal and run:

git clone https://github.com/Rithika11870/FreelancingHiringPlatform.git

cd FreelancingHiringPlatform

### 2. Run the Backend

Open a terminal in the project root and run:

cd skillbridge

Start the Spring Boot backend:

.\mvnw.cmd spring-boot:run

Keep this terminal running.

### 3. Run the Frontend

Open a new terminal.

From the project root, run:

cd frontend

Install the required dependencies:

npm install

Start the React application:

npm start

The React application will open in the browser.

### 4. Test the Application

Once both the frontend and backend are running, use the application through the browser.

Postman can be used to test the backend API endpoints.

## API Testing

Postman is used to test the backend APIs.

API testing can be performed by checking:

- Request method
- Request URL
- Request data
- Response data
- HTTP status

## Documentation

The project documentation includes:

- Problem Statement
- Class Diagram
- ER Diagram
- System Architecture Diagram

The problem statement is available in:

skillbridge/Problem_Statement.md

The diagrams are available in:

docs/diagram/

## Git and GitHub

Git and GitHub are used for version control.

To check the project status:

git status

To add changes:

git add .

To commit changes:

git commit -m "Update project"

To push changes:

git push origin main

## Project Information

Project Name: Freelancing Hiring Platform

Frontend: React

Backend: Java Spring Boot

Build Tool: Maven

API Testing: Postman

Version Control: Git & GitHub

Development Environment: Visual Studio Code

Diagram Tool: Draw.io

