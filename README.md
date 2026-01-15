<div align="center">
  
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-%23646EDE.svg?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Redis](https://img.shields.io/badge/Redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-%23344DCA.svg?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/query/latest)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

</div>

# Dormitory Management System

A full‑stack dormitory management platform built with NestJS and Next.js. The system covers student housing management, payments, notifications, and administration in a single, production‑ready solution.

## Overview

The application is designed for managing student dormitories with multiple roles, secure authentication, online and offline payments, room booking, and real‑time notifications. It follows a modular, enterprise‑style architecture and can be deployed locally with Docker or to common cloud providers.

## Core Features

### Architecture

* Multi‑tenant dormitory structure
* Role‑based access control (users, admins, super admins)
* Modular NestJS backend with clear domain separation
* Monorepo setup for backend and frontend

### Payments

* Stripe integration for online payments
* Support for rent, deposits, utilities, and custom charges
* Cash payment confirmation flow
* Payment history and basic analytics

### Dormitories and Rooms

* Dormitory and room management
* Room types, pricing, and availability tracking
* Booking flow with payment integration

### Notifications

* In‑app and email notifications
* Role‑ and dormitory‑based targeting
* Basic user notification preferences

### Security

* JWT authentication with session support
* Optional Google OAuth
* Two‑factor authentication
* Rate limiting and input validation

## Tech Stack

### Backend

* NestJS, TypeScript
* PostgreSQL with Prisma ORM
* Redis for caching and sessions
* Stripe API
* AWS S3 for file storage

### Frontend

* Next.js (App Router)
* React, TypeScript
* Tailwind CSS
* TanStack Query

### DevOps

* Docker and Docker Compose
* Swagger (OpenAPI)
* Jest for backend tests
* ESLint and Prettier

## Getting Started

### Requirements

* Node.js 18+
* Docker and Docker Compose (recommended)
* PostgreSQL and Redis (if not using Docker)

### Setup

```bash
git clone https://github.com/BohdanBiliak/Dormitory_System.git
cd dormitory_system
```

Backend:

```bash
cd server
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev
```

Frontend:

```bash
cd dormitory-frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## API

The backend exposes a REST API documented with Swagger:

```
http://localhost:4000/api
```

Main modules include authentication, users, dormitories, rooms, payments, notifications, and admin analytics.

## Deployment

* Local and production deployment via Docker
* Compatible with AWS, Railway, DigitalOcean, and similar platforms
* Prisma migrations used for schema changes

## Status

This project is intended as a production‑grade portfolio and learning project demonstrating full‑stack architecture, payments, security, and system design.



