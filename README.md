# assignment3-backend — TezPrint Orders (Frontend + Express + MongoDB)

This project is a simple full-stack app for TezPrint order management.
It contains a static frontend (HTML/CSS/JS) and a backend API (Node.js + Express) connected to MongoDB (Mongoose).

Orders are created from the website order form and stored in MongoDB.

---

## Project Structure

assignment-8-main/
backend/
src/
config/
db.js
controllers/
orders.controller.js
middlewares/
errorHandler.js
notFound.js
models/
Order.js
routes/
orders.routes.js
app.js
server.js
.env (create manually)
package.json
package-lock.json
frontend/
order.html
script5.js
style5.css
theme.js
...other pages
pictures/
...images


---

## Features

### Frontend
- Order form page (`frontend/order.html`)
- Sends order data to the backend using `fetch()`:
  - full name, phone, order type, deadline
  - design file name is saved as text (`designFileName`)
- Shows success / error message after submit
- Dark/Light theme toggle

### Backend (Express + MongoDB)
- REST API endpoints for orders:
  - `POST /api/orders` — create order
  - `GET /api/orders` — get all orders
  - `GET /api/orders/:id` — get order by id
  - `PUT /api/orders/:id` — update order by id
  - `DELETE /api/orders/:id` — delete order by id
- Validation:
  - required fields: `name`, `phone`, `type`, `deadline`
  - returns `400` for missing fields
  - returns `404` if order not found
- Mongoose schema with timestamps:
  - `createdAt`, `updatedAt`
- Health check:
  - `GET /health` → `{ "ok": true }`

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript, jQuery, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Env vars: dotenv

---

## Requirements (Install)

1) Node.js (LTS recommended)
- Check:
  ```bash
  node -v
  npm -v
MongoDB

Option A: Local MongoDB installed and running

Option B: MongoDB Atlas (cloud)

(Recommended) VS Code Live Server

To open frontend pages via http://localhost:5500/... instead of file:///

Setup & Run
1) Backend

Open terminal in project root and go to backend:
cd backend
Install dependencies:
npm install
Create .env inside backend/:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tezprint
Run backend:
npm run dev
Test in browser/Postman:

GET http://localhost:5000/health
2) Frontend

Recommended:

Open frontend/order.html using VS Code Live Server

Backend API URL used in frontend:

http://localhost:5000/api/orders
API Endpoints

Base URL: http://localhost:5000

GET /health

POST /api/orders

GET /api/orders

GET /api/orders/:id

PUT /api/orders/:id

DELETE /api/orders/:id
Postman Examples
Create Order

POST http://localhost:5000/api/orders

Body → raw → JSON:

{
  "name": "Test User",
  "phone": "+7 777 000 00 00",
  "type": "Business Card",
  "deadline": "2026-02-01",
  "designFileName": "logo.pdf"
}

Get All Orders

GET http://localhost:5000/api/orders

Update Order

PUT http://localhost:5000/api/orders/<id>

Body → raw → JSON:

{
  "name": "Updated Name",
  "phone": "+7 777 111 11 11",
  "type": "Booklet",
  "deadline": "2026-03-10",
  "designFileName": "new.pdf"
}

Delete Order

DELETE http://localhost:5000/api/orders/<id>

Notes

The file upload field in the form is used only to capture the file name.
The project does not upload/store the file itself, only designFileName is saved in MongoDB.

What NOT to commit

Do not push node_modules/ and .env.

Recommended .gitignore:

node_modules/
backend/node_modules/
backend/.env
.env
*.log
.DS_Store
