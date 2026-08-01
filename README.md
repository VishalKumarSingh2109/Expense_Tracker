# 💰 Expense Tracker

A full-stack expense tracking web application built with React, Node.js, Express, and MySQL. Track income and expenses, set monthly budgets with smart alerts, save toward financial goals, and visualize your spending with interactive charts.

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with bcrypt password hashing
- 💸 **Transaction Management** — Full CRUD with filtering, search, and pagination
- 🏷️ **Categories** — Default and custom user categories
- 📊 **Smart Budget Tracking** — Real-time spending alerts (80% warning, 100% exceeded)
- 🎯 **Savings Goals** — Contribute incrementally, auto-marks complete when funded
- 📈 **Financial Reports** — Monthly summaries, category breakdowns, and trend charts (Recharts)
- 🗑️ **Soft Delete** — Transaction history preserved even after deletion

## 🛠️ Tech Stack

**Frontend:** React.js (Vite), React Router, Context API, Axios, Recharts, Plain CSS
**Backend:** Node.js, Express.js, JWT, bcrypt, express-validator
**Database:** MySQL

## 📁 Project Structure

```
expense-tracker/
├── backend/          # Node.js + Express REST API
└── frontend/         # React (Vite) client
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Backend Setup
```bash
cd expense-tracker-backend
npm install
cp .env.example .env    # fill in your DB credentials and JWT secret
mysql -u root -p < src/database/schema.sql
mysql -u root -p < src/database/seed.sql
mysql -u root -p < src/database/migrations/001_add_soft_delete_to_transactions.sql
mysql -u root -p < src/database/migrations/002_add_status_to_savings_goals.sql
npm run dev
```
Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd expense-tracker-frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📌 API Overview

| Module | Base Route |
|---|---|
| Auth | `/api/auth` |
| Categories | `/api/categories` |
| Transactions | `/api/transactions` |
| Budgets | `/api/budgets` |
| Savings Goals | `/api/savings-goals` |
| Reports | `/api/reports` |

## 🗄️ Database Schema

Five core tables — `users`, `categories`, `transactions`, `budgets`, `savings_goals` — connected via foreign keys, with unique constraints (one budget per user/month) and indexes on frequently queried columns.

## 📄 License

This project is for personal/educational purposes.
