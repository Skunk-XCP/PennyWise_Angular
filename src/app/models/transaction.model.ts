export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  category: string;
  description?: string;
}
