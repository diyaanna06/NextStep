# NextStep

> A full-stack, role-based career acceleration platform that connects students with mentors, career opportunities, and organizations in one place.

## Overview

Students often navigate fragmented career resources: opportunities are found on one platform, mentorship on another, applications elsewhere, and resumes are shared manually. Mentors and organizations also lack a streamlined way to discover, evaluate, and engage with students.

**NextStep** brings these workflows together into one platform.

It supports three user roles:

* **Students** can build professional profiles, discover opportunities, apply for roles, connect with mentors, request sessions, and securely manage resumes.
* **Mentors** can create mentor profiles, receive and manage session requests, and review authorized student information.
* **Organizations** can create organization profiles, publish opportunities, manage listings, review applicants, and access authorized applicant resumes.

The platform is designed with role-based access control, ownership validation, secure document storage, and a layered backend architecture.



## Live Links

| Service     | Link                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| Frontend    | [NextStep Live Demo](https://next-step-beige-zeta.vercel.app/)                   |
| Backend API | [FastAPI Swagger Documentation](https://nextstep-backend-0rit.onrender.com/docs) |

> The backend is deployed on Render's free tier, so the first request may take a short time while the service wakes up.

## Key Features

### Student Experience

* Register and authenticate securely
* Create and update a detailed student profile
* Browse available career opportunities
* Apply for opportunities and track application status
* Discover mentors and view mentor profiles
* Send and manage mentorship session requests
* Upload, view, replace, and delete resumes
* Access a role-specific dashboard and navigation

### Mentor Experience

* Create and manage mentor profiles
* View incoming mentorship session requests
* Accept, reject, and manage session requests
* View authorized student details and resumes
* Access a dedicated mentor dashboard

### Organization Experience

* Create and manage organization profiles
* Create, update, and manage opportunities
* View applications received for organization opportunities
* Review applicant profiles and authorized resumes
* Access a dedicated organization dashboard


## Resume Management

NextStep includes secure resume management using AWS S3.

* Resumes are stored as private S3 objects
* Resume metadata is stored in PostgreSQL
* Students can upload, view, replace, and delete resumes
* Mentors and organizations can access student resumes only when permitted by role-based and ownership-based authorization checks
* Resume access is provided using time-limited presigned URLs instead of exposing public files

## Tech Stack

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* React Hook Form
* Zod

### Backend

* FastAPI
* Python
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* JWT Authentication

### Cloud, DevOps, and Deployment

* AWS S3 for private resume storage
* Vercel for frontend deployment
* Render for backend deployment
* Neon PostgreSQL for production database hosting
* Docker and Docker Compose for containerized local development
* GitHub Actions for CI


## System Architecture

```text
┌──────────────────────────────┐
│         Next.js Frontend     │
│  TypeScript + Tailwind CSS   │
│  Zustand + shadcn/ui         │
└───────────────┬──────────────┘
                │ HTTPS / REST API
                ▼
┌──────────────────────────────┐
│        FastAPI Backend       │
│ Authentication + RBAC        │
│ API → Services → Repositories│
└───────┬─────────────┬────────┘
        │             │
        ▼             ▼
┌──────────────┐  ┌─────────────────┐
│ PostgreSQL   │  │     AWS S3      │
│ Users, roles │  │ Private resumes │
│ profiles,    │  │ Presigned URLs  │
│ applications │  └─────────────────┘
│ sessions     │
└──────────────┘
```

### Backend Request Flow

```text
Frontend Page
    ↓
API Client
    ↓
FastAPI Route
    ↓
Service Layer
    ↓
Repository Layer
    ↓
PostgreSQL / AWS S3
```

The backend follows a layered architecture to separate API routing, business logic, database access, validation, and infrastructure concerns.


## Role-Based Access Control

NextStep supports three primary roles:

| Role         | Core Permissions                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------- |
| Student      | Manage profile and resume, browse opportunities and mentors, submit applications, request sessions |
| Mentor       | Manage mentor profile and review or respond to session requests                                    |
| Organization | Manage organization profile and opportunities, review applicants and authorized resumes            |

Authorization is enforced at the backend level using JWT-based authentication, role checks, and ownership validation for protected resources.



## Project Structure

```text
NextStep/
├── .github/
│   └── workflows/              # GitHub Actions CI workflow
├── backend/
│   ├── app/
│   │   ├── api/                # API routes
│   │   ├── core/               # Configuration and security
│   │   ├── db/                 # Database configuration
│   │   ├── models/             # SQLAlchemy models
│   │   ├── repositories/       # Database access layer
│   │   ├── schemas/            # Pydantic schemas
│   │   ├── services/           # Business logic layer
│   │   └── main.py             # FastAPI application entry point
│   ├── alembic/                # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/                    # Next.js routes and pages
│   ├── components/             # Reusable UI components
│   ├── lib/                    # API client and utilities
│   ├── store/                  # Zustand state management
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── demo-credentials.md
└── README.md
```


## API Documentation

The backend exposes interactive API documentation through FastAPI Swagger UI.

* **Production Swagger UI:** https://nextstep-backend-0rit.onrender.com/docs
* **Local Swagger UI:** `http://localhost:8000/docs`

Major API modules include:

* Authentication
* Student Profiles
* Mentor Profiles
* Organization Profiles
* Opportunities
* Applications
* Mentorship Sessions
* Resume Upload and Management


## Local Setup

### Prerequisites

Install the following before running the project locally:

* Node.js 18+
* Python 3.10+
* PostgreSQL
* Docker Desktop *(optional, for Docker setup)*
* AWS S3 bucket and credentials *(required for resume upload functionality)*

### 1. Clone the Repository

```bash
git clone https://github.com/diyaanna06/NextStep.git
cd NextStep
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `backend/.env` file using the environment-variable template below.

Run database migrations:

```bash
alembic upgrade head
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
http://localhost:8000/docs
```

### 3. Frontend Setup

Open a new terminal from the project root:

```bash
cd frontend
npm install
```

Create a `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```


## Environment Variables

### Backend: `backend/.env`

Create a `backend/.env` file with the following variables:

```env
DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```


### Frontend Development: `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```


## Running with Docker Compose

The project can also be run using Docker Compose.

From the root directory:

```bash
docker compose up --build
```

To stop containers:

```bash
docker compose down
```

Docker Compose containerizes the frontend and backend services for a consistent local development environment.


## Deployment

| Component      | Platform        |
| -------------- | --------------- |
| Frontend       | Vercel          |
| Backend        | Render          |
| Database       | Neon PostgreSQL |
| Resume Storage | AWS S3          |
| CI             | GitHub Actions  |

### Deployment Flow

```text
GitHub Repository
      │
      ├── GitHub Actions CI checks
      │
      ├── Vercel deploys frontend
      │
      └── Render deploys FastAPI backend
                │
                ├── Neon PostgreSQL
                └── AWS S3
```


## Demo Flow

A recommended walkthrough of the application:

1. Log in as a **Student**
2. Complete the student profile
3. Browse opportunities and submit an application
4. Browse mentors and send a session request
5. Upload a resume and verify secure resume access
6. Log in as a **Mentor** and respond to the session request
7. Log in as an **Organization**
8. Create or manage an opportunity
9. Review applicants and authorized resume access

Demo account details are available in [demo-credentials.md](./demo-credentials.md).

