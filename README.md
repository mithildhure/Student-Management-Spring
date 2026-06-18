# Student Management System (CRUD Application) v1.0

A full-stack Student Management System built using **React.js** and **Spring Boot**. This project demonstrates the implementation of CRUD (Create, Read, Update, Delete) operations using a modern frontend and backend architecture.

The application allows users to:

* Add new students
* View all students
* Update student information
* Delete student records
* Communicate between React and Spring Boot through REST APIs
* Store data in PostgreSQL database

This project was built as a learning project to understand full-stack development using React and Spring Boot.

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Bootstrap 5
* React Router DOM

### Backend

* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Lombok
* Spring Boot DevTools

### Database

* PostgreSQL

---

## What is Vite?

Vite is not a frontend framework.

Vite is a modern build tool and development server used to create frontend applications faster. In this project, Vite was used to bootstrap and run the React application.

Benefits of Vite:

* Faster startup time
* Hot Module Replacement (HMR)
* Optimized production builds
* Lightweight configuration

---

## Architecture

```text
React Frontend
      │
      │ HTTP Requests (Axios)
      ▼
Spring Boot REST API
      │
      ▼
Service Layer
      │
      ▼
Repository Layer (JPA)
      │
      ▼
PostgreSQL Database
```

---

## Project Features

### Student Management

* Add Student
* View Student List
* Edit Student Details
* Delete Student Records

### User Interface

* Responsive Bootstrap Design
* Loading Spinner while fetching data
* Confirmation before deleting records
* Form Validation using required fields

### Backend Features

* RESTful API Design
* Layered Architecture
* DTO Implementation
* Global Exception Handling
* CORS Configuration
* PostgreSQL Integration
* JPA Repository Support

---

## Project Structure

### Backend

```text
com.mvc.demo
│
├── config
│   └── CORS Configuration
│
├── controller
│   └── StudentController
│
├── dto
│   └── StudentDto
│
├── exception
│   └── Global Exception Handler
│
├── model
│   └── Student Entity
│
├── repo
│   └── StudentRepository
│
├── service
│   └── StudentService
│
└── DemoApplication
```

### Frontend

```text
src
│
├── components
│   ├── Navbar.jsx
│   ├── StudentList.jsx
│   ├── AddStudent.jsx
│   └── EditStudent.jsx
│
├── App.jsx
│
└── main.jsx
```

---

## Entity Structure

### Student

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;

private String first_name;
private String last_name;
private Integer age;
private Integer standard;
private Double fees;
```

> Note: The current version uses underscore naming conventions. Future versions will follow standard Java naming conventions such as firstName and lastName.

---

## REST API Endpoints

### Fetch All Students

```http
GET /students/fetchAll
```

### Fetch Student By ID

```http
GET /students/fetch/{id}
```

### Add Student

```http
POST /students/save
```

### Update Student

```http
PUT /students/update?id={id}
```

### Delete Student

```http
DELETE /students/delete?id={id}
```

### Fetch Students with Pagination

```http
GET /students/fetchPage?page={page}
```

### Sort Students

```http
GET /students/sorting?sort={field}&order=asc
```

---

## Dependencies Used

### Spring Boot Dependencies

```xml
spring-boot-starter-web
spring-boot-starter-data-jpa
postgresql
lombok
spring-boot-devtools
```

### React Dependencies

```bash
react
react-dom
react-router-dom
axios
bootstrap
```

---

## CORS Configuration

CORS stands for:

**Cross-Origin Resource Sharing**

Since React and Spring Boot run on different ports during development:

```text
React      -> localhost:5173
Spring Boot -> localhost:8080
```

The browser blocks requests between different origins by default.

To allow communication between React and Spring Boot, CORS configuration was implemented in the backend.

---

## Running the Project

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

Configure PostgreSQL in:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### Frontend Setup

Install dependencies:

```bash
npm install
```

Start Vite Development Server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Current Version (v1)

Implemented:

* CRUD Operations
* REST APIs
* React Routing
* Bootstrap UI
* PostgreSQL Integration
* DTO Layer
* Global Exception Handling
* CORS Configuration
* Loading Indicators

---

## Future Improvements (v2)

Planned features:

* Advanced Pagination
* Dynamic Sorting
* Search Functionality
* Authentication and Authorization
* Login & Registration
* Spring Security Integration
* Dashboard Analytics
* Form Validation Improvements
* Unit & Integration Testing

---

## Learning Outcomes

Through this project, the following concepts were explored:

* React Components
* React Hooks (useState, useEffect)
* React Router
* Axios API Integration
* Spring Boot REST APIs
* Layered Architecture
* DTO Pattern
* JPA Repository
* PostgreSQL Database Connectivity
* Exception Handling
* Cross-Origin Resource Sharing (CORS)
* Full Stack Application Development

---

## Author

[Mithil Dhure](https://www.linkedin.com/in/mithil-dhure/)

Built for learning and practicing Full Stack Development using React, Spring Boot, and PostgreSQL.
