# CLAUDE.md for Ranka

## Build/Dev Commands
- Install: `npm install` (project uses npm only, not yarn)
- Lint: `npm run lint` (project uses StandardJS)
- Test: No tests currently configured

## Code Style Guidelines
- **Formatting**: StandardJS style (https://standardjs.com/)
- **Imports**: CommonJS style (`require()` vs ES modules)
- **Naming**: camelCase for variables and methods, PascalCase for classes
- **Documentation**: JSDoc style comments for methods
- **Error Handling**: Use Promise rejection with appropriate logging
- **Design Pattern**: Chainable API methods that return `this` 
- **Framework**: Express.js for routing
- **Node Version**: Project targets Node 14.x

## Project Structure
- `/src/index.js`: Main Ranka class definition
- `/src/router.js`: Express router for handling webhook endpoints
- `/src/request.js`: Request object with helper methods for parsing FB messages
- `/src/response.js`: Response object with chainable methods for FB messaging API

## Best Practices
- End all chainable response sequences with `.exec()` to execute actions
- Maintain EventEmitter pattern for handling different message types