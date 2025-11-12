import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (parcels: number) => void;
}

const pricingTiers = [
  {
    parcels: 1,
    price: 50,
    pricePerParcel: 50,
  },
  {
    parcels: 10,
    price: 400,
    pricePerParcel: 40,
    popular: true,
  },
  {
    parcels: 50,
    price: 1500,
    pricePerParcel: 30,
  },
];

export const PricingDialog = ({ open, onOpenChange, onPurchase }: PricingDialogProps) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedParcels, setSelectedParcels] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleSelectPackage = (parcels: number, price: number) => {
    setSelectedParcels(parcels);
    setSelectedPrice(price);
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    onPurchase(selectedParcels);
    setPaymentDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Купить пакет участков</DialogTitle>
          <DialogDescription>
            Выберите подходящий пакет для работы с участками
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-3 py-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.parcels}
              className={`p-6 relative ${
                tier.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Популярный
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">{tier.parcels}</p>
                  <p className="text-sm text-muted-foreground">
                    {tier.parcels === 1 ? "участок" : "участков"}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold">{tier.price} ₽</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tier.pricePerParcel} ₽ за участок
                  </p>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Копирование координат</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>История участков</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Формат ЕФГИС ЗСН</span>
                  </li>
                </ul>

                <Button
                  onClick={() => handleSelectPackage(tier.parcels, tier.price)}
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  Купить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>

      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onPaymentSuccess={handlePaymentSuccess}
        amount={selectedPrice}
        parcels={selectedParcels}
      />
    </Dialog>
  );
};
