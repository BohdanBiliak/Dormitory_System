# 🎯 Unique Architectural Elements & Specific Files

## 📁 Complete File Structure

### 🔐 Security Module Files

#### Authentication Core
```
src/modules/auth/
├── auth.controller.ts          # Main auth endpoints
├── auth.service.ts            # Core authentication logic  
├── auth.module.ts             # Module configuration
├── docs.swagger.ts            # API documentation
└── dto/
    ├── login.dto.ts           # Login validation
    ├── register.dto.ts        # Registration validation
    └── ...

src/modules/auth/submodules/
├── email-confirmation/
│   ├── email-confirmation.module.ts
│   ├── email-confirmation.service.ts
│   └── dto/
├── password-recovery/
│   ├── password-recovery.module.ts
│   ├── password-recovery.service.ts
│   └── dto/
└── two-factor-auth/
    ├── two-factor-auth.module.ts
    ├── services/
    │   └── two-factor-auth.service.ts
    └── dto/
```

#### Security Infrastructure
```
src/libs/common/
├── guards/
│   ├── auth.guard.ts                    # Session authentication
│   ├── roles.guard.ts                   # RBAC implementation
│   ├── roomaccessguard.guard.ts         # Resource-specific access
│   └── SessionGuard.guard.ts            # Session validation
├── decorators/
│   ├── auth.decorator.ts                # Combined auth decorator
│   ├── authtorized.decorator.ts         # User extraction
│   ├── current-user.decorator.ts        # Current user injection
│   ├── roles.decorator.ts               # Role requirements
│   ├── upload-avatar.decorator.ts       # File upload handling
│   └── is-passwords-matching-constraint.decorator.ts
├── services/
│   └── security.service.ts              # Security utilities
├── middleware/
│   └── sentry-action-logger.middleware.ts
└── interceptors/
```

### 🗄️ Database & Repository Files

#### Prisma Core
```
src/prisma/
├── prisma.service.ts          # Database connection service
└── prisma.module.ts           # Prisma module configuration

prisma/
└── schema.prisma              # Database schema definition
```

#### Repository Pattern Implementation
```
src/modules/room/
├── room.repository.ts         # Complex room operations repository
├── room.service.ts           # Business logic orchestration
├── room.controller.ts        # HTTP endpoints
├── room.module.ts            # Module configuration
├── room.docs.ts              # Swagger documentation
└── dto/
    ├── availableRooms.dto.ts
    ├── bookRoom.dto.ts
    └── updateRoom.dto.ts
```

### 🏢 Business Domain Files

#### Dormitory Management (CQRS Pattern)
```
src/modules/dormitory/
├── dormitory.controller.ts    # REST endpoints
├── dormitory.service.ts       # Complex business logic
├── dormitory.module.ts        # Module configuration
├── dormitory.docs.ts          # API documentation
├── dto/
│   ├── create-dormitory.dto.ts
│   ├── update-dormitory.dto.ts
│   └── room-assignment.dto.ts
└── room-types/
    ├── room-types.controller.ts
    ├── room-types.module.ts
    ├── dto/
    └── use-cases/                # CQRS implementation
        ├── create-room-type.use-case.ts
        ├── get-room-types.use-case.ts
        ├── update-room-type.use-case.ts
        └── delete-room-type.use-case.ts
```

#### User Management
```
src/modules/user/
├── user.controller.ts
├── user.service.ts
├── user.module.ts
└── dto/
```

#### Admin Management
```
src/modules/admin/
├── admin.module.ts
├── manager-repository.interface.ts
├── manager.repository.ts
├── controllers/
├── dto/
├── docs/
└── use-cases/
```

### 🔔 Communication Modules

#### Announcements (CQRS Pattern)
```
src/modules/announcement/
├── announcement.controller.ts
├── announcement.entity.ts
├── announcement.module.ts
├── announcement.repository.ts
├── announcements.docs.ts
├── dto/
└── use-cases/
    ├── CreateAnnouncementUseCase
    ├── GetAnnouncementsUseCase
    ├── DeleteAnnouncementUseCase
    ├── UploadAnnouncementAttachmentsUseCase
    ├── GetAnnouncementByIdUseCase
    └── GetPublicAnnouncementsUseCase
```

#### Notifications & Mail
```
src/modules/notifications/
├── notifications.service.ts
├── NotificationGateway.ts     # WebSocket implementation
└── ...

src/libs/mail/
├── mail.module.ts
├── mail.service.ts
└── templates/
```

### 💰 Financial Modules
```
src/modules/payments/
├── payments.controller.ts
├── payments.service.ts
├── payments.module.ts
├── payments.docs.ts
└── dto/
```

### 🔍 Monitoring & Configuration
```
src/modules/audit/
├── audit.controller.ts
├── audit.service.ts
└── audit.module.ts

src/config/
├── mailer.config.ts
├── recaptcha.config.ts
└── security.config.ts

src/libs/common/s3/
├── s3.module.ts
├── s3.service.ts
└── ...

src/libs/utils/
├── is-dev.util.ts
├── ms.util.ts
└── parse_boolean.ts
```

## 🌟 Unique Architectural Elements

### 1. **Multi-Layer Security Architecture**

**File:** `src/libs/common/guards/roomaccessguard.guard.ts`
```typescript
// Unique feature: Resource-specific access control
// Checks global admin, dormitory admin, and room-level permissions
```

**Files:** 
- `src/libs/common/decorators/auth.decorator.ts` - Combined auth + role decorator
- `src/libs/common/services/security.service.ts` - Security event logging

**Unique Features:**
- Hierarchical permission system (Global Admin → Dormitory Admin → Room Access)
- Security event logging with suspicious activity detection
- Combined authentication and authorization decorators

### 2. **Advanced Room Assignment System**

**File:** `src/modules/dormitory/dormitory.service.ts` (lines 17-180)
```typescript
// Unique feature: Complex floor and room assignment logic
// Automatically creates floors, rooms, and pricing based on room types
```

**Unique Features:**
- Dynamic room number generation (`${floorNumber}${roomNumber.padStart(2, "0")}`)
- Automatic pricing calculation based on room capacity
- Photo inheritance from room types to individual rooms
- Multi-floor dormitory creation in single transaction

### 3. **CQRS Pattern Implementation**

**Files:**
- `src/modules/announcement/use-cases/` - Complete CQRS implementation
- `src/modules/dormitory/room-types/use-cases/` - Use case pattern

**Unique Features:**
- Separation of command and query operations
- Individual use cases for specific business operations
- Clean separation of read and write responsibilities

### 4. **Complex Availability Algorithm**

**File:** `src/modules/room/room.repository.ts` (lines 140-200)
```typescript
// Unique feature: Date range availability checking with overlap prevention
// Complex query for finding available rooms with pricing integration
```

**Unique Features:**
- Overlapping reservation detection
- Dynamic pricing based on room capacity and date ranges
- Advanced filtering with relationship loading
- Real-time occupancy calculation

### 5. **File Upload Pipeline with S3 Integration**

**Files:**
- `src/libs/common/s3/s3.service.ts` - S3 integration
- `src/libs/common/services/security.service.ts` - File validation
- `src/libs/common/image/` - Image processing

**Unique Features:**
- Multi-file upload support (avatar, student ID front/back)
- Automatic photo inheritance from room types
- Security validation for file uploads
- S3 integration with secure URL generation

### 6. **Session-Based Authentication with 2FA**

**Files:**
- `src/modules/auth/submodules/two-factor-auth/` - 2FA implementation
- `src/modules/auth/submodules/email-confirmation/` - Email verification
- `src/libs/common/guards/SessionGuard.guard.ts` - Session validation

**Unique Features:**
- Session-based authentication (not JWT)
- Integrated 2FA system
- Email confirmation workflow
- reCAPTCHA integration

### 7. **Real-Time Notification System**

**File:** `src/modules/notifications/NotificationGateway.ts`
```typescript
// Unique feature: WebSocket-based real-time notifications
// Integrated with email and push notifications
```

**Unique Features:**
- WebSocket gateway for real-time updates
- Multi-channel notifications (email, WebSocket, push)
- Template-based email system

### 8. **Advanced Audit & Monitoring**

**Files:**
- `src/modules/audit/audit.service.ts` - Audit logging
- `src/libs/common/middleware/sentry-action-logger.middleware.ts` - Sentry integration

**Unique Features:**
- Comprehensive audit trail
- Sentry integration for error tracking and performance monitoring
- Security event logging with metadata
- User action tracking

### 9. **Flexible Pricing System**

**File:** `src/modules/room/room.repository.ts` (lines 420-450)
```typescript
// Unique feature: Date-based pricing with capacity-specific rates
// Supports price changes over time with historical tracking
```

**Unique Features:**
- Date-range based pricing
- Capacity-specific pricing
- Historical price tracking
- Dynamic price calculation

### 10. **Transaction-Based Complex Operations**

**File:** `src/modules/dormitory/dormitory.service.ts` (lines 50-180)
```typescript
// Unique feature: Complex multi-entity creation in single transaction
// Creates dormitory, floors, rooms, and pricing atomically
```

**Unique Features:**
- Atomic operations for complex business processes
- Rollback capability for failed operations
- Data consistency across multiple entities
- Performance-optimized bulk operations

## 🔧 Configuration & Environment

### Environment Configuration
```
.env.example                   # Environment template
docker-compose.yml            # Docker configuration
dockerfile                    # Container configuration
```

### Build & Test Configuration
```
nest-cli.json                 # NestJS CLI configuration
tsconfig.json                 # TypeScript configuration
tsconfig.build.json          # Build-specific TypeScript config
tsconfig.test.json           # Test-specific TypeScript config
jest.config.json             # Jest testing configuration
jest.setup.ts                # Test setup
```

## 🎨 Unique Design Patterns Summary

1. **Repository Pattern** - Data access abstraction
2. **CQRS** - Command Query Responsibility Segregation  
3. **Guard-Based Security** - Multi-layer authorization
4. **Use Case Pattern** - Single responsibility business operations
5. **Decorator Pattern** - Clean controller interfaces
6. **Factory Pattern** - Dynamic room and pricing creation
7. **Observer Pattern** - Real-time notifications
8. **Strategy Pattern** - Different authentication methods (session, 2FA)
9. **Transaction Script** - Complex business operations
10. **Module Pattern** - Feature-based code organization

These unique elements make this backend architecture particularly well-suited for complex dormitory management requirements with high security, real-time features, and scalable design patterns.