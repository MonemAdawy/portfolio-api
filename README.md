# Portfolio API

A professional backend API for a portfolio website, built with TypeScript, Express, MongoDB, and Cloudinary.

## Overview

This project provides a RESTful API for managing portfolio content, including projects, services, skills, contact messages, and authentication. It is designed for use with a frontend portfolio application and includes support for file uploads, email delivery, and secure admin authentication.

## Features

- Express API with TypeScript
- MongoDB integration via Mongoose
- Cloudinary image upload support
- Authentication routes for secure access
- Contact message handling with email notifications
- Structured validation and centralized error handling

## Tech Stack

- Node.js / TypeScript
- Express
- MongoDB / Mongoose
- Cloudinary
- Joi validation
- JSON Web Tokens (JWT)
- Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database available
- Cloudinary account for file uploads
- Email provider credentials for contact form notifications

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file at the project root and configure the following values:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=<your-mongodb-connection-string>
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=<admin-username>
ADMIN_PASSWORD=<admin-password>
ACCESS_TOKEN_EXPIRY=1d
AUTH_SECRET=<jwt-secret>
EMAIL_RECEIVER=<email-address>
PASS=<email-password>
CLOUD_NAME=<cloudinary-cloud-name>
API_KEY=<cloudinary-api-key>
API_SECRET=<cloudinary-api-secret>
```

### Run the Application

Development mode:

```bash
npm run dev
```

Build and start for production:

```bash
npm run prod
```

## API Endpoints

- `POST /api/auth` - authenticate admin users
- `GET /api/projects` - list projects
- `POST /api/projects` - create a project
- `GET /api/services` - list services
- `POST /api/services` - create a service
- `GET /api/skill` - list skills
- `POST /api/skill` - create a skill
- `POST /api/contact` - submit a contact message

## Project Structure

- `src/bootstrape.ts` - application initialization
- `src/DB/` - database connection and models
- `src/modules/` - feature modules, controllers, services, validation
- `src/common/` - shared middleware, utilities, error handling, file upload config

## License

ISC
