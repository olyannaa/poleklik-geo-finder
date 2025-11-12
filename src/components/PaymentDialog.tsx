import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
  amount: number;
  parcels: number;
}

export const PaymentDialog = ({ open, onOpenChange, onPaymentSuccess, amount, parcels }: PaymentDialogProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Неверный номер карты");
      return;
    }

    setProcessing(true);
    setProgress(0);

    // Имитация процесса оплаты
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSuccess(true);
          setTimeout(() => {
            toast.success(`Оплата прошла успешно! Добавлено ${parcels} участков`);
            onPaymentSuccess();
            onOpenChange(false);
            // Сброс состояния
            setTimeout(() => {
              setProcessing(false);
              setSuccess(false);
              setProgress(0);
              setCardNumber("");
              setExpiry("");
              setCvv("");
            }, 500);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Оплата пакета участков</DialogTitle>
          <DialogDescription>
            {parcels} {parcels === 1 ? "участок" : "участков"} — {amount} ₽
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Оплата успешна!</h3>
              <p className="text-sm text-muted-foreground">Участки добавлены в ваш аккаунт</p>
            </div>
          </div>
        ) : processing ? (
          <div className="py-8 space-y-4">
            <div className="text-center space-y-2">
              <CreditCard className="w-12 h-12 text-primary mx-auto animate-pulse" />
              <p className="text-sm font-medium">Обработка платежа...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              Пожалуйста, не закрывайте окно
            </p>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="bg-muted/50 border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Итого к оплате:</span>
                <span className="text-xl font-bold">{amount} ₽</span>
              </div>
            </div>

            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="w-4 h-4" />
                <span>Данные карты</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Срок</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="bg-info/10 border border-info/20 rounded p-2">
                <p className="text-xs text-muted-foreground">
                  Для теста используйте любые данные карты
                </p>
              </div>
            </Card>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Безопасная оплата через защищенное соединение</span>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Оплатить {amount} ₽
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
