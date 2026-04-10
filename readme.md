# Student Event Registration and Management System

A robust full-stack application leveraging **Spring Boot Microservices** and **React with TypeScript** to streamline the registration and tracking of student participation in academic events. The system employs a decoupled architecture and **MongoDB** to ensure high availability, scalability, and secure role-based data management.

---

## 🏗️ Architecture Overview

The system is built on a **Microservices Architecture**, ensuring each core function operates independently:

* **Faculty Microservice**: Manages faculty registration and login functionalities.
* **Student Microservice**: Handles student identity management and record viewing.
* **Event Microservice**: Controls the lifecycle of event records, including creation, retrieval by month, and ownership-based access control.

---

## 🚀 Key Features

### **Role-Based Access Control (RBAC)**
* **Faculty Authorities**: Faculty members can register and log in to record student participation in various events. They possess exclusive rights to update or delete only the records associated with their own Faculty ID.
* **Student Authorities**: Students can register and log in to view their personal event participation records using their unique Roll Number.

### **Data Management**
* **Event Tracking**: Stores comprehensive details including Student Name, Roll Number, Event Name, Location, Date, Description, and Faculty ID.
* **Temporal Queries**: Faculty can retrieve and view event records filtered by the month of occurrence.
* **Secure Persistence**: All data is stored in MongoDB, providing persistent storage for microservices.

### **Modern Frontend Interface**
* **TypeScript Integration**: Ensures type safety and consistent data structures across all views.
* **Responsive Design**: Utilizes **Tailwind CSS** to create a professional, grid-based layout for event display on laptop and desktop screens.
* **REST Communication**: Implements the **Fetch API** for seamless integration between the React UI and the Spring Boot backend.

---

## 💻 Technology Stack

* **Backend**: Java, Spring Boot, MongoDB.
* **Frontend**: React (v18+), TypeScript, Tailwind CSS, React Router.
* **Database**: MongoDB.
* **Testing**: Postman (REST Client tool).

---

## 🛠️ API Endpoints (Sample)

| Service | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Faculty** | `POST` | `/faculty/register` | Register new faculty member |
| **Student** | `POST` | `/student/login` | Student authentication |
| **Event** | `POST` | `/events/add` | Faculty adds event record |
| **Event** | `GET` | `/events/month/{month}`| Filter events by month |
| **Event** | `GET` | `/events/student/{rollNo}`| Retrieve student-specific records |
