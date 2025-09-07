import { Token, Strategy, Transaction } from '@/types/crypto';

export const mockTokens: Token[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.5,
    price: 65000,
    value: 32500,
    percentage: 45,
    icon: '₿'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 10,
    price: 3200,
    value: 32000,
    percentage: 44,
    icon: 'Ξ'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 8000,
    price: 1,
    value: 8000,
    percentage: 11,
    icon: '$'
  }
];

export const strategies: Strategy[] = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'A balanced mix of stability and growth',
    allocations: {
      'stablecoins': 50,
      'BTC': 30,
      'ETH': 20
    }
  },
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    description: 'Higher risk, higher reward strategy',
    allocations: {
      'BTC': 50,
      'ETH': 40,
      'stablecoins': 10
    }
  },
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Prioritize stability with minimal volatility',
    allocations: {
      'stablecoins': 70,
      'BTC': 20,
      'ETH': 10
    }
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    from: 'ETH',
    to: 'USDC',
    fromAmount: 2,
    toAmount: 6400,
    status: 'complete',
    timestamp: new Date(Date.now() - 86400000),
    txHash: '0xabc123...'
  },
  {
    id: '2',
    from: 'BTC',
    to: 'ETH',
    fromAmount: 0.1,
    toAmount: 2.03,
    status: 'complete',
    timestamp: new Date(Date.now() - 172800000),
    txHash: '0xdef456...'
  }
];