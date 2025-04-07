import { Transaction } from '../models/transaction';
import { Account } from '../models/account';

import { AccountService } from './accountService';
import { InterestService } from './interestService';

export class TransactionService {
    private accountService: AccountService;
    private interestService: InterestService;
    private txnCounter: number = 1;

    constructor(accountService: AccountService, interestService: InterestService) {
        this.accountService = accountService;
        this.interestService = interestService;
    }

    public generateTxnId(date: string): string {
        return `${date}-${String(this.txnCounter++).padStart(2, '0')}`;
    }

    public processTransactionInput(accountId: string, txnDetails: string): void {
        const [date, account, type, amountStr] = txnDetails.split(' ');

        if (!date || !account || !type || !amountStr) {
            console.log("Invalid transaction details. Please follow the format <Date> <Account> <Type> <Amount>.");
            return;
        }

        // Validate date format
        if (!/^\d{8}$/.test(date)) {
            console.log('Invalid date format. Please use YYYYMMdd format.');
            return;
        }

        // Validate type (either 'D' for deposit or 'W' for withdrawal)
        const validTypes = ['D', 'W'];
        if (!validTypes.includes(type.toUpperCase())) {
            console.log('Invalid transaction type. Use "D" for Deposit or "W" for Withdrawal.');
            return;
        }

        // Validate amount (must be a number greater than 0)
        const amount = parseFloat(amountStr);
        if (amount <= 0 || isNaN(amount)) {
            console.log('Invalid amount. Amount must be greater than zero.');
            return;
        }

        const accountObj = this.accountService.createAccountIfNotExists(account);
        if (accountObj.accountId !== accountId) {
            console.log("Account mismatch!");
            return;
        }

        // Ensure that a withdrawal does not occur if the account balance is zero
        if (type.toUpperCase() === 'W' && accountObj.balance <= 0) {
            console.log("Insufficient funds for withdrawal!");
            return;
        }

        const txnId = this.generateTxnId(date);
        const txn: Transaction = { date, txnId, type: type.toUpperCase(), amount };

        // Process transaction
        this.accountService.processTransaction(accountObj, txn);
        this.printAccountStatement(accountObj);
    }

    public printAccountStatement(account: Account): void {
        console.log(`Account: ${account.accountId}`);
        console.log("| Date     | Txn Id      | Type | Amount | Balance |");
        let balance = 0;
        for (const txn of account.transactions) {
            balance += txn.type.toUpperCase() === 'D' ? txn.amount : -txn.amount;
            console.log(`| ${txn.date} | ${txn.txnId} | ${txn.type.toUpperCase()}  | ${txn.amount.toFixed(2)} | ${balance.toFixed(2)} |`);
        }
    }
}
