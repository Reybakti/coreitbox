# DOCUMENTATION_API_FULL_COREITBOX.md

# CoreITBox API Documentation

Version: 1.0.0

Base URL

http://localhost:3100

Production

https://api.coreitbox.com

---

# Authentication

## Login

POST /auth/login

Request

{
"username": "sysadmin",
"password": "Admin@123"
}

Response

{
"user": {
"id": "uuid",
"username": "sysadmin",
"fullName": "System Administrator",
"role": "SYSADMIN"
},
"accessToken": "jwt-token"
}

---

# Users

## Get Users

GET /users

## Get User

GET /users/:id

## Create User

POST /users

## Update User

PATCH /users/:id

## Activate User

PATCH /users/:id/activate

## Deactivate User

PATCH /users/:id/deactivate

## Reset Password

PATCH /users/:id/reset-password

## Delete User

DELETE /users/:id

---

# Dashboard

## Summary

GET /dashboard/summary

Response

{
"totalTickets": 100,
"openTickets": 20,
"assignedTickets": 15,
"inProgressTickets": 10,
"resolvedTickets": 25,
"closedTickets": 30
}

---

# Ticket Categories

GET /ticket-categories

GET /ticket-categories/:id

POST /ticket-categories

PATCH /ticket-categories/:id

DELETE /ticket-categories/:id

---

# Tickets

## Create Ticket

POST /tickets

## Get Tickets

GET /tickets

---

# Assignment Request

POST /tickets/:id/request-assignment

POST /tickets/:ticketId/approve-assignment/:requestId

POST /tickets/:ticketId/reject-assignment/:requestId

---

# Ticket Progress

POST /tickets/:id/start

POST /tickets/:id/resolve

POST /tickets/:id/close

---

# Comments

POST /tickets/:id/comments

GET /tickets/:id/comments

DELETE /tickets/comments/:id

---

# Documentation

POST /tickets/:id/documentations

GET /tickets/:id/documentations

DELETE /tickets/documentations/:id

---

# Materials

POST /tickets/:id/materials

GET /tickets/:id/materials

DELETE /tickets/materials/:id

---

# Timeline

GET /tickets/:id/timeline

---

# Attachments

POST /tickets/:id/attachments

GET /tickets/:id/attachments

GET /attachments/:id/url

DELETE /attachments/:id

---

# Notifications

GET /notifications

GET /notifications/unread

PATCH /notifications/:id/read

PATCH /notifications/read-all

---

# Audit Logs

GET /audit-logs

GET /audit-logs/module/:module

---

# Reports

GET /reports/tickets/summary

GET /reports/tickets/priority

GET /reports/tickets/category

GET /reports/technicians

GET /reports/audit-summary

---

# Settings

GET /settings

GET /settings/company

GET /settings/ui

GET /settings/email

GET /settings/system

GET /settings/:key

POST /settings

PATCH /settings/:id

DELETE /settings/:id

---

# Health Check

GET /health

Response

{
"status": "ok"
}

---

# Websocket Events

join-user

notification

ticket-update

---

# Status Ticket

OPEN

ASSIGNMENT_REQUEST

ASSIGNED

IN_PROGRESS

RESOLVED

CLOSED

---

# User Roles

SYSADMIN

ADMIN

TEKNISI

---

# Priority

LOW

MEDIUM

HIGH

CRITICAL
