import { Transaction } from '@/types/crypto';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-card-glass/20 backdrop-blur-sm border-card-glass-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={cn(
                "p-4 rounded-lg bg-card-glass/10 border border-card-glass-border/50",
                "hover:bg-card-glass/20 transition-all duration-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(tx.status)}
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {tx.fromAmount} {tx.from}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {tx.toAmount} {tx.to}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</p>
                  {tx.txHash && (
                    <p className="text-xs text-primary hover:underline cursor-pointer">
                      {tx.txHash}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}