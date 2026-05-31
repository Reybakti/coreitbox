# CoreITBox v1.0.0

Release Date: 2026-05-31

## Initial Production Release

CoreITBox adalah platform IT Helpdesk & Ticket Management yang dirancang untuk mendukung operasional tim IT secara terintegrasi, realtime, dan mudah di-deploy menggunakan Docker.

---

## Core Features

### Authentication & Authorization

* JWT Authentication
* Role Based Access Control
* SYSADMIN
* ADMIN
* TEKNISI

### Dashboard

* Total Tickets
* Open Tickets
* Assigned Tickets
* In Progress Tickets
* Closed Tickets
* Total Users
* Total Technicians

### Ticket Management

* Create Ticket
* Update Ticket
* Ticket Status Workflow
* Assignment Request
* Assignment Approval
* Resolution Tracking
* Ticket Closing

### Ticket Categories

* Category Management
* Dynamic Category Assignment

### Ticket Documentation

* Add Documentation
* Documentation History

### Ticket Materials

* Material Usage Tracking
* Material Cost Recording

### Ticket Comments

* Internal Discussion
* Ticket Collaboration

### Ticket Timeline

* Full Activity History
* Audit Tracking

### Attachments

* File Upload
* File Download
* MinIO Storage Integration

### Notifications

* Realtime Notifications
* Socket.IO Integration
* Browser Notifications
* Notification Center

### Audit Logs

* User Activity Tracking
* System Activity Tracking

### Reports

* Ticket Reports
* Operational Summary

### Settings

* Company Settings
* System Settings
* UI Settings

---

## Infrastructure

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand

### Backend

* NestJS
* Prisma ORM
* PostgreSQL
* Socket.IO

### Storage

* MinIO Object Storage

### Deployment

* Docker
* Docker Compose

---

## Database

Implemented entities:

* users
* tickets
* ticket_assignment_requests
* ticket_documentations
* ticket_materials
* ticket_comments
* ticket_activities
* ticket_watchers
* attachments
* notifications
* settings
* audit_logs

---

## Default Seed Data

### System Administrator

Username:

sysadmin

Password:

Admin@123

---

## Deployment

Supported deployment environments:

* Ubuntu Server
* Docker Engine
* Docker Compose
* Nginx Reverse Proxy
* Let's Encrypt SSL

---

## Repository Structure

```text
coreitbox/
├── coreitbox-backend/
├── coreitbox-web/
├── docker-compose.yml
├── install.sh
├── update.sh
├── README.md
├── LICENSE
└── .env.example
```

---

## Status

Production Ready

Version: v1.0.0

Release Type: Initial Production Release

Author: Rey Bakti
