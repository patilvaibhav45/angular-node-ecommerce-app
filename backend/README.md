# Backend README

This backend has been migrated from a SQL-based implementation to MongoDB using Mongoose.

## Requirements
- Node.js 14+
- MongoDB (running locally or via a hosted provider like Atlas)

## Environment
Create a `.env` file under `backend/config` or in the `backend` root with the following variables:

MONGO_URL=mongodb://localhost:27017/angular_ecommerce
JWT_SECRET=your_jwt_secret
PORT=5000

## Install

```powershell
cd backend
npm install
```

## Run (development)

Using cross-env (already configured in `package.json`):

```powershell
set MONGO_URL=mongodb://localhost:27017/angular_ecommerce; npm run dev
```

Or using cross-env on any platform:

```powershell
npm run dev
```

## API notes
- Auth endpoints: `/api/v1/auth/register`, `/api/v1/auth/login`
- Products: `/api/v1/products` and `/api/v1/products/:id`
- Orders: `/api/v1/orders` (POST to create) and GET endpoints for list/single
- Users: `/api/v1/users` (GET all), `/api/v1/users/:userId` (PUT update)

Example register request:

POST /api/v1/auth/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Example login request:

POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

## Notes & Next steps
- Passwords are stored using `bcrypt` for improved security.
- Add seed scripts to populate `categories` and `products` collections for easier testing.
- Add tests or Postman collection for API endpoints.

If you'd like, I can add seed scripts and tests next.

## Running client locally with proxy

To run the Angular client in development while proxying API requests to the backend running on port 5000:

1. Start the backend (from `backend`):

```powershell
npm run dev
```

2. Start the client (from `client`):

```powershell
npm start
```

The client uses `proxy.conf.json` to forward `/api` requests to `http://localhost:5000`.
