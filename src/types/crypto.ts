export interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  percentage: number;
  icon?: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  allocations: {
    [key: string]: number;
  };
}

export interface SwapQuote {
  fromAmount: string;
  toAmount: string;
  rate: string;
  depositAddress?: string;
  shiftId?: string;
  status?: 'pending' | 'processing' | 'complete' | 'failed';
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  status: 'pending' | 'complete' | 'failed';
  timestamp: Date;
  txHash?: string;
}