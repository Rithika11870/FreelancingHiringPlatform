# Problem Statement

## 1. Title

Freelancing Hiring Platform

## 2. Domain

Freelancing and Online Recruitment

## 3. Who is the user? (2-3 user types, with roles)

The application mainly supports the following user types:

1. **Client / Recruiter**
   - Creates and manages projects or job requirements.
   - Searches for suitable freelancers.
   - Reviews freelancer applications and selects freelancers.

2. **Freelancer**
   - Creates and manages a profile.
   - Views available projects or job opportunities.
   - Applies for suitable projects.
   - Manages their applications and work-related information.

3. **Admin**
   - Manages users and platform data.
   - Monitors projects, applications, and platform activities.
   - Maintains the overall system.

## 4. What problem are we solving?

Finding suitable freelancers for a project can be difficult when clients have to depend on multiple platforms or informal communication channels. Similarly, freelancers may find it difficult to discover relevant projects and communicate their skills and availability effectively.

For example, a client who needs a developer for a specific project may receive applications through different channels without a structured way to compare candidates. A freelancer may also miss suitable opportunities because project information is scattered across different platforms.

This project aims to provide a centralized platform where clients can post requirements and find freelancers, while freelancers can discover suitable projects and apply for them in an organized manner.

## 5. Proposed Solution

The proposed system is a web-based Freelancing Hiring Platform that connects clients with freelancers.

The application will provide the following core features:

- User registration and login.
- Role-based access for different users.
- Freelancer profile management.
- Project / job posting by clients.
- Browsing and viewing available projects.
- Freelancer application for projects.
- Clients can view and manage applications.
- Admin management of users and platform data.
- Secure communication between the frontend and backend through APIs.
- Database storage for users, projects, applications, and related information.

The system will use a frontend application connected to a backend REST API, with a relational database for persistent data storage.

## 6. Core Entities / Database Tables

The core entities of the system are:

1. **User**
2. **Freelancer Profile**
3. **Client Profile**
4. **Project / Job**
5. **Application**
6. **Skill**
7. **Project Skill**

These entities will be related according to the requirements of the application and will support the major workflows of the freelancing platform.

## 7. User Roles & Permissions

### Freelancer

- Register and login.
- Create and update freelancer profile.
- View available projects.
- View project details.
- Apply for projects.
- View their submitted applications.

### Client / Recruiter

- Register and login.
- Create and manage project postings.
- View project details.
- View applications received for their projects.
- Review freelancer information.
- Manage project-related information.

### Admin

- Login to the administration area.
- Manage users.
- Monitor projects and applications.
- Maintain platform data and system activities.

## 8. Success Criteria

The project will be considered successful when:

- Users can register and login successfully.
- Appropriate user roles and permissions are enforced.
- Clients can create and manage project postings.
- Freelancers can browse projects and submit applications.
- Clients can view applications submitted for their projects.
- Data is successfully stored and retrieved from the database.
- The major user flows work end-to-end from frontend to backend and database.
- The application can be run locally by following the instructions provided in the README.

## 9. Out of Scope

The following features are outside the scope of the initial version:

- Real-money payment processing.
- Complex financial transactions and invoicing.
- Built-in video calling.
- Advanced AI-based freelancer matching.
- Full-scale real-time chat and messaging.
- Mobile applications for Android and iOS.
- Third-party payroll and taxation management.

These features may be considered as future enhancements.

## 10. Chosen Track

Java (Spring Boot)