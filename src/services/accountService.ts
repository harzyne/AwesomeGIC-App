import {Transaction } from '../models/transaction';
import {Account } from '../models/account';


export class AccountService {
    private accounts: Map<string, Account> = new Map();

    public createAccountIfNotExists(accountId: string): Account {
        if (!this.accounts.has(accountId)) {
            const newAccount: Account = { accountId, balance: 0, transactions: [] };
            this.accounts.set(accountId, newAccount);
        }
        return this.accounts.get(accountId)!;
    }

    public processTransaction(account: Account, txn: Transaction): void {
        if (txn.type.toUpperCase() === 'D') {
            account.balance += txn.amount;
        } else if (txn.type.toUpperCase() === 'W') {
            if (account.balance >= txn.amount) {
                account.balance -= txn.amount;
            } else {
                console.log("Insufficient funds!");
                return;
            }
        }
        account.transactions.push(txn);
    }

    public getAccount(accountId: string): Account | undefined {
        return this.accounts.get(accountId);
    }
}
