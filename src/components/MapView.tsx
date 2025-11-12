import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "@/components/ui/card";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
  const polygonCoordinates = useMemo(() => {
    return coordinates
      ? coordinates.map(coord => [coord[1], coord[0]] as [number, number])
      : [];
  }, [coordinates]);

  return (
    <Card className="overflow-hidden h-[600px]">
      <MapContainer
        center={[55.7558, 37.6173]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {polygonCoordinates.length > 0 && (
          <>
            <Polygon
              positions={polygonCoordinates}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 0.3,
                weight: 2,
              }}
            />
            <MapUpdater coordinates={coordinates} />
          </>
        )}
      </MapContainer>
    </Card>
  );
};
