import { useState } from "react";
import { Header } from "@/components/Header";
import { AuthDialog } from "@/components/AuthDialog";
import { CadastralInput } from "@/components/CadastralInput";
import { MapView } from "@/components/MapView";
import { CoordinatesPanel } from "@/components/CoordinatesPanel";
import { HistoryPanel } from "@/components/HistoryPanel";
import { PricingDialog } from "@/components/PricingDialog";
import { InstructionsSection } from "@/components/InstructionsSection";
import { Button } from "@/components/ui/button";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  cadastralNumber: string;
  date: Date;
  coordinates: number[][];
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const [remainingParcels, setRemainingParcels] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState<number[][] | null>(null);
  const [currentCadastralNumber, setCurrentCadastralNumber] = useState<string | null>(null);
  const [selectedContour, setSelectedContour] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setRemainingParcels(1);
  };

  const handleSearch = async (cadastralNumber: string) => {
    if (!isAuthenticated) {
      toast.error("Войдите в систему для поиска участков");
      setAuthDialogOpen(true);
      return;
    }

    if (remainingParcels <= 0) {
      toast.error("У вас закончились доступные участки");
      setPricingDialogOpen(true);
      return;
    }

    setLoading(true);

    // Симуляция загрузки данных
    setTimeout(() => {
      // Пример координат для демонстрации
      const mockCoordinates = [
        [37.6173, 55.7558],
        [37.6273, 55.7558],
        [37.6273, 55.7658],
        [37.6173, 55.7658],
        [37.6173, 55.7558],
      ];

      setCurrentCoordinates(mockCoordinates);
      setCurrentCadastralNumber(cadastralNumber);
      setRemainingParcels(prev => prev - 1);

      // Добавляем в историю
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        cadastralNumber,
        date: new Date(),
        coordinates: mockCoordinates,
      };
      setHistory(prev => [newHistoryItem, ...prev]);

      setLoading(false);
      toast.success("Участок найден и отображен на карте");
    }, 1500);
  };

  const handlePurchase = (parcels: number) => {
    setRemainingParcels(prev => prev + parcels);
  };

  const handleHistoryItemSelect = (item: HistoryItem) => {
    setCurrentCoordinates(item.coordinates);
    setCurrentCadastralNumber(item.cadastralNumber);
    toast.info("Участок загружен из истории");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        remainingParcels={remainingParcels}
        onAuthClick={() => setAuthDialogOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Описание сервиса */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              ПолеКлик — сервис координат для ЕФГИС ЗСН
            </h1>
            <p className="text-lg text-muted-foreground">
              Помогает бухгалтерам и сотрудникам сельхозпредприятий быстро получить координаты 
              участка по кадастровому номеру и вставить их в ЕФГИС ЗСН
            </p>
            <p className="text-base text-muted-foreground">
              Сервис сфокусирован на одном сценарии: «ввёл номер → увидел участок → скопировал координаты»
            </p>
          </div>
        </div>

        {/* Предупреждение для неавторизованных */}
        {!isAuthenticated && (
          <Alert className="max-w-4xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Требуется авторизация</AlertTitle>
            <AlertDescription>
              Войдите или зарегистрируйтесь, чтобы получить доступ к функциям сервиса. 
              При регистрации вам будет доступен 1 бесплатный участок.
            </AlertDescription>
          </Alert>
        )}

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <CadastralInput onSearch={handleSearch} loading={loading} />
            <MapView coordinates={currentCoordinates} selectedContour={selectedContour} />
          </div>

          <div className="space-y-6">
            <CoordinatesPanel
              coordinates={currentCoordinates}
              cadastralNumber={currentCadastralNumber}
            />
            
            {isAuthenticated && (
              <Button
                onClick={() => setPricingDialogOpen(true)}
                variant="outline"
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Купить пакет участков
              </Button>
            )}

            {isAuthenticated && <HistoryPanel history={history} onSelectItem={handleHistoryItemSelect} />}
          </div>
        </div>

        {/* Инструкции */}
        <div className="max-w-4xl mx-auto">
          <InstructionsSection />
        </div>
      </main>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={handleAuthSuccess}
      />

      <PricingDialog
        open={pricingDialogOpen}
        onOpenChange={setPricingDialogOpen}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default Index;
