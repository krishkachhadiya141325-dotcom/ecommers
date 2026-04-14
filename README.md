# Harmony Furniture — Full-Stack MERN E-Commerce

## Tech Stack
- Frontend: React 18 + Vite + Tailwind CSS + React Router v6
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB running locally on port 27017 (or MongoDB Atlas)

### 1. Clone and install
```bash
git clone https://github.com/krishkachhadiya141325-dotcom/ecommers
cd ecommers
npm install
cd backend && npm install
cd ../frontend-app && npm install
```

### 2. Configure environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Run the app
```bash
npm run dev
```
Frontend: http://localhost:5173
Backend API: http://localhost:5000/api

## Default Credentials
- Admin: admin@harmony.com / Admin@1234
- Register any email for a regular user account

## API Endpoints
### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me (protected)
- POST /api/auth/logout

### Products
- GET    /api/products
- GET    /api/products/:id
- POST   /api/products (admin)
- PUT    /api/products/:id (admin)
- DELETE /api/products/:id (admin)
- POST   /api/products/:id/reviews (auth)

### Cart (all require auth)
- GET    /api/cart
- POST   /api/cart
- PUT    /api/cart/:productId
- DELETE /api/cart/:productId
- DELETE /api/cart

### Orders (all require auth)
- POST /api/orders
- GET  /api/orders/my
- GET  /api/orders (admin)
- PUT  /api/orders/:id/status (admin)
