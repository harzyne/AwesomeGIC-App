import * as readlineSync from 'readline-sync';
import { AccountService } from './services/accountService';
import { InterestService } from './services/interestService';
import { TransactionService } from './services/transactionService';

const accountService = new AccountService();
const interestService = new InterestService();
const transactionService = new TransactionService(accountService, interestService);

function showMenu() {
    console.log(`
    Is there anything else you'd like to do?
    [T] Input transactions
    [I] Define interest rules
    [P] Print statement
    [Q] Quit
    `);
}

function inputTransactions() {
    const txnDetails = readlineSync.question("Please enter transaction details in <Date> <Account> <Type> <Amount> format (or enter blank to go back to main menu): ");
    if (txnDetails.trim() === "") return;
    const [date, account, type, amountStr] = txnDetails.split(' ');
    transactionService.processTransactionInput(account, txnDetails);
}

function defineInterestRule() {
    const ruleDetails = readlineSync.question("Please enter interest rules details in <Date> <RuleId> <Rate in %> format (or enter blank to go back to main menu): ");
    if (ruleDetails.trim() === "") return;
    const [date, ruleId, rateStr] = ruleDetails.split(' ');
    const rate = parseFloat(rateStr);
    if (rate > 0 && rate < 100) {
        interestService.defineInterestRule(date, ruleId, rate);
        console.log("Interest rule defined successfully!");
    } else {
        console.log("Invalid rate value!");
    }
}

function printStatement() {
    const accountAndMonth = readlineSync.question("Please enter account and month to generate the statement <Account> <Year><Month> (or enter blank to go back to main menu): ");
    if (accountAndMonth.trim() === "") return;
    const [accountId, month] = accountAndMonth.split(' ');
    const account = accountService.getAccount(accountId);
    if (account) {
        console.log(`Printing statement for ${accountId}...`);
        transactionService.printAccountStatement(account);
    } else {
        console.log("Account not found!");
    }
}

function quit() {
    console.log("Thank you for banking with AwesomeGIC Bank.");
    console.log("Have a nice day!");
    process.exit(0);
}

function runApp() {
    while (true) {
        showMenu();
        const option = readlineSync.question("> ").toUpperCase();

        switch (option) {
            case 'T':
                inputTransactions();
                break;
            case 'I':
                defineInterestRule();
                break;
            case 'P':
                printStatement();
                break;
            case 'Q':
                quit();
                break;
            default:
                console.log("Invalid option!");
        }
    }
}

runApp();
