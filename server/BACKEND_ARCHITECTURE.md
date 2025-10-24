# 🏗️ Backend Architecture Documentation

## Overview

This NestJS-based backend follows a modular architecture with clean separation of concerns, implementing Domain-Driven Design (DDD) principles, CQRS patterns, and comprehensive security measures.

## 🔧 Module Structure

### 🔐 Security Modules

#### **1. Authentication Module** (`src/modules/auth/`)
**Core Files:**
- `auth.controller.ts` - Authentication endpoints (login, register, logout)
- `auth.service.ts` - Core authentication business logic
- `auth.module.ts` - Module configuration with dependencies

**Submodules:**
- `submodules/email-confirmation/` - Email verification system
- `submodules/password-recovery/` - Password reset functionality  
- `submodules/two-factor-auth/` - 2FA implementation

**Key Features:**
- Session-based authentication
- Argon2 password hashing
- reCAPTCHA integration
- File upload validation (avatars, student IDs)
- Sentry monitoring integration

#### **2. Security Infrastructure** (`src/libs/common/`)

**Guards:**
- `guards/auth.guard.ts` - Authentication verification
- `guards/roles.guard.ts` - Role-based access control (RBAC)
- `guards/roomaccessguard.guard.ts` - Room-specific permissions
- `guards/SessionGuard.guard.ts` - Session validation

**Decorators:**
- `decorators/auth.decorator.ts` - Combined auth + role decorator
- `decorators/authtorized.decorator.ts` - User extraction from session
- `decorators/roles.decorator.ts` - Role requirement definitions
- `decorators/current-user.decorator.ts` - Current user injection

**Security Services:**
- `services/security.service.ts` - Security utilities and validation
  - Suspicious activity detection
  - Secure token generation
  - File upload validation
  - Security event logging

### 🗄️ Database Modules

#### **1. Prisma Core** (`src/prisma/`)
- `prisma.service.ts` - Database connection and transaction management
- `prisma.module.ts` - Prisma configuration module

#### **2. Repository Pattern Implementation**

**Room Repository** (`src/modules/room/room.repository.ts`):
- Complex room availability queries
- Price calculation logic
- Booking and status management
- Advanced filtering and relationships

**Key Repository Features:**
- Type-safe database operations
- Complex relationship handling
- Business logic encapsulation
- Performance-optimized queries

### 🏢 Business Domain Modules

#### **1. Dormitory Management** (`src/modules/dormitory/`)
**Files:**
- `dormitory.controller.ts` - REST API endpoints
- `dormitory.service.ts` - Business logic for dormitory operations
- `dormitory.module.ts` - Module configuration

**Submodules:**
- `room-types/` - Room type management with CQRS pattern

**Key Features:**
- Complex dormitory creation with floor assignments
- Photo management with S3 integration
- Status management (Active/Deactivated)
- Manager/Admin assignment system

#### **2. Room Management** (`src/modules/room/`)
**Architecture:**
- **Controller**: HTTP endpoint handling
- **Service**: Business logic orchestration
- **Repository**: Data access layer

**Key Features:**
- Availability checking algorithms
- Dynamic pricing based on capacity
- Booking and confirmation system
- Status tracking and management

#### **3. User Management** (`src/modules/user/`)
**Features:**
- User lifecycle management
- Role-based permissions
- Profile management
- Dormitory assignments

#### **4. Admin Management** (`src/modules/admin/`)
**Features:**
- Administrative user management
- Dormitory admin assignments
- Manager repository pattern

### 🔔 Communication Modules

#### **1. Notifications** (`src/modules/notifications/`)
**Features:**
- Real-time notifications via WebSocket
- Email notifications
- Push notification support

#### **2. Mail System** (`src/libs/mail/`)
**Features:**
- Template-based email system
- Transactional email handling
- Email confirmation workflows

#### **3. Announcements** (`src/modules/announcement/`)
**Architecture Pattern:** CQRS (Command Query Responsibility Segregation)
**Use Cases:**
- `CreateAnnouncementUseCase`
- `GetAnnouncementsUseCase`
- `DeleteAnnouncementUseCase`
- `UploadAnnouncementAttachmentsUseCase`

### 💰 Financial Modules

#### **1. Payments** (`src/modules/payments/`)
**Features:**
- Payment processing
- Invoice management
- Financial reporting

### 🔍 Monitoring & Audit

#### **1. Audit Module** (`src/modules/audit/`)
**Features:**
- Action logging
- Security event tracking
- Compliance reporting

#### **2. Sentry Integration**
**Features:**
- Error tracking and monitoring
- Performance monitoring
- User action logging

### ☁️ External Services

#### **1. S3 Service** (`src/libs/common/s3/`)
**Features:**
- File upload management
- Image processing
- Secure URL generation

#### **2. Image Processing** (`src/libs/common/image/`)
**Features:**
- Image validation
- Format conversion
- Size optimization

## 🏗️ Architectural Patterns

### 1. **Repository Pattern**
- Encapsulates data access logic
- Provides abstraction over Prisma ORM
- Enables easier testing and maintenance

### 2. **CQRS (Command Query Responsibility Segregation)**
- Separates read and write operations
- Implemented in announcements and room-types modules
- Use cases for specific business operations

### 3. **Guard-Based Security**
- Multiple layers of security guards
- Role-based access control
- Resource-specific permissions

### 4. **Decorator Pattern**
- Custom decorators for common operations
- Simplified authentication and authorization
- Clean controller interfaces

### 5. **Module-Based Architecture**
- Clear separation of concerns
- Dependency injection
- Testable components

## 🔒 Security Features

### Authentication & Authorization
- **Session-based authentication** with secure cookies
- **Role-based access control (RBAC)** with multiple user roles
- **Two-factor authentication** support
- **Password security** with Argon2 hashing

### Data Protection
- **Input validation** with class-validator
- **File upload validation** with security checks
- **SQL injection protection** via Prisma ORM
- **XSS protection** with helmet.js

### Monitoring & Audit
- **Security event logging** for suspicious activities
- **Sentry integration** for error tracking
- **Audit trails** for all critical operations

## 🚀 Performance Optimizations

### Database
- **Connection pooling** with Prisma
- **Query optimization** with selective field loading
- **Transaction management** for data consistency

### Caching
- **Redis integration** for session storage
- **Query result caching** for frequently accessed data

### File Management
- **S3 integration** for scalable file storage
- **Image optimization** for faster loading

## 📊 Unique Architectural Elements

### 1. **Complex Room Assignment System**
- Multi-floor dormitory management
- Dynamic room type assignments
- Automated pricing calculation

### 2. **Flexible Permission System**
- Global admins with full access
- Dormitory-specific admin roles
- Room-level access controls

### 3. **Advanced Booking System**
- Date range availability checking
- Overlapping reservation prevention
- Status-based room management

### 4. **File Upload Pipeline**
- Multi-file upload support
- S3 integration with secure URLs
- Image processing and validation

### 5. **Real-time Communication**
- WebSocket integration for notifications
- Real-time updates for room status
- Push notification system

## 🔧 Development Best Practices

### Code Organization
- **Feature-based modules** for better maintainability
- **Shared libraries** for common functionality
- **Type-safe operations** with TypeScript and Prisma

### Testing Strategy
- **Unit tests** for business logic
- **Integration tests** for API endpoints
- **Security tests** for authentication flows

### Documentation
- **Swagger/OpenAPI** documentation
- **Comprehensive error handling**
- **Detailed logging and monitoring**

## 📁 Module Dependencies

```
AppModule
├── Security Layer
│   ├── AuthModule (with submodules)
│   ├── Guards (Auth, Roles, Room Access)
│   └── Security Services
├── Data Layer
│   ├── PrismaModule
│   ├── Repositories
│   └── S3Service
├── Business Logic
│   ├── DormitoryModule
│   ├── RoomModule
│   ├── UserModule
│   └── AdminModule
├── Communication
│   ├── NotificationsModule
│   ├── MailModule
│   └── AnnouncementModule
├── Financial
│   └── PaymentsModule
└── Monitoring
    ├── AuditModule
    └── Sentry Integration
```

This architecture ensures scalability, maintainability, and security while providing a robust foundation for the dormitory management system.