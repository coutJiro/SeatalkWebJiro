# SeaTalk Webhook Handler

## Overview

This is a webhook handler application specifically designed to process SeaTalk webhook events. The application provides a production-ready HTTPS endpoint at `/callback` that can handle SeaTalk challenge verification and other webhook events. It features a modern React-based dashboard for monitoring webhook activity, testing endpoints, and viewing real-time health status.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints with JSON responses
- **Request Handling**: Express middleware for JSON parsing and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot reload with Vite integration for full-stack development

### Core Webhook Processing
- **Primary Endpoint**: `/callback` - Handles SeaTalk webhook events
- **Challenge Response**: Automatically detects and responds to SeaTalk challenge verification
- **Event Processing**: Structured handling of webhook payloads with proper JSON validation
- **Health Monitoring**: `/api/health` endpoint for service status checks

### Data Storage
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Database**: PostgreSQL with connection via @neondatabase/serverless
- **Schema Management**: Centralized schema in `shared/schema.ts` with user authentication model
- **Migrations**: Drizzle Kit for database schema migrations
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

### Development & Build System
- **Build Tool**: Vite for frontend with esbuild for backend bundling
- **TypeScript**: Strict configuration with path aliases for clean imports
- **Code Quality**: ESM modules throughout with proper module resolution
- **Hot Reload**: Development server with automatic restart and frontend HMR

### User Interface Components
- **Component Library**: Comprehensive UI components from shadcn/ui
- **Theming**: CSS custom properties with dark/light mode support
- **Icons**: Lucide React icon library
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Toast Notifications**: Built-in notification system for user feedback

### Authentication & Authorization
- **User Model**: Basic username/password authentication schema
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Password Security**: Structured for secure password handling (implementation ready)

### Production Considerations
- **HTTPS Ready**: Designed for production HTTPS deployment
- **Error Boundaries**: Proper error handling and user feedback
- **Performance**: Optimized bundle splitting and lazy loading
- **Monitoring**: Request logging and health check endpoints

## External Dependencies

### Core Runtime
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for API endpoints
- **React**: Frontend user interface library

### Database & ORM
- **PostgreSQL**: Primary database (configured for Neon serverless)
- **Drizzle ORM**: TypeScript-native database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI component primitives
- **shadcn/ui**: Pre-built component system
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **esbuild**: Fast JavaScript/TypeScript bundler

### Additional Libraries
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **date-fns**: Date utility library
- **Wouter**: Lightweight routing library