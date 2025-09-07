import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromToken: string;
  toToken: string;
  amount: number;
}

export function SwapModal({ isOpen, onClose, fromToken, toToken, amount }: SwapModalProps) {
  const [status, setStatus] = useState<'quote' | 'deposit' | 'processing' | 'complete'>('quote');
  const [depositAddress, setDepositAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Mock fetching quote from SideShift
      setTimeout(() => {
        setDepositAddress('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
        setStatus('deposit');
      }, 2000);
    }
  }, [isOpen]);

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    toast({
      title: "Address copied!",
      description: "Deposit address has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const mockProcessSwap = () => {
    setStatus('processing');
    // Mock processing time
    setTimeout(() => {
      setStatus('complete');
      setTimeout(() => {
        onClose();
        setStatus('quote');
      }, 2000);
    }, 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-card-glass-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Swap {fromToken} to {toToken}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {['Quote', 'Deposit', 'Processing', 'Complete'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  status === step.toLowerCase() 
                    ? "bg-primary text-primary-foreground shadow-glow-sm"
                    : index <= ['quote', 'deposit', 'processing', 'complete'].indexOf(status)
                    ? "bg-success text-success-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-2 transition-all duration-300",
                    index < ['quote', 'deposit', 'processing', 'complete'].indexOf(status)
                      ? "bg-success"
                      : "bg-secondary"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Content based on status */}
          {status === 'quote' && (
            <Card className="p-6 bg-card-glass/20 border-card-glass-border">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Fetching best rates from SideShift...
              </p>
            </Card>
          )}

          {status === 'deposit' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card-glass/20 border-card-glass-border">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <QrCode className="h-32 w-32 text-black" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send {amount} {fromToken} to:
                  </p>
                  <div className="flex items-center gap-2 w-full">
                    <code className="flex-1 p-3 bg-secondary rounded-lg text-xs break-all text-foreground">
                      {depositAddress}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyAddress}
                      className="shrink-0"
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </Card>
              <Button
                variant="gradient"
                className="w-full"
                onClick={mockProcessSwap}
              >
                I've sent the funds
              </Button>
            </div>
          )}

          {status === 'processing' && (
            <Card className="p-6 bg-card-glass/20 border-card-glass-border">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/20 animate-pulse" />
                  <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-t-primary animate-spin" />
                </div>
                <p className="text-center text-foreground font-medium">
                  Processing your swap...
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  This usually takes 2-5 minutes
                </p>
              </div>
            </Card>
          )}

          {status === 'complete' && (
            <Card className="p-6 bg-card-glass/20 border-card-glass-border">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-success/20">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
                <p className="text-center text-foreground font-medium text-lg">
                  Swap Complete!
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Successfully swapped {amount} {fromToken} to {toToken}
                </p>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}