import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MapViewProps {
  coordinates: number[][] | null;
  selectedContour: number;
}

export const MapView = ({ coordinates, selectedContour }: MapViewProps) => {
  // Используем статический API для отображения карты как изображения
  const centerLat = coordinates && coordinates.length > 0 
    ? coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length 
    : 55.7558;
  const centerLon = coordinates && coordinates.length > 0 
    ? coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length 
    : 37.6173;

  const mapImageUrl = `https://static-maps.yandex.ru/1.x/?ll=${centerLon},${centerLat}&size=650,450&z=12&l=map&pt=${centerLon},${centerLat},pm2rdm`;

  return (
    <Card className="overflow-hidden h-[600px] relative">
      {coordinates && coordinates.length > 0 ? (
        <div className="w-full h-full relative">
          <img 
            src={mapImageUrl}
            alt="Карта участка" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">Участок найден</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted/30">
          <div className="text-center space-y-4">
            <div className="w-full h-full absolute inset-0 opacity-20">
              <img 
                src="https://static-maps.yandex.ru/1.x/?ll=37.6173,55.7558&size=650,450&z=5&l=map"
                alt="Карта России" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">Введите кадастровый номер</p>
              <p className="text-sm text-muted-foreground">Участок отобразится на карте</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
