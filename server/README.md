# Product Review Server

A RESTful API server built with Express.js and TypeScript for managing product reviews. This server provides endpoints for handling product-related operations and includes Swagger documentation for easy API exploration.

## Features

- RESTful API endpoints for product management
- TypeScript implementation for type safety
- Swagger documentation
- CORS enabled
- Error handling middleware
- Built with Express.js

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lytes20/product-review
cd server
```

2. Install dependencies:

```bash
npm install
```

## Available Scripts

- `npm run build` - Compiles TypeScript code to JavaScript
- `npm start` - Starts the server using ts-node
- `npm run dev` - Starts the development server with hot-reload using nodemon
- `npm test` - Runs the test suite (currently not configured)

## Project Structure

```
server/
├── app.ts              # Main application entry point
├── controllers/        # Request handlers
├── services/          # Business logic
├── models/            # Data models
├── routes/            # API routes
├── data/             # Data storage
├── error.ts          # Error handling middleware
└── swaggerConfig.ts  # Swagger configuration
```

## API Documentation

The API documentation is available through Swagger UI when the server is running. You can access it at:

http://localhost:3030/api-docs

### Hosted API

The API is hosted on Render and can be accessed at:

https://product-review-frontend.onrender.com/api/products

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3030 # Optional (defaults to 3030)
```

## API Endpoints

The server exposes the following base endpoints:

- `/api/products` - Product-related operations
- `/api-docs` - Swagger documentation

## Development

To start the development server with hot-reload:

```bash
npm run dev
```

The server will be available at `http://localhost:3030`

## Building for Production

To build the project for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled JavaScript files.

## Author

Gideon Bamuleseyo

## License

ISC
