import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CoordinatesPanelProps {
  coordinates: number[][] | null;
  cadastralNumber: string | null;
}

export const CoordinatesPanel = ({ coordinates, cadastralNumber }: CoordinatesPanelProps) => {
  const [copied, setCopied] = useState(false);

  const formatCoordinatesForEFGIS = (coords: number[][]): string => {
    // Формат для ЕФГИС ЗСН: долгота широта, разделенные запятыми
    return coords.map(coord => `${coord[0]} ${coord[1]}`).join(", ");
  };

  const handleCopy = () => {
    if (!coordinates) return;

    const formattedCoords = formatCoordinatesForEFGIS(coordinates);
    navigator.clipboard.writeText(formattedCoords);
    
    setCopied(true);
    toast.success("Координаты скопированы в буфер обмена");
    
    setTimeout(() => setCopied(false), 2000);
  };

  if (!coordinates) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Координаты</CardTitle>
          <CardDescription>
            Введите кадастровый номер для получения координат
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Нет выбранных данных
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Координаты</CardTitle>
          <Badge variant="secondary">{coordinates.length} точек</Badge>
        </div>
        {cadastralNumber && (
          <CardDescription>КН: {cadastralNumber}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted rounded-lg p-4 max-h-48 overflow-y-auto">
          <pre className="text-xs font-mono whitespace-pre-wrap break-words">
            {formatCoordinatesForEFGIS(coordinates)}
          </pre>
        </div>

        <Button onClick={handleCopy} className="w-full" disabled={copied}>
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Скопировано
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Скопировать для ЕФГИС ЗСН
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Координаты готовы для вставки в ЕФГИС ЗСН
        </p>
      </CardContent>
    </Card>
  );
};
