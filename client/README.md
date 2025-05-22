# Product Review Client Application

A modern, responsive web application for browsing and reviewing products. Built with React, TypeScript, and Vite.

Live Demo: [Product Review App](https://product-review-frontend.onrender.com/)

## Features

- Browse products with pagination
- Filter products by category
- Search products by name
- View detailed product information
- Add, edit, and delete product reviews
- Star rating system
- Responsive design for all screen sizes

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- CSS Modules

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lytes20/product-review.git
cd client
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_BACKEND_PORT=3030
VITE_ENV=DEVELOPMENT
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/         # React components
├── context/           # React context providers
├── constants.ts       # Application constants
├── global.css         # Global styles
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```
