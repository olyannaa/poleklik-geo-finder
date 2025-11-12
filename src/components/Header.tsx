import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

interface HeaderProps {
  remainingParcels: number;
  paidParcels: number;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export const Header = ({ remainingParcels, paidParcels, onAuthClick, isAuthenticated }: HeaderProps) => {
  const totalParcels = remainingParcels + paidParcels;
  
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ПолеКлик</h1>
            <p className="text-xs text-muted-foreground">Координаты для ЕФГИС ЗСН</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Доступно участков:</span>
            <Badge variant={totalParcels > 0 ? "secondary" : "destructive"} className="text-base font-semibold">
              {totalParcels}
            </Badge>
            {totalParcels > 0 && (
              <span className="text-xs text-muted-foreground ml-1">
                ({remainingParcels > 0 ? `${remainingParcels} бесплатный` : ''}{remainingParcels > 0 && paidParcels > 0 ? ' + ' : ''}{paidParcels > 0 ? `${paidParcels} платный` : ''})
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={onAuthClick}>
            <User className="w-4 h-4 mr-2" />
            {isAuthenticated ? "Профиль" : "Вход"}
          </Button>
        </div>
      </div>
    </header>
  );
};
