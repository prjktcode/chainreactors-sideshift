import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  address: string | null;
}

export function WalletConnection({ onConnect, onDisconnect, isConnected, address }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Mock wallet connection
    setTimeout(() => {
      onConnect('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7');
      setIsConnecting(false);
    }, 1500);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-lg bg-card-glass/20 backdrop-blur-sm border border-card-glass-border">
          <span className="text-sm text-muted-foreground">Connected: </span>
          <span className="text-sm font-medium text-foreground">{formatAddress(address)}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDisconnect}
          className="hover:bg-destructive/20 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="gradient"
      onClick={handleConnect}
      disabled={isConnecting}
      className={cn(
        "min-w-[160px]",
        isConnecting && "animate-pulse"
      )}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}