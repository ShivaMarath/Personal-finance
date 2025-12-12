// types/index.ts

// Account Types
export interface Account {
  id: string;
  name: string;
  type: "CURRENT" | "SAVINGS";
  balance: string;
  isDefault: boolean;
  userId: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color?: string;
  icon?: string;
  subcategories?: string[];
  userId?: string;
}

// Transaction Types (for display)
export interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: string;
  description: string | null;
  date: Date | string;
  accountId: string;
  category: string;
  receiptUrl: string | null;
  isRecurring: boolean;
  recurringInterval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null;
  status: "PENDING" | "COMPLETED" | "FAILED";
  userId: string;
}

// For API submission (amount as number)
export interface TransactionSubmitData {
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
  date: Date;
  accountId: string;
  category: string;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  userId: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Scanned Receipt Types
export interface ScannedReceiptData {
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
  date: Date | string;
  category: string;
  merchant?: string;
}
// types/index.ts - Add these
export interface CreateTransactionResponse {
  success: boolean;
  data: Transaction;
}

export interface UpdateTransactionResponse {
  success: boolean;
  data: Transaction;
}

export interface ScannedReceiptResponse {
  amount: number;
  date: Date;
  description: string;
  category: string;
  merchantName: string;
}

// TransactionSubmitData should match the action function
export interface TransactionSubmitData {
  type: "INCOME" | "EXPENSE";
  amount: number; // Number for API, string for form
  description?: string;
  date: Date;
  accountId: string;
  category: string;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  userId: string;
  receiptUrl?: string;
}