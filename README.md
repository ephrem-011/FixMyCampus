# FixMyCampus 🏫🔧

> **Campus Issue Reporting & Maintenance Tracking System**

FixMyCampus is a full-stack web application that helps university students and staff report campus maintenance issues and enables administrators and technicians to track, assign, and resolve those issues efficiently.

The system replaces informal reporting through phone calls, chats, or in-person communication with a centralized and transparent ticket management platform.

---

## 📌 Problem Statement

Campus maintenance issues such as:

- 💻 Broken laboratory computers
- 📶 Wi-Fi and internet problems
- 📽️ Projector failures
- 💡 Electrical outlet problems
- 🚰 Plumbing and water issues
- 🪑 Damaged furniture

are often reported through informal channels. This can result in:

- Lost or forgotten reports
- Delayed maintenance
- Difficulty tracking issue progress
- No clear responsibility for resolving issues
- Limited visibility into recurring campus problems

### Our Solution

**FixMyCampus** provides a centralized platform where users can report issues, track their progress, and allow administrators to assign issues to technicians and monitor their resolution.

---

## 🎯 Key Features

### 👤 Reporter

- Secure login
- Submit campus maintenance tickets
- Select issue category
- Select building and room
- Describe the issue
- Set issue urgency
- View the campus issue feed
- Filter issues by building and status
- View personal submitted tickets
- View ticket details and status history

### 🛠️ Technician

- Secure role-based access
- View assigned tickets
- Update ticket progress
- Move tickets through the permitted workflow
- Mark issues as resolved

### 👨‍💼 Administrator

- Secure administrator login
- View open campus issues
- Filter tickets
- Assign tickets to technicians
- Update ticket status
- Monitor ticket history
- View technician information
- Track maintenance progress

---

## 🔄 Ticket Lifecycle

FixMyCampus enforces a strict server-side ticket lifecycle:

```text
New
 ↓
Assigned
 ↓
In Progress
 ↓
Resolved
```

### Transition Rules

| Current Status | Allowed Action | Next Status |
|---|---|---|
| New | Assign technician | Assigned |
| Assigned | Start work | In Progress |
| In Progress | Resolve issue | Resolved |
| Resolved | No further transition | — |

The backend validates every transition.

Illegal transitions are rejected by the API with:

```http
400 Bad Request
```

This prevents users from skipping steps or moving tickets backward in the workflow.

---

## 💡 Innovation: Similar Issue Detection

One of FixMyCampus's key ideas is **possible duplicate issue detection**.

Instead of preventing users from reporting an issue that may already exist, the system can identify similar open reports and warn the user.

### Why?

Multiple users reporting the same problem can actually provide useful information about:

- How many people are affected
- How widespread the problem is
- The urgency of the issue

Therefore, FixMyCampus uses a **warning rather than a hard block**.

Example:

> ⚠️ **Possible Similar Issue**  
> A similar issue has already been reported in this location.  
> **Similarity: 87%**
>
> [View Existing Issue] [Submit Anyway]

### Similarity Factors

The planned detection approach considers:

| Factor | Weight |
|---|---:|
| Same category | 30% |
| Same building | 25% |
| Same room | 25% |
| Similar description | 20% |

This produces an overall similarity score that can be used to classify an issue as:

- **80–100%** → Very likely duplicate
- **60–79%** → Possible duplicate
- **Below 60%** → Probably different

Users can still submit the report even when a possible duplicate is detected.

---

## 🏗️ System Architecture

```text
┌───────────────────────────────┐
│       Angular Frontend        │
│                               │
│  Login / Register             │
│  Campus Feed                  │
│  Report Issue                 │
│  My Tickets                   │
│  Ticket Details               │
│  Admin Dashboard              │
└───────────────┬───────────────┘
                │
                │ HTTP / REST API
                │ JWT Authentication
                ▼
┌───────────────────────────────┐
│     ASP.NET Core Web API      │
│                               │
│  Controllers                  │
│  Services                     │
│  DTOs                         │
│  Authentication / Authorization│
│  Business Rules               │
│  Status Validation            │
└───────────────┬───────────────┘
                │
                │ Entity Framework Core
                ▼
┌───────────────────────────────┐
│        PostgreSQL             │
│                               │
│  Users                        │
│  Buildings                    │
│  Tickets                      │
│  Ticket Histories             │
└───────────────────────────────┘
```

---

## 🧰 Technology Stack

### Frontend

- **Angular**
- **TypeScript**
- Angular Reactive Forms
- Angular Router
- Angular HttpClient
- Route-based feature organization
- JWT authentication interceptor
- Responsive glassmorphism UI

### Backend

- **ASP.NET Core Web API**
- **C#**
- **.NET**
- Entity Framework Core
- RESTful API
- JWT authentication
- Role-based authorization
- Code-first database migrations

### Database

- **PostgreSQL**

### Development Tools

- Git
- GitHub
- Visual Studio Code
- Git Bash

---

## 📁 Project Structure

```text
FixMyCampus/
│
├── FixMyCampus.Api/
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── TicketsController.cs
│   │   ├── BuildingsController.cs
│   │   └── AdminController.cs
│   │
│   ├── Data/
│   │   └── AppDbContext.cs
│   │
│   ├── DTOs/
│   │   ├── Auth/
│   │   ├── Tickets/
│   │   └── Admin/
│   │
│   ├── Enums/
│   │   ├── UserRole.cs
│   │   ├── TicketStatus.cs
│   │   └── TicketUrgency.cs
│   │
│   ├── Models/
│   │   ├── User.cs
│   │   ├── Building.cs
│   │   ├── Ticket.cs
│   │   └── TicketStatusHistory.cs
│   │
│   ├── Services/
│   │   ├── AuthService.cs
│   │   ├── TicketService.cs
│   │   ├── DuplicateDetectionService.cs
│   │   └── AdminService.cs
│   │
│   ├── Migrations/
│   ├── Middleware/
│   ├── Program.cs
│   └── appsettings.json
│
└── FixMyCampus.Client/
    └── src/
        └── app/
            ├── Core/
            ├── features/
            │   ├── auth/
            │   ├── tickets/
            │   ├── admin/
            │   ├── technician/
            │   └── buildings/
            │
            └── shared/
```

---

## 🔐 Authentication & Authorization

FixMyCampus uses **JWT-based authentication**.

Users receive a JWT after successful login. The Angular application stores the authentication session and automatically attaches the token to protected API requests.

### Supported Roles

```text
Reporter
Admin
Technician
```

Backend authorization ensures that users can only perform actions allowed for their role.

For example:

```text
Reporter
   ├── Create Ticket
   ├── View Campus Feed
   └── View My Tickets

Admin
   ├── View Tickets
   ├── Assign Technician
   └── Manage Ticket Status

Technician
   ├── View Assigned Tickets
   └── Update Ticket Status
```

---

## 🌐 API Endpoints

### Authentication

```http
POST /api/Auth/login
```

Authenticates a user and returns a JWT token.

---

### Tickets

#### Get Tickets

```http
GET /api/Tickets
```

Supports filtering by building and status.

#### Get Ticket

```http
GET /api/Tickets/{id}
```

#### Get My Tickets

```http
GET /api/Tickets/my
```

#### Create Ticket

```http
POST /api/Tickets
```

#### Assign Ticket

```http
PUT /api/Tickets/{id}/assign
```

#### Update Ticket Status

```http
PUT /api/Tickets/{id}/status
```

#### Get Buildings

```http
GET /api/Tickets/buildings
```

#### Get Technicians

```http
GET /api/Tickets/technicians
```

---

## 📡 HTTP Status Codes

The API follows standard HTTP semantics.

| Status | Meaning |
|---|---|
| `200 OK` | Successful request |
| `201 Created` | Resource successfully created |
| `400 Bad Request` | Invalid request or illegal status transition |
| `401 Unauthorized` | Authentication required or invalid credentials |
| `403 Forbidden` | User does not have permission |
| `404 Not Found` | Requested resource does not exist |
| `500 Internal Server Error` | Unexpected server error |

---

## 🗄️ Database

The application uses **Entity Framework Core Code First** with PostgreSQL.

Main entities include:

```text
Users
   │
   ├── Reporter
   ├── Technician
   └── Admin
       
Buildings
   │
   └── Tickets
          │
          └── TicketStatusHistory
```

Ticket history records status changes with timestamps and the user who performed the change.

Example:

```text
New
 │
 └── Assigned
       Changed by: Admin
       Timestamp: 10:32 AM
       
       ↓

In Progress
       Changed by: Technician
       Timestamp: 11:05 AM

       ↓

Resolved
       Changed by: Technician
       Timestamp: 12:40 PM
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- .NET SDK
- Node.js
- Angular CLI
- PostgreSQL
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/ephrem-011/FixMyCampus.git
cd FixMyCampus
```

---

### 2. Start PostgreSQL

Make sure PostgreSQL is running locally.

The development database is configured through the backend connection string.

---

### 3. Run the Backend

```bash
cd FixMyCampus.Api
dotnet restore
dotnet ef database update
dotnet run
```

The API runs at:

```text
http://localhost:5143
```

---

### 4. Run the Angular Frontend

Open another terminal:

```bash
cd FixMyCampus.Client
npm install
ng serve
```

The frontend runs at:

```text
http://localhost:4200
```

---

## 👥 Demo Accounts

The development database contains seeded accounts for testing.

### Reporter

```text
Email: user@hackathon.local
Password: User123!
```

### Administrator

```text
Email: admin@hackathon.local
Password: Admin123!
```

### Technician

```text
Email: abebe@hackathon.local
Password: Tech123!
```

Additional seeded accounts may be available in the development database.

> **Note:** These credentials are for local development/demo purposes only and should not be used in production.

---

## 🎬 Suggested Demo Flow

A complete demonstration can follow this workflow:

### 1. Reporter Login

```text
Reporter
   ↓
Login
   ↓
Campus Feed
```

### 2. Submit Issue

```text
Report Issue
   ↓
Select Category
   ↓
Select Building
   ↓
Enter Room
   ↓
Describe Problem
   ↓
Submit
```

### 3. View Ticket

```text
Campus Feed
   ↓
Open Ticket
   ↓
Ticket Details
   ↓
Status History
```

### 4. Admin Workflow

```text
Admin Login
   ↓
Open Ticket
   ↓
Assign Technician
   ↓
New → Assigned
```

### 5. Technician Workflow

```text
Technician
   ↓
Assigned Ticket
   ↓
Start Work
   ↓
Assigned → In Progress
   ↓
Resolve
   ↓
In Progress → Resolved
```

### 6. Duplicate Issue Demonstration

```text
Student A
   ↓
Reports Wi-Fi problem
Engineering Building
Room 204
   ↓
Ticket created

Student B
   ↓
Reports Wi-Fi problem
Engineering Building
Room 204
   ↓
Possible Similar Issue: 87%
   ↓
View Existing Issue
       OR
Submit Anyway
```

---

## 🛡️ Design Principles

The project follows several important software engineering principles:

### Thin Controllers

Controllers handle HTTP requests and responses while business rules are implemented in services.

### DTO-Based API

The API uses DTOs instead of exposing raw Entity Framework entities directly.

### Server-Side Validation

Important business rules, especially ticket status transitions, are enforced by the backend rather than relying only on the frontend.

### Role-Based Authorization

Users can only perform operations appropriate for their assigned role.

### RESTful API Design

The application uses appropriate HTTP methods and status codes for its operations.

### Centralized Ticket History

Every status transition is recorded with:

- Previous status
- New status
- User who changed it
- Timestamp

---

## 📱 Frontend UI


Major screens include:

- Login
- Registration
- Campus Feed
- Report Issue
- My Tickets
- Ticket Details
- Admin Dashboard
- Technician Workflow

The interface is responsive and designed for both desktop and smaller screens.

---

## 🔮 Future Improvements

Potential future enhancements include:

- 📊 Admin analytics and dashboards
- 🏢 Open-ticket counts by building
- 🔔 Real-time notifications
- 📱 Mobile application
- 📸 Image attachments for reported issues
- 🗺️ Campus map integration
- 🔎 More advanced duplicate detection
- ⭐ Reporter confirmation after an issue is resolved
- 📈 Maintenance performance analytics
- 📧 Email notifications
- 🏷️ Improved ticket categorization

---

## 👨‍💻 Team

**FixMyCampus** was developed as a collaborative full-stack hackathon project.

### Team Roles

- **Frontend Development** — Angular / TypeScript
- **Backend Development** — ASP.NET Core / C#
- **Database Development** — PostgreSQL / Entity Framework Core
- **Integration & Testing** — Full-stack collaboration



