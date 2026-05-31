# CoreITBox

CoreITBox adalah aplikasi IT Helpdesk & Ticket Management berbasis web yang dirancang untuk kebutuhan internal perusahaan.

## Features

* Authentication & Authorization
* Dashboard Summary
* Ticket Management
* Ticket Categories
* Assignment Request & Approval
* Ticket Documentation
* Ticket Materials
* Attachments (MinIO)
* Activity Timeline
* Audit Logs
* Notifications (Realtime Socket.IO)
* Reports
* User Management
* System Settings
* PWA Ready

## Technology Stack

### Frontend

* Next.js
* TypeScript
* TailwindCSS
* TanStack Query
* Zustand
* Socket.IO Client

### Backend

* NestJS
* Prisma ORM
* PostgreSQL
* Socket.IO
* JWT Authentication

### Infrastructure

* Docker
* Docker Compose
* PostgreSQL
* MinIO

---

## Quick Start

Clone repository:

```bash
git clone https://github.com/Reybakti/coreitbox.git
cd coreitbox
```

Copy environment file:

```bash
cp .env.example .env
```

Build and start:

```bash
docker compose up -d --build
```

Check services:

```bash
docker compose ps
```

---

## Default Account

Username:

```text
sysadmin
```

Password:

```text
Admin@123
```

Change password immediately after first login.

---

## Production Deployment

Recommended deployment:

* Ubuntu Server 24.04 LTS
* Docker Engine
* Docker Compose
* Nginx Reverse Proxy
* Let's Encrypt SSL

---

## Project Structure

```text
coreitbox/
├── coreitbox-backend/
├── coreitbox-web/
├── docker-compose.yml
├── install.sh
├── update.sh
├── .env.example
└── README.md
```

---

## Status

Production Ready v1.0
