# ⚔️ Duello

> **A real-time, event-driven polling platform for settling community debates.**

Duello is a scalable full-stack voting application that allows users to create dynamic, multi-candidate competitions. It leverages an event-driven architecture to handle high-concurrency voting and delivers live results with sub-second latency.

---

## 🚀 Features

* **Dynamic Polling:** Create competitions with variable numbers of candidates (supporting 2 to 10+ options) to settle any type of debate.
* **Real-Time Updates:** Built with **Socket.io** to broadcast live vote counts and comments to all connected clients instantly without page reloads.
* **High-Performance Architecture:** Offloads resource-intensive tasks (vote processing, email dispatch) to background queues using **Redis** and **BullMQ**, ensuring the main API thread remains non-blocking.
* **Secure & Integrity-Focused:** Implements strict **JWT-based authentication** (via **NextAuth**) and server-side validation to prevent duplicate votes and ensure one unique vote per user.
* **Robust Data Modeling:** Uses a normalized **PostgreSQL** schema with **Prisma ORM** to efficiently handle complex relationships between users, polls, and interaction history.

## 🛠️ Tech Stack

**Frontend**
* **Framework:** Next.js (React)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Auth:** NextAuth.js

**Backend**
* **API:** Node.js & Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Caching & Queues:** Redis & BullMQ
* **WebSockets:** Socket.io
* **Email Services:** Brevo (SMTP)
---

## ⚙️ Architecture Highlights

Duello is designed with a **clean separation of concerns** between the client-side UI and the backend REST API.

1.  **Event-Driven Voting:** When a user votes or comment, the request is instantly acknowledged, while the heavy lifting (database writes, aggregation) is pushed to a **Redis** queue.
2.  **Background Workers:** **BullMQ** workers pick up these jobs to execute:
    * **Database Operations:** Persisting votes and comments to PostgreSQL.
    * **Email Dispatch:** Sending verification links for authentication and "Welcome" emails to new users via **Brevo**.
3.  **Live Synchronization:** Once a vote is processed, the server emits an event via **Socket.io**, updating the charts/UI for every user currently viewing that poll.

---

## 🔌 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js
* PostgreSQL (Local or Cloud provider like NeonDB)
* Redis (Local or via Docker)
* A Brevo (Sendinblue) Account for SMTP keys

### 1. Clone the Repository
```bash
git clone [https://github.com/devansh-rai/duello.git](https://github.com/devansh-rai/duello.git)
cd duello 
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../front
npm install
```

### 3. Environment Setup
Create a .env file in both the server and client directories.

Server .env Example:
```bash
PORT=8000
DATABASE_URL="postgresql://user:password@localhost:5432/duello"
APP_URL=http://localhost:8000
CLIENT_URL=http://localhost:3000

# Redis Configuration
REDIS_HOST="localhost"

# Auth Secrets
JWT_SECRET="your_jwt_secret"

# Email Service (Brevo)
SMTP_HOST="smtp-relay.brevo.com"
SMTP_USER="your_brevo_email@example.com"
SMTP_PASSWORD="your_brevo_smtp_key"
```

Client .env Example:
```bash
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Migration
Run Prisma migrations to set up your PostgreSQL schema.
```bash
cd server
npx prisma migrate dev --name init
```

### 5. Run the Application
You will need to run the Backend, the Worker (for queues), and the Frontend.

```bash
# Start Backend & Worker:
cd server
npm run dev

# Start Frontend:
cd front
npm run dev
```

Visit http://localhost:3000 to start creating polls!