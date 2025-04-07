import { AccountService } from "../src/services/accountService";
import { Account } from "../src/models/account";
import { Transaction } from "../src/models/transaction";

describe("AccountService", () => {
  let accountService: AccountService;
  let account: Account;

  beforeEach(() => {
    accountService = new AccountService();
  });

  test("should create a new account", () => {
    account = accountService.createAccountIfNotExists("AC001");
    
    expect(account.accountId).toBe("AC001");
    expect(account.balance).toBe(0);
    expect(account.transactions.length).toBe(0);
  });

  test("should return existing account if already created", () => {
    account = accountService.createAccountIfNotExists("AC001");
    const existingAccount = accountService.createAccountIfNotExists("AC001");

    expect(existingAccount).toBe(account); // Same instance
  });

  test("should process deposit transaction correctly", () => {
    account = accountService.createAccountIfNotExists("AC001");

    const txn: Transaction = { date: "20230601", txnId: "20230601-01", type: "D", amount: 150.0 };
    accountService.processTransaction(account, txn);

    expect(account.balance).toBe(150.0);
    expect(account.transactions.length).toBe(1);
    expect(account.transactions[0].txnId).toBe("20230601-01");
  });

  test("should process withdrawal transaction correctly", () => {
    account = accountService.createAccountIfNotExists("AC001");
    account.balance = 200.0;

    const txn: Transaction = { date: "20230602", txnId: "20230602-01", type: "W", amount: 100.0 };
    accountService.processTransaction(account, txn);

    expect(account.balance).toBe(100.0);
    expect(account.transactions.length).toBe(1);
    expect(account.transactions[0].txnId).toBe("20230602-01");
  });

  test("should not allow withdrawal if balance is insufficient", () => {
    account = accountService.createAccountIfNotExists("AC001");

    const txn: Transaction = { date: "20230602", txnId: "20230602-01", type: "W", amount: 100.0 };
    const consoleSpy = jest.spyOn(console, "log");

    accountService.processTransaction(account, txn);

    expect(consoleSpy).toHaveBeenCalledWith("Insufficient funds!");
    expect(account.balance).toBe(0);
  });
});
