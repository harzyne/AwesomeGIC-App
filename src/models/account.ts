import { Transaction } from './transaction';

export interface Account {
  accountId: string;
  balance: number;
  transactions: Transaction[];
}