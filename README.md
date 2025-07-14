# Invoice Maker API for Mauli Enterprices

A lightweight RESTful API for creating, retrieving, updating, and deleting invoices. Built with **TypeScript**, **Express.js**, and **MongoDB (Mongoose)**.

---

## ✨ Features

- Create invoices with automatic, year‑based invoice numbering
- Flexible filtering by customer, date, or invoice number
- Retrieve recent invoices or full history
- Update & delete invoices

---

## 🛠️ Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Runtime      | Node.js 20 LTS             |
| Server       | Express.js 5 (Router API)  |
| Language     | TypeScript                 |
| Database     | MongoDB Atlas / Local      |
| ODM          | Mongoose                   |
| Dev tools    | ts-node‑dev / nodemon      |

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
$ git clone https://github.com/<your‑org>/invoice‑maker‑api.git
$ cd invoice‑maker‑api

# 2. Install dependencies
$ npm install

# 3. Create a .env file 

# 4. Start in development mode
$ npm run dev

# Production build
$ npm run build && npm start
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxxx.mongodb.net/invoice_db?retryWrites=true&w=majority
```

---

## 📚 API Reference

> Base URL: `http://localhost:4000/api/invoices`

| Method & Path              | Description                                   | Body / Query Params |
|----------------------------|-----------------------------------------------|---------------------|
| **POST** `/add`            | Create a new invoice                          | JSON invoice object |
| **GET** `/`                | List invoices with optional filters           | `invoiceTo`, `dated`, `invoiceNo` |
| **GET** `/next-invoice-no` | Get the next invoice number in the series     | – |
| **GET** `/getAll`          | Fetch **all** invoices                        | – |
| **GET** `/recent`          | Fetch 5 most recent invoices                  | – |
| **PATCH** `/:id`           | Update an invoice by MongoDB ID               | JSON invoice fields |
| **DELETE** `/:id`          | Delete an invoice by ID                       | – |

### Example Requests

```bash
# Create
curl -X POST http://localhost:4000/api/invoices/add \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceTo": "",
    "dated": "2025-07-14",
  }'

# Filter by customer & date
curl "http://localhost:4000/api/invoices?invoiceTo=ACME%20Corp.&dated=2025-07-14"
```

---

## 🧩 Project Structure

```
├── src
│   ├── models
│   │   └── Invoice.ts     # Mongoose schema & model
│   ├── routes
│   │   └── invoice.ts     # the Routes go here
│   ├── index.ts           # Server entry point
│   └── ...
├── tsconfig.json
├── package.json
└── README.md
```

