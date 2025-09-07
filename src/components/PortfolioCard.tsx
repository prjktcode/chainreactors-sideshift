import { Token } from '@/types/crypto';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  token: Token;
}

export function PortfolioCard({ token }: PortfolioCardProps) {
  const isStablecoin = token.symbol === 'USDC' || token.symbol === 'USDT';
  const priceChange = isStablecoin ? 0 : (Math.random() - 0.5) * 10;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
      <div className="relative bg-card-glass/20 backdrop-blur-sm border border-card-glass-border rounded-xl p-6 hover:bg-card-glass/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
              {token.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{token.symbol}</h3>
              <p className="text-sm text-muted-foreground">{token.name}</p>
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
            priceChange >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
          )}>
            {priceChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(priceChange).toFixed(1)}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="font-medium text-foreground">
              {token.balance.toLocaleString()} {token.symbol}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium text-foreground">
              ${token.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Value</span>
            <span className="text-lg font-bold text-foreground">
              ${token.value.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-card-glass-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Portfolio %</span>
            <span className="text-sm font-medium text-primary">
              {token.percentage}%
            </span>
          </div>
          <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${token.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}