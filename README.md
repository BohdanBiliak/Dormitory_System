# � Dormitory Management System

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

<div align="center">
  <h3>🎯 A comprehensive, enterprise-grade dormitory management platform built with modern full-stack technologies</h3>
  <p>Complete solution for student housing management featuring advanced payment processing, real-time notifications, and multi-role administration</p>
</div>

---

## ✨ Key Features

### 🏢 **Multi-Tenant Architecture**
- 🏠 **Independent Dormitory Management** - Each dormitory operates with its own pricing, rooms, and administration
- 👥 **Advanced Role-Based Access Control** - Regular, Admin, SuperAdmin, SignedInUser, and Resident roles with granular permissions
- 📊 **Comprehensive Audit System** - Complete activity tracking with Sentry integration for compliance and monitoring
- 🔄 **Real-time Communication** - WebSocket integration for instant updates and notifications

### 💳 **Enterprise Payment Processing**
- 💎 **Stripe Integration** - Secure, PCI-compliant payment processing with tokenization
- 🔄 **Flexible Payment Types** - Monthly rent, daily rent, security deposits, utility payments, and custom charges
- 💰 **Cash Payment Management** - Manager confirmation workflow for offline payments with receipt tracking
- ⏰ **Automated Recurring Payments** - Intelligent billing system with customizable schedules
- 📈 **Advanced Payment Analytics** - Comprehensive reporting and revenue tracking
- 🌍 **Multi-currency Ready** - Prepared for international expansion (currently PLN)

### 🏠 **Smart Room & Booking Management**
- 📋 **Dynamic Room Inventory** - Complete room management with photos, amenities, and flexible configurations
- 💰 **Intelligent Pricing System** - Per-dormitory pricing with seasonal adjustments and discounts
- 🔄 **Seamless Booking Workflow** - Integrated payment processing and automated confirmation
- 📊 **Real-time Occupancy Tracking** - Live availability updates and student assignment management
- 🏷️ **Room Type Management** - Configurable room types with custom amenities and pricing

### 🔔 **Advanced Notification Engine**
- 📱 **Multi-channel Delivery** - In-app, email, and WebSocket notifications
- ⚡ **Priority-based System** - Low, Normal, High, and Urgent priority levels
- 📧 **Rich Email Templates** - React-based email templates with @react-email/components
- 🎯 **Smart Targeting** - Role-based and dormitory-specific notifications
- ⚙️ **User Preference Management** - Granular notification control per user

### 🔐 **Enterprise Security Framework**
- 🔑 **JWT + Session-based Authentication** - Dual security layer with Redis session management
- 🔐 **Multi-factor Authentication** - Two-factor authentication with email verification
- 🌐 **Google OAuth Integration** - Social login with secure credential management
- 🛡️ **Advanced Rate Limiting** - API protection with Redis-backed throttling
- ✅ **Comprehensive Input Validation** - Class-validator and Zod schema validation
- 🔒 **Security Headers** - Helmet.js integration with CSP and CSRF protection

### 📊 **Comprehensive Administrative Suite**
- 📈 **Real-time Dashboard** - Payment analytics, occupancy metrics, and revenue tracking
- 👤 **Advanced User Management** - Complete CRUD operations with bulk actions
- 📢 **Smart Announcement System** - Targeted communications with scheduling and expiration
- 🔍 **Detailed Audit Trails** - Complete activity logging with search and filtering
- 📋 **Confirmation Management** - Identity verification, accommodation changes, and room transitions
- 🏗️ **System Health Monitoring** - Integrated error tracking and performance monitoring

## 🛠️ Technology Stack

### 🚀 **Backend Architecture**
- **🏗️ Core Framework**: NestJS 11+ with TypeScript 5.7+ - Enterprise-grade Node.js framework
- **🗄️ Database**: PostgreSQL 15.2 with Prisma ORM 6.11+ - Advanced relational database with type-safe ORM
- **🔐 Authentication**: JWT + Google OAuth 2.0 + Redis Sessions - Multi-layer security architecture
- **💳 Payment Processing**: Stripe 19+ API with webhook support - PCI-compliant payment infrastructure
- **☁️ Cloud Storage**: AWS S3 integration with Sharp image processing
- **📧 Email Service**: @nestjs-modules/mailer with React Email components
- **⚡ Caching & Sessions**: Redis 7.0 with connect-redis session store
- **🔍 Monitoring**: Sentry integration for error tracking and performance monitoring
- **🌐 Real-time Communication**: Socket.IO for WebSocket connections

### 🎨 **Frontend Stack**
- **⚛️ Framework**: Next.js 15.4+ with React 19+ - Full-stack React framework with App Router
- **🎨 UI/UX**: Tailwind CSS 4+ with Headless UI components - Modern, responsive design system
- **🔄 State Management**: TanStack Query (React Query) 5.87+ - Powerful data fetching and caching
- **📱 Components**: Lucide React icons + Custom UI component library
- **🌍 Internationalization**: Built-in i18n support with locale-based routing
- **✅ Form Management**: React Hook Form with Zod validation
- **🎯 User Experience**: React Tour for onboarding + Sonner for notifications

### 🔧 **Development & Operations**
- **📚 API Documentation**: Swagger/OpenAPI 3.0 with @nestjs/swagger
- **🧪 Testing Framework**: Jest 29+ with Supertest for E2E testing + Cypress for frontend testing
- **✨ Code Quality**: ESLint 9+ with TypeScript ESLint + Prettier with import sorting
- **🐳 Containerization**: Docker with multi-service Docker Compose setup
- **🔄 Database Management**: Prisma Migrate with shadow database validation
- **📦 Package Management**: NPM workspaces with monorepo structure
- **🚦 Git Workflow**: Husky pre-commit hooks + Commitizen + Semantic Release

### ⚡ **Performance & Security**
- **🛡️ Security**: Helmet.js, CSRF protection, Rate limiting, Input validation
- **🚀 Performance**: Compression middleware, Redis caching, Connection pooling
- **📊 Monitoring**: Sentry performance monitoring, Custom metrics tracking
- **🔐 Data Protection**: Argon2 password hashing, Secure session management

## 📋 Prerequisites

### 🔧 **System Requirements**
- **Node.js** 18+ and npm 9+
- **PostgreSQL** 14+ (or Docker)
- **Redis** 7.0+ (for sessions and caching)
- **Docker & Docker Compose** (recommended for development)

### ☁️ **External Services**
- **Stripe Account** - For secure payment processing
- **AWS S3 Bucket** - For file storage and image uploads
- **SMTP Server** - For email notifications (Gmail, SendGrid, etc.)
- **Google OAuth App** - For social authentication (optional)
- **Sentry Account** - For error tracking and monitoring (optional)

## 🚀 Quick Start

### 1. **Clone Repository**
```bash
git clone https://github.com/BohdanBiliak/Dormitory_System.git
cd dormitory_system
```

### 2. **Backend Setup**
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 3. **Environment Configuration**
Create `.env` file in the server directory:
```env
# Database Configuration
POSTGRES_URI="postgresql://username:password@localhost:5432/dormitory_db"
POSTGRES_USER="dormitory_user"
POSTGRES_PASSWORD="secure_password_123"
POSTGRES_DB="dormitory_system"

# Authentication & Security
JWT_SECRET="your-super-secure-jwt-secret-min-32-chars"
JWT_EXPIRES_IN="7d"
SESSION_SECRET="your-secure-session-secret-min-32-chars"
BCRYPT_ROUNDS=12

# Redis Configuration
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD="secure_redis_password"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Stripe Payment Processing
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-endpoint-secret"

# AWS S3 File Storage
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_REGION="eu-central-1"
AWS_S3_BUCKET="your-dormitory-s3-bucket"

# Email Configuration
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-specific-password"
MAIL_FROM="noreply@dormitory-system.com"

# Security & Monitoring
RECAPTCHA_SECRET_KEY="your-recaptcha-v2-secret-key"
SENTRY_DSN="your-sentry-dsn-url" # Optional

# Application Settings
NODE_ENV="development"
PORT=4000
```

### 4. **Database Setup**
```bash
# Start services with Docker Compose (Recommended)
docker-compose up -d

# OR manually setup PostgreSQL and Redis
# Then apply database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (Optional)
npx prisma studio
```

### 5. **Frontend Setup**
```bash
# Navigate to frontend directory
cd ../dormitory-frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

Configure frontend environment in `.env.local`:
```env
# Backend API
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
```

### 6. **Start Development Servers**
```bash
# Terminal 1: Start Backend (from /server directory)
npm run start:dev

# Terminal 2: Start Frontend (from /dormitory-frontend directory)  
npm run dev
```

### 🌐 **Access Points**
- **Backend API**: `http://localhost:4000`
- **API Documentation**: `http://localhost:4000/api` (Swagger UI)
- **Frontend Application**: `http://localhost:3000`
- **Prisma Studio**: `http://localhost:5555`
- **Database**: `postgresql://localhost:5433/dormitory_system`
- **Redis**: `localhost:6379`

## 📚 API Documentation

> 📖 **Complete API documentation is available at `/api` endpoint when running the server (Swagger UI)**

### 🔐 **Authentication Module**

#### **Core Authentication**
```http
POST /auth/register          # Register new user account
POST /auth/login            # Authenticate and receive JWT + session
POST /auth/logout           # Invalidate current session
GET  /auth/google           # Initiate Google OAuth flow
GET  /auth/google/callback  # Handle OAuth callback
```

#### **Email Confirmation**
```http
POST /auth/email-confirmation        # Send confirmation email
GET  /auth/email-confirmation/:token # Verify email token
```

#### **Password Recovery**
```http
POST /auth/password-recovery/reset            # Request password reset
POST /auth/password-recovery/new-password/:token # Set new password
```

#### **Two-Factor Authentication**
```http
POST /auth/2fa/enable   # Enable 2FA for user
POST /auth/2fa/verify   # Verify 2FA token
POST /auth/2fa/disable  # Disable 2FA
```

### 🏠 **Dormitory Management**

#### **Public Endpoints**
```http
GET /dormitory              # List all dormitories (public)
GET /dormitory/:id          # Get dormitory details
GET /dormitory/:id/rooms    # List dormitory rooms
```

#### **Admin Endpoints** 🔒
```http
POST   /admin/dormitory           # Create new dormitory
PUT    /admin/dormitory/:id       # Update dormitory
DELETE /admin/dormitory/:id       # Delete dormitory
GET    /admin/dormitory/analytics # Get dormitory analytics
```

### 🏠 **Room Management**

#### **Room Operations**
```http
GET    /room/search        # Search available rooms
GET    /room/:id           # Get room details
POST   /room/:id/book     # Book a room (authenticated)
PUT    /room/:id/update   # Update room details (admin)
DELETE /room/:id          # Delete room (admin)
```

#### **Room Types**
```http
GET    /room-types              # List all room types
POST   /room-types             # Create room type (admin)
PUT    /room-types/:id         # Update room type (admin)
DELETE /room-types/:id         # Delete room type (admin)
```

### 💳 **Payment System**

#### **Payment Operations**
```http
GET    /payments              # Get user payments
POST   /payments/create       # Create payment request (admin)
GET    /payments/:id          # Get payment details
PUT    /payments/:id/confirm  # Confirm cash payment (admin)
```

#### **Stripe Integration**
```http
POST /payments/stripe/create-intent    # Create Stripe payment intent
POST /payments/stripe/webhook         # Handle Stripe webhooks
GET  /payments/stripe/success         # Payment success callback
```

### 🔔 **Notification System**

#### **User Notifications**
```http
GET    /notifications           # Get user notifications
PUT    /notifications/:id/read  # Mark notification as read
POST   /notifications/preferences # Update notification settings
DELETE /notifications/:id       # Delete notification
```

#### **Admin Notifications**
```http
POST /admin/notifications/broadcast  # Broadcast to all users
POST /admin/notifications/targeted   # Send targeted notifications
GET  /admin/notifications/analytics  # Notification analytics
```

### 📢 **Announcements**

#### **Public Announcements**
```http
GET /announcement              # Get public announcements
GET /announcement/:id          # Get specific announcement
```

#### **Admin Announcements** 🔒
```http
POST   /announcement           # Create new announcement
PUT    /announcement/:id       # Update announcement
DELETE /announcement/:id       # Delete announcement
GET    /announcement/analytics # Get announcement metrics
```

### � **User Management**

#### **User Profile**
```http
GET    /user/profile          # Get current user profile
PUT    /user/profile          # Update user profile
DELETE /user/profile          # Delete user account
PUT    /user/password         # Change password
```

#### **Admin User Management** 🔒
```http
GET    /admin/users           # List all users with filtering
POST   /admin/users           # Create new user
PUT    /admin/users/:id       # Update user details
DELETE /admin/users/:id       # Delete user
GET    /admin/users/analytics # User statistics
```

### 📊 **Admin Dashboard**

#### **Analytics & Reports**
```http
GET /admin/dashboard/stats       # Dashboard overview statistics
GET /admin/dashboard/payments    # Payment analytics
GET /admin/dashboard/occupancy   # Occupancy reports
GET /admin/dashboard/revenue     # Revenue analytics
```

#### **System Management**
```http
GET /admin/audit-logs           # System audit logs
GET /admin/system/health        # System health check
POST /admin/system/maintenance  # Toggle maintenance mode
```

### � **Example Request/Response**

#### **Create User Registration**
```http
POST /auth/register
Content-Type: application/json

{
  "email": "student@university.edu",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+48123456789",
  "role": "Regular"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-string",
    "email": "student@university.edu",
    "role": "Regular",
    "emailVerified": false
  }
}
```

#### **Create Payment Intent**
```http
POST /payments/stripe/create-intent
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "amount": 150000,
  "currency": "pln",
  "paymentType": "MONTHLY_RENT",
  "description": "January 2024 rent payment"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "amount": 150000,
    "currency": "pln"
  }
}
```

## 🏗️ System Architecture

### 📊 **Database Schema Overview**
```mermaid
erDiagram
    User ||--o{ Payment : makes
    User ||--o{ Notification : receives
    User ||--o{ UserConfirmation : has
    User ||--o{ SignedInUser : creates
    
    Dormitory ||--o{ Room : contains
    Dormitory ||--o{ Announcement : has
    Dormitory ||--o{ Prices : defines
    
    Room ||--o{ RoomBooking : booked_through
    Payment ||--o{ PaymentItem : contains
    Payment ||--o{ PaymentAuditLog : tracks
    
    User {
        string id PK
        string email UK
        string firstName
        string lastName
        string phoneNumber
        UserRole role
        AuthMethod authMethod
        datetime createdAt
        datetime updatedAt
    }
    
    Dormitory {
        string id PK
        string name
        string address
        string city
        string description
        json amenities
        datetime createdAt
    }
    
    Payment {
        string id PK
        string userId FK
        decimal amount
        string currency
        PaymentStatus status
        PaymentType type
        datetime dueDate
        datetime createdAt
    }
```

### 🏛️ **Modular Architecture**
```
┌─────────────────────────────────────────────────┐
│                Frontend (Next.js)               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │    Admin    │ │   Student   │ │    Guest    ││
│  │  Dashboard  │ │  Portal     │ │   Portal    ││
│  └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────┬───────────────────────────┘
                      │ HTTP/REST API
┌─────────────────────▼───────────────────────────┐
│              Backend (NestJS)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │    Auth     │ │  Payments   │ │ Dormitory   ││
│  │   Module    │ │   Module    │ │   Module    ││
│  └─────────────┘ └─────────────┘ └─────────────┘│
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │ Notifications│ │    User     │ │    Admin    ││
│  │   Module    │ │   Module    │ │   Module    ││
│  └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              Data & Services Layer              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │ PostgreSQL  │ │    Redis    │ │   Prisma    ││
│  │  Database   │ │   Cache     │ │     ORM     ││
│  └─────────────┘ └─────────────┘ └─────────────┘│
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │   Stripe    │ │    AWS S3   │ │   Sentry    ││
│  │  Payments   │ │   Storage   │ │ Monitoring  ││
│  └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────┘
```

### 🔄 **Request Flow**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│ Middleware  │───▶│ Controller  │───▶│   Service   │
│  Request    │    │(Auth/Valid) │    │  (Routing)  │    │(Bus. Logic) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                   │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────▼───┐
│  Response   │◀───│   Guard     │◀───│ Repository  │◀───│   Prisma    │
│   (JSON)    │    │(Transform)  │    │(Data Layer) │    │   Client    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 🔧 Development Guide

### 📁 **Project Structure**
```
dormitory_system/
├── 📁 server/                          # Backend NestJS Application
│   ├── 📁 src/
│   │   ├── 📁 modules/                 # Feature Modules
│   │   │   ├── 📁 auth/                # Authentication & Authorization
│   │   │   │   ├── 📁 submodules/      # Auth submodules
│   │   │   │   │   ├── 📁 email-confirmation/
│   │   │   │   │   ├── 📁 password-recovery/
│   │   │   │   │   └── 📁 two-factor-auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── 📁 user/                # User Management
│   │   │   ├── 📁 dormitory/           # Property Management
│   │   │   │   └── 📁 room-types/      # Room type management
│   │   │   ├── 📁 room/                # Room & Booking Management
│   │   │   ├── 📁 payments/            # Payment Processing
│   │   │   ├── 📁 notifications/       # Notification System
│   │   │   ├── 📁 announcement/        # Communications
│   │   │   └── 📁 admin/               # Administrative Features
│   │   ├── 📁 libs/                    # Shared Libraries
│   │   │   ├── 📁 common/              # Common Utilities & Guards
│   │   │   ├── 📁 mail/                # Email Services
│   │   │   ├── 📁 swagger/             # API Documentation
│   │   │   └── 📁 utils/               # Utility Functions
│   │   ├── 📁 config/                  # Configuration Files
│   │   │   ├── mailer.config.ts
│   │   │   ├── security.config.ts
│   │   │   └── recaptcha.config.ts
│   │   ├── 📁 prisma/                  # Database Client & Services
│   │   ├── app.module.ts               # Main Application Module
│   │   ├── main.ts                     # Application Entry Point
│   │   └── instrument.ts               # Sentry Configuration
│   ├── 📁 prisma/                      # Database Schema & Migrations
│   │   ├── schema.prisma               # Prisma Schema Definition
│   │   └── 📁 migrations/              # Database Migration Files
│   ├── 📁 tests/                       # End-to-End Tests
│   │   └── 📁 auth/                    # Authentication Tests
│   ├── 📄 docker-compose.yml           # Development Services
│   ├── 📄 dockerfile                   # Backend Container
│   └── 📄 package.json                 # Backend Dependencies
├── 📁 dormitory-frontend/              # Frontend Next.js Application
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   └── 📁 [locale]/            # Internationalized Routes
│   │   ├── 📁 components/              # React Components
│   │   │   ├── 📁 admin/               # Admin Dashboard Components
│   │   │   ├── 📁 auth/                # Authentication Components
│   │   │   ├── 📁 dialogs/             # Modal & Dialog Components
│   │   │   ├── 📁 guest/               # Public/Guest Components
│   │   │   ├── 📁 signedIn/            # Authenticated User Components
│   │   │   └── 📁 ui/                  # Reusable UI Components
│   │   ├── 📁 hooks/                   # Custom React Hooks
│   │   ├── 📁 locales/                 # Internationalization
│   │   ├── 📁 providers/               # Context Providers
│   │   └── 📁 types/                   # TypeScript Type Definitions
│   ├── 📁 public/                      # Static Assets
│   │   ├── 📁 locales/                 # Translation Files
│   │   └── 🖼️ [icons & images]
│   └── 📄 package.json                 # Frontend Dependencies
├── 📄 package.json                     # Root Workspace Configuration
├── 📄 commitlint.config.cjs            # Commit Linting Rules
└── 📄 README.md                        # Project Documentation
```

### 🧪 **Testing Strategy**
```bash
# Backend Testing (from /server directory)
npm run test                    # Unit tests
npm run test:auth              # Authentication module tests
npm run test:coverage          # Test coverage report
npm run test:e2e              # End-to-end tests
npm run test:watch            # Watch mode for development

# Frontend Testing (from /dormitory-frontend directory)
npm run test                   # Jest unit tests
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report
```

### 🗄️ **Database Management**
```bash
# Development Commands
npx prisma migrate dev --name "description"    # Create & apply migration
npx prisma generate                           # Generate Prisma client
npx prisma studio                            # Open visual database editor
npx prisma db seed                           # Run database seeding

# Production Commands
npx prisma migrate deploy                    # Deploy migrations
npx prisma migrate status                   # Check migration status

# Docker Database Commands (from /server directory)
npm run db:migrate            # Run migrations in container
npm run db:reset             # Reset database (development only)
npm run db:generate          # Generate Prisma client in container
npm run db:studio           # Open Prisma Studio in container
```

### 🛠️ **Development Scripts**
```bash
# Root Level Commands
npm run format               # Format all TypeScript files
npm run lint                # Lint and fix all files
npm run format:check        # Check formatting without fixing

# Backend Commands (from /server directory)
npm run start:dev           # Development server with hot reload
npm run start:debug         # Development server with debugging
npm run build              # Build for production
npm run start:prod         # Run production build

# Frontend Commands (from /dormitory-frontend directory)
npm run dev                # Development server
npm run build             # Production build
npm run start             # Start production build
npm run lint              # Next.js linting
```

## 🚢 Production Deployment

### 🐳 **Docker Deployment (Recommended)**
```bash
# Clone and navigate to project
git clone https://github.com/BohdanBiliak/Dormitory_System.git
cd dormitory_system/server

# Configure production environment
cp .env.example .env.production
# Edit .env.production with production values

# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Monitor deployment
docker-compose logs -f backend

# Apply database migrations
docker-compose exec backend npx prisma migrate deploy
```

### ☁️ **Cloud Deployment Options**

#### **AWS Deployment**
```bash
# Using AWS ECS with Fargate
aws ecs create-cluster --cluster-name dormitory-cluster
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs create-service --cluster dormitory-cluster --service-name dormitory-service
```

#### **Heroku Deployment**
```bash
# Backend deployment
heroku create dormitory-api
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create heroku-redis:hobby-dev
git push heroku main

# Frontend deployment (Vercel recommended)
vercel --prod
```

#### **Railway/DigitalOcean App Platform**
- Connect GitHub repository
- Configure environment variables
- Deploy with auto-scaling enabled

### 🔧 **Production Environment Setup**

#### **Required Environment Variables**
```env
# Production Database
POSTGRES_URI="postgresql://user:pass@prod-db.amazonaws.com:5432/dormitory_prod"

# Security (Use strong, unique values)
JWT_SECRET="production-jwt-secret-minimum-32-characters"
SESSION_SECRET="production-session-secret-minimum-32-characters"

# Redis Cache
REDIS_HOST="prod-redis.cache.amazonaws.com"
REDIS_PORT=6379
REDIS_PASSWORD="secure-redis-password"

# Production APIs
STRIPE_SECRET_KEY="sk_live_your-production-stripe-key"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
MAIL_HOST="smtp.sendgrid.net" # or your production SMTP

# Monitoring
SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"
NODE_ENV="production"
```

#### **Database Migration Strategy**
```bash
# Pre-deployment checks
npx prisma migrate status
npx prisma validate

# Deploy migrations (zero-downtime)
npx prisma migrate deploy

# Verify deployment
npx prisma migrate status
```

### 📊 **Performance Optimization**

#### **Backend Optimizations**
- Enable Redis caching for frequently accessed data
- Configure connection pooling for PostgreSQL
- Set up CDN for static assets via AWS CloudFront
- Enable gzip compression and security headers

#### **Frontend Optimizations**
- Build-time static generation with Next.js
- Image optimization with next/image
- Bundle analysis and code splitting
- Service worker for offline functionality

## 📊 Monitoring & Analytics

### 🎯 **Key Performance Indicators (KPIs)**
- **Payment Success Rate**: >99.5% target for Stripe transactions
- **API Response Time**: <200ms average for core endpoints
- **Database Performance**: <50ms query execution time
- **User Engagement**: Session duration, page views, conversion rates
- **System Uptime**: 99.9% availability target

### 🔍 **Monitoring Stack**
```yaml
Error Tracking: 
  - Sentry for real-time error monitoring
  - Custom error logging with context

Performance Monitoring:
  - Database query performance tracking
  - API endpoint response time monitoring
  - Memory and CPU usage tracking

Business Metrics:
  - Payment processing success rates
  - User registration and retention
  - Room booking conversion rates
  - Revenue tracking and forecasting
```

### 📈 **Health Check Endpoints**
```http
GET /health                 # Basic health check
GET /health/detailed        # Comprehensive system status
GET /metrics               # Prometheus-compatible metrics
```

### 🚨 **Alerting Configuration**
```yaml
Critical Alerts:
  - Payment processing failures (>1% error rate)
  - Database connection issues
  - High API error rates (>5%)
  - Memory usage >90%

Warning Alerts:
  - Slow database queries (>1s)
  - High API response times (>500ms)
  - Unusual user activity patterns
```

## 🤝 Contributing

We welcome contributions to improve the Dormitory Management System! Please follow these guidelines:

### 🔄 **Development Workflow**
1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/Dormitory_System.git
   cd dormitory_system
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

3. **Development Setup**
   ```bash
   # Install dependencies
   npm install
   cd server && npm install
   cd ../dormitory-frontend && npm install
   
   # Setup environment
   cp server/.env.example server/.env
   # Configure your local environment
   ```

4. **Make Changes**
   - Follow existing code patterns
   - Add tests for new functionality
   - Update documentation as needed

5. **Quality Checks**
   ```bash
   npm run lint                    # Check code style
   npm run format:check           # Check formatting
   npm run test                   # Run test suite
   ```

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   git push origin feature/your-amazing-feature
   ```

7. **Create Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### 📝 **Code Standards**

#### **Backend (NestJS)**
- Use TypeScript strict mode
- Follow NestJS module structure
- Implement proper error handling
- Add Swagger documentation for endpoints
- Write unit and integration tests

#### **Frontend (Next.js)**
- Use TypeScript for all components
- Follow React hooks patterns
- Implement responsive design
- Add proper error boundaries
- Optimize for performance

#### **Database**
- Use Prisma schema best practices
- Create descriptive migration names
- Add proper indexes and constraints
- Document schema changes

### 🧪 **Testing Requirements**
- **Unit Tests**: Cover all services and utilities
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Cover critical user workflows
- **Code Coverage**: Maintain >80% coverage

### 📚 **Documentation Guidelines**
- Update README for new features
- Add inline code comments
- Update API documentation
- Include examples for complex features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Community

### 🆘 **Getting Help**
- 🐛 **Bug Reports**: [Create an issue](https://github.com/BohdanBiliak/Dormitory_System/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/BohdanBiliak/Dormitory_System/issues/new?template=feature_request.md)
- 📖 **Documentation**: Check our [Wiki](https://github.com/BohdanBiliak/Dormitory_System/wiki)
- 💬 **Discussions**: Join our [GitHub Discussions](https://github.com/BohdanBiliak/Dormitory_System/discussions)

### 📧 **Contact Information**
- **Email**: support@dormitory-system.com
- **Project Maintainer**: [BohdanBiliak](https://github.com/BohdanBiliak)
- **Project Repository**: [Dormitory_System](https://github.com/BohdanBiliak/Dormitory_System)

## 🎯 Project Roadmap

### 🚀 **Phase 1: Core Platform (Current)**
- [x] **Authentication System**: JWT + OAuth + 2FA
- [x] **Payment Processing**: Stripe integration with webhooks
- [x] **Room Management**: Complete CRUD with booking system
- [x] **Notification Engine**: Multi-channel notification system
- [x] **Admin Dashboard**: Comprehensive management interface
- [x] **Multi-tenant Support**: Independent dormitory operations

### 🔮 **Phase 2: Enhanced Features (Q2 2024)**
- [ ] **Mobile API Optimization**: GraphQL integration for mobile clients
- [ ] **Advanced Analytics Dashboard**: Revenue forecasting and occupancy analytics
- [ ] **Smart Notification System**: AI-powered notification timing
- [ ] **Multi-language Support**: Full i18n with 5+ languages
- [ ] **Enhanced Security**: Advanced fraud detection and monitoring
- [ ] **Integration APIs**: University system connections

### 🌟 **Phase 3: Advanced Platform (Q4 2024)**
- [ ] **Mobile Applications**: Native iOS and Android apps
- [ ] **AI-Powered Features**: 
  - Smart room recommendations
  - Predictive maintenance scheduling
  - Automated price optimization
- [ ] **Advanced Integrations**:
  - University information systems
  - Property management platforms
  - Financial reporting tools
- [ ] **Real-time Features**:
  - Live chat support system
  - Real-time occupancy tracking
  - Dynamic pricing updates

### 🔮 **Phase 4: Enterprise Platform (2025)**
- [ ] **Multi-country Support**: Full localization and compliance
- [ ] **Advanced Analytics**: Machine learning insights and predictions
- [ ] **Enterprise Integrations**: ERP and CRM system connections
- [ ] **White-label Solutions**: Customizable branding and deployments
- [ ] **Marketplace Features**: Third-party service integrations

## 🏆 **Project Status**

![Build Status](https://img.shields.io/github/workflow/status/BohdanBiliak/Dormitory_System/CI)
![Code Coverage](https://img.shields.io/codecov/c/github/BohdanBiliak/Dormitory_System)
![License](https://img.shields.io/github/license/BohdanBiliak/Dormitory_System)
![Last Commit](https://img.shields.io/github/last-commit/BohdanBiliak/Dormitory_System)
![Issues](https://img.shields.io/github/issues/BohdanBiliak/Dormitory_System)
![Pull Requests](https://img.shields.io/github/issues-pr/BohdanBiliak/Dormitory_System)

---

<div align="center">
  
### 🌟 **Built with ❤️ for the future of student housing management**

**[⭐ Star this project](https://github.com/BohdanBiliak/Dormitory_System)** if you find it helpful!

**[🍴 Fork it](https://github.com/BohdanBiliak/Dormitory_System/fork)** to contribute to its development!

</div>

---

<div align="center">
  <sub>
    Made with modern web technologies by 
    <a href="https://github.com/BohdanBiliak">BohdanBiliak</a> and 
    <a href="https://github.com/BohdanBiliak/Dormitory_System/graphs/contributors">contributors</a>
  </sub>
</div>
