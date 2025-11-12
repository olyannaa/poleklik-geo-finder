import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

interface HeaderProps {
  remainingParcels: number;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export const Header = ({ remainingParcels, onAuthClick, isAuthenticated }: HeaderProps) => {
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
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Доступно участков:</span>
              <Badge variant="secondary" className="text-base font-semibold">
                {remainingParcels}
              </Badge>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onAuthClick}>
            <User className="w-4 h-4 mr-2" />
            {isAuthenticated ? "Профиль" : "Вход"}
          </Button>
        </div>
      </div>
    </header>
  );
};
