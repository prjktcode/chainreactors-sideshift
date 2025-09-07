import { useState, useEffect } from 'react';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Strategy, Token } from '@/types/crypto';

interface AIAssistantProps {
  selectedStrategy: Strategy | null;
  portfolio: Token[];
  onRebalance: () => void;
}

export function AIAssistant({ selectedStrategy, portfolio, onRebalance }: AIAssistantProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (selectedStrategy) {
      generateSuggestions();
    }
  }, [selectedStrategy]);

  const generateSuggestions = () => {
    setIsAnalyzing(true);
    // Mock AI suggestions
    setTimeout(() => {
      const mockSuggestions = [
        "Based on your Balanced strategy, I recommend reducing ETH exposure by 24% to achieve target allocation.",
        "Your stablecoin position is currently at 11%, well below the 50% target. Consider converting some volatile assets.",
        "BTC allocation is close to optimal at 45% vs 30% target. A small reduction would improve balance.",
        "This rebalancing will reduce portfolio volatility by approximately 35% while maintaining growth potential."
      ];
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <Card className="bg-card-glass/20 backdrop-blur-sm border-card-glass-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
        {isAnalyzing && (
          <div className="ml-auto flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
      </div>

      {!selectedStrategy ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Select a rebalancing strategy to receive AI-powered recommendations
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg bg-card-glass/10 border border-card-glass-border/50",
                  "opacity-0 animate-in fade-in slide-in-from-left-2 duration-300",
                )}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <p className="text-sm text-foreground leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>

          {suggestions.length > 0 && (
            <div className="pt-4 border-t border-card-glass-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated Impact</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on current market conditions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-success">-35%</p>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                </div>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                onClick={onRebalance}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start Rebalancing
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}