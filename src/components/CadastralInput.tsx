import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Info } from "lucide-react";
import { toast } from "sonner";

interface CadastralInputProps {
  onSearch: (cadastralNumber: string) => void;
  loading: boolean;
}

export const CadastralInput = ({ onSearch, loading }: CadastralInputProps) => {
  const [cadastralNumber, setCadastralNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формата кадастрового номера (XX:XX:XXXXXX:XXXX)
    const cadastralRegex = /^\d{2}:\d{2}:\d{6,7}:\d{1,}$/;
    
    if (!cadastralRegex.test(cadastralNumber)) {
      toast.error("Неверный формат кадастрового номера");
      return;
    }

    onSearch(cadastralNumber);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="cadastral">Кадастровый номер</Label>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>Формат: XX:XX:XXXXXX:XXXX</span>
            </div>
          </div>
          <Input
            id="cadastral"
            placeholder="45:15:000000:1448"
            value={cadastralNumber}
            onChange={(e) => setCadastralNumber(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Пример: 45:15:000000:1448 или 77:01:0001001:1234
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          {loading ? "Загрузка..." : "Найти участок"}
        </Button>
      </form>
    </Card>
  );
};
