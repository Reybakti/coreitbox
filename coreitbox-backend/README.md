# README.md

# CoreITBox Backend

CoreITBox adalah aplikasi IT Ticketing Management System berbasis NestJS, PostgreSQL, Prisma, Socket.IO, dan MinIO.

## Features

* JWT Authentication
* Role Based Access Control
* User Management
* Ticket Management
* Assignment Request Workflow
* Ticket Documentation
* Ticket Materials
* Ticket Comments
* Ticket Timeline
* Attachments (MinIO)
* Notifications
* Audit Logs
* Dashboard
* Reports
* Settings
* Swagger Documentation
* Websocket Realtime
* Docker Deployment

---

# Technology Stack

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT
* Socket.IO
* MinIO
* Swagger
* Docker
* Nginx

---

# Project Structure

src/

├── auth/

├── users/

├── tickets/

├── ticket-categories/

├── ticket-comments/

├── ticket-documentations/

├── ticket-materials/

├── ticket-timeline/

├── notifications/

├── audit-logs/

├── reports/

├── dashboard/

├── settings/

├── attachments/

├── websocket/

├── prisma/

└── common/

---

# Environment Variables

Create .env

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/coreitbox

JWT_SECRET=change-me

MINIO_ENDPOINT=minio

MINIO_PORT=9000

MINIO_ACCESS_KEY=minioadmin

MINIO_SECRET_KEY=minioadmin

MINIO_BUCKET=coreitbox

---

# Installation

npm install

npx prisma generate

npx prisma migrate dev

npm run start:dev

---

# Production Build

npm run build

npm run start:prod

---

# Docker

Build

docker compose build --no-cache

Run

docker compose up -d

Check

docker ps

Logs

docker logs -f coreitbox-backend

---

# Swagger

http://localhost:3100/api

---

# Health Check

GET /health

Response

{
"status": "ok"
}

---

# Roles

SYSADMIN

ADMIN

TEKNISI

---

# Ticket Workflow

OPEN

↓

ASSIGNMENT_REQUEST

↓

ASSIGNED

↓

IN_PROGRESS

↓

RESOLVED

↓

CLOSED

---

# Production Architecture

Internet

↓

Cloudflare

↓

Nginx + SSL

↓

CoreITBox Backend

↓

PostgreSQL

↓

MinIO

---

# Backup

Database backup daily using cron.

Attachment backup from MinIO volume.

---

# License

Internal Company Project.
