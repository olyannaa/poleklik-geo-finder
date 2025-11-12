import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Copy } from "lucide-react";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  cadastralNumber: string;
  date: Date;
  coordinates: number[][];
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
}

export const HistoryPanel = ({ history, onSelectItem }: HistoryPanelProps) => {
  const handleCopyFromHistory = (item: HistoryItem) => {
    const formattedCoords = item.coordinates.map(coord => `${coord[0]} ${coord[1]}`).join(", ");
    navigator.clipboard.writeText(formattedCoords);
    toast.success("Координаты скопированы из истории");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="w-5 h-5" />
          <CardTitle>История</CardTitle>
        </div>
        <CardDescription>
          Повторное копирование не списывает доступы
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            История пуста
          </p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <p className="text-sm font-medium">{item.cadastralNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date.toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyFromHistory(item);
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
