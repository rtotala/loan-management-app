# Loan Management App 

## Idea Structure for North star view reference. 
![HLD](https://github.com/rtotala/loan-management-app/assets/6474355/e8a19207-74ea-4257-be07-caa004355c98)
 
# Tech Stack  

## Recommended Microservices Architecture

| Microservice             | Recommended Type          | Recommended Framework | Reason                                                                                   |
|--------------------------|---------------------------|-----------------------|------------------------------------------------------------------------------------------|
| Authentication Service   | Serverless or Auto-Scaling Pods | Node.js or Python  | - Serverless is cost-effective for sporadic usage.<br>- Node.js and Python have strong libraries for authentication. |
| Loan Management Service  | Auto-Scaling Pods         | Java or Node.js       | - Java is robust for financial calculations.<br>- Node.js for easier JSON manipulation.   |
| Admin Approval Service   | Serverless                | Python or Node.js     | - Serverless for cost-effectiveness.<br>- Python and Node.js for quick development.      |
| Payment Service          | Auto-Scaling Pods         | Java or Python        | - Java for robustness and financial calculations.<br>- Python for quick integration with payment gateways.          |

## Database Choice 
Ideally Postgresql should be the primary database for Loan Management service. However as the product is just getting started MongoDb is the recommended choice. Reasons are listed below. 

Flexibility: MongoDB is schema-less, which means you can easily add fields like customer behavior, preferences, or other metrics without affecting existing data. This is useful for  systems where the data model might evolve over time.

Scalability: If your app grows and you collect more data for loans, schemes, payments etc, MongoDB can scale horizontally easily.

Performance: For read-heavy operations like getScheduledRepayments, Loans etc, MongoDB can be faster as it allows for data denormalization and in-memory storage.

Complex Queries: MongoDB supports complex queries and aggregations, which could be useful for generating recommendations based on multiple factors.

## Current stack 
Current stack is Node.js, Express & MongoDb. 

## Current ER Model
![diagram-export-16_09_2023, 03_04_59](https://github.com/rtotala/loan-management-app/assets/6474355/e6947d16-82f2-49d2-ba01-b50de3853342)

## Manual Installation

Install the dependencies:
```bash
npm install 
```

Set the environment variables:
```bash
cp .env.example .env

## Commands

Running locally:
```bash
npm run dev
```

Running in production:
```bash
npm run start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - send verification email\
`POST /v1/auth/verify-email` - verify email

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

**Loan routes**:\
`POST /v1/loans` - create a Loan\
`GET /v1/loans` - get all Loans\
`GET /v1/loans/:loanId` - get loan\
`PATCH /v1/loans/:loadId` - update loan\

**Scheme routes**:\
`POST /v1/schemes` - create a scheme\
`GET /v1/schemes` - get all Schemes\

**Repayment routes**:\
`POST /v1/repayments/:loanId` - create a Repayment for given Loan\
`GET /v1/repayments/:loanId` - get all Repayments for given Loan\

## Tests
Skipped due to time limit

## Note
Node architechture inspired from https://github.com/hagopj13/node-express-boilerplate

## License
[MIT](LICENSE)
