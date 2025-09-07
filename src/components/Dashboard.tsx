import { useState } from 'react';
import { WalletConnection } from './WalletConnection';
import { PortfolioCard } from './PortfolioCard';
import { StrategySelector } from './StrategySelector';
import { AIAssistant } from './AIAssistant';
import { SwapModal } from './SwapModal';
import { TransactionHistory } from './TransactionHistory';
import { mockTokens, strategies, mockTransactions } from '@/lib/mockData';
import { Strategy } from '@/types/crypto';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const handleConnect = (address: string) => {
    setIsConnected(true);
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setSelectedStrategy(null);
  };

  const handleRebalance = () => {
    setShowSwapModal(true);
  };

  const totalValue = mockTokens.reduce((sum, token) => sum + token.value, 0);

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-glow opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CryptoBalance
                </h1>
              </div>
              <WalletConnection
                isConnected={isConnected}
                address={walletAddress}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <Card className="p-8 bg-card-glass/20 backdrop-blur-sm border-card-glass-border max-w-md text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Welcome to CryptoBalance
                </h2>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to start rebalancing your crypto portfolio with AI-powered insights
                </p>
                <WalletConnection
                  isConnected={isConnected}
                  address={walletAddress}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Portfolio Overview */}
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">Your Portfolio</h2>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTokens.map((token) => (
                    <PortfolioCard key={token.symbol} token={token} />
                  ))}
                </div>
              </div>

              {/* Strategy and AI Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card className="p-6 bg-card-glass/20 backdrop-blur-sm border-card-glass-border">
                    <StrategySelector
                      strategies={strategies}
                      selectedStrategy={selectedStrategy}
                      onSelect={setSelectedStrategy}
                    />
                  </Card>
                  
                  <TransactionHistory transactions={mockTransactions} />
                </div>
                
                <div>
                  <AIAssistant
                    selectedStrategy={selectedStrategy}
                    portfolio={mockTokens}
                    onRebalance={handleRebalance}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Swap Modal */}
      <SwapModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        fromToken="ETH"
        toToken="USDC"
        amount={2}
      />
    </div>
  );
}