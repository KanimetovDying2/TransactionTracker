export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export interface ApiCategory {
  name: string;
  type: "income" | "expense";
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  isDeleting: boolean;
  error: boolean;
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface TransactionsState {
  items: Transaction[];
  isLoading: boolean;
  error: boolean;
}
