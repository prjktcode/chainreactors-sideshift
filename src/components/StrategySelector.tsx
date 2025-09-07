import { Strategy } from '@/types/crypto';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface StrategySelectorProps {
  strategies: Strategy[];
  selectedStrategy: Strategy | null;
  onSelect: (strategy: Strategy) => void;
}

export function StrategySelector({ strategies, selectedStrategy, onSelect }: StrategySelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Select Rebalancing Strategy</h2>
      <RadioGroup 
        value={selectedStrategy?.id}
        onValueChange={(value) => {
          const strategy = strategies.find(s => s.id === value);
          if (strategy) onSelect(strategy);
        }}
      >
        <div className="grid gap-4">
          {strategies.map((strategy) => (
            <label
              key={strategy.id}
              className={cn(
                "relative flex cursor-pointer rounded-xl border-2 p-4 transition-all duration-200",
                selectedStrategy?.id === strategy.id
                  ? "border-primary bg-primary/10 shadow-glow-sm"
                  : "border-card-glass-border bg-card-glass/10 hover:bg-card-glass/20"
              )}
            >
              <RadioGroupItem value={strategy.id} className="sr-only" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{strategy.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                  </div>
                  <div className={cn(
                    "h-5 w-5 rounded-full border-2 transition-all duration-200",
                    selectedStrategy?.id === strategy.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}>
                    {selectedStrategy?.id === strategy.id && (
                      <div className="h-full w-full rounded-full bg-primary-foreground scale-50" />
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(strategy.allocations).map(([asset, percentage]) => (
                    <span
                      key={asset}
                      className="px-3 py-1 bg-secondary/50 rounded-md text-xs font-medium text-foreground"
                    >
                      {asset}: {percentage}%
                    </span>
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}