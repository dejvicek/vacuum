# Junie Guidelines - Node.js & NestJS Project

As Junie, your role is to analyze code changes, identify potential issues, suggest improvements, and adhere to best coding practices. Your analysis should be thorough and consider all aspects of code, including syntax, logic, efficiency, and style.

## Key Requirements

### Architecture & Design
- **SOLID Principles**: Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion
- **Clean Architecture**: Use layered architecture (Controllers → Services → Repositories → Data Access)
- **Dependency Injection**: Leverage NestJS DI container for loose coupling and testability
- **Domain-Driven Design**: Model business logic around domain entities, not technical concerns
- **Composition over Inheritance**: Prefer mixins and decorators over class hierarchies

### TypeScript & Type Safety
- **Strict Mode**: Always enable `strict: true` in `tsconfig.json`
- **No `any` Type**: Use precise types, generics, and utility types instead
- **Strict Array Typing**: Specify array element types explicitly (e.g., `string[]` not `any[]`)
- **Type Narrowing**: Use type guards and discriminated unions for runtime safety
- **Immutability**: Use `readonly` properties, `Readonly<T>`, and `as const` where applicable

### Code Quality Standards
- **Method Length**: Maximum 20 lines per function/method
- **Cyclomatic Complexity**: Maximum 5 branches per function
- **Function Purity**: Keep functions pure and side-effect free where possible
- **Async/Await**: Use async/await instead of raw Promises or callback chains
- **Error Handling**: Implement proper error boundaries, custom exceptions, and logging
- **Constructor Property Promotion**: Use TypeScript's shorthand for dependency injection

### NestJS Specific Practices
- **Modules**: Organize code into feature modules with clear boundaries
- **Controllers**: Handle HTTP concerns only (routing, validation, response formatting)
- **Services**: Encapsulate business logic, make them testable and reusable
- **Guards**: Implement authentication/authorization (JWT, roles-based access control)
- **Pipes**: Use for validation and data transformation (class-validator, class-transformer)
- **Interceptors**: Handle cross-cutting concerns (logging, performance monitoring, transformation)
- **Exception Filters**: Centralize error handling and API error responses
- **Middleware**: Apply global concerns before reaching routes (CORS, logging, rate limiting)
- **DTOs**: Use Data Transfer Objects for request/response validation and documentation
- **Decorators**: Create custom decorators for reusable functionality and metadata

### Database & Data Access
- **Repository Pattern**: Create abstraction layer between services and database
- **Transaction Management**: Handle multi-step operations atomically
- **Query Optimization**: Use proper indexing and avoid N+1 queries
- **Data Validation**: Validate at both DTO and database levels
- **Environment Configuration**: Use `.env` files and configuration modules (never hardcode credentials)

### Testing
- **Unit Tests**: Test business logic in isolation with mocks
- **Integration Tests**: Test modules and services together
- **E2E Tests**: Verify complete user workflows and API contracts
- **Coverage**: Aim for >80% code coverage on critical paths
- **Test Organization**: Use descriptive names and arrange-act-assert pattern

### API Design
- **RESTful Principles**: Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- **Status Codes**: Return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- **Request Validation**: Validate all inputs with class-validator
- **Response Format**: Maintain consistent response structure across endpoints
- **Pagination**: Implement for list endpoints with limit/offset or cursor-based pagination
- **Filtering & Sorting**: Support flexible data queries

### Performance & Security
- **Lazy Loading**: Load modules and services on demand
- **Caching**: Implement caching strategies where appropriate (Redis, in-memory)
- **Rate Limiting**: Protect endpoints from abuse
- **Input Validation**: Always validate and sanitize user input
- **SQL Injection Prevention**: Use parameterized queries or ORM (Drizzle)
- **CORS Configuration**: Whitelist specific origins in production
- **Helmet**: Use security headers via Helmet middleware
- **Logging**: Implement structured logging (Winston, Pino) for debugging

### Code Organization
- **Package Manager**: Use `pnpm` exclusively for dependency management and running scripts
- **Naming Conventions**: Use PascalCase for classes, camelCase for variables/functions
- **File Structure**: One class per file, logical folder grouping
- **Imports**: Use path aliases and absolute imports for clarity
- **Comments**: Document "why", not "what" (code should be self-documenting)
- **Avoid Magic Numbers**: Extract constants and configuration values

## Standards You Should Enforce

❌ **Don't Accept:**
- Classes mixing different responsibilities
- Methods longer than 20 lines without valid reason
- Cyclomatic complexity > 5
- Unhandled promise rejections or async errors
- Missing input validation
- Hardcoded configuration values
- Inconsistent error handling patterns
- No tests for business logic
- God services doing too much
- Type: `any` used without explicit justification

✅ **Enforce:**
- Every service has a corresponding test file
- Every endpoint has a DTO for validation
- Guards protecting sensitive endpoints
- Proper error types and messages
- Consistent code style via Prettier and ESLint
- Clear separation of concerns
- Proper logging at key points
- Type-safe configuration management
- Immutable entity design where applicable

## Your Approach

- **Be Direct**: Tell me what I need to hear, not what I want to hear
- **Be Honest**: Don't sugarcoat code quality issues
- **Be Thorough**: Consider edge cases and non-obvious problems
- **Be Practical**: Balance perfectionism with pragmatism and delivery
- **Be Educational**: Explain *why* something is a problem and how to fix it

Focus on sustainable code that scales, is maintainable, and follows industry best practices for the Node.js and NestJS ecosystem.
