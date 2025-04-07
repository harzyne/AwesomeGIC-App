# AwesomeGIC Bank Console App

This is a console-based banking system built using **Node.js** and **TypeScript**. The application allows you to manage transactions, define interest rules, and generate account statements. It supports features such as deposit and withdrawal transactions, calculating interest, and printing account statements.

## Features

- **Input Transactions**: 
  - Supports deposits (D) and withdrawals (W).
  - Automatically creates accounts on the first transaction.
  - Transactions are logged with a unique ID in the format `YYYYMMDD-xx`.

- **Define Interest Rules**: 
  - Define interest rates with a rule ID and date.
  - Interest is applied to account balances at the end of each month.

- **Print Account Statement**: 
  - Prints all transactions and interest applied for a specific account and month.

- **Validation**: 
  - Ensures no account balance goes below zero.
  - Validates date format, amount, and transaction type inputs.

Install dependencies:

npm install

Compile TypeScript files (optional, if you want to manually compile):
npx tsc

Run the application using ts-node:
npx ts-node app.ts
