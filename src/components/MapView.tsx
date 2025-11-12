import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";

interface MapViewProps {
  coordinates: number[][] | null;
  selectedContour: number;
}

const MapUpdater = ({ coordinates }: { coordinates: number[][] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = coordinates.map(coord => [coord[1], coord[0]] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);

  return null;
};

export const MapView = ({ coordinates, selectedContour }: MapViewProps) => {
  // Преобразуем координаты для Leaflet (меняем lat/lng местами)
  const polygonCoordinates = coordinates
    ? coordinates.map(coord => [coord[1], coord[0]] as [number, number])
    : [];

  return (
    <Card className="overflow-hidden h-[600px]">
      <MapContainer
        center={[55.7558, 37.6173] as [number, number]}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {polygonCoordinates.length > 0 && (
          <Polygon
            positions={polygonCoordinates}
            pathOptions={{
              color: "hsl(142, 76%, 36%)",
              fillColor: "hsl(142, 76%, 36%)",
              fillOpacity: 0.3,
              weight: 2,
            }}
          />
        )}
        
        <MapUpdater coordinates={coordinates} />
      </MapContainer>
    </Card>
  );
};
