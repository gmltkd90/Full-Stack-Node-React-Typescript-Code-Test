# Backend API - Invoice Management and Authentication

This is a backend API for managing invoices and user authentication, built using **Node.js** with **NestJS**, **Prisma**, and **PostgreSQL**.

## Features

- **Authentication**: Simple login functionality with JWT-based authentication.
- **Invoice Management**:
  - Retrieve all invoices.
  - Retrieve details of a specific invoice by ID.
  - Aggregate the total amount of invoices by their due date.
- **Data Seeding**: Seeding initial demo user and invoice data into the database.
- **Error Handling**: Proper error handling for invalid data, authentication errors, and not found cases.

##  Access the API
The backend API is now available at the following routes:

POST /auth/login: Login and get an authentication token.
GET /invoices: Get a list of all invoices (supports pagination).
GET /invoices/:id: Get the details of a specific invoice.
GET /invoices/total: Get the aggregated total amount due by due date.

## Seeding Data
- USER {
      email: 'user1@example.com',
      password: hashedPassword,
      name: 'Justin Yoo',
    }
- INVOICES
  {
    vendor_name: 'Vendor A',
    amount: 100,
    due_date: new Date('2024-12-31'),
    description: 'Invoice for services',
    user_id: user.id,
    paid: false,
  },
  {
    vendor_name: 'Vendor B',
    amount: 200,
    due_date: new Date('2024-11-30'),
    description: 'Invoice for products',
    user_id: user.id,
    paid: true,
  }

  - **please update ./prsima/seed.ts to add more seeding data**

# Database Settings
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=password
DB_NAME=mydb

## Set Up Database
npx prisma migrate dev --name init
npx prisma db seed

## To Run Application
npm run start:dev
